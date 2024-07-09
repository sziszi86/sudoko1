# Sudoku Megoldó Alkalmazás

## Bevezetés

Ez az alkalmazás egy webalapú Sudoku megoldó, amely lehetővé teszi a felhasználók számára, hogy beírjanak egy Sudoku feladványt, majd az alkalmazás megoldja azt, vagy hibajelzést ad, ha a feladvány megoldhatatlan. Az alkalmazás a React keretrendszerrel készült.

## Fő Funkciók

1. **Feladvány Megadása és Megoldása**:
    - A felhasználók beírhatják a Sudoku feladványukat egy 4x4-es (könnyű) vagy 9x9-es (nehéz) rácsba.
    - A „Megoldás” gomb megnyomásával az alkalmazás megpróbálja megoldani a feladványt.
    - Ha a feladvány megoldható, az alkalmazás megjeleníti a megoldott rácsot.
    - Ha a feladvány megoldhatatlan, hibaüzenet jelenik meg egy modal ablakban.

2. **Email Feliratkozás**:
    - A felhasználók feliratkozhatnak egy email listára, hogy Sudoku feladványokat kapjanak különböző nehézségi szinteken.
    - A feliratkozás egy fake API híváson keresztül történik, és egy modal ablakban visszajelzést kapnak a felhasználók a sikeres feliratkozásról.

3. **Felhasználói Adatok Mentése**:
    - Az alkalmazás megjegyzi a felhasználók által beírt feladványokat és a kiválasztott nehézségi szintet, így azok újratöltéskor visszatöltődnek.

4. **Interaktív és Felhasználóbarát Felület**:
    - A felhasználói mezők kézírásos betűtípust kapnak, míg a generált mezők standard betűtípust használnak.
    - A hibásan megadott mezők pirossal keretezve jelennek meg.

## Telepítés és Futatás

1. **Telepítés**:
    - Győződj meg róla, hogy a Node.js és a npm telepítve van a rendszereden.
    - Klónozd le a projektet:
      ```bash
        https://github.com/sziszi86/sudoko1.git
      ```
    - Navigálj a projekt könyvtárába:
      ```bash
      cd sudoku-solver
      ```
    - Telepítsd a szükséges csomagokat:
      ```bash
      npm install
      ```

2. **Fejlesztői Szerver Indítása**:
    - Indítsd el a fejlesztői szervert:
      ```bash
      npm start
      ```
    - Nyisd meg a böngészőt és látogass el a [http://localhost:3000](http://localhost:3000) címre.

## Felépítés

- **React**: A felhasználói felület megvalósítására.
- **CSS**: Az alkalmazás stílusainak megadására.
- **Local Storage**: A felhasználói adatok tárolására és visszatöltésére.

## Források

- **React Dokumentáció**: [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Google Fonts**: [Google Fonts](https://fonts.google.com/)
- **Sudoku Algoritmus**: ChatGpt4 es Claude AI: A Sudoku megoldó algoritmus egy egyszerű backtracking algoritmuson alapul, amely végigpróbálja a lehetséges megoldásokat, amíg megtalálja a helyeset.

## Fejlesztési Lépések

1. **Alapvető Strukturálás**:
    - React komponensek létrehozása: `SudokuSolverPage`, `SubscriptionForm`, `SudokuGrid`, `Modal`.
    - Alapvető stílusok és layout megadása.

2. **Sudoku Megoldó Algoritmus**:
    - A Sudoku megoldó algoritmus implementálása a `sudokuSolver.js` fájlban.
    - Az algoritmus tesztelése különböző feladványokkal.

3. **Interaktív Funkciók**:
    - Email feliratkozás megvalósítása fake API hívással.
    - Felhasználói adatok mentése és visszatöltése a local storage segítségével.

4. **Hibakezelés és Visszajelzés**:
    - Hibás mezők kijelzése piros kerettel.
    - Modal ablakok implementálása a visszajelzésekhez (sikeres feliratkozás, megoldhatatlan feladvány).
    - A user más betűtipussal viszi be az értékeket.

## Használat

1. Nyisd meg az alkalmazást a böngésződben.
2. Válassz egy nehézségi szintet és add meg a Sudoku feladványt.
3. Kattints a „Megoldás” gombra a feladvány megoldásához.
4. Ha feliratkozásra van szükséged, add meg az email címed és válaszd ki a nehézségi szintet, majd kattints a „Feliratkozás” gombra.

## Megjegyzések

Ez az alkalmazás főleg a ChatGPT-4 motorjának segítségével készült. A Sudoku algoritmus logikáját különösen ennek a motornak a segítségével fejlesztettem, mivel korábban nem voltam jártas a Sudoku megoldásában. A projekt során sokat tanultam a Sudoku szabályairól és megoldási technikáiról.
Időhiényában most nem használtam Css keretrendszereket, így sima változók nélküli egyszerű css kódokkal dolgoztam, mert nem volt elsődleges szempont.
 Jó szórakozást!
