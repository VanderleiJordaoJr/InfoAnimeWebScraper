import AnimeModel from '../../../models/AnimeModel'
import { Maps } from '.'
import Anime from '../../../entity/Anime'
import Genre from '../../../entity/Genre'
import Fansub from '../../../entity/Fansub'
import Season from '../../../entity/Season'
import StaffMember from '../../../entity/StaffMember'
import Studio from '../../../entity/Studio'

export default class AnimePersistence {
	animeModel: AnimeModel
	genreMap: Map<string, Genre>
	fansubMap: Map<string, Fansub>
	seasonMap: Map<string, Season>
	staffMap: Map<string, StaffMember>
	studioMap: Map<string, Studio>

	constructor(model: AnimeModel, map: Maps) {
		this.animeModel = model
		const { genreMap, fansubMap, seasonMap, staffMap, studioMap } = map
		this.genreMap = genreMap
		this.fansubMap = fansubMap
		this.seasonMap = seasonMap
		this.staffMap = staffMap
		this.studioMap = studioMap
	}

	getGenres(): Genre[] {
		const genres: Genre[] = []
		this.animeModel.genres.forEach((genre) => {
			const genreToAdd = this.genreMap.get(genre)
			if (genreToAdd === undefined) {
				console.log(`Genre undefined ${genre}`)
			} else genres.push(genreToAdd)
		})
		return genres
	}

	getFansubs(): Fansub[] {
		const fansubs: Fansub[] = []
		this.animeModel.fansubs.forEach((fansub) => {
			const fansubToAdd = this.fansubMap.get(fansub.name)
			if (fansubToAdd === undefined) {
				console.log(`Fansub undefined ${fansub.name}`)
			} else fansubs.push(fansubToAdd)
		})
		return fansubs
	}

	getSeason(): Season | undefined {
		if (this.animeModel.season) {
			return this.seasonMap.get(this.animeModel.season)
		} else return undefined
	}

	getDirector(): StaffMember | undefined {
		if (this.animeModel.director) {
			return this.staffMap.get(this.animeModel.director)
		} else return undefined
	}

	getCreator(): StaffMember | undefined {
		if (this.animeModel.originalCreator) {
			return this.staffMap.get(this.animeModel.originalCreator)
		} else return undefined
	}

	getStudio(): Studio | undefined {
		if (this.animeModel.studio) {
			return this.studioMap.get(this.animeModel.studio)
		} else return undefined
	}

	async saveAnime(): Promise<void> {
		const model = this.animeModel
		console.log(`Saving anime ${model.name}`)

		const anime = new Anime().generate({
			id: model.id,
			name: model.name,
			episodes: model.episodes,
			malId: model.malId,
			synopsis: model.synopsis,
			genres: this.getGenres(),
			director: this.getDirector(),
			fansubs: this.getFansubs(),
			season: this.getSeason(),
			originalCreator: this.getCreator(),
			studio: this.getStudio(),
		})
		try {
			await Anime.save(anime)
		} catch (error) {
			console.log(`Error saving ${anime.name}: ${error}`)
			console.log(anime.toString())
			console.log(JSON.stringify(model))
		}
	}
}
