const express = require('express');

const app = new express();

app.get('/',(req,res) =>{
    return res.send('Hello World')
})


app.get('/signin',(req,res) =>{
   // console.log(res);
    return res.send('Hello you are here')
})

const isAdmin = (res,req,next) =>{
    console.log("Admin is running !")
    next();
}

const isLoggedIn = (req,res,next) =>{
    console.log("User is Logged in !");
    next();
}


const admin = (req,res) =>{
    return res.send('You are an admin now !')
}

app.get('/admin',isLoggedIn,isAdmin,admin)

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