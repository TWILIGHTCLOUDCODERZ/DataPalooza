# Project Work flow
TCC Demo working tool includes an online retail site hosted on AWS S3, Twilio segmentation tool for tracking coupon codes, data transfer to a Snowflake table, and a backend Node.js application for retrieving valid coupon codes used by other users.

# S3 Static Online Website

## Overview

- The website is hosted on Amazon S3 (Simple Storage Service), known for static content hosting.
- The website's content, including HTML, CSS, and JavaScript files, is stored and served from S3.

## User Interaction to Buy Products

- Users interact with the online website hosted on S3 to purchase products.
- The website provides an interface for users to browse products, add them to a cart, and proceed with the checkout process.

## Coupon Usage

- Users have the option to use coupons during the purchase process.
- This could involve entering coupon codes to avail discounts or special offers.

## Tracking on Twilio Segments

- Coupon usage and related events are tracked using Twilio Segments.
- Twilio serves as a segmentation tool, allowing for the tracking of user interactions, including coupon usage, on the website.

<font color="#33cc33">Enjoy TCC shopping experience!</font>

Website Link:

- [Visit our Colorful Website](https://twilightcloudcoderzdatapalooza.s3.ap-south-1.amazonaws.com/index.html)



To run a Node.js application in a web browser, you typically cannot run the Node.js server code directly in the browser because browsers don't have the ability to execute server-side JavaScript. Instead, you need to run the Node.js server on a server machine, and then connect to it from the browser

## Dependencies:

Express.js: It's a web application framework for Node.js. You can install it using npm:
<BR>
### `npm install express`
Snowflake SDK: It's used for connecting to Snowflake. Install it with:
<BR>
### `npm install snowflake-sdk`

## Snowflake Connection Options:
const connectionOptions = {
  account: 'your_ACCOUNT',
  username: 'your_username',
  password: 'your_PASSWORD',
  warehouse: 'your_warehouse',
  database: 'your_database',
  schema: 'your_schema',
};`


## Running the Node.js Application:

Update Dependencies:Run the following command in the project directory to install the dependencies listed in your package.json file:
<BR>
### `npm install`
Run the Server:Execute the following command to start your Node.js server:
<BR>
### `node app.js`
Access the Application from Browser:Open your web browser and navigate to http://localhost:3000. This assumes that your server is running on the default port 3000, as specified in your code.

