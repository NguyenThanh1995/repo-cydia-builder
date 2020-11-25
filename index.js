const modules = require("./modules"),
   chalk = require("chalk"),
   fs = require("fs"),
   md5file = require("md5-file"),
   env = require("dotenv").config().parsed,
   readline = require("readline"),
   path = require("path"),
   fsExtra = require("fs-extra")

async function readDir() {
   let countTweaks = 0;
   let debs = []

   if (!fs.existsSync(__dirname + "/debs") || !fs.lstatSync(__dirname + "/debs").isDirectory()) {
      throw new Error(`${__dirname}/debs is not folder.`)
   } else {

      debs = await Promise.all(modules.readDebs(__dirname + "/debs")
         .map(async item => {
            const info = await modules.dpkgf(item)
            let newpath = `${path.dirname(item)}/${info.Package}@${info.Version}.deb`
            if (path.basename(item, ".deb") != path.basename(newpath, ".deb")) {
               if (fs.existsSync(newpath) && fs.statSync(item).birthtimeMs > fs.statSync(newpath).birthtimeMs) {
                  fs.unlinkSync(item)
               } else {
                  fs.renameSync(item, newpath)
               }
            }
            return info
         })
      )

      return {
         debs,
         countTweaks: debs.reduce((prev, current, index) => {

            if (!debs.slice(index + 1).find(item => item.Package == current.Package)) {
               prev++
            }

            return prev
         }, 0)
      }
   }
}

function createFolder(name) {

   if (fs.existsSync(`${__dirname}/${name}`)) {
      if (!fs.lstatSync(`${__dirname}/${name}`).isDirectory()) {
         throw new Error(`${__dirname}/${name} is a file. Please remove this.`)
      }
   } else {
      fs.mkdirSync(`${__dirname}/${name}`)
   }

}

function findLastVersion(debs, identifier, index) {
   const packages = []

   for (const length = debs.length; index < length; index++) {
      if (item.Package === identifier) {
         packages.push({
            Name: debs[index].Name,
            Icon: debs[index].Icon,
            MD5sum: debs[index].MD5sum,
            Section: debs[index].Section,
            Version: debs[index],
            birthtimeMs: debs[index].birthtimeMs
         })
      }
   }

   return packages.sort((a, b) => a.Version > b.Version)
}

!(async () => {
   console.clear()

   console.log(chalk.grey("Reading debians..."))

   const { debs, countTweaks } = await readDir()

   console.log(chalk.yellow(`Readed all debians. ${countTweaks} tweaks`))


   /*
      @not build found and new packages
   */

   createFolder("tweaks.json")

   const allPackages = {}
   const tweaks_json = []

   debs.forEach((package, index) => {
      if (!(package.Package in allPackages)) {
         allPackages[package.Package] = findLastVersion(debs, package.Package, index)
      }

      let oldData = {},
         newlink
      if (fs.existsSync(newlink = `${__dirname}/tweaks.json/${package.Package}@${package.Version}.json`)) {
         oldData = require(newlink)
      }


      tweaks_json.push(await new Promise(async (res, rej) => {
         const newPackage = { ...package }
         newPackage.Support = oldData?.Version || await modules.input(`${package.Package}@${package.Version} (${chalk.cyan(debs[package][0].Name)})? `)


         fs.writeFile(`${__dirname}/tweaks.json/${package.Package}@${package.Version}.json`, JSON.stringify(newPackage), err => err ? rej() : res())
      }))

   })


   // save all json
   console.log(chalk.grey(`Writing package.json...`))

   fs.writeFileSync("Packages.json", JSON.stringify(allPackages))
   fs.writeFileSync("Packages.length", countTweaks + "")

   console.log(chalk.yellow(`Writed done Packages.json!`))
   console.log(chalk.grey(`Writing files json to tweaks.json...`))

   console.log(chalk.green(`Writed tweaks.json (${(await Promise.all(tweaks_json)).length} tweaks)`))

   console.log(chalk.grey("Running postman.sh..."))
   await modules.exec("sh postman.sh")

   console.log(chalk.green("Writed Packages and Packages.bz2"))
   console.log(chalk.grey("Writing Release..."))

   fs.writeFileSync("Release", `Origin: ${env.Origin}
Label: ${env.Label}
Suite: ${env.Suite}
Version: ${env.Version}
Codename: ${env.Codename}
Architecture: ${env.Architecture}
Components: ${env.Components}
Description: ${env.Description}
MD5Sum:
 ${md5file.sync("./Packages")} ${fs.statSync("./Packages").size} Packages
 ${md5file.sync("./Packages.bz2")} ${fs.statSync("./Packages.bz2").size} Packages.bz2`)

   console.log(chalk.green("Writed file Release"))
})()


// ok man