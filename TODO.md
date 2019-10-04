1. Create package.json with basic scripts (done, scripts tested locally)
1. Configure gitignore (done)
1. Add dependencies (done)
1. Configure lint (done)
1. Configure prettier (done)
1. Create dummy test projects (done)
1. Configure husky hooks (done)
1. Start development

More details:

# Structure / Build

- Node 10
- Scripts for
  - Lint
  - Unit test (+ watch, cover)
  - Acceptance tests (+watch)
  - ts-check
  - start app in dev (hot reload)
  - start app
- Husky pre-commit / pre-push scripts
- Docker image

Bonus:
* Enable Travis
* Enable Renovate
* Enable snyk

# Features

- Multiple of 1000 have to be grouped in series of three digits
- Round to two decimals
- Separator is '.'

- Start off with basic logic for formatting
- Write unit tests for the methods needed to transform from number to string

- Spin up a simple web server
- GET request with URL param or POST with JSON payload ? - URL param will not be a string, does it matter ? -

Bonus: 
- Use parcel for simple FE app
- Cypress tests ?

# Testing

- mocha, chai, chai-as-promised
- Unit tests for sure
- Not sure what acceptance tests we could have
    - Send a request to the server, expect a result

Bonus:
* Mutation testing ?

# Documentation

- Short description
- How to package with docker & run
- How to run in dev mode

