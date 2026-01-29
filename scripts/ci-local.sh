#!/bin/bash
# Mirror CI execution locally for debugging
# Usage: ./scripts/ci-local.sh

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Running CI pipeline locally..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Stage 1: Build
echo "📦 Stage 1: Building site..."
npm run build || { echo "❌ Build failed"; exit 1; }
echo "✅ Build passed"
echo ""

# Stage 2: Tests
echo "🧪 Stage 2: Running E2E tests..."
npm run test || { echo "❌ Tests failed"; exit 1; }
echo "✅ Tests passed"
echo ""

# Stage 3: Burn-in (reduced iterations for local)
echo "🔥 Stage 3: Running burn-in loop (3 iterations)..."
for i in {1..3}; do
  echo "  Burn-in $i/3..."
  npm run test || { echo "❌ Flaky test detected on iteration $i"; exit 1; }
done
echo "✅ Burn-in passed"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Local CI pipeline passed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
