# Express Server shop

### Getting Started

To run the project in the development mode you need to clone it to your local machine the `git clone`. After copied the project you need to intstall all packages

`npm install`

in a root directory, then you can change directory to *client* and

`npm install`

Before start the project you have to install _PostgresSQL_ to your local machine and create a data base. Then open the config file for development mode `./config/config.js` and set configurations of your data base.

{

    "username": "DBUserName",

    "password": "Password",

    "database": "dev_test_db",

    "host": "127.0.0.1",

    "dialect": "postgres",
},

After installed and seted all configurations for the data base run 

`npx sequelize-cli db:migrate`

then 

`npx sequelize-cli db:seed:all`.

Now you have two demo users with own books:

**first**:

`mail: artem@mail.ru`

`password: 1234asdf`.

**second**:

`mail: lisa@mail.ru`,

`password: 1234qwer`.

Start script for development mode

`npm run dev`,

the project will have opened at http://localhost:3000  

### Build With 

1. Front-End React JS with create-react-app
2. Back-End NodeJS (Express)
3. Data base PostgreSQL 


### Author

**Artem Reva (starting web developer)**
