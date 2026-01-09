from django.urls import path
from .views import ConsultationCreateView, ConsultationLookupView

urlpatterns = [
    path('', ConsultationCreateView.as_view(), name='consultation-create'),         # as_view() 메서드 호출로 클래스 기반 뷰를 뷰 함수로 변환
    path('lookup/', ConsultationLookupView.as_view(), name='consultation-lookup'),
]