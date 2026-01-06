from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Consultation(models.Model):
    """ 상담 신청 모델 """
    
    # 상담 유형 선택
    CONSULTATION_TYPES = [
        ('corporate_tax', '법인세'),
        ('income_tax', '소득세'),
        ('vat', '부가가치세'),
        ('comprehensive_income', '종합소득세'),
        ('other', '기타'),
    ]
    STATUS_CHOICES = [
        ('pending', '접수대기'),
        ('in_progress', '진행중'),
        ('completed', '완료'),
    ]
    
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending',
        verbose_name='상담 상태'
    )
    
    # 필드 정의
    consultation_type = models.CharField(
        max_length=50, 
        choices=CONSULTATION_TYPES,
        verbose_name='상담 유형'
    )
    name = models.CharField(max_length=100, verbose_name='이름')
    email = models.EmailField(verbose_name='이메일')
    phone =  models.CharField(max_length=128, verbose_name='전화번호')
    password_hash = models.CharField(max_length=128, verbose_name='비밀번호')
    message = models.TextField(blank=True, verbose_name='상담 내용')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='신청일시')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일시')
    
    class Meta:
        verbose_name = '상담 신청' 
        verbose_name_plural = '상담 신청 목록' 
        ordering = ['-created_at'] 
        
    def __str__(self):
        return f'{self.name} - {self.get_consultation_type_display()}'
    
    def set_password(self, raw_password): 
        """비밀번호 해시화 저장"""
        self.password_hash = make_password(raw_password)
    
    def check_password(self, raw_password):
        """비밀번호 확인"""
        return check_password(raw_password, self.password_hash)
    
class ConsultationFile(models.Model):
    """상담 첨부파일 모델"""
    
    consultation = models.ForeignKey(
        Consultation,
        on_delete=models.CASCADE,
        related_name='files', 
        verbose_name='상담 신청'
    )
    file = models.FileField(
        upload_to='consultation/%Y/%m/%d/', 
        verbose_name='첨부파일'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name='업로드일시')
    
    class Meta: 
        verbose_name = '상담 첨부파일'
        verbose_name_plural = '상담 첨부파일 목록'
        
    def __str__(self):
        return f'{self.consultation.name} - {self.file.name}'
    
        
