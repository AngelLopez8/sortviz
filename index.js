const express = require('express')
const colors = require('colors')
const path = require('path')
const fs = require('fs')

const app = express()

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

app.listen(3000, (req, res) => {
    console.log("LISTENING ON PORT 3000!")
})

const loadAlgorithms = () => {
    try{
        const dataBuffer = fs.readFileSync('sortalgo.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}