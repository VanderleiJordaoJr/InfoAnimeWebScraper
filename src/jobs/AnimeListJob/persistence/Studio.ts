import AnimeModel from '../../../models/AnimeModel'
import Studio from '../../../entity/Studio'

export default async function generateStudio(
	modelList: AnimeModel[]
): Promise<Map<string, Studio>> {
	const map = new Map<string, Studio>()
	const studio: string[] = []
	modelList.forEach((model) => {
		if (model.studio) studio.push(model.studio)
	})
	new Set(studio).forEach(async (studio) => {
		console.log(`Studio: ${studio}`)

		const searchByName = await Studio.createQueryBuilder('studio')
			.where('studio.name = :name', { name: studio })
			.getOne()

		if (searchByName) {
			console.log(`Studio ${searchByName.name} already exists.`)
			map.set(studio, searchByName)
			return
		}
		const newStudio = new Studio(studio)
		try {
			await Studio.save(newStudio)
			map.set(studio, newStudio)
		} catch (error) {
			console.log(`Error ${error} when trying to save ${studio}`)
		}
	})
	return map
}
