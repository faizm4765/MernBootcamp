const express = require('express');

const app = new express();

app.get('/',(req,res) =>{
    return res.send('Hello World')
})


app.get('/signin',(req,res) =>{
   // console.log(res);
    return res.send('Hello you are here')
})


app.get('/signout',(req,res) =>{
   // console.log(res);
    return res.send('You have been succesfully logged out !')
})

app.get('/hitesh',(req,res) =>{
    return res.send('He is on instagram')
})

app.listen(8000, ()=>{
    console.log('Listening on port 8000');
})