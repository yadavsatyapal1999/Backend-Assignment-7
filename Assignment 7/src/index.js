const express = require('express')

const file = require('./InitialData')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
let file2 = file

let curid = 8;


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student", (req, res) => {
    const id = Number(req.query.id);
    if (id) {
        const data = file2.find(o => o.id === id)
        if (data != null || data != undefined) {
            res.status(200).json(data)
            console.log(` student by id= ${id}`)
        } else {
            res.status(404).send("bad request")
        }

    } else {
        res.json(file2)
        console.log("Get all student is called")
    }

})
app.post('/api/student/post', (req, res) => {
    res.header({ 'content-type': 'application/x-www-form-urlencoded' })
    const body = req.body

    const data = {
        id: curid++,
        name: body.name,
        currentclass: body.currentclass,
        division: body.division
    }


    if (data.name && data.currentclass && data.division) {

        res.status(200).json({
            message: "data Saved Sucessfully",
            saved: data
        })
        file2.push(data)

        curid++;
    } else {
        res.status(400).json("failed to save")
    }
})
app.put('/api/student/put', (req, res) => {
    res.header({ 'content-type': 'application/x-www-form-urlencoded' })
    const id = Number(req.query.id);
    const body = req.body;
    if (id) {
        const toupdate = file2.find(item => id == item.id)
        if (toupdate != null || toupdate != undefined) {
            if (body.name) {
                toupdate.name = body.name
                for (let i = 0; i < file2.length; i++) {
                    if (file2[i].id == id) {
                        file2[i] = toupdate
                        res.send("updated sucessfully")
                        break;
                    } else {
                        continue
                    }
                }
            }
            else if (body.currentclass) {
                toupdate.currentClass = body.currentClass
                for (let i = 0; i < file2.length; i++) {
                    if (file2[i].id == id) {
                        file2[i] = toupdate
                        res.send("updated sucessfully")
                        break;
                    } else {
                        continue
                    }
                }
            }
            else if (body.division) {
                toupdate.division = body.division
                for (let i = 0; i < file2.length; i++) {
                    if (file2[i].id == id) {
                        file2[i] = toupdate
                        res.send("updated sucessfully")
                        break;
                    } else {
                        continue
                    }
                }
            }

        } else {
            res.status(400).json("failed to update")
        }

    } else {
        res.send("please provide  valid id")
    }
})

app.delete('/api/student/delete', (req, res) => {
    const id = Number(req.query.id);
    if (id) {
        const findid = file2.find(item => item.id == id)
        console.log(findid)
        if (findid != null || findid != undefined) {
            file2 = file2.filter(item => item.id != id)
            res.json("record deleted sucessfully")
        } else {
            res.status(404).json("Id not found")
        }


    } else {
        res.json("Id not found")
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   