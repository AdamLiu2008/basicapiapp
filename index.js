var express = require('express');
var app = express();

app.get('/', function (req, res) {

  const { Client } = require('pg');
  const connString = process.env.DATABASE_URL || "postgres://zevrauclglxxeu:c6d0b56da40273ee0f61ca0f4c4e5e1649f4333624ef97cfda6c90d4b2a4f373@ec2-54-204-40-121.compute-1.amazonaws.com:5432/db6h6v8usp3hvk";

  const client = new Client({
    connectionString: connString,
    ssl: true,
  });

  client.connect();  

  client.query('SELECT id, name, Description__c FROM salesforce.example__c;', (err, dbRes) => {
    if (err) throw err;
    for (let row of dbRes.rows) {
      const result = console.log(JSON.stringify(row));
    }
    res.send(dbRes.rows); 
    client.end();
  });
})

var server = app.listen(process.env.PORT || 5000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://Localhost", host, port)
})

//--------------------------------------------------------------------------------------------------------------------------


// const { Client } = require('pg');

// const client = new Client({
//   connectionString: "postgres://zevrauclglxxeu:c6d0b56da40273ee0f61ca0f4c4e5e1649f4333624ef97cfda6c90d4b2a4f373@ec2-54-204-40-121.compute-1.amazonaws.com:5432/db6h6v8usp3hvk",
//   ssl: true,
// });

// client.connect();

// client.query('SELECT id, name, Description__c FROM salesforce.example__c;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     const result = console.log(JSON.stringify(row));
//   }
//   client.end();
// });

//--------------------------------------------------------------------------------------------------------------------------

// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// const { Client } = require('pg'); 
// express.get('/db', (req, res) => {
// //rest of the code here...    
//     var dbOpts = {
//       connectionString: process.env.DATABASE_URL, 
//       ssl : true
//     }
//     const client = new Client(dbOpts);    
//     client.connect();    
//     client.query('SELECT id, name, Description__c FROM salesforce.example__c;', (err, dbRes) => {
//       if (err) throw err;     

//       res.render('pages/db',{
//         results : dbRes.rows
//       });

//       client.end();
//     });

//     client.end();
// })


//--------------------------------------------------------------------------------------------------------------------------
