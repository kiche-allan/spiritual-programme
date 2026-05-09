#!/bin/bash
# Run Snyk dependency vulnerability scan
echo "Running Snyk security scan..."
npx snyk test --severity-threshold=high --json > security-results/snyk-report.json

if [ $? -ne 0 ]; then
  echo "❌ High severity vulnerabilities found. Check security-results/snyk-report.json"
  exit 1
else
  echo "✅ No high severity vulnerabilities found"
fi
