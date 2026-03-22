#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../.env.prod"
source "${SCRIPT_DIR}/../.env.prod.db"

DB_CONTAINER="aramtax-db-prod-1"
BACKEND_CONTAINER="aramtax-backend-1"

usage() {
  echo "사용법: $0 --db|--media|--all YYYY-MM-DD"
  exit 1
}

[ $# -lt 2 ] && usage

MODE=$1
RESTORE_DATE=$2

TMP_DIR="/tmp/aramtax-restore-${RESTORE_DATE}"
mkdir -p "${TMP_DIR}"

echo "[$(date)] 복구 시작: ${RESTORE_DATE} (${MODE})"

restore_db() {
  echo "[$(date)] S3에서 DB 다운로드 중..."
  aws s3 cp "s3://${BACKUP_S3_BUCKET}/db/${RESTORE_DATE}.sql.gz" \
    "${TMP_DIR}/db-${RESTORE_DATE}.sql.gz"

  echo "[$(date)] 백엔드 중지 중..."
  docker stop "${BACKEND_CONTAINER}"

  echo "[$(date)] DB 복구 중..."
  gunzip -c "${TMP_DIR}/db-${RESTORE_DATE}.sql.gz" | \
    docker exec -i "${DB_CONTAINER}" psql \
      -U "${POSTGRES_USER}" \
      -d "${POSTGRES_DB}"

  echo "[$(date)] 백엔드 재시작 중..."
  docker start "${BACKEND_CONTAINER}"

  echo "[$(date)] DB 복구 완료"
}

restore_media() {
  echo "[$(date)] S3에서 미디어 다운로드 중..."
  aws s3 cp "s3://${BACKUP_S3_BUCKET}/media/${RESTORE_DATE}.tar.gz" \
    "${TMP_DIR}/media-${RESTORE_DATE}.tar.gz"

  echo "[$(date)] 미디어 복구 중..."
  docker run --rm \
    -v aramtax_media_volume:/media \
    -v "${TMP_DIR}:/backup" \
    alpine \
    tar xzf "/backup/media-${RESTORE_DATE}.tar.gz" -C /media

  echo "[$(date)] 미디어 복구 완료"
}

case "${MODE}" in
  --db)    restore_db ;;
  --media) restore_media ;;
  --all)   restore_db && restore_media ;;
  *)       usage ;;
esac

rm -rf "${TMP_DIR}"
echo "[$(date)] 복구 완료"
