DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS common;

CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(60) NOT NULL,
    birthday DATE NOT NULL,
    country VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS report (
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(title)
);

CREATE TABLE IF NOT EXISTS countries (
    country VARCHAR(60) NOT NULL,
    UNIQUE(country)
);

CREATE TABLE IF NOT EXISTS common (
    name VARCHAR(60) NOT NULL,
    item VARCHAR(60) NOT NULL,
    UNIQUE(name)
);

INSERT INTO users
VALUES
    ("admin", "1/10/2000", "Sweden", "admin@mail.com", "$2a$10$0ssz8u76FmSDXLZ/BVXcBOqG2F/Z0B8AejWEm5uhJVE6UIpZwID.2"),
    ("doe", "1/10/2000", "Sweden", "doe@mail.com", "$2a$10$feE4/FDT1yO6HQLvqFp00O6CTa6DWmyMdtGEZ0208MdMYq1GkAqPC");

INSERT INTO report
VALUES (
    "Kmom01",
    "Denna Me-sida är skapad av Paul Moreland och är en del av kursen jsramverk, Belinke Tekniska Högskola.<br/><br/>Denna sida är skapad med ramverket React.<br/><br/>[Min GitHub Repot](https://github.com/pamo18/jsramverk-v1)<br/><br/>[Kursens GitHub Repot](https://github.com/emilfolino/jsramverk)<br/><br/>  README contents<br/><br/>This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/><br/>**Install Node.js with npm**<br/><br/>Follow the instructions on the following page:<br/><br/>[Install Node.js with npm here!](https://nodejs.org/en/download/)<br/><br/>**`npm install`**<br/><br/>In the project directory type `npm install` from a terminal window.  This installs all module dependencies from the package.json file which are required for the project to run correctly and reside in the node_modules folder.<br/><br/>**Available Scripts**<br/><br/>In the project directory, you can run:<br/></br>**`npm start`**<br/><br/>Runs the app in the development mode.<br/><br/>Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br/><br/>The page will reload if you make edits.<br/><br/>You will also see any lint errors in the console.<br/><br/>**`npm test`**<br/><br/>Launches the test runner in the interactive watch mode.<br/><br/>See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.<br/><br/>**`npm run build`**<br/><br/>Builds the app for production to the `build` folder.<br/><br/>It correctly bundles React in production mode and optimizes the build for the best performance.<br/><br/>The build is minified and the filenames include the hashes.<br/><br/>Your app is ready to be deployed!<br/><br/>See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.<br/><br/>**`npm run eject`**<br/><br/>**Note: this is a one-way operation. Once you `eject`, you can’t go back!**<br/><br/>If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.<br/><br/>Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.<br/><br/>You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.<br/><br/>**Learn More**<br/><br/>You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).<br/><br/>To learn React, check out the [React documentation](https://reactjs.org/).<br/><br/>**Code Splitting**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting<br/><br/>**Analyzing the Bundle Size**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size<br/><br/>**Making a Progressive Web App**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app<br/><br/>**Advanced Configuration**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration<br/><br/>**Deployment**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/deployment<br/><br/>**`npm run build` fails to minify**<br/><br/>This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify"
);

INSERT INTO report
VALUES (
    "Kmom02",
    "[Min GitHub Repot](https://github.com/pamo18/jsramverk-v1)<br/><br/>Under detta kursmoment har jag skapat ett registreringsformulär till min me-sida.  Tidigare under programmet har jag jobbat med formulär en hel del och har lärt mig mycket om processen, men har inte funderat så länge över den UX som en användare kommer uppleva.  Jag har själv upplevt en del frustration med vissa formulär på nätet och nu har jag chansen att göra en egen, bättre version.  Mitt formulär samlar en del information, förmodligen för mycket med man måste testa olika saker först.  Egentligen skulle jag samla enbart nödvändig information, beroende på projektet, för att förbättra säkerheten, GDPR, samt för att förenkla registrationsprocessen.  Jag har gjort mitt formulär strikt, där man måste skriva detaljer enligt vissa regler.  Varje aktivt fält är blå markerat, där en grön ram betyder godkänd data.  Det finns en lösenordsmätare för att se hur stark lösenordet är, baserade på min egen skala, samt en knapp för att visa eller gömma lösenordet.  Varje gång någon registrerar sig så lagras motsvarande land till en favoritlista ’Common countries’, som syns överst i scroll listan, som har plats för max tre länder.  Jag använder localStorage för detta.  <br/><br/>Jag har också skapat min egen Datepicker, en kalender för att registrera sin födelsedag.  Jag har skapat allt själv med ren JavaScript, en HTML tabell och CSS.  Jag valde att använda en scrollbar för val av månader och år eftersom jag känner att man kan välja snabbare.  Däremot kanske jag ska ändra på detta framöver för att testa andra varianter.  React har massor med olika Datepicker moduler som kan installeras och med tanken på att detta är en jsramverk kurs så hade det varit rolig att jobba med dessa moduler istället.<br/><br/>Jag skannade över de sidor som kursen föreslog för att hitta inspiration, det finns många olika idé och strategier för alla sorts projekt.  Men min största inspiration var mina egna förväntningar och erfarenheter."
);

