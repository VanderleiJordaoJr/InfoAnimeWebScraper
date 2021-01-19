import AnimeParser from '../../parsers/AnimeParser'
import AnimeListParser from '../../parsers/AnimeListParser'
import AnimeListRequest from '../../requests/AnimeListRequest'
import AnimeRequest from '../../requests/AnimeRequest'
import AbstractJob from '../AbstractJob'
import AnimeModel from '../../models/AnimeModel'
import Persistence from './persistence'
import Anime from '../../entity/Anime'
import Genre from '../../entity/Genre'
import Fansub from '../../entity/Fansub'
import Season from '../../entity/Season'
import StaffMember from 'src/entity/StaffMember'
import Studio from '../../entity/Studio'

interface IAnime {
	id: number
	document: Document
}

export default class AnimeListJob extends AbstractJob {
	listDocument!: Document

	async getAnimeList(listId: number[]): Promise<IAnime[]> {
		const promises: Promise<IAnime>[] = listId.map(
			async (id): Promise<IAnime> => {
				const document = await new AnimeRequest(id).getDOM()
				console.log(`Request ${id}`)
				const iAnime: IAnime = { id, document }
				return iAnime
			}
		)
		return await Promise.all(promises)
	}

	getPartition(idList: number[]): number[][] {
		const partitionSize = 10
		const numberOfPartitions = idList.length / partitionSize
		const partitions: number[][] = []
		for (let i = 0; i < numberOfPartitions; i++) {
			const first = i * partitionSize
			const end = (i + 1) * partitionSize
			partitions.push(idList.slice(first, end))
		}
		return partitions
	}

	async run(): Promise<void> {
		console.log('job running')
		this.listDocument = await new AnimeListRequest().getDOM()
		console.log('List Document generated')
		const listParser = new AnimeListParser(this.listDocument)

		const delay = (t: number, val: undefined) => {
			return new Promise(function (resolve) {
				setTimeout(() => {
					resolve(val)
				}, t)
			})
		}

		const partition: number[][] = this.getPartition(
			listParser.getModel().animeIdList
		)

		partition.slice(0, 10).forEach(async (ids) => {
			const animeIdDocument: IAnime[] = await this.getAnimeList(ids)

			const models: AnimeModel[] = animeIdDocument.map(
				({ id, document }) => {
					return new AnimeParser(document, id).getModel()
				}
			)

			const genreMap = await Persistence.generateGenres(models)
			const fansubMap = await Persistence.generateFansubs(models)
			const seasonMap = await Persistence.generateSeason(models)
			const staffMap = await Persistence.generateStaff(models)
			const studioMap = await Persistence.generateStudio(models)

			await delay(10000, undefined)
			models.forEach(async (model) => {
				console.log(`Saving anime ${model.name}`)

				const genres: Genre[] = []
				model.genres.forEach((genre) => {
					const genreToAdd = genreMap.get(genre)
					if (genreToAdd === undefined) {
						console.log(`Genre undefined ${genre}`)
					} else genres.push(genreToAdd)
				})
				const fansubs: Fansub[] = []
				model.fansubs.forEach((fansub) => {
					const fansubToAdd = fansubMap.get(fansub.name)
					if (fansubToAdd === undefined) {
						console.log(`Fansub undefined ${fansub.name}`)
					} else fansubs.push(fansubToAdd)
				})
				let seasonToAdd: Season | undefined
				let directorToAdd: StaffMember | undefined
				let creatorToAdd: StaffMember | undefined
				let studioToAdd: Studio | undefined

				if (model.season) {
					seasonToAdd = seasonMap.get(model.season)
				}
				if (model.director) {
					directorToAdd = staffMap.get(model.director)
				}
				if (model.originalCreator) {
					creatorToAdd = staffMap.get(model.originalCreator)
				}
				if (model.studio) {
					studioToAdd = studioMap.get(model.studio)
				}

				const season: Season | undefined = seasonToAdd
				const director: StaffMember | undefined = directorToAdd
				const originalCreator: StaffMember | undefined = creatorToAdd
				const studio: Studio | undefined = studioToAdd

				const anime = new Anime().generate({
					id: model.id,
					name: model.name,
					episodes: model.episodes,
					malId: model.malId,
					synopsis: model.synopsis,
					genres: genres,
					director: director,
					fansubs: fansubs,
					season: season,
					originalCreator: originalCreator,
					studio: studio,
				})
				try {
					await Anime.save(anime)
				} catch (error) {
					console.log(`Error saving ${anime.name}: ${error}`)
					console.log(anime.toString())
					console.log(JSON.stringify(model))
				}
			})
		})
	}
}
