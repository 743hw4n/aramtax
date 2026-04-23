from .base import *

# 프록시 헤더 비활성화
SECURE_PROXY_SSL_HEADER = None
USE_X_FORWARDED_HOST = False
USE_X_FORWARDED_PORT = False

# 로컬 스토리지
MEDIA_ROOT = BASE_DIR / 'media'
STATIC_ROOT = BASE_DIR / 'static'

# 이메일: 실제 SMTP 대신 터미널 출력 (docker compose logs -f backend 로 확인)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'