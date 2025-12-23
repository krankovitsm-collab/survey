# Quadruple Helix Kérdőív

Egyszerű kérdőív alkalmazás Google Drive mentéssel.

## Indítás

```bash
python -m http.server 8000
```


## Adatstruktúra

Minden mentett kérdőív tartalmazza:
- **metadata**: Kérdőív időzítése, kategória, böngésző információk
- **responses**: Összes felhasználói válasz kérdés ID szerint indexelve  
- **sections**: Információ a kitöltött kérdőív szekciókról



Az alkalmazás módosításához:
1. **Frontend**: Szerkeszd a `survey-app.js`, `index.html`, vagy `survey-data.js` fájlokat
2. **Backend**: Frissítsd a Google Apps Script-et és telepítsd újra
3. **Kérdések**: Módosítsd a `survey-data.js`-t kérdések hozzáadásához/eltávolításához/szerkesztéséhez


## Biztonsági Megjegyzések

- A kérdőív adatok a beállított Google Drive mappában tárolódnak
- Nincs szükség felhasználói hitelesítésre
- A Google Apps Script az adminisztrátor Google fiókjával fut
- Minden adattranszfer HTTPS-en keresztül történik
- Vedd figyelembe az adatvédelmi szabályozásokat (GDPR, stb.) a használati eseted számára


### Google Drive Jogosultságok Alapú Korlátozás

A legegyszerűbb módja a feltöltés korlátozásának a **Google Drive mappa jogosultságainak módosítása**:

**Feltöltés engedélyezése:**
1. Menj a Google Drive mappához
2. Jobb klikk → "Megosztás"
3. Az Apps Script service account-nak adj **"Szerkesztő"** jogosultságot

**Feltöltés letiltása:**
1. Menj a Google Drive mappához  
2. Jobb klikk → "Megosztás"
3. Az Apps Script service account jogosultságát változtasd **"Megtekintő"**-re, vagy távolítsd el teljesen

A rendszer automatikusan érzékeli a jogosultság változást és megfelelő hibaüzenetet ad:
- ✅ **Szerkesztő jog**: Feltöltés engedélyezve
- ❌ **Olvasó jog**: "Data collection is currently unavailable due to access restrictions"
- ❌ **Nincs jog**: Hozzáférés megtagadva

Ez a módszer **nem igényel kódmódosítást** és **azonnal hatályos**!

## Gyakran Ismételt Kérdések (GYIK)


### Hogyan változtathatom meg a Google Drive mappa célját?
1. Nyisd meg a `google-apps-script.js` fájlt
2. Változtasd meg a `DRIVE_FOLDER_ID` értéket az új mappa ID-jára
3. Telepítsd újra a Google Apps Script-et

### Mi történik, ha a Google Apps Script nem elérhető?
Az alkalmazás automatikusan fallback módba vált és letölti a kérdőív adatokat JSON fájlként a felhasználó számítógépére.

### Hogyan tilthatom le ideiglenesen a feltöltést Google Drive jogosultságokkal?
**Legegyszerűbb módszer:**
1. Menj a Google Drive mappához (https://drive.google.com/drive/folders/1VYB4Xs6wDT2Xf5HIq_pFBhuOjpy5ExUp)
2. Jobb klikk → "Megosztás" 
3. Az Apps Script service account jogosultságát változtasd "Megtekintő"-re
4. **Azonnal letiltja a feltöltést** - nincs szükség kódmódosításra!

Újra engedélyezéshez egyszerűen állítsd vissza "Szerkesztő" jogosultságra.

## Támogatás

Ha problémákba ütközöl, ellenőrizd:
1. A Google Apps Script megfelelően van-e telepítve
2. Az URL helyesen van-e beállítva a `survey-app.js`-ben  
3. A böngésző konzolt JavaScript hibákért
4. A Google Drive mappa engedélyeit
