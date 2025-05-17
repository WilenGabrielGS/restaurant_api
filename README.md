# restaurant_api

<h2>Welcome to the Restaurant API</h2>
- This project is designed to be an example of a restaurant manager with some functionalities such as making customers registration, adding dishes to the menu, making orders, and more.

<h2>HOW TO INSTALL AND RUN THE PROJECT</h2>
<h3>Step One: Download Node and PostgresSQL</h3>  
- click here to install <a href="https://nodejs.org/en/download">Node.js</a> <br>
- click here to install <a href="https://www.postgresql.org/download/">PostgresSQL</a>

<h3>Step Two: install node dependencies</h3>
After having the node.js installed in your machine, open the project folder on bash, cmd, powershell or other prompt you have and run the commands to install the dependencies bellow: <br>
- <b>Express:</b> <i>npm install express</i> <br>
- <b>Sequelize:</b> <i>npm install --save sequelize</i> <br>
- <b>Sequelize postgres library:</b> <i>npm install --save pg pg-hstore</i> <br>
- <b>Sequelize-cli:</b> <i>npm install --save-dev sequelize-cli</i> <br>
- <b>Jest:</b> <i>npm install --save-dev jest</i> <br> 
- <b>Supertest:</b> <i>npm install --save-dev supertest</i> <br>
- <b>other general libraries:</b> <i>npm install</i> <br>

<b>DISCLAIMER</b>: if you have any issue installing some library runing "npm install", install the determinated library manually

<h3>Step three: Configure the database</h3>
Once you have the postgreSQL installed, you can use any database manager such as PgAdmin4 and DBeaver to configure the connection. With you manager connected, you can create your own database to store the data (I created one with the name "restaurant").
Then, go to the file <a href="https://github.com/WilenGabrielGS/restaurant_api/blob/main/config/config.json">config/config.json</a> and change the infos as needed for your database. With all of this setted up, open the project folder on the bash again and run <i><b>npx sequelize-cli db:migrate</b></i>, this command should make the migration of all the tables to your database.

<h3>Step Four: Try to run the project</h3>
Now that you have everything configured, run the command <i><b>node src/server.js</b></i> to start the node server, it should give you a message on console "server online".

<h2>HOW TO RUN UNIT TESTS</h2>
To run the unit tests present in <a href="https://github.com/WilenGabrielGS/restaurant_api/blob/main/tests/app.test.js">test/app.test.js</a>, make sure you have installed Jest and Supertest using the commands described above. With them installed, open the project's root folder on terminal and type the command <i><b>npm test</b></i>, it should start the tests and show the process on the screen.


  
   
