#Meanimum
[![Build Status](https://semaphoreci.com/api/v1/projects/9467354a-eec5-44c2-a528-cc2a5aca2432/372056/badge.png)](https://semaphoreci.com/kbariotis/meanimum)

Node.js, Angular, Mongo, Express.

Unit Testing using Jasmine, Mocha, Karma.

##Dev
`npm install` will install both Node.js and Bower dependencies

`npm start` will start the main server where you can see at http://localhost:8080. Make sure that MongoDB runs before
 starting it.

`npm test` will start a testing server and start testing first using Mocha and then using Karma+Jasmine

`grunt` will build the required assets

`grunt watch` will go on watch mode where every file you changed is auto compiled

##API

###Auth Endpoints
POST /0.1/auth/login

POST /0.1/auth/register

###Products Endpoints
GET /0.1/products

GET /0.1/products/:id

POST /0.1/products

PUT /0.1/products/:id

DELETE /0.1/products/:id

##License
[See here](https://github.com/kbariotis/meanimum/blob/master/LICENSE)
