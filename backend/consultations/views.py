from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import AllowAny
from .models import Consultation
from .serializers import ConsultationSerializer, ConsultationLookupSerializer

class ConsultationCreateView(CreateAPIView):
    """POST /api/consultations/ - 상담 신청"""
    
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    parser_classes = [MultiPartParser, JSONParser]
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        """상담 신청 생성"""            
        serializer = self.get_serializer(data=request.data)     # serializer 생성 (데이터 받기)
        serializer.is_valid(raise_exception=True)               # 검증
        self.perform_create(serializer)                         # DB에 저장 명령
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': '상담 신청이 완료되었습니다.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class ConsultationLookupView(APIView):
    """POST /api/consultations/lookup/ - 상담 조회"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        """이메일과 비밀번호로 상담 내역 조회"""
        lookup_serializer = ConsultationLookupSerializer(data=request.data)     # {'email': example@gmail.com, 'password': 'password123'}
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
            serializer = ConsultationSerializer(valid_consultations, many=True)
            return Response(serializer.data)
        except Consultation.DoesNotExist:
            return Response(
                {'error': '해당 이메일로 등록된 상담 내역이 없습니다.'},
                status=status.HTTP_404_NOT_FOUND
            )