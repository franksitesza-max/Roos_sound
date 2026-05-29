#!/usr/bin/env bash
set -euo pipefail

printf "\nChecking for dangerous JavaScript and HTML patterns...\n"

grep -RInE "eval\(|new Function\(|setTimeout\(['\"]|setInterval\(['\"]|document\.write|innerHTML|outerHTML|insertAdjacentHTML|srcdoc" . \
  --include="*.js" \
  --include="*.html" \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.vercel || true

printf "\nChecking for inline event handlers...\n"

grep -RInE "\son[a-zA-Z]+=" . \
  --include="*.html" \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.vercel || true

printf "\nChecking for unsafe links...\n"

grep -RInE "javascript:|target=\"_blank\"" . \
  --include="*.html" \
  --include="*.js" \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.vercel || true
