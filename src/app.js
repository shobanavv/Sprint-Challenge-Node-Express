const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const URI_CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice.json?currency=USD'
const URI_PREVIOUS_DAY_PRICE = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
const PORT = config.port;

const app = express();

app.use(bodyParser.json());

app.get('/compare',(req,res) =>{
    const placeName = req.query.search;
    fetch(URI_CURRENT_PRICE)
    .then(res => res.json())
    .then(current => {
      res.status(200);
      res.send({current});
    })

    .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
    });
    
})

// app.get('/compare',(req,res) => {
//   const placeNames = req.query.search;
//   fetch(URI_CURRENT_PRICE)
//   .then(res => res.json())
//   .then(current => { // got places object.
//     console.log(current);

//   fetch(URI_PREVIOUS_DAY_PRICE)
//         .then(detailed => detailed.json())
//         .then(detailed => detailed.result);

// })
//      Promise.all(details) 
//      .then(details => {
//       const comment = '';
//       if(current>previous) comment = 'risen';
//       else comment = 'fallen';
//       res.status(200);
//       res.send({result: comment})
//      })
//      .catch(err =>{
//         res.status(422);
//         res.send({error:"error occured"});
//     })
// })
//   .catch(err =>{
//         res.status(422);
//         res.send({error:"error occured"});
// })
// })

app.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
})