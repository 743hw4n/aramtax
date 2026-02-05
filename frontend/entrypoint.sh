#!/bin/sh
set -e

# Cloudflare IP 대역 다운로드
echo "Downloading Cloudflare IP ranges..."
curl -s https://www.cloudflare.com/ips-v4 > /tmp/cf-ips-v4.txt
curl -s https://www.cloudflare.com/ips-v6 > /tmp/cf-ips-v6.txt

# nginx 설정 생성
echo "Generating real IP configuration..."
{
    echo "# Cloudflare IP ranges (auto-generated)"
    while read -r ip; do
        echo "set_real_ip_from $ip;"
    done < /tmp/cf-ips-v4.txt
    while read -r ip; do
        echo "set_real_ip_from $ip;"
    done < /tmp/cf-ips-v6.txt
    echo "real_ip_header CF-Connecting-IP;"
} > /etc/nginx/conf.d/cloudflare-ips.conf

# nginx 시작
exec nginx -g "daemon off;"