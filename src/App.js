// Import necessary React modules
import React, { useState } from 'react';
import snowflake from 'snowflake-sdk';
import https from 'https';

// Component for the Snowflake connection and query logic
const SnowflakeComponent = () => {
  // State to hold user input
  const [userProvidedUrl, setUserProvidedUrl] = useState('');

  // Snowflake connection parameters
  const connectionOptions = {
    account: '',
    username: '',
    password: '',
    warehouse: ',
    database: 'Da',
    schema: '',
  };

  // Snowflake query
  const query = 'SELECT COUPON FROM COUPON_APPLIED ORDER BY ORIGINAL_TIMESTAMP DESC LIMIT 1';

  // Function to fetch the HTTP response code for a given URL
  const getHttpResponseCode = (url, callback) => {
    https.get(url, (response) => {
      callback(null, response.statusCode);
    }).on('error', (error) => {
      callback(error, null);
    });
  };

  // Function to handle user input change
  const handleUrlChange = (event) => {
    setUserProvidedUrl(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (userProvidedUrl === 'https://twilightcloudcoderzdatapalooza.s3.ap-south-1.amazonaws.com') {
      // Create a connection
      const connection = snowflake.createConnection(connectionOptions);

      // Connect to Snowflake
      connection.connect((err, conn) => {
        if (err) {
          console.error('Unable to connect: ' + err.message);
          throw err;
        }

        // Execute the query
        conn.execute({
          sqlText: query,
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Error executing query: ' + err.message);
              throw err;
            }

            // Process the result
            if (rows.length > 0) {
              const result = rows[0];
              console.log('Result:', result);
            } else {
              console.log('No coupon available.');
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
      // For other URLs, display "No coupon available."
      console.log('No coupon available.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the URL:
          <input type="text" value={userProvidedUrl} onChange={handleUrlChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// App component to render the SnowflakeComponent
const App = () => {
  return (
    <div>
      <h1>Snowflake React App</h1>
      <SnowflakeComponent />
    </div>
  );
};

export default App;
