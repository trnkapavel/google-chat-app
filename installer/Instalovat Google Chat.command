#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="Google Chat.app"
APP_SRC="$SCRIPT_DIR/$APP_NAME"
APP_DEST="/Applications/$APP_NAME"

echo "================================================"
echo "  Instalace Google Chat"
echo "================================================"
echo ""

# Zkontroluj, zda existuje app vedle skriptu
if [ ! -d "$APP_SRC" ]; then
    echo "❌ Chyba: '$APP_NAME' nenalezen vedle tohoto skriptu."
    echo "   Ujisti se, že spouštíš skript přímo z DMG nebo složky s appkou."
    echo ""
    read -p "Stiskni Enter pro zavření..."
    exit 1
fi

# Pokud je appka již nainstalována, nabídni přeinstalaci
if [ -d "$APP_DEST" ]; then
    echo "ℹ️  Google Chat je již nainstalován v /Applications."
    read -p "   Přeinstalovat? (y/n): " confirm
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
        echo "Instalace zrušena."
        exit 0
    fi
    echo "🗑  Odstraňuji starou verzi..."
    rm -rf "$APP_DEST"
fi

echo "📦 Kopíruji Google Chat do /Applications..."
cp -r "$APP_SRC" /Applications/

echo "🔓 Odstraňuji omezení macOS (quarantine)..."
xattr -cr "$APP_DEST"

echo "✅ Hotovo! Spouštím Google Chat..."
echo ""
open "$APP_DEST"

sleep 2
echo "================================================"
echo "  Google Chat byl úspěšně nainstalován."
echo "  Toto okno můžeš zavřít."
echo "================================================"
