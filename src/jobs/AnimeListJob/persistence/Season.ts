import AnimeModel from '../../../models/AnimeModel'
import Season from '../../../entity/Season'

export default async function generateSeason(
	modelList: AnimeModel[]
): Promise<Map<string, Season>> {
	const map = new Map<string, Season>()
	const seasons: string[] = []
	modelList.forEach((model) => {
		if (model.season === undefined) return
		else seasons.push(model.season)
	})
	new Set(seasons).forEach(async (season) => {
		console.log(`Season: ${season}`)

		const searchByName = await Season.createQueryBuilder('season')
			.where('season.name = :name', { name: season })
			.getOne()

		if (searchByName) {
			console.log(`Season ${searchByName.name} already exists.`)
			map.set(season, searchByName)
			return
		}
		const newSeason = new Season().generate(season)
		try {
			await Season.save(newSeason)
			map.set(season, newSeason)
		} catch (error) {
			console.log(`Error ${error} when trying to save ${season}`)
		}
	})
	return map
}
