/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
	DRIVE_DISK: Env.schema.enum(['local', 's3', 'r2'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

	DB_CONNECTION: Env.schema.string(),

	MYSQL_HOST: Env.schema.string({ format: 'host' }),
	MYSQL_PORT: Env.schema.number(),
	MYSQL_USER: Env.schema.string(),
	MYSQL_PASSWORD: Env.schema.string.optional(),
	MYSQL_DB_NAME: Env.schema.string(),

	S3_KEY: Env.schema.string(),
	S3_SECRET: Env.schema.string(),
	S3_BUCKET: Env.schema.string(),
	S3_REGION: Env.schema.string(),
	S3_ENDPOINT: Env.schema.string.optional(),

	R2_ACCESS_KEY_ID: Env.schema.string(),
	R2_SECRET_ACCESS_KEY: Env.schema.string(),
	R2_BUCKET: Env.schema.string(),
	R2_ACCOUNT_ID: Env.schema.string(),
	R2_PUBLIC_URL: Env.schema.string.optional(),
})