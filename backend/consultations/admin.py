from django.contrib import admin
from .models import Consultation, ConsultationFile


class ConsultationFileInline(admin.TabularInline):
    """상담 페이지에서 첨부파일 함께 보기"""
    model = ConsultationFile
    extra = 0
    readonly_fields = ['uploaded_at']

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    """상담 신청 관리"""
    
    list_display = ['name', 'consultation_type', 'email', 'phone', 'created_at']    # 목록에서 보여줄 컬럼들
    list_filter = ['consultation_type', 'created_at']                               # 상담 유형, 날짜로 필터링
    search_fields = ['name', 'email', 'phone']                                      # 이름, 이메일, 연락처로 검색
    readonly_fields = ['password_hash', 'created_at', 'updated_at']                 # 상담 페이지에서 첨부파일 함께 표시
    inlines = [ConsultationFileInline]
    
    fieldsets = (
        ('기본 정보', {
            'fields': ('consultation_type', 'name', 'email', 'phone')
        }),
        ('상담 내용', {
            'fields' : ('message',)
        }),
        ('시스템 정보', {
            'fields' : ('password_hash', 'created_at', 'updated_at'),
            'classes' : ('collapse',)
        }),
    )

@admin.register(ConsultationFile)
class ConsultationFileAdmin(admin.ModelAdmin):
    "첨부파일 관리"
    
    list_display = ['consultation', 'file', 'uploaded_at']
    list_filter = ['uploaded_at']
