from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConsultationViewSet

# Router 설정: ViewSet을 자동으로 URL에 연결
router = DefaultRouter()    # ViewSet의 메서드들을 자동으로 URL과 매칭
router.register('', ConsultationViewSet, basename='consultations')  # ConsultationViewSet 등록

urlpatterns = [
    path('', include(router.urls)),     # 자동으로 /, /<id>/ 등의 URL 생성
]