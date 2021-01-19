import 'reflect-metadata'
import { createConnection } from 'typeorm'
import AnimeListJob from './jobs/AnimeListJob'
;(async () => {
	await createConnection()
	const job = new AnimeListJob(10, 5, 5)
	await job.run()
})()
