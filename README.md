# countries

## Download
git clone https://github.com/lemenendez/countries

## Prerequisites
npm
sudo apt-get install npm
nodejs
sudo apt-get install nodejs

## Install
1. Create DB
Create two (2) databases in mysql for example: geo_dev and get_test, the database is used when connection from the browser and the
other one is used for the unit testing in node
2. set parameters to db connection in the file config.json

 for example:

    "host" : "localhost",
    "user" : "dev",
    "password": "developer1",    
    "database": "geo_dev",
    "database_test": "geo_test"

connect to my sql and run the script create-geo.sql and create-geo_test.sql under the Script folders
for example
source /home/myuser/countries/Script/create-geo.sql
source /home/myuser/countries/Script/create-geo_test.sql
 
## Unit Testing
for run the unit testing for node use:  
npm test  
## Running the web application
node app.js

user:test
password:test
