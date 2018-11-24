# General README

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[See the README here](/README-create-react-app.md)

### Running the React App

```sh
# dev mode with npm
cd client
npm install
npm start

# dev mode with yarn
cd client
yarn install
yarn start
```

### Starting Express Server

```sh
# Note: In development mode, this only serves the toilet cluster images for the
# Google Map. In production mode, this server will server up the static content.

# navigate to the server directory and run the app
cd server
node app.js
```

### Deploying the GraphQL Service

```sh
# install the graphql-cli
yarn global add graphql-cli

# navigate to the server directory
cd graphqlService

# deploy prisma service to a prisma hosted environment
prisma deploy

# start server
node src/index.js
```

### Spin up GraphQL Playground to Test/View Schema

```sh
# navigate to the server directory in a separate terminal
cd server

# run script
graphql playground
```

### Deploying new UI to GitHub pages

If you update the UI and want the gh-pages site to reflect those changes
(e.g. You're want to build a web app for your friend and demo it at his
wedding), navigate to the `client` directory and run the command
`yarn deploy:ghPages`.

Only the UI will be functional (unless you're running the server and
gqlService while viewing the gh-pages site locally).

After deploying the gh-pages site, you can see it at https://comfy-labs.github.io/poos-reviews.

## Contributing

### Prettier

Prettier auto-formats your code so you don't have to worry about it.

**[Install Prettier in your editor.](https://prettier.io/docs/en/editors.html)**

Then make sure you enable "Format on Save"

### Git Workflow

Create React App is divided into two packages:

- Make commits
  - To move a GitHub Issue to the Done column, add `(Closes #<issue number>)` to
  the end of your last relevant commit message.
- Rebase
  - When you're ready to add your commits to the main repo, we need to pull the
  latest changes from master.
  - From the `client` directory, run the command `git pull --rebase origin master`.
- Push
  - Due to limited time and resources, we do not have a pull request workflow
  and we will push commits directly to master.
  - From the `client` directory, run the command `git push origin master`.
  - The pre-push git hook will run the unit tests, and prevent your push if
  there are failing tests.
