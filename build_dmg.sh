#!/bin/bash
set -e

APP="dist/mac-arm64/Google Chat.app"
INSTALLER_SCRIPT="installer/Instalovat Google Chat.command"
DMG_NAME="Google Chat Installer"
DMG_OUT="dist/Google Chat Installer.dmg"
STAGING="/tmp/GoogleChatDMG"

echo "Připravuji staging složku..."
rm -rf "$STAGING"
mkdir -p "$STAGING"

echo "Kopíruji soubory..."
cp -r "$APP" "$STAGING/"
cp "$INSTALLER_SCRIPT" "$STAGING/"

# Nastav executable (pro jistotu)
chmod +x "$STAGING/Instalovat Google Chat.command"

echo "Vytvářím DMG..."
hdiutil create \
    -volname "$DMG_NAME" \
    -srcfolder "$STAGING" \
    -ov \
    -format UDZO \
    "$DMG_OUT"

rm -rf "$STAGING"

echo ""
echo "✅ Hotovo: $DMG_OUT"
echo "   Velikost: $(du -sh "$DMG_OUT" | cut -f1)"
