# moises_web_automation
QA Code Challenge

# moises_web_automation
QA Code Challenge

Overview of the Project

    In order to learn a new language and follow the company strategies, I used cypress to automate the Moises Website. Tried to use the knowledge from other frameworks and applied here. It was nice to learn even more about JavaScript since I have used Python for a long time.


Just a little explanation…

    Explaining the project, it will start creating a random user email to run all specs using the same test user.
    A file will be saved under “support” folder with the information. It's the first test in spec "moises_login_page".
    The following tests are part of the login page and it will check some login areas.

    The trick here, thinking about tests isolation, is that:
    First test will create a random unique user. The following tests will take advantage of that and reuse that information.
    When the first spec finishes, it will logout the current user and the next spec will have to login again, but using the email already created.

    Understanding this, it’s possible to create other specs and reutilize that first one.

    For versioning, I’m using SourceTree… already have some experience using it.

    And for CI/CD used TeamCity to accomplish the work. It’s very simple to install and use it


Going deeply…

    In the current project, it was created two specs:
    One for Login purposes and the other one to Track Separation. Each one has its own page object, under “support/pages” folder - login and sonsPlaylist.

    The file "TESTE FAQ.mp3" was added to the "cypress/fixtures/media/" folder in order to be used and uploaded.
    A file named "songFilesParam.js" was created to store any path and name of song files if needed (cypress\support\pages\songsPlaylist).


Problems faced…

    - Lots of new ways to do the same thing and the decision to pick up the best one. Yes. Did some refactoring to make things prettier;

    - Intercept Network Requisitions was a trick hard. The image on the Code Challenge made me think it was used other tool than cypress, and I tried to check responses in Postman, Charles Proxy or even in Graphql. All of them with no success, since I didn’t have the Token to authorize. After some searches, found out how to implement it, BUT, another problem happened. The Track Separation page doesn’t seem to work properly with Cypress running. When doing a manual test, opening the browser manually, things worked like a charm.

    - It was possible to automate, but can’t check the input value, since it always returns empty. Then, for this one, the test is checking the File Name, instead.

    - Things I didn’t have time to check/explore. - When accessing Upload File Page, there are a lot of warnings showing in the console (skipped extensions)

    - A flaky test. Needed to remove it. It will need some explanation about the rules to the modal appear when clicking in Moises Public Collection.


Hands On…

    Installing and Starting Cypress…
    First thing to start is installing some tools to help us to test.

    Download and Install Node.js and NPM:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

    Just to confirm, follow the commands to check versions:
node -v
npm -v

    With that in hand, we can call the command to install cypress:

npm install cypress --save-dev

    The first cypress run will ask for  creating a new spec. Since we already have it, the command will be:

    From CMD, access the moises_wen_automation project and run:
npx cypress open

    If you desire to run in headless mode, run the command:
npx cypress run --browser <browser_name>

    Its no need to worry about variables because the structure takes charge to store and use them.


CI/CD config

    In order to run CI/CD on TeamCity, it needs first to install via:

https://www.jetbrains.com/pt-br/teamcity/download/

    Then execute the file to install and config the server.
	It will be hosted on http://localhost:8111 and it will be necessary to install the agent later, clicking on the tab Agents and following the steps to install.

    After all is installed, its necessary to configure the account and all access inside the application.
    The VCS used was my account of github and its needed to create a build configuration in order to run the tests.

Go to Administration > Projects > Create Project > Select your repository (it will be necessary to create a Client ID and a Secret Code - All guided by TeamCity)
    Since we don’t have a configuration file to run tests at the moment, we’ll create a Build Configuration to do it.

    Inside your project, click on Build Steps > select “Add Step Build” > Command Line:
    Inside of it add the line:
npx cypress run --browser <browser_name> --reporter cypress-teamcity-reporter

    It was installed a plugin to call cypress and get the logs from the server, using the command:
npm install cypress-teamcity-reporter --save-dev

    After setting up, just need to Run the Build in the Main Page of the Project.