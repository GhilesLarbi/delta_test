// back/src/db/db.js

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-http'));
PouchDB.plugin(require('pouchdb-find'));

const usersDb = new PouchDB(`${process.env.COUCHDB_URL}/users`, {
  skip_setup: false,
});

const postsDb = new PouchDB(`${process.env.COUCHDB_URL}/posts`, {
  skip_setup: false,
});



usersDb.info()
  .then(info => {
    console.log('Connected to users database:', info.db_name);
  })
  .catch(error => {
    console.error('Users database connection error:', error);
  });

postsDb.info()
  .then(info => {
    console.log('Connected to posts database:', info.db_name);
  })
  .catch(error => {
    console.error('Posts database connection error:', error);
  });

module.exports = { usersDb, postsDb };