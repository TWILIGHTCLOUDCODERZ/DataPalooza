const express = require('express');
const snowflake = require('snowflake-sdk');

const app = express();
const port = 3000;


const connectionOptions = {
  account: 'p-southeast-1',
  username: '',
  password: '123456',
  warehouse: '',
  database: '',
  schema: '',
};


const query = 'SELECT COUPON FROM COUPON_APPLIED ORDER BY ORIGINAL_TIMESTAMP DESC LIMIT 1';

app.use(express.static('public'));

app.get('/fetchData', async (req, res) => {
  const url = req.query.url;

  if (url === 'https://twilightcloudcoderzdatapalooza.s3.ap-south-1.amazonaws.com') {

    const connection = snowflake.createConnection(connectionOptions);


    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect: ' + err.message);
        res.json({ error: 'Unable to connect to Snowflake' });
      }


      conn.execute({
        sqlText: query,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Error executing query: ' + err.message);
            res.json({ error: 'Error executing query' });
          }

          // Process the result
          if (rows.length > 0) {
            const result = rows[0];
            res.json({ result });
          } else {
            res.json({ message: 'No coupon available.' });
          }

          // Close the connection
          conn.destroy((err) => {
            if (err) {
              console.error('Error destroying connection: ' + err.message);
              throw err;
            }
          });
        },
      });
    });
  } else {

    res.json({ message: 'No valid coupon.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
