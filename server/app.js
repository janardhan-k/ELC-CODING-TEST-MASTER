/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
const url = require('url');

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
const search = require('./search');

const server = http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    const { pathname, query } = url.parse(req.url, true);
    

    if (req.method === 'GET' && pathname === '/api/search') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
        // respond with the data
        const searchData = search(query.q);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(searchData));
        res.end();
      } else {
        // respond with a 404 error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Path not Found');
        res.end();
      }
});

server.listen( port );
console.log(`[Server running on ${hostname}:${port}]`);


