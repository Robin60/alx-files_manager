import express from 'express';
import StartServer from './libs/boot';
import injectRoutes from './routes';
import /**
* Retrieves the number of users in the database.
* @returns {Promise<Number>}
*/
async nbUsers() {
 return this.client.db().collection('users').countDocuments();
}

/**
* Retrieves the number of files in the database.
* @returns {Promise<Number>}
*/
async nbFiles() {
 return this.client.db().collection('files').countDocuments();
}

/**
* Retrieves a reference to the `users` collection.
* @returns {Promise<Collection>}
*/
async usersCollection() {
 return this.client.db().collection('users');
}

/**
* Retrieves a reference to the `files` collection.
* @returns {Promise<Collection>}
*/
async filesCollection() {
 return this.client.db().collection('files');
}
}