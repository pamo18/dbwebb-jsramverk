## jsramverk, PamoCoin API

## Badges

[![Build Status](https://travis-ci.org/pamo18/pamocoin-api.pamo18.me.svg?branch=master)](https://travis-ci.org/pamo18/pamocoin-api.pamo18.me)



[![Build Status](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/badges/build.png?b=master)](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/pamo18/pamocoin-api.pamo18.me/?branch=master)

## Backend

Denna server är Backend till Trading Plattformen Pamocoin Pro deployed at [https://pamocoin-api.pamo18.me/](https:pamocoin-api.pamo18.me/).

Servern är byggt med JavaScript ramverket Express och fungerar som ett API för trading av digitala valutor samt autentisering mot plattformen.  Express är ett populärt JavaScript ramverk byggt på Node.js och är flexibelt, kraftfullt och snabb vilka är egenskaper som är perfekta för ändamålet.

Servern jobbar mot en sqlite3 databas som används för att lagra användarens personliga detaljer, orderhistorik samt andra viktiga saker.  Sqlite3 är en databas där man slipper ha en databasserver igång och allting sparas istället till en lokal fil, smidigt och enkelt.  Det finns olika routes som är kopplade till specifika databashändelser, som att t.ex. hämta användarens plånbok eller orderhistorik.  Med varje route returneras det ett JSON data objekt som svar vilket innehåller de relevanta data för vidarehantering.

Express servern använder sig av olika middleware som anropas innan själva routens hanterare anropas.  En av dem är Cross-Origin Resource Sharing, CORS, som är en middleware för att kunna kontrollera åtkomst till servern genom att blockera eller tillåta specifika domäner.  Sedan finns det Morgan, en middleware som används för att visa detaljerade loggningar samt en egen felhanterare för felutskrift där felmeddelanden skickas i ett objekt med statusnivån, titel och en utskrift av själva felmeddelandet för enklare och snabbare felsökning.

När det gäller autentiseringen så används JSON Web Tokens som är ett säkert och effektivt sätt att kontrollera giltiga användare.  En token har en fast giltighetstid på 48 timmar och därefter måste användaren logga in igen för att komma åt deras plånbok, profilinformation, orderhistorik samt för att kunna handla.  Denna autentiseringens metod ligger som en middleware på de relevanta routes och beroende på resultatet kallas routens huvudfunktion eller ett felmeddelande.

## Testning

Genom att köra npm test startas en CI-kedja för att automatisera en testningsprocess.

Enhetstestning och integrationstestning är första steget i CI-kedjan för servern och av de tillgängliga testverktygen som finns används Mocha (mochajs.org), som testar varje kodenhet, ihop med Istanbul (istanbul.js.org), som används för att visa en presentation av kodtäckning för testfallen.  Med integrationstestning testas alla tillgängliga routes för att kontrollera resultatet och säkerställa att saker fungerar som tänkt.  Här används verktygen Chai (chaijs.com) och Chai http (chaijs.com/plugins/chai-http) ihop med Mocha och Istanbul för att testa alla tillgängliga routes.  Varje route är kopplad till en kedja av integrerat funktionalitet på servern och måste testas för att garantera det förväntade resultatet klienten kräver för att leverera lovad funktionalitet.  När alla tester är genomförda visas procent kodtäckning, där över 70% är önskvärd och min kod klarade över 95%.

Nästa steg i CI-kedjan är kodvalidering med hjälp av eslint som kontrollerar kodstil och när allting är korrekt vissas inga varningar.

Byggvertyget Travis är kopplade till serverns GitHub repo och används för att checka ut koden genom att starta igång alla tester varje gång det finns en uppdatering.  GitHub README filen till servern är kopplade till Travis och där visas resultaten genom en badge.

Verktygen Scrutinizer används för att exekvera testerna och visa kodtäckningen samt kodkvalitet.  Här visas också resultaten i GitHub på README filen med olika badges.

Att skapa en CI-kedja är ett smidigt sätt att automatisera en testprocess för att kontrollera kod stabilitet och kvalitet, där man kan utföra en rad olika tester genom att enkelt publicera den till GitHub och invänta resultatet från Travis och Scrutinizer.  Men man kan aldrig bygga en CI-kedja som motsvara verkligheten där en användare kan alltid göra något oväntat.

Jag är nöjd med min kodtäckning där det enda jag inte har testat är databas fel, som är svårare att testa.  Men jag känner mig trygg i att min kod gör som förväntat och är tillräckligt stabilt för min Trading Plattform.
