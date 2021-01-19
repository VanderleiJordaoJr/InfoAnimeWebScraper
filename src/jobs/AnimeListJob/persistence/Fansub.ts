import AnimeModel from '../../../models/AnimeModel'
import Fansub from '../../../entity/Fansub'
import FansubModel from '../../../models/FansubModel'

export default async function generateFansubs(
	modelList: AnimeModel[]
): Promise<Map<string, Fansub>> {
	const map = new Map<string, Fansub>()
	const fansubs: FansubModel[] = []
	modelList.forEach((model) => {
		fansubs.push(...model.fansubs)
	})
	fansubs.filter((fansub) => {
		if (fansub === undefined) return false
		if (fansub.name === undefined) return false
		else return true
	})
	new Set(fansubs).forEach(async (fansub) => {
		console.log(`Fansub: ${fansub.name} ${fansub.infoAnimeLink}`)
		const searchByName = await Fansub.createQueryBuilder('fansub')
			.where('fansub.name = :name', { name: fansub.name })
			.getOne()

		if (searchByName) {
			console.log(`Fansub ${searchByName.name} already exists.`)
			map.set(fansub.name, searchByName)
			return
		}
		const newFansub = new Fansub().generate(fansub)
		try {
			await Fansub.save(newFansub)
			map.set(newFansub.name, newFansub)
		} catch (error) {
			console.log(`Error ${error} when trying to save ${fansub}`)
		}
	})
	return map
}
