# Schritte

### Stage 1
- Record Model angelegt
- Ordnerstruktur `controller` + `router` angelegt
- `recordRouter` + `recordController` angelegt
- error Handling an zentrale error middleware 
- seed skript erstellt
    - array mit promises
    - promises aufgelöst mit `promise.all()`
- `getRecords` im `recordsController` anlegen
    - queries auslesen
    - suchanfrage entsprechend der möglichen queries bauen
    - suche auflösen mit `await`
    - `records` entsprechend zurückgeben
### Stage 2
- user model anlegen
    - Eigenschaft `tokens` als als Array für mehrere Rechner
    - eine mongoose middleware für das hashen des Passworts anlegen: `Schema.pre('save', (next) => {})` 

- userController Funktionen schreiben, diese im `userRouter` hinterlegen
    - `createUser` Funktion anlegen die einen neuen neuen User erstellt
    - `login` Funktion --> sucht den `user` mittels Email, vergleicht die Passwörter (hashing beachten), erstellt token und schickt zurück (`checkPassword()` `generateToken()` Funktionen im Modell hinterlegen)
- `auth` middleware schreiben
    - token aus header auslesen
    - user anhand von token suchen
    - user in `req.user` hinterlegegen
- logout() und Validierung hier im Beispiel nicht eingebaut 
### Stage 3
- cart model anlegen
    - Referenz zum user
    - `products` Array mit Objekten, diese enthalten amount und Referenz zum Produkt
- user Controller modifizieren, so dass beim Ertellen eines neuen Users ein Cart angelegt wird
- `cartController` Funktionen schreiben, diese im cartRouter einbinden

