const express = require('express')
const colors = require('colors')
const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    console.log("SORTING")

    const algorithms = loadAlgorithms()

    res.render('sortviz.ejs', { pageTitle: "Sorting Visualizer", algorithms} )
})

app.listen(port, () => {
    console.log("LISTENING ON PORT " + port)
})

//returns array of algorithm object
const loadAlgorithms = () => {
    try{
        const dataBuffer = fs.readFileSync('sortalgo.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}