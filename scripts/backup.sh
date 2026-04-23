#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../.env.prod"
source "${SCRIPT_DIR}/../.env.prod.db"

BACKUP_DATE=$(date +%Y-%m-%d)
COMPOSE_FILE="${SCRIPT_DIR}/../docker-compose.prod.yaml"
TMP_DIR="/tmp/aramtax-backup-${BACKUP_DATE}"

mkdir -p "${TMP_DIR}"

echo "[$(date)] 백업 시작"

# DB 백업
echo "[$(date)] DB 백업 중 ..."
docker compose -f "${COMPOSE_FILE}" exec -T db-prod pg_dump \
    -U "${POSTGRES_USER}" \
    -d "${POSTGRES_DB}" \
    --clean --if-exists \
    | gzip > "${TMP_DIR}/db-${BACKUP_DATE}.sql.gz"

# 미디어 파일 백업
echo "[$(date)] 미디어 백업 중 ..."
docker run --rm \
    -v aramtax_media_volume:/media \
    -v "${TMP_DIR}:/backup" \
    alpine \
    tar czf "/backup/media-${BACKUP_DATE}.tar.gz" -C /media .

# S3 업로드
echo "[$(date)] S3 업로드 중 ..."
aws s3 cp "${TMP_DIR}/db-${BACKUP_DATE}.sql.gz" \
    "s3://${BACKUP_S3_BUCKET}/db/${BACKUP_DATE}.sql.gz"

aws s3 cp "${TMP_DIR}/media-${BACKUP_DATE}.tar.gz" \
    "s3://${BACKUP_S3_BUCKET}/media/${BACKUP_DATE}.tar.gz"

# 임시 파일 정리
rm -rf "${TMP_DIR}"

echo "[$(date)] 백업 완료"