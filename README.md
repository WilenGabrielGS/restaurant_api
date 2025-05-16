# restaurant_api

<h3>Welcome to the Restaurant API</h3>
- This project is designed to be an example of a restaurant manager with some functionalities such as makin customers registration, adding dishes to the menu, making orders, and more.

<h3>Steps to install and run the project:</h3>
<h2>Step One: Download Node and PostgresSQL</h2>  
- click here to install <a href="https://nodejs.org/en/download">Node.js</a>
- click here to install <a href="https://www.postgresql.org/download/">PostgresSQL</a>

<h2>Step Two: install node dependencies</h2>
After having the node.js installed in your machine, open the project folder on bash, cmd, powershell or other prompt you have and run the commands to install the dependencies bellow:
- Express: npm install express
- Sequelize: npm install --save sequelize
- Sequelize postgres library: npm install --save pg pg-hstore
- Sequelize-cli: npm install --save-dev sequelize-cli
- Jest: npm install --save-dev jest
- other general libraries: npm install

disclaimer: if you have any issue installing some library runing "npm install", install the determinated library manually

<h2>Step three: Configure the database</h2>
Once you have the postgreSQL installed, you can use any database manager such as PgAdmin4 and DBeaver to configure the connection. With you manager connected, you can create your own database to store the data (I created one with the name "restaurant").
Then, go to the file <a href="https://github.com/WilenGabrielGS/restaurant_api/blob/main/config/config.json">config/config.json</a> and change the infos as needed for your database. With all of this setted up, open the project folder on the bash again and run "npx sequelize-cli db:migrate", this command should make the migration of all the tables to your database.


  
   
