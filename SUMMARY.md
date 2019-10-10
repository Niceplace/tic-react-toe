# Summary of coding / planning sessions

Thursday work session - 2019-10-03 (~1h)
- Setup tooling for dev helpers (prettier, linting, testing) / npm scripts
- Create TODO list with initial vision of how I'm going to meet the requirements for this project

Saturday work session - 2019-10-05 (~4h)
- Implemented basic algorithm for formatting / parsing to money format
- Implement everything in a single file first, get the naming of the functions right and then split into modules
- Add unit/acceptance tests for arleady written code

Sunday work session - 2019-10-06 (~5h)
- Spend 3 hours debugging "Unkown" code coverage with nyc + typescript + yarn
    - Turns out I had duplicate `nyc` configuration in both `package.json` and `.nycrc`
    - Also turns out `nyc`'s documentation wasn't quite right
    - Also turns out running `nyc` with `yarn` (1.17) results to "Unkown %/%" coverage
    - Learnt a lot during the process, more specifically on configuring nyc and typescript and how they interact
- Complete unit tests

Monday work session - 2019-10-07 (~4h) 
- Some last tweaks to verify that `nyc` coverage works properly and outputs proper report
- Slim down tsconfig.json
- Setup Express, modularize code a bit better to make the server testable in live mode
- Create Dockerfile for application deployment
- Live acceptance tests for express app

Tuesday work session  - 2019-10-08 (~2h)
- Complete this guide
- Add front-end portion + acceptance tests
- Tried to add naughty string, makes TS compiler crash, left parfs of the code to prove I tried to implement it

# Discussion on the process

I understand that my solution is highly over engineered for what was asked but I wanted to demonstrate that I could approach testing on multiple angles and that I had a good concern for code quality in general (not only for tests).
I believe it is a significant part of a QA engineer's job and it has an overall impact on the quality of the project and it's ability to adapt to changes.

Overall, a simple demand, not to be underestimated but very fun to implement, lots of things come to mind after the happy path are implemented. 10/10 Best interview challenge I had to do so far.

- I decided to start with the central function of my algorithm to get something working quick
- When I had a few happy paths working, I got to doing unit tests
- I fixed some bugs and when all my unit tests were passing, I split it into functions that each had a specific responsibility
- I then split what I could into modules and tried to arrange it in a way that would make adding new features easy (different format 
? Different input types ? Multi-currency support ? )
- More edge cases kept popping up during development & testing (what about negative number ? Formatting integers ? What about 0 ?)
- Acceptance test came next to validate E2E flows
- Once I new I had a solid base, it was time to add Express on top of things, more integration tests added after express integration was complete
- Added all acceptance tests cases using express to ensure the integration was solid with error messages
- I tried adding the naughty strings but it broke TS typechecking, would need to investigate further to make it work. Editor really doesn't love the JSON file either
- A simple HTML view, using tacyhons CSs framework & jquery was then added to make the UI portion
- Once the UI was working as intended, I added two cypress UI tests, one that validates a happy path and one that validates a sad path

# Next steps

- Multi-currency support + display currency symbol
- Auto-conversion in multi-currency with valid input
- Immediate formatting on type (onblur)
- Performance testing & benchmarking (How many conversions / second, depending on string length)
- Mutation testing
- Setup automated updates / scanning / quality tools for repo:
    - Renovate for automatic updates
    - For security vulnerabilities
    - SonarQube for code coverage analysis / quality
- Integrating with a CI, using the pre-packaged docker image / npm scripts to validate the code & package the app