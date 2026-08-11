#!/bin/sh

set -eu

SCRIPT_DIRECTORY=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_PATH="$SCRIPT_DIRECTORY/xcode/V2EX Plus/V2EX Plus.xcodeproj"
BUILD_DIRECTORY="$SCRIPT_DIRECTORY/build"
DERIVED_DATA_DIRECTORY="${TMPDIR:-/tmp}/v2ex-plus-derived-data"
TEMP_BUILD_DIRECTORY="${TMPDIR:-/tmp}/v2ex-plus-products"
TEMP_APP="$TEMP_BUILD_DIRECTORY/V2EX Plus.app"
OUTPUT_ARCHIVE="$BUILD_DIRECTORY/V2EX-Plus.zip"
CONFIGURATION="${CONFIGURATION:-Release}"
ARCHITECTURES="${ARCHITECTURES:-arm64}"

cleanup() {
  pluginkit -r "$TEMP_APP/Contents/PlugIns/V2EX Plus Extension.appex" >/dev/null 2>&1 || true
  pluginkit -r "$TEMP_BUILD_DIRECTORY/V2EX Plus Extension.appex" >/dev/null 2>&1 || true
  rm -rf "$DERIVED_DATA_DIRECTORY" "$TEMP_BUILD_DIRECTORY"
}
trap cleanup EXIT

if [ -z "${DEVELOPER_DIR:-}" ]; then
  if [ -d /Applications/Xcode.app/Contents/Developer ]; then
    DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
  elif [ -d /Applications/Xcode-beta.app/Contents/Developer ]; then
    DEVELOPER_DIR=/Applications/Xcode-beta.app/Contents/Developer
  else
    echo "Full Xcode is required." >&2
    exit 1
  fi
fi

export DEVELOPER_DIR

node "$SCRIPT_DIRECTORY/../scripts/sync.mjs"

xcodebuild \
  -quiet \
  -project "$PROJECT_PATH" \
  -scheme "V2EX Plus" \
  -configuration "$CONFIGURATION" \
  -destination "generic/platform=macOS" \
  -derivedDataPath "$DERIVED_DATA_DIRECTORY" \
  CONFIGURATION_BUILD_DIR="$TEMP_BUILD_DIRECTORY" \
  ARCHS="$ARCHITECTURES" \
  ONLY_ACTIVE_ARCH=NO \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY=- \
  DEVELOPMENT_TEAM= \
  clean \
  build

mkdir -p "$BUILD_DIRECTORY"
codesign --verify --deep --strict "$TEMP_APP"
APP_VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" "$TEMP_APP/Contents/Info.plist")
VERSIONED_ARCHIVE="$BUILD_DIRECTORY/V2EX-Plus-$APP_VERSION-arm64.zip"
ditto -c -k --keepParent --norsrc --noextattr "$TEMP_APP" "$VERSIONED_ARCHIVE"
cp "$VERSIONED_ARCHIVE" "$OUTPUT_ARCHIVE"

echo "Built $VERSIONED_ARCHIVE"
echo "Updated $OUTPUT_ARCHIVE"
