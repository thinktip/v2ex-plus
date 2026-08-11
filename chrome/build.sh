#!/bin/sh

set -eu

SCRIPT_DIRECTORY=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPOSITORY_DIRECTORY=$(CDPATH= cd -- "$SCRIPT_DIRECTORY/.." && pwd)
BUILD_DIRECTORY="$SCRIPT_DIRECTORY/build"

node "$REPOSITORY_DIRECTORY/scripts/sync.mjs"

VERSION=$(
  /usr/bin/sed -n 's#^// @version[[:space:]]*##p' \
    "$REPOSITORY_DIRECTORY/userscript/v2ex-plus.user.js" |
    /usr/bin/head -n 1
)

if [ -z "$VERSION" ]; then
  echo "Unable to read the Lite version." >&2
  exit 1
fi

mkdir -p "$BUILD_DIRECTORY"

VERSIONED_ARCHIVE="$BUILD_DIRECTORY/V2EX-Plus-Chrome-$VERSION.zip"
CURRENT_ARCHIVE="$BUILD_DIRECTORY/V2EX-Plus-Chrome.zip"

(
  cd "$SCRIPT_DIRECTORY"
  /usr/bin/zip -q -j -FS "$VERSIONED_ARCHIVE" \
    manifest.json \
    lite.css \
    preflight.js \
    lite.js \
    page-bridge.js \
    popup.html \
    popup.css \
    popup.js \
    logo.svg \
    icon16.png \
    icon32.png \
    icon48.png \
    icon128.png
)

/bin/cp "$VERSIONED_ARCHIVE" "$CURRENT_ARCHIVE"

echo "Built $VERSIONED_ARCHIVE"
echo "Updated $CURRENT_ARCHIVE"
