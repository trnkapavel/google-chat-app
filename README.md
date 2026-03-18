# 💬 Google Chat – Desktop App for macOS

> Unofficial native macOS desktop app for Google Chat, built with [Electron](https://www.electronjs.org/).
> Get proper macOS integration that the browser tab simply can't offer.

---

## ✨ Features

- 🔴 **Dock badge** – unread message count shown right on the app icon
- 🔔 **Native notifications** – system notifications via macOS Notification Center
- 🪟 **Single instance** – launching the app twice just brings the window to front
- 🔗 **Smart link handling** – external links open in your browser, not inside the app
- 🌙 **Dark Mode support**

---

## 📦 Installation

1. Download `Google Chat Installer.dmg` from [Releases](../../releases)
2. Open the DMG and double-click **Instalovat Google Chat.command**
3. A Terminal window will guide you through the install – the app will land in `/Applications` and launch automatically

> **💡 First launch tip:** macOS will ask for notification permission – make sure to allow it, otherwise badges and notifications won't work.

---

## 🔐 Why does the installer remove quarantine?

When you download any file from the internet, macOS automatically tags it with a **quarantine attribute** (`com.apple.quarantine`). This is a security feature called **Gatekeeper** that prevents unknown software from running without your explicit consent.

Apps distributed outside the Mac App Store must be either:
- ✅ **Signed with an Apple Developer certificate** (~$99/year membership), or
- ✅ **Stripped of the quarantine attribute** manually

The installer runs this single command:

```bash
xattr -cr "/Applications/Google Chat.app"
```

That's all it does – removes the quarantine flag. This is standard practice for internal tools and open-source apps distributed without an Apple certificate.

**🔍 Want to verify it yourself?**

```bash
# Before install – you'll see com.apple.quarantine listed
xattr -l "/Applications/Google Chat.app"

# After install – the attribute is gone
xattr -l "/Applications/Google Chat.app"
```

The full source code of both the app and the installer is available in this repository for your review.

---

## 🛠 Build from source

**Requirements:** Node.js 18+

```bash
git clone https://github.com/trnkapavel/google-chat-app.git
cd google-chat-app
npm install

# Run in development
npm start

# Build DMG (arm64 + x64)
npm run build

# Package into installer DMG
./build_dmg.sh
```

Output: `dist/Google Chat Installer.dmg`

---

## 🔧 Technical details

| | |
|---|---|
| Electron | 33.x |
| Platform | macOS (Apple Silicon + Intel) |
| Code signing | ad-hoc (`--sign -`) |
| Bundle ID | `com.google.chat.desktop` |

---
---

# 💬 Google Chat – desktopová aplikace pro macOS

> Neoficiální nativní desktopová aplikace Google Chat postavená na [Electron](https://www.electronjs.org/).
> Plnohodnotná integrace s macOS, kterou prohlížečová záložka prostě nenabídne.

---

## ✨ Funkce

- 🔴 **Dock badge** – počet nepřečtených zpráv přímo na ikoně aplikace
- 🔔 **Nativní notifikace** – systémová oznámení macOS (Centrum oznámení)
- 🪟 **Single instance** – druhý pokus o spuštění jen vyvolá okno do popředí
- 🔗 **Chytré otevírání odkazů** – externí odkazy se otevírají v prohlížeči, ne v aplikaci
- 🌙 **Podpora Dark Mode**

---

## 📦 Instalace

1. Stáhni `Google Chat Installer.dmg` ze sekce [Releases](../../releases)
2. Otevři DMG a dvojklikem spusť **Instalovat Google Chat.command**
3. V Terminálu, který se otevře, sleduj postup – aplikace se nainstaluje do `/Applications` a rovnou spustí

> **💡 Tip k prvnímu spuštění:** macOS se zeptá na povolení notifikací – potvrď je, jinak badge a oznámení nebudou fungovat.

---

## 🔐 Proč instalátor odstraňuje quarantine?

Při stažení jakéhokoli souboru z internetu macOS automaticky přiřadí tzv. **quarantine atribut** (`com.apple.quarantine`). Jde o bezpečnostní mechanismus zvaný **Gatekeeper**, který chrání uživatele před spuštěním neznámého softwaru.

Aplikace distribuované mimo Mac App Store musí být buď:
- ✅ **Podepsané Apple Developer certifikátem** (placené členství ~99 $/rok), nebo
- ✅ **Zbavené quarantine atributu** ručně

Instalátor proto spouští jediný příkaz:

```bash
xattr -cr "/Applications/Google Chat.app"
```

To je vše – odstraní quarantine příznak, nic víc. Jedná se o standardní postup pro interní firemní nástroje a open-source aplikace bez certifikátu.

**🔍 Chceš si to ověřit sám?**

```bash
# Před instalací – uvidíš atribut com.apple.quarantine
xattr -l "/Applications/Google Chat.app"

# Po instalaci – atribut zmizí
xattr -l "/Applications/Google Chat.app"
```

Celý zdrojový kód aplikace i instalátoru je dostupný v tomto repozitáři k prostudování.

---

## 🛠 Build ze zdrojových kódů

**Potřebuješ:** Node.js 18+

```bash
git clone https://github.com/trnkapavel/google-chat-app.git
cd google-chat-app
npm install

# Spustit vývojově
npm start

# Sestavit DMG (arm64 + x64)
npm run build

# Zabalit do instalačního DMG
./build_dmg.sh
```

Výstup: `dist/Google Chat Installer.dmg`

---

## 🔧 Technické detaily

| | |
|---|---|
| Electron | 33.x |
| Platforma | macOS (Apple Silicon + Intel) |
| Podpis | ad-hoc (`--sign -`) |
| Bundle ID | `com.google.chat.desktop` |
