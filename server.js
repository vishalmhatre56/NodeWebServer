const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

//middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unable to appent in server.log!")
        }
    })
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })
app.use(express.static(__dirname+'/public'))

//handler templatess
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to Node Web Server'
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})

app.listen(port,()=>{
    console.log(`Server is up and running on port:${port}`)
});
