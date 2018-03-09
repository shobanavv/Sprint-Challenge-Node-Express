const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const URI_CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice/usd.json'
const URI_PREVIOUS_DAY_PRICE = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
const PORT = config.port;

const app = express();

app.use(bodyParser.json());

const API_ARR = [URI_CURRENT_PRICE, URI_PREVIOUS_DAY_PRICE];

// app.get('/compare',(req,res) =>{
//     const placeName = req.query.search;
//     fetch(URI_CURRENT_PRICE)
//     .then(res => res.json())
//     .then(current => {
//       res.status(200);
//       res.send({current});
//     })

//     .catch(err =>{
//         res.status(422);
//         res.send({error:"error occured"});
//     });
    
// })

app.get('/compare',(req,res) => {
  const bpiPromises = API_ARR.map(uri => {
       return fetch(uri)
       .then(res => res.json())
  }) //map
    
  // .catch(err =>{
  //       res.status(422);
  //       res.send({error:"error occured"});
  // })


       Promise.all(bpiPromises) 
       .then(comments => {
        let todayRate = comments[0].bpi.USD.rate.replace(/\,/g,'');
        let yesterRate = Object.values(comments[1].bpi)[0];
        todayRate = parseInt(todayRate,10);
        yesterRate = parseInt(yesterRate,10);
        difference = todayRate - yesterRate;
        let result ="";
        if(difference > 0) result = `Raisen by ${difference}`; 
        else result = `Fallen by ${difference}`;
        res.status(200);
        res.send({result: result });
       })
       .catch(err =>{
          res.status(422);
          res.send({error:"error occured"});
      })
    
}); //get

app.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
})