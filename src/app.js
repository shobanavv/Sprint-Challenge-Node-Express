const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const URI_CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice.json?currency=USD'
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
  fetch(uri)
  .then(res => res.json())
  .then(current => { // got places object.
    console.log(current);
    return current.bpi;
  })
    fetch(uri)
  .then(res => res.json())
  .then(res => {
    console.log(res.bpi);
    return res.bpi;
  })
  .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
})
     
     Promise.all(bpiPromises) 
     const comments = '';
        if(bpiPromises[0]>bpiPromises[1]) return comments = 'raisen'
        else return comments = 'fallen';
     .then(comments => {
      res.status(200);
      res.send({result: comments})
     })
     .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
    })
    
})
  


app.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
})