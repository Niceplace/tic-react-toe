# Pleo-heracles-challenge

Code challenge for test engineering: https://github.com/pleo-io/heracles

# Run

Simple express application exposing a GET route to properly format an integer / floating point number in a financial format

Available routes:

- GET /format/money/:input

## Dependencies

- Node 10
- Yarn
- Install dependencies: `yarn install`

Run
> `yarn start`

Application listens on port 3000 (HTTP)

# Dev

Develop (reloads on save) 
> `yarn dev`


## Tests

Unit
> `yarn test:unit`

Unit, watch mode
> `yarn test:unit:watch`

Acceptance
> `yarn test:acceptance`

Acceptance, watch mode

> `yarn test:acceptance:watch`

### Coverage

Coverage is scoped to unit tests only and is provided by nyc, config [in .nycrc](./nycrc)

TGenerate coverage report for unit tests
> yarn test:unit:cover

After the command has run successfully, the coverage report will be displayed in the console.
There also is an HTML report in `coverage/lcov-report/index.html`

## Git hooks

Pre-commit and pre-push git hooks are made available by [husky](https://github.com/typicode/husky)

Pre-commit hooks: 
- Lints staged files
- Runs prettier & eslint --fix on every file
- Ensure every file is added to git
- Runs unit tests

Pre-push hooks:
- Runs acceptance tests
- Checks typescript for errors

Detailed configuration specified in the `husky` section of of [package.json](./package.json)

