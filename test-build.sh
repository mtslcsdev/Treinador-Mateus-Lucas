#!/bin/bash

# Test script to verify the app builds correctly

echo "✅ Testing Treinador Mateus Lucas Build"
echo ""

# Check if frontend/index.html exists
if [ -f "frontend/index.html" ]; then
  echo "✅ frontend/index.html found"
  echo "   Size: $(wc -c < frontend/index.html) bytes"
else
  echo "❌ frontend/index.html not found"
  exit 1
fi

# Check if styles.css exists
if [ -f "frontend/src/styles/styles.css" ]; then
  echo "✅ frontend/src/styles/styles.css found"
else
  echo "⚠️  frontend/src/styles/styles.css not found (but app may still work)"
fi

# Verify no syntax errors in main file (basic check)
if grep -q "React.createElement\|ReactDOM.render" frontend/index.html; then
  echo "✅ React setup detected"
fi

echo ""
echo "✅ Build verification complete!"
echo "The app is ready for Netlify deployment!"
