const modules = require("./modules"),
   chalk = require("chalk"),
   fs = require("fs"),
   md5file = require("md5-file"),
   env = require("dotenv").config().parsed,
   readline = require("readline"),
   path = require("path")

function removeCharRegExp(string) {
   return string.replace(/([`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/])/g, "\\$1")
}

async function addDepiction(path, info) {
   if (!info.Depiction?.match(new RegExp(removeCharRegExp(`${env.Depiction}${info.Package}@${info.Version}`)))) {

      const pathTmp = `${__dirname}/tmp`

      if (fs.existsSync(pathTmp)) {
         fs.rmdirSync(pathTmp, { recursive: true })
      }

      // unpack
      await modules.exec(`dpkg-deb -R "${path}" "${pathTmp}"`)

      // read file control
      const pathFileControl = `${pathTmp}/DEBIAN/control`

      if ((fs.statSync(pathFileControl).mode & parseInt("777", 8)).toString(8) < "644") {
         fs.chmodSync(pathFileControl, 644)
      }
      fs.readdirSync(`${pathTmp}/DEBIAN`).forEach(item => {
         if (path.basename(item) != "control") {
            if ((fs.statSync(item).mode & parseInt("777", 8)).toString(8) < 755) {
               fs.chmodSync(item, 755)
            }
         }
      })

      const control = fs.readFileSync(pathFileControl, "utf8")

      fs.writeFileSync(pathFileControl, (control.replace(/Depiction:[^\n\r]+/, "") + `\nDepiction: ${env.Depiction}${info.Package}@${info.Version}\n`)
         .replace(/[\n\r]{2,}/g, "\n"), { encoding: "utf8" })

      // pack to debian
      await modules.exec(`dpkg -bR "${pathTmp}" "${path}"`)
      fs.rmdirSync(`${pathTmp}`, { recursive: true })

      return modules.dpkgf(path)
   } else {
      return info
   }
}

async function readDir() {
   let countTweaks = 0;
   let debs = []

   if (!fs.existsSync(__dirname + "/debs") || !fs.lstatSync(__dirname + "/debs").isDirectory()) {
      throw new Error(`${__dirname}/debs is not folder.`)
   } else {

      debs = await modules.readDebs(__dirname + "/debs")

      for (const index in debs) {
         const item = debs[index]

         const info = await addDepiction(item, await modules.dpkgf(item))


         console.log(chalk.magenta(`Unpacked ${info.Package}@${info.Version} (${Math.round((index + 1) / debs.length * 100)}%)`))


         let newpath = `${path.dirname(item)}/${info.Package}@${info.Version}.deb`
         if (path.basename(item, ".deb") != path.basename(newpath, ".deb")) {
            if (fs.existsSync(newpath) && fs.statSync(item).birthtimeMs > fs.statSync(newpath).birthtimeMs) {
               fs.unlinkSync(item)
            } else {
               fs.renameSync(item, newpath)
            }
         }
         debs[index] = info
      }

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

function toSimpleData({
   Name,
   Icon,
   MD5sum,
   Section,
   Version,
   birthtimeMs
}) {
   return {
      Name,
      Icon,
      MD5sum,
      Section,
      Version,
      birthtimeMs
   }
}

function findVersion(debs, identifier, index = 0) {
   const packages = []

   for (const length = debs.length; index < length; index++) {
      if (debs[index].Package === identifier) {
         packages.push(toSimpleData(debs[index]))
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
   let lastUpdate = 0

   for await (const package of debs) {
      const changelog = findVersion(debs, package.Package)
      if (package.birthtimeMs > lastUpdate) {
         lastUpdate = package.birthtimeMs
      }

      if (!(package.Package in allPackages)) {
         allPackages[package.Package] = changelog[0]
      }

      let oldData = {},
         newlink
      if (fs.existsSync(newlink = `${__dirname}/tweaks.json/${package.Package}@${package.Version}.json`)) {
         oldData = require(newlink)
      }


      tweaks_json.push(
         await new Promise(async (res, rej) => {
            const {
               Name,
               Package,
               Author,
               Version,
               Section,
               Depends,
               Description,
               Icon,
               Conflicts,
               Architeture,
               MD5sum,
               birthtimeMs,
               Size,
               tag,
               dev
            } = package
            const newPackage = {
               Name,
               Package,
               Author,
               Version,
               Section,
               Depends,
               Description,
               Icon,
               Conflicts,
               Architeture,
               MD5sum,
               birthtimeMs,
               Size,
               tag,
               dev,
               Support: oldData && oldData.Support && oldData.MD5sum == package.MD5sum ? oldData.Support : await modules.input(`${package.Package}@${package.Version} (${chalk.cyan(package.Name)})? `),
               Screenshots: oldData && oldData.Screenshots,
               OpenSource: oldData && oldData.OpenSource,
               Changelog: changelog.map(({
                  Version,
                  MD5sum,
                  birthtimeMs
               }) => ({
                  Version,
                  MD5sum,
                  birthtimeMs,
                  is: Version == package.Version
               }))
            }


            fs.writeFile(`${__dirname}/tweaks.json/${Package}@${Version}.json`, JSON.stringify(newPackage), err => err ? rej() : res())
         })
      )

   }


   // save all json
   console.log(chalk.grey(`Writing package.json...`))

   fs.writeFileSync("Packages.json", JSON.stringify({
      packages: allPackages,
      lastUpdate,
      length: countTweaks
   }))

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