# CISIApro UI
Graphical User Interface for the Risk Predictor of the RESISTO project

## Preparation
You need to install node and git locally. The project is based on ES2015+, vue, vuex, vue-router, vue-cli , axios and element-ui. Understanding and learning this knowledge in advance will greatly help the use of this project.

## Getting started
```bash
# clone the project
git clone https://github.com/di4na10/smart_extension_ui.git

# enter the project directory that contains two other folders
cd smart_extension_ui


## Define access to MySQL

Open the file se-api/app/config/db.config and substitute username, password and db with the one of your MySQL connection

# install dependency
cd se-api
npm install

# run the connection to the db in a cmd
node server

## Start and run the user interface

## develop the ui in another cmd

# install dependency
cd se-ui
npm install

# run the ui in a cmd
npm run dev
```

This will automatically open http://localhost:8080


## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```


