from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Consultation
from .serializers import ConsultationSerializer, ConsultationLookupSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    """
    상담 신청 API
    CRUD 기능 제공 및 이메일과 비밀번호로 상담 내역 조회 기능 포함
    """

    queryset = Consultation.objects.all()           # 모든 Consultation 객체
    serializer_class = ConsultationSerializer       # 데이터 변환에 사용할 시리얼라이저
    parser_classes = [MultiPartParser, JSONParser]  # 파일 업로드 및 JSON 데이터 파서
    
    def create(self, request, *args, **kwargs):
        """상담 신청 생성"""
        serializer = self.get_serializer(data=request.data) # serializer 생성 (데이터 받기)
        serializer.is_valid(raise_exception=True)           # 검증
        self.perform_create(serializer)                      # DB에 저장 명령 
        headers = self.get_success_headers(serializer.data) 
        return Response(
            {'message': '상담 신청이 완료되었습니다.', 'data': serializer.data}, 
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
    @action(detail=False, methods=['post']) # 기본 제공되는 메서드(CRUD) 외에 추가 액션 정의
    def lookup(self, request):
        """이메일과 비밀번호로 상담 내역 조회"""
        lookup_serializer = ConsultationLookupSerializer(data=request.data)     # {'email': "hong@example.com', 'password': 'password123'}
        lookup_serializer.is_valid(raise_exception=True)                        # 유효성 검사   
        
        # 검증된 데이터 사용
        email = lookup_serializer.validated_data['email']
        password = lookup_serializer.validated_data['password']
        
        # DB 조회 및 비밀번호 확인
        try: 
            consultations = Consultation.objects.filter(email=email)    # 이메일로 등록된 상담 내역 가져오기
            valid_consultations = [
                c for c in consultations if c.check_password(password)  # 비밀번호 일치하는 상담만 필터링
            ]
            
            if not valid_consultations:
                return Response(
                    {'error': '이메일 또는 비밀번호가 일치하지 않습니다.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            # 일치하는 상담 내역 시리얼라이저로 반환
            serializer = self.get_serializer(valid_consultations, many=True)
            return Response(serializer.data)
        except Consultation.DoesNotExist:
            return Response(
                {'error': '해당 이메일로 등록된 상담 내역이 없습니다.'},
                status=status.HTTP_404_NOT_FOUND
            )