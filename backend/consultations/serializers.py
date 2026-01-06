from rest_framework import serializers
from .models import Consultation, ConsultationFile

class ConsultationFileSerializer(serializers.ModelSerializer):
    """상담 첨부파일 시리얼라이저"""
    
    class Meta:
        model = ConsultationFile                    # 첨부파일 모델
        fields = ['id', 'file', 'uploaded_at']      # JSON에 포함될 필드
        read_only_fields = ['id', 'uploaded_at']    # 읽기 전용 필드

class ConsultationSerializer(serializers.ModelSerializer):
    """상담 신청 시리얼라이저"""
    
    files = ConsultationFileSerializer(many=True, read_only=True)
    uploaded_files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True,
        required=False
    )
    password=serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Consultation
        fields = [
            'id', 'consultation_type', 'name', 'email', 'phone',
            'password', 'message', 'files', 'uploaded_files', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'files', 'created_at', 'updated_at']
        
    def create(self, validated_data):
        """상담 생성 시 비밀번호 해시화 및 파일 저장"""
        
        # 파일 데이터 분리
        uploaded_files = validated_data.pop('uploaded_files', [])
        password = validated_data.pop('password')
        
        # 상담 객체 생성
        consultation = Consultation.objects.create(**validated_data)
        consultation.set_password(password)     # 비밀번호 해시화
        consultation.save()                     # DB에 저장        
        
        # 첨부파일 저장
        for file in uploaded_files:
            ConsultationFile.objects.create(consultation=consultation, file=file)   # DB에 저장
        
        return consultation
        
class ConsultationLookupSerializer(serializers.Serializer):
    """
    상담 조회용 시리얼라이저
    조회 시 이메일, 비밀번호만 입력 받음
    """
    
    # 상담 조회 시 이메일과 비밀번호로 조회
    email = serializers.EmailField()
    password = serializers.CharField()
                    
            
    