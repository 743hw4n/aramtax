from django.test import TestCase
from django.test.utils import override_settings
from django.core import mail
from .models import Consultation, ConsultationFile


def make_consultation(**kwargs):
    defaults = {
        'consultation_type': 'income_tax',
        'name': '홍길동',
        'email': 'test@example.com',
        'phone': '010-1234-5678',
    }
    defaults.update(kwargs)
    c = Consultation(**defaults)
    c.set_password(kwargs.pop('password', 'password123'))
    c.save()
    return c


class ConsultationModelTest(TestCase):
    def setUp(self):
        self.consultation = Consultation.objects.create(
            consultation_type='income_tax',
            name='홍길동',
            email='test@example.com',
            phone='010-1234-5678',
            password_hash='placeholder',
        )

    def test_password_hashed_on_set(self):
        self.consultation.set_password('mypassword123')
        self.assertNotEqual(self.consultation.password_hash, 'mypassword123')
        self.assertGreater(len(self.consultation.password_hash), 20)

    def test_check_password_correct(self):
        self.consultation.set_password('mypassword123')
        self.assertTrue(self.consultation.check_password('mypassword123'))

    def test_check_password_wrong(self):
        self.consultation.set_password('mypassword123')
        self.assertFalse(self.consultation.check_password('wrongpassword'))

    def test_status_changes_to_completed_on_admin_response(self):
        self.consultation.admin_response = '답변 내용입니다.'
        self.consultation.save()
        self.consultation.refresh_from_db()
        self.assertEqual(self.consultation.status, 'completed')
        self.assertIsNotNone(self.consultation.responded_at)

    def test_responded_at_cleared_when_response_removed(self):
        self.consultation.admin_response = '답변 내용입니다.'
        self.consultation.save()
        self.consultation.admin_response = ''
        self.consultation.save()
        self.consultation.refresh_from_db()
        self.assertIsNone(self.consultation.responded_at)


CREATE_URL = '/api/consultations/'
LOOKUP_URL = '/api/consultations/lookup/'

VALID_PAYLOAD = {
    'consultation_type': 'income_tax',
    'name': '홍길동',
    'email': 'test@example.com',
    'phone': '010-1234-5678',
    'password': 'password123',
}


class ConsultationCreateAPITest(TestCase):
    def test_create_consultation_success(self):
        response = self.client.post(CREATE_URL, VALID_PAYLOAD)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Consultation.objects.filter(email='test@example.com').exists())

    def test_password_hash_not_in_response(self):
        response = self.client.post(CREATE_URL, VALID_PAYLOAD)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertNotIn('password_hash', data)
        self.assertNotIn('password_hash', data.get('data', {}))
        self.assertNotIn('password', data.get('data', {}))

    def test_required_fields_validation(self):
        for field in ('name', 'email', 'phone', 'password'):
            payload = {k: v for k, v in VALID_PAYLOAD.items() if k != field}
            response = self.client.post(CREATE_URL, payload)
            self.assertEqual(response.status_code, 400, msg=f"field={field} should cause 400")

    def test_invalid_consultation_type(self):
        payload = {**VALID_PAYLOAD, 'consultation_type': 'invalid_type'}
        response = self.client.post(CREATE_URL, payload)
        self.assertEqual(response.status_code, 400)


class ConsultationLookupAPITest(TestCase):
    def setUp(self):
        self.consultation = Consultation.objects.create(
            consultation_type='vat',
            name='김철수',
            email='lookup@example.com',
            phone='010-9999-0000',
            password_hash='placeholder',
        )
        self.consultation.set_password('lookup_pass')
        self.consultation.save()

    def test_lookup_success(self):
        response = self.client.post(
            LOOKUP_URL,
            {'email': 'lookup@example.com', 'password': 'lookup_pass'},
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)

    def test_lookup_wrong_password(self):
        response = self.client.post(
            LOOKUP_URL,
            {'email': 'lookup@example.com', 'password': 'wrong_pass'},
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 404)

    def test_lookup_nonexistent_email(self):
        response = self.client.post(
            LOOKUP_URL,
            {'email': 'nobody@example.com', 'password': 'any_pass'},
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 404)

    def test_password_hash_not_in_lookup_response(self):
        response = self.client.post(
            LOOKUP_URL,
            {'email': 'lookup@example.com', 'password': 'lookup_pass'},
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        for item in response.json():
            self.assertNotIn('password_hash', item)
            self.assertNotIn('password', item)


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    ADMIN_EMAIL='admin@test.com',
    DEFAULT_FROM_EMAIL='noreply@test.com',
)
class ConsultationEmailTest(TestCase):
    def test_admin_email_sent_on_create(self):
        with self.captureOnCommitCallbacks(execute=True):
            self.client.post(CREATE_URL, VALID_PAYLOAD)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('admin@test.com', mail.outbox[0].to)

    def test_response_email_sent_on_admin_reply(self):
        consultation = Consultation.objects.create(
            consultation_type='income_tax',
            name='홍길동',
            email='test@example.com',
            phone='010-1234-5678',
            password_hash='placeholder',
        )
        mail.outbox = []

        with self.captureOnCommitCallbacks(execute=True):
            consultation.admin_response = '답변 드립니다.'
            consultation.save()

        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('test@example.com', mail.outbox[0].to)