INSERT INTO report
VALUES (
    "Kmom03",
    "Det var väldigt mycket at göra i kmom03!!!  <br/><br/>I detta kusmoment har jag installerat Express JavaScript ramverket på en linux server som API för min React me-sida.<br/><br/>**[Express.js](https://expressjs.com)**"
);

INSERT INTO "report" VALUES ('Kmom04','<p>I detta kursmoment har jag skapat enhetstestor och integrationstester med Mocha och Chai ihop med Istanbul för Code coverage. Jag har skapat 6st funktiontester med Selenium ihop med Mocha.  Jag har också jobbat med Continuous Integration med hjälp av Travis och Scrutinizer där jag har checkat ut både min backend och frontend kod samt badgat mina Readme filer med resultaterna.</p><h2>Selenium Use-cases tests:</h2><h4>Go to page Redovisning, Kmom03</h4><p>From the first page the user clicks on the navigation link ''Redovisning'', then clicks on the Kmom03 link in the new navbar and can now view Kmom03.</p>
<pre><code>
test.it("Test go to kmom03", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Redovisning")).then(function(element) {
            element.click();
        });<br/>
        browser.findElement(By.linkText("Kmom03")).then(function(element) {
            element.click();
        });<br/>
        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Kmom03");
            });
        });<br/>
        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/reports/week/3"));
        });<br/>
        done();
});
</code></pre>
<h4>Go to page Register</h4><p>From the first page the user clicks on the Register link and can now view the Registration page.</p>
<pre><code>
test.it("Test go to register", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Register")).then(function(element) {
            element.click();
        });<br/>
        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Registration");
            });
        });<br/>
        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/register"));
        });<br/>
        done();
});
</code></pre>
<h4>Login and view Profile page</h4><p>From the first page the user clicks on ''Login'' and enters their name and password followed by clicking on the ''Login'' button.  Now the user can view their profile page.</P><pre><code>
test.it("Test login", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });<br/>
        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });<br/>
        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });<br/>
        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });<br/>
        browser.sleep(2000);<br/>
        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Profile page");
            });
        });<br/>
        // Check correct heading
        browser.findElement(By.css("h3")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Name: doe");
            });
        });<br/>
        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/profile"));
        });<br/>
        browser.findElement(By.name("logoff")).then(function(element) {
            element.click();
        });<br/>
        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Login");
            });
        });<br/>
        done();
});
</code></pre>');

INSERT INTO countries
VALUES
    ("Albania"),
    ("Andorra"),
    ("Armenia"),
    ("Austria"),
    ("Azerbaijan"),
    ("Belarus"),
    ("Belgium"),
    ("Bosnia and Herzegovina"),
    ("Bulgaria"),
    ("Croatia"),
    ("Cyprus"),
    ("Czechia"),
    ("Denmark"),
    ("Estonia"),
    ("Finland"),
    ("France"),
    ("Georgia"),
    ("Germany"),
    ("Greece"),
    ("Hungary"),
    ("Iceland"),
    ("Ireland"),
    ("Italy"),
    ("Kazakhstan"),
    ("Kosovo"),
    ("Latvia"),
    ("Liechtenstein"),
    ("Lithuania"),
    ("Luxembourg"),
    ("Malta"),
    ("Moldova"),
    ("Monaco"),
    ("Montenegro"),
    ("Netherlands"),
    ("North Macedonia"),
    ("Norway"),
    ("Poland"),
    ("Portugal"),
    ("Romania"),
    ("Russia"),
    ("San Marino"),
    ("Serbia"),
    ("Slovakia"),
    ("Slovenia"),
    ("Spain"),
    ("Sweden"),
    ("Switzerland"),
    ("Turkey"),
    ("Ukraine"),
    ("United Kingdom"),
    ("Vatican City");

INSERT INTO common
VALUES
    ("countries", "Sweden,Denmark,Norway");
