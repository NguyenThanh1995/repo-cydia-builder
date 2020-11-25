const express = require("express")
const cors = require("cors")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.route("/Packages.json").all((req, res) => {
   res.json(JSON.parse(fs.readFileSync("./Packages.json", "utf8")))
})
app.route("/tweaks.json/:package").all((req, res) => {
   if (fs.existsSync(`./tweaks.json/${req.params.package}.json`)) {
      res.json(JSON.parse(fs.readFileSync(`./tweaks.json/${req.params.package}.json`)))
   } else {
      res.send("Not Found")
   }
})

app.listen(3000)

console.log("App running")
