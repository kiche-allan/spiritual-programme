#!/bin/bash
# Run OWASP ZAP baseline scan against the running app
# Requires Docker

TARGET_URL=${1:-"http://localhost:3000"}
OUTPUT_DIR="security-results"
mkdir -p $OUTPUT_DIR

echo "Running OWASP ZAP baseline scan against $TARGET_URL..."

docker run --rm \
  -v $(pwd)/$OUTPUT_DIR:/zap/wrk/:rw \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t $TARGET_URL \
  -r zap-report.html \
  -J zap-report.json \
  -I \
  --auto

echo "ZAP scan complete. Report saved to $OUTPUT_DIR/zap-report.html"
