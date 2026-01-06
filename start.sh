#! /bin/bash
set -e

echo "세무법인 아람 시작"

# 종료 시 전체 프로세스 그룹 종료
cleanup() {
  echo ""
  echo "서버 종료 중..."
  pkill -P $$
  exit 0
}

trap cleanup INT TERM EXIT

# 백엔드
echo "Django 백엔드 시작"
cd backend
./aram/bin/python manage.py runserver &
cd ..

sleep 2

# 프론트엔드
echo "React 프론트엔드 시작"
cd frontend
npm run dev &
cd ..

echo ""
echo "서버 실행 완료!"

wait