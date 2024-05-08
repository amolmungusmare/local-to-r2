// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs';

export default class MigrationController {

    public async LocalDriverToS3() {

        let files = await Database.query().from('files').select('*')

        for(let file of files) {

            if(file.url.includes('https://cdn.bettermindvi')) continue

            if(file?.formats) {

                let contents
                try {
                    
                    contents = fs.readFileSync(`public/${file.url}`)
                } catch (error) {
                    continue
                }

                await Drive.put(file.url.substr(1), contents, { disk: 's3', visibility:"public", contentType: file.mime })

                let formats = {} as any

                for(let key of Object.keys(file.formats)) {

                    if(key == 'thumbnail') {

                        let keafdasddasd
                        try {
                            
                            keafdasddasd = fs.readFileSync(`public/${file.formats[key].url}`)
                        } catch (error) {
                            continue
                        }
    
                        await Drive.put(file.formats[key].url.substr(1), keafdasddasd, { disk: 's3', visibility:"public", contentType: file.formats[key].mime })
    
                        formats[key] = { ...file.formats[key], url: `https://cdn.bettermindvibes.com${file.formats[key].url}`}
                    }
                }

                if(Object.keys(formats).length) await Database.from('files').where('id', file.id).update({ ...file, provider: 'strapi-provider-cloudflare-r2', url: `https://cdn.bettermindvibes.com${file.url}`, formats: JSON.stringify(formats) })

            } else {
                let contents
                try {
                    
                    contents = fs.readFileSync(`public/${file.url}`)
                } catch (error) {
                    continue
                }

                await Drive.put(file.url.substr(1), contents, { disk: 's3',visibility:"public", contentType: file.mime })

                await Database.from('files').where('id', file.id).update({ ...file, provider: 'strapi-provider-cloudflare-r2', url: `https://cdn.bettermindvibes.com${file.url}` })
            }
            console.log('asd')
        }

        console.log('done'); return

    }

    public async delete() {

        let files = await Database.query().from('files').select('*')

        for(let file of files) {

            if(!file?.formats) continue

            let FileFormates = Object.keys(file?.formats)


            if(FileFormates.length > 1) {

                for(let key of FileFormates) {

                    if(key != 'thumbnail') continue

                    // fs.readFileSync(`D:/Projects/migratingToS3/public${file.formats[key].url}`)

                    let keafdasddasd

                    try {
                        keafdasddasd = fs.readFileSync(`public${file.formats[key].url}`)
                    } catch (error) {
                        
                    }

                    keafdasddasd && console.log('asdf', Buffer.byteLength(keafdasddasd))
    
                    // if(keafdasddasd) formats[key] = { ...file.formats[key], sizeInBytes: Buffer.byteLength(keafdasddasd) }
                }
            }

            // if(Object.keys(formats).length) await Database.from('files').where('id', file.id).update({ ...file, provider: 'strapi-provider-cloudflare-r2', url: file.url, formats: JSON.stringify(formats) })
        }
    }
}
