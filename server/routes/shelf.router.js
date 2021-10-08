const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "item";`;
  pool.query(queryText)
  .then(result => {
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log(req.body.itemDescription)
  console.log(req.user.id)
  let queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
         VALUES ($1, $2, $3);`
  pool.query(queryText, [req.body.itemDescription, req.body.imageURL, req.user.id])
     .then(result => {
       res.sendStatus(201);
     })
     .catch(error => {
       console.log(`Error adding new item`, error);
       res.sendStatus(500);
     });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log(req.params.id);
  const itemId = req.params.id;
  let queryText = `DELETE FROM "item" 
  WHERE "id" = $1
  AND "user_id" = $2;`;
  pool.query(queryText, [itemId, req.user.id]).then(result => {
    res.sendStatus(201);
  }).catch(error => {
    console.log(`Error in shelf /DELETE:`, error);
    res.sendStatus(500);
  });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
  const queryText =  `UPDATE "items"
   SET "description" = $1, image_url = $2
   WHERE "id" = $3;`;
   pool.query(queryText,
    [req.body.description, req.body.image_url, req.params.id]).then(result => {
      res.sendStatus(201);
    }).catch(error => {
      console.log(`Error in shelf /PUT:`, error);
      res.sendStatus(500);
    })
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
  //const queryText = `SELECT ;`;
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
  const queryText = `SELECT * FROM "items" WHERE "id" = $1;`;
  pool.query(queryText, req.params.id).then( result => {
    res.send(result.rows[0]);
  }).catch(error => {
    console.log('Error in getting specific item', error);
    res.sendStatus(500);
  })
});

module.exports = router;
