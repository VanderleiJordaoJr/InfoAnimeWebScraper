import FansubModel from './FansubModel'

export interface IAnimeModel {
	id: number
	name: string
	episodes: number
	malId: number
	synopsis: string
	genres: string[]
	fansubs: FansubModel[]
	studio: string
	season: string
	director: string
	originalCreator: string
}

export default class AnimeModel {
	id: number
	name: string
	episodes: number
	malId: number
	synopsis: string
	genres: string[]
	fansubs: FansubModel[]
	studio: string
	season: string
	director: string
	originalCreator: string

	constructor(model: IAnimeModel) {
		this.id = model.id
		this.name = model.name
		this.episodes = model.episodes
		this.malId = model.malId
		this.synopsis = model.synopsis
		this.genres = model.genres
		this.fansubs = model.fansubs
		this.studio = model.studio
		this.season = model.season
		this.director = model.director
		this.originalCreator = model.originalCreator
	}
}
