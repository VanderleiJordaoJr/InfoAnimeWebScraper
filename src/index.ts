import 'reflect-metadata'
import { createConnection } from 'typeorm'
import AnimeListJob from './jobs/AnimeListJob'
;(async () => {
	await createConnection()
	const job = new AnimeListJob()
	await job.run()
})()
