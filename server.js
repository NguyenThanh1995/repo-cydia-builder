const express = require("express")
const cors = require("cors")
const app = express()
const fs = require("fs")

express.uuse(cors())
express.route("/Packages.json", (req, res) => {
   res.json(JSON.parse(fs.readFileSync("./Packages.json", "utf8")))
})
express.route("/tweaks.json/:package", (req, res) => {
   if (fs.existsSync(`./tweaks.json/${package}.json`)) {
      res.json(JSON.parse(fs.readFileSync(`./tweaks.json/${package}.json`)))
   } else {
      res.send("Not Found")
   }
})

express.listen(3000)

console.log("App running")