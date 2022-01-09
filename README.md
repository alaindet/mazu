# Mazu

## Usage for development (first run)

- Copy example environment files for Docker and fill the missing values
  ```
  cp ./environment/mariadb.env.example ./environment/mariadb.env
  cp ./environment/php.env.example ./environment/php.env
  ```
- Fill and/or edit environment files
- Start Docker compose services and install dependencies
  ```
  docker-compose up -d php mariadb adminer
  docker-compose run --rm composer install
  ```
- Open Adminer on port http://localhost:8081
- Import `./database/schema.sql`
- Import `./database/mock.sql` for some mock data
- Run the frontend
  ```
  cd frontend
  npm install
  npm run start
  ```
- Open your browser on http://localhost:3000 and use these fake credentials if you imported mock data
  - John Doe
    - Username: john.doe@example.com
    - Password: john.doe@example.com

## Scripts

To run any script, you first have to run `npm install` in the root folder

- Create random API Key locally
```
node ./scripts/make:api-key
```
or
```
npm install
npm run make:api-key
```
