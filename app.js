const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req,res)=> {
    res.status(200).render('index');
});
app.get('/contact', (req,res)=> {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    name = req.body.name
    phone = req.body.phone
    email = req.body.email
    address = req.body.address
    concern = req.body.concern

    let outputToWrite = `the name of the client is ${name}, ${phone} is phone number, ${email}, residing at ${address}. concern of him/her: ${concern}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('contact.pug', params);
})




// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
