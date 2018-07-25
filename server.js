//In this lesson, we will show how we can deploy our app to a service called 'heroku'
//First, we need to visit 'heroku.com' and create a free account
//Next, visit the heroku 'dashboard', but just make sure you see it, don't do anything there
//We are then going to install the heroku cli tools so we can deploy, update, etc. our app to heroku
//We need to install via npm with the following: 'npm i -g heroku'
//this will install heroku globally so we can use it on the command line
//next, we need to login via the command line by typing 'heroku login' and then enter your credentials
//then, we need to run 'heroku keys: add' to add an ssh key to our heroku account
//then we run 'ssh -v git@heroku.com' to generate some ssh keys from github to heroku

const express = require('express')
const hbs = require('hbs');
const fs = require('fs')

//here, we need to create a variable that contains the local port when we develop or an environment port that heroku chooses when it serves our app
const port = process.env.PORT || 3000
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req,res,next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)

    fs.appendFile('server.log',log + '\n',(err) => {
        if(err) console.log('Unable to append to server.log!')
    })

    next()
})

//I'm bypassing this so the app will run
// app.use((req,res,next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase()
})

app.use(express.static(__dirname +'/public'))

app.get('/', (req,res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcome: "Welcome to the Home Page!"
    })
})
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Page Does Not Exist!',
        statusCode: '404'
    })
})

//here, we set the first argument to our 'port' variable so it'll know which one to use
app.listen(port,() => {
    console.log(`Server is up on ${port}!`)
})