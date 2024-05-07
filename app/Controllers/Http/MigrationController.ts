// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs';
// import sharp from 'sharp';

export default class MigrationController {

    public async LocalDriverToS3() {

        let files = await Database.query().from('files').select('*')

        for(let file of files) {

            if(file.url.includes('bmv.52d45400e195803b')) continue

            if(file?.formats) {

                let contents
                try {
                    
                    contents = fs.readFileSync(`public/${file.url}`)
                } catch (error) {
                    continue
                }


                let url = `https://bmv.52d45400e195803bd6da970dc7961d23.r2.cloudflarestorage.com${file.url.split('/uploads')[1]}`

                await Drive.put(url, contents, { disk: 's3' })

                let formats = {} as any

                for(let key of Object.keys(file.formats)) {

                    let keafdasddasd = fs.readFileSync(`public/${file.formats[key].url}`)

                    let keyurl = `https://bmv.52d45400e195803bd6da970dc7961d23.r2.cloudflarestorage.com${file.formats[key].url.split('/uploads')[1]}`

                    await Drive.put(keyurl, keafdasddasd, { disk: 's3'})

                    formats[key] = { ...file.formats[key], url: keyurl }

                }

                // console.log({ ...file, provider: 'strapi-provider-cloudflare-r2', url: url, formats: formats })

                await Database.from('files').where('id', file.id).update({ ...file, provider: 'strapi-provider-cloudflare-r2', url: url, formats: JSON.stringify(formats) })


            } else {

                let contents = fs.readFileSync(`public/${file.url}`)

                let url = `https://bmv.52d45400e195803bd6da970dc7961d23.r2.cloudflarestorage.com${file.url.split('/uploads')[1]}`

                await Drive.put(url, contents, { disk: 's3' })

                await Database.from('files').where('id', file.id).update({ ...file, provider: 'strapi-provider-cloudflare-r2', url: url })

                // console.log({ ...file, provider: 'strapi-provider-cloudflare-r2', url: url })
            }
        }

        console.log('done'); return
    }
}
