#!/bin/bash
# Standalone burn-in execution for flaky test detection
# Usage: ./scripts/burn-in.sh [iterations]
# Default: 10 iterations

set -e

ITERATIONS=${1:-10}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔥 Burn-in Loop: $ITERATIONS iterations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Build once before burn-in
echo "📦 Building site..."
npm run build || { echo "❌ Build failed"; exit 1; }
echo ""

# Run burn-in loop
for i in $(seq 1 $ITERATIONS); do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔥 Iteration $i/$ITERATIONS"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  npm run test || {
    echo ""
    echo "❌ FLAKY TEST DETECTED on iteration $i!"
    echo "   Tests must pass $ITERATIONS/$ITERATIONS times."
    echo "   Review test-results/ for failure details."
    exit 1
  }
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All $ITERATIONS burn-in iterations passed!"
echo "   Tests are stable and ready for merge."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
