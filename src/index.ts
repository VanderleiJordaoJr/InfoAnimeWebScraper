import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Anime } from './entity/Anime'
;(async () => {
	await createConnection()
	console.log(await Anime.find())
})()
