const { request } = require('express');
const express = require('express');
const app = express(); 
const morgan = require('morgan')
const appError = require('../asyncError/appError');



app.use(morgan('tiny')); // Every single request, want to send this special function. My way of telling express, to use the middleware on every single request. Morgan is especially useful for when things are not going to plan, when sending GET request. Morgan is a useful logging tool. 
// Remember only one res per req.
// app.use((req, res, next) => {
//     console.log('MY FIRST MIDDLEWARE JABRONI !!!')
//     return next(); // Need to call next, or else it's the end of the line and it won't run the next middleware.. if we matched that verb and path name, then we'll follow that route. next middleware or route handler. 
// })

app.use((req, res, next) => {   // Now in every single one of my route handlers, we'll have access to requestTime. POSITIONAL, matter where I define this. 
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query; // If you don't have this query, then you'll get this, res.send.
    if (password === 'chichenNugget') {
        next();
    } 
    throw new appError('Please provide the correct password.', 401);
} 

// app.use((err, req, res, next) => {
//     const { status } = err; 
//     res.status(status).send('ERRORRR!!!!!');
// })


app.get('/', (req, res) => {
    console.log(`REQUEST TIME: ${req.requestTime}`)
    res.send('HOME PAGE')
})
app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

app.get('/secret', verifyPassword, (req, res) => { // verifyPassword is a middleware we defined and as long as it has next() somewhere in there, it should work. 
    res.send('I wear headphones in public, so I do not have to talk to anyone!!')
})

// app.use((err, req, res, next) => {
//     console.log('*******')
//     console.log('*******')
//     console.log('*******')
//     next(err);
// })
// this error is going to hit my error handle, with a status of 403. We use this to send our status code and to send our status back. 
app.get('.admin', (req, res) => {
    throw new appError('You are not an admin!', 403);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!!' } = err; 
    res.status(status).send(message);
})
// Set this on the bottom. 

app.listen(2500, () => {
    console.log('Listening on port 2500');
})