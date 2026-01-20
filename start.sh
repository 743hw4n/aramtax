#!/bin/bash
set -e

echo "세무법인 아람 로컬 개발 서버 시작"

# 종료 시 docker compose down
cleanup() {
  echo ""
  echo "서버 종료 중..."
  docker compose -f docker-compose.local.yaml down
  exit 0
}

trap cleanup INT TERM EXIT

# Docker Compose 실행
docker compose -f docker-compose.local.yaml up --build
