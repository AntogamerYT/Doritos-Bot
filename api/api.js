
import fs from 'fs' 
import {limiter} from './middlewares/rateLimiter.js'
import express from 'express'
const app = express() 
const port = process.env.PORT || 3895 

app.use(limiter) // rate limit

fs.readdir('./photos', (err, files) => {
    app.use('/', (req, res) => {
        res.sendFile('/home/antogamer/doritosbot/api/photos/' + files[Math.floor(Math.random()*files.length)]) 
    })
}) 

app.listen(port, () => console.log(`Listening on ${port}`)) // listen on port 3895 
