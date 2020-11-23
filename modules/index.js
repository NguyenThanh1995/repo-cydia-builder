const { exec } = require("child_process")
const path = require("path")
const fs = require("fs")
const md5file = require("md5-file")

function tableToJson(tbl, path) {
   tbl = tbl.replace(/^\s|\s$/g, "")
   const json = {}
   tbl.split("\n").forEach(item => {
      const tmp = item.split(": ")
      json[tmp[0]] = tmp.slice(1).join(": ")
   })
   if ( path ) {
      json.MD5sum = md5file.sync(path)
      json.birthtimeMs = fs.statSync(path).birthtimeMs
   }
   return json
}

module.exports = {
   exec: cmd => new Promise((res, rej) => exec(cmd, (err, rsl) => err ? rej(err) : res(rsl))),
   dpkgf: path => new Promise((resolve, reject) => exec(`dpkg -f "${path}"`, (err, rsl) => err ? reject(err) : resolve(tableToJson(rsl, path)))),
   readDebs: patha => fs.readdirSync(patha).map(e => patha + "/" + e).filter(e => fs.statSync(e).isFile() && path.parse(e).ext == ".deb"),
   packages: path => fs.readFileSync(path, "utf-8").split("\n\n").filter(Boolean).map(e => tableToJson(e))
}
