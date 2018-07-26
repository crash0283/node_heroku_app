
// Student Challenge
// 1. Create a 'Projects' page to the website
// 2. This will be a page where we can link to our Github projects
// 3. You'll need to make a new route with 'app.get' called '/projects' which will use 'res.render' to render a new .hbs template
// 4. In the 'projects.hbs' page, you'll need to render a header and footer along with the content of the page which should just say 'Project Page Here'
// 5. In the partials 'header' file, add a link to route to the new 'projects' page
// 6. Then, once you tested it and it works locally, you'll need to add and commit it to Github
// 7. Finally, you'll need to then push it up to the heroku remote which is the command 'git push heroku master'

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

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
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