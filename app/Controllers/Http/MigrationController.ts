import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MigrationController {

    public async LocalDriverToS3({ request }: HttpContextContract) {

        const Image = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif'],
        })!

        Image.moveToDisk('', {}, 'r2')

        return Image
    }
}
