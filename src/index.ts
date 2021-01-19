import 'reflect-metadata'
import { createConnection } from 'typeorm'
// import AnimeListJob from './jobs/AnimeListJob'
import FansubJob from './jobs/FansubJob'
;(async () => {
	await createConnection()
	const job = new FansubJob()
	await job.run()
})()
