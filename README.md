

# LightningPI

<img src="https://github.com/pavanskipo/LightningPI/blob/master/angular-src/LightningPI/src/favicon.png" width="15%">

A simple media streaming app using Node.js, MongoDB and Angular. 
Upload Music and Movies to your server and stream the content over multiple devices.

  

## Getting Started

  

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

  

### Prerequisites

  

What things you need to install the software and how to install them

 - [Node.js and NPM](https://nodejs.org/en/download/) 
 - [MongoDB](https://www.mongodb.com/download-center)
 - [OmDb API key](http://www.omdbapi.com/)

  

### Setting up the Node server 

 1. Install the node dependencies by running`npm install`  
 2. Open **db_url.js** file inside **utils** folder ( path: `utils/db_url.js` )
 3. Configure Mongo DB credentials inside of **settings** object and run `npm start`

```
const  settings  = {
user:  '',
password:  '',
hostname:  '<your database ip>',
port:  '<your database port>',
db:  '<your database name>'
}
```

### Setting up the Angular server 

 1. Install the Angular dependencies by running `npm install` ( path:
    angular-src/LightningPI ) 
 2. Open `common-http.service.ts` file and
    configure the API **endpoint** and **debug** variables ( path: 
    `angular-src/LightningPI/src/app/services/common-http.service.ts` )
 3.  Generate the API key for OmDb API and put it inside **secret_key** variable
 4.  run `npm start`

Open the app in your browser and enjoy !! ( ^ _ ^ )
