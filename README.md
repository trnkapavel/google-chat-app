# Google Chat – desktopová aplikace pro macOS

Neoficiální nativní desktopová aplikace Google Chat postavená na [Electron](https://www.electronjs.org/). Oproti prohlížeči přináší plnohodnotnou integraci s macOS.

## Funkce

- **Dock badge** – červený odznak s počtem nepřečtených zpráv
- **Nativní notifikace** – systémová oznámení macOS (Centrum oznámení)
- **Single instance** – aplikace se nespustí víckrát, druhý pokus vyvolá okno
- **Správné chování odkazů** – externí odkazy se otevírají v prohlížeči, nikoli v aplikaci
- **Podpora Dark Mode**

## Instalace

1. Stáhni `Google Chat Installer.dmg` ze sekce [Releases](../../releases)
2. Otevři DMG a spusť **Instalovat Google Chat.command** (dvojklik)
3. V Terminálu, který se otevře, sleduj postup instalace – aplikace se nainstaluje do `/Applications` a rovnou spustí

> **Poznámka k prvnímu spuštění:** macOS se může zeptat na povolení notifikací – potvrď je, jinak badge a oznámení nebudou fungovat.

## Proč instalátor odstraňuje quarantine?

Při stažení jakéhokoli souboru z internetu macOS automaticky přiřadí tzv. **quarantine atribut** (`com.apple.quarantine`). Jde o bezpečnostní mechanismus zvaný **Gatekeeper**, který chrání uživatele před spuštěním neznámého softwaru.

Aplikace distribuované mimo Mac App Store musí být buď:
- **podepsané Apple Developer certifikátem** (placené členství ~99 $/rok), nebo
- **zbavené quarantine atributu** ručně

Instalátor proto spouští příkaz:

```bash
xattr -cr "/Applications/Google Chat.app"
```

Tento příkaz odstraní quarantine atribut z aplikace – nic jiného nedělá. Jedná se o standardní postup pro interní firemní nástroje a open-source aplikace bez certifikátu.

**Jak si to ověřit sám:**
```bash
# Před instalací – uvidíš atribut com.apple.quarantine
xattr -l "/Applications/Google Chat.app"

# Po instalaci – atribut zmizí
xattr -l "/Applications/Google Chat.app"
```

Celý zdrojový kód aplikace i instalátoru je dostupný v tomto repozitáři k prostudování.

## Build ze zdrojových kódů

Potřebuješ: **Node.js 18+**

```bash
git clone https://github.com/<org>/google-chat-app.git
cd google-chat-app
npm install

# Spustit vývojově
npm start

# Sestavit DMG (arm64 + x64)
npm run build

# Zabalit do instalačního DMG
./build_dmg.sh
```

Výstupní soubor bude v `dist/Google Chat Installer.dmg`.

## Technické detaily

| Položka | Hodnota |
|---|---|
| Electron | 33.x |
| Cílová platforma | macOS (arm64 + x64) |
| Podpis | ad-hoc (`--sign -`) |
| Bundle ID | `com.google.chat.desktop` |
