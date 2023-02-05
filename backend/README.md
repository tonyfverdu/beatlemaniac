# Special Task: Record Store

Hier eine optionale Aufgabe für besonders Fleißige. Die Aufgabe ist etwas abstrakter. D.h die Aufgaben sind weniger "geführt" sondern es wird erwartet das du selber Lösungen dafür findest.

Ziel ist es eine Shop-API zu entwickeln wo man Records (Lieder) kaufen kann. 

## Stage 1: Records erstellen

Erstelle ein Model `Record` mit folgendem Shape

```javascript
const record = {
    title: "Back in Black",
    band: "AC/DC",
    price: 10,
}
```

Erstelle ein Seed-Script welches die Datenbank initial befüllt. (Lege mindestens 10 Records an)

Schreibe eine Route `GET /records` welche eine Liste an Records ausgibt.

> Optional: Ermögliche filtering über Query-Params. es soll nach einer price range und nach bands gefiltert werden können. 

## State 2: User-Verwaltung

Baue nach eigenem Ermessen eine User-Verwaltung. Folgende API-Endpunkte sollen erstellt werden

- `POST /user/register`: erstellt einen neuen User
- `POST /user/login`: loggt einen User ein (über einen Token)
- `POST /user/logout`: loggt einen User aus

Sorge dafür das alle POST-Request validiert werden, sodass der User keinen Non-Sense posten kann

## State 3: Orders

Es sollen folgende Endpunkte entwickelt werden:

```
url: POST /user/cart/add-record
beschreibung: fügt ein record zu deinem cart hinzu in angegebener menge.
body: {
    "recordId": "RECORD-ID",
    "amount": 1
}

url: POST /user/cart/set-record-amount
beschreibung: updated den amount eines records im cart.
body: {
    "recordId": "RECORD-ID",
    "amount": 1
}

url: POST /user/cart/remove-record
beschreibung: entfernt den record aus dem cart
body: {
    "recordId": "RECORD-ID",
}

```

Überlege eigenständig wie du das implementieren würdest. du könntest z.b ein eigenes Model "Cart" entwickeln oder aber das User-Model erweitern um einen Property "cart". Oder du kommst mit einer ganz eigenen Lösung. Hier hast du alle Freiheiten. Es muss nur am Schluss funktionieren

Tip: Baue ruhig eigene Endpunkte mit dazu-welche dir helfen besser auf die Daten zuzugreifen. z.b könntest du einen eigenen GET Endpunkt entwickeln welcher den Cart ausgibt (inklusive des Gesamt-Preises)

