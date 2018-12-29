module.exports = {
    getRecords: function(req, res) {    
          var pg = require('pg');  
        
          //You can run command "heroku config" to see what is Database URL from Heroku belt
        
          var conString = process.env.DATABASE_URL || "postgres://zevrauclglxxeu:c6d0b56da40273ee0f61ca0f4c4e5e1649f4333624ef97cfda6c90d4b2a4f373@ec2-54-204-40-121.compute-1.amazonaws.com:5432/db6h6v8usp3hvk";
          var client = new pg.Client(conString);
  
          client.connect();
  
          var query = client.query("select * from salesforce.example__c");
  
          query.on("row", function (row, result) { 
              result.addRow(row); 
          });
          
          console.log('=Results: =' +result);

          query.on("end", function (result) {          
              client.end();
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.write(JSON.stringify(result.rows, null, "    ") + "\n");
              res.end();  
          });
    }
}