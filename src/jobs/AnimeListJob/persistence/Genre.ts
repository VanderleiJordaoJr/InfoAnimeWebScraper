import AnimeModel from '../../../models/AnimeModel'
import Genre from '../../../entity/Genre'

export default async function generateGenres(
	modelList: AnimeModel[]
): Promise<Map<string, Genre>> {
	const map = new Map<string, Genre>()
	const genres: string[] = []
	modelList.forEach((model) => {
		genres.push(...model.genres)
	})
	genres.filter((genre) => !(genre === undefined))
	new Set(genres).forEach(async (genre) => {
		console.log(`Genre: ${genre}`)
		const searchByName = await Genre.createQueryBuilder('genre')
			.where('genre.name = :name', { name: genre })
			.getOne()

		if (searchByName) {
			console.log(`Genre ${searchByName.name} already exists.`)
			map.set(genre, searchByName)
			return
		}
		const newGenre = new Genre(genre)
		try {
			await Genre.save(newGenre)
			map.set(genre, newGenre)
		} catch (error) {
			console.log(`Error ${error} when trying to save ${genre}`)
		}
	})
	return map
}
