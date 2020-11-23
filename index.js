const modules = require("./modules"),
   chalk = require("chalk"),
   fs = require("fs"),
   md5file = require("md5-file"),
   env = require("dotenv").config().parsed,
   readline = require("readline"),
   path = require("path"),
   fsExtra = require("fs-extra")

   !(async () => {
      console.clear()

      console.log(chalk.grey("Reading debians..."))

      const debs = {};
      let countTweaks = 0;
      !(await Promise.all(modules.readDebs("./debs")
         .map(async item => {
            const info = await modules.dpkgf(item)
            let newpath = `${path.dirname(item)}/${info.Package}_${info.Version}.deb`
            if (path.basename(item, ".deb") != path.basename(newpath, ".deb")) {
               if (fs.existsSync(newpath) && fs.statSync(item).birthtimeMs > fs.statSync(newpath).birthtimeMs) {
                  fs.unlinkSync(item)
               } else {
                  fs.renameSync(item, newpath)
               }
            }
            return info
         })
      ))
      .forEach(item => {
         if (item.Package in debs) {
            debs[item.Package].push(item)
         } else {
            debs[item.Package] = [item]
            countTweaks++
         }
      })

      console.log(chalk.yellow(`Readed all debians. ${countTweaks} tweaks`))


      /*
         @not build found and new packages
      */

      if ( fs.existsSync("./tweaks.json") && fs.lstatSync("./tweaks.json").isDirectory() && fs.readdirSync("./tweaks.json").length ) {
         console.log(chalk.grey("Removing tweaks.json/*..."))
		   fsExtra.emptyDirSync("./tweaks.json")
		   console.log(chalk.yellow("Removed tweaks.json/*"))
		} else {
         fs.mkdirSync("./tweaks.json")
		}


      const allPackages = {}
      const tweaks_json = []

      for (const package in debs) {
         debs[package] = debs[package].sort((a, b) => a.Version > b.Version)
         
         allPackages[package] = {
            Name: debs[package][0].Name,
            Icon: debs[package][0].Icon,
            MD5sum: debs[package][0].MD5sum,
            Section: debs[package][0].Section,
            Versions: debs[package].map(e => e.Version),
		      birthtimeMs: debs[package][0].birthtimeMs
         }

         tweaks_json.push(new Promise((res, rej) => {
            fs.writeFile(`./tweaks.json/${package}.json`, JSON.stringify({
               ...debs[package][0],
               Versions: debs[package].map(item => {
                  const changelog = {}
					   let empty = true

                  for (const key in item) {
                     if (item[key] != debs[package][0][key]) {
                        changelog[key] = item[key]
								empty = false
                     }
                  }

                  return empty ? undefined : changelog
               }).filter(Boolean)
            }), err => err ? rej() : res())
         }))

      }


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
