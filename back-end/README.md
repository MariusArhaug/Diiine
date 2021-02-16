# back-end

> 

# Koble til Database:
* Bruk NTNU vpn
* Lim inn denne strengen i terminalen: `mysql -A -h mysql.stud.ntnu.no -u fs_tdt4140_1_gruppe40 -p fs_tdt4140_1_gruppe40_mddb`
* Bruk passord `vielskerPUlol40`
* Da er man koblet til serveren.
* Bruk kommando `show databases;`
* Resultatet er antagelig to databaser. Vi ønsker å bruke vår, I guess xD
* `use fs_tdt4140_1_gruppe40_mddb;`

Nå er databasen klar for å teste.
Eksempel bruk `select * from users` for å få en liste over alle brukere.

# Starte feathers:
Om man bruker branchen `8-users` skal feathers kunne kjøre, om man er koblet på vpn. Kjør derfor bare `npm start dev`for å starte serveren. Nå kjører den på `localahost:3030`

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/back-end
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
