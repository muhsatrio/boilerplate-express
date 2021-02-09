## Inside this Boilerplate

1. Express

2. Sequelize

## How to run

1. Install all packages with `yarn`

2. Create `.env` file on the root file with format below

```
DB_HOST=<your db host, like localhost, 127.0.0.1, etc.>
DB_USERNAME=<your db username, like root, etc.>
DB_PASSWORD=<your db password>
DB_NAME=<your db name>
DB_TYPE=mysql
```

3. Migrate db with command below

`npx sequelize-cli db:migrate`

4. Run the project file command: `yarn start`
