# Usar cookies, ¿qué hay que tener en cuenta?

# ¿Qué hay que tener en cuenta?

## 1er paso (funcionalidad en ThunderClient)

### usersController
- `res.cookie('token', token, cookieOptions)`

### auth
- `req.cookies` auslesen + in `token` speichern

### server.js
- `cookie-parser` installieren


## 2º paso entorno de desarrollo del navegador
- Para el uso de cookies, debe:
    - En el backend: `server.js` añadir `cors()` --> `credentials: true`.
    - En el frontend: 
        - `Login.jsx` --> `credentials: 'include'`
        - `UserDetails` --> `credentials: 'include'`

- Pero las cookies pueden seguir siendo leídas con JS (ver [ataque XSS](https://owasp.org/www-community/attacks/xss/)):
    - `httpOnly: true`
- De qué sitio se pueden leer las cookies, atributo `sameSite` (ver [ataque CSRF](https://owasp.org/www-community/attacks/csrf)):
    - `lax` (default) --> --> sin terceras partes, pero desde diferentes sub-rutas
    - `strict` no hay otras rutas
    - `none` --> también terceros (requiere `secure true`)
- `secure: true` Las cookies sólo se envían por https (puede causar problemas en localhost)

--> Estas son sólo simples opciones de protección, no ofrecen una protección completa contra estos ataques, lea la documentación y no se confíe ni de sus usuarios ni de usted ;-) 

## 3er paso ajustar el frontend, escribir el logout



# Cookies benutzen, worauf achten?

# Worauf achten?

## 1. Schritt (Funktionalität im ThunderClient)

### usersController
- `res.cookie('token', token, cookieOptions)`

### auth
- `req.cookies` auslesen + in `token` speichern

### server.js
- `cookie-parser` installieren


## 2. Schritt Browser Entwicklungsumgebung
- dafür das Cookies benuutzt werden können, muss:
    - im Backend: `server.js` `cors()` --> `credentials: true` hinzufügen
    - im Frontend: 
        - `Login.jsx` --> `credentials: 'include'`
        - `UserDetails` --> `credentials: 'include'`

- allerdings Cookies können so noch mit JS ausgelesen werden (siehe [XSS-Angriff](https://owasp.org/www-community/attacks/xss/)):
    - `httpOnly: true`
- von welcher Site asugehend können Cookies ausgelesen werden, `sameSite` Attribut (siehe [CSRF-Angriff](https://owasp.org/www-community/attacks/csrf)):
    - `lax` (default) --> keine 3rd Parties, aber von abweichenden Unterrouten
    - `strict` keine andren Routen
    - `none` --> auch third Parties (benötigt `secure true`)
- `secure: true` Cookies werden nur per https verschickt (kann bei localhost Probleme machen)

--> das sind nur einfache Schutzmöglichkeiten, diese bieten keinen vollen Schutz vor diesen Angriffen, lest die Dokumentation und vertraut weder euren Nutzern noch euch ;-) 

## 3. Schritt Frontend anpassen, Logout schreiben