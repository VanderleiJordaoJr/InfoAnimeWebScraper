import Fansub from '../entity/Fansub'

export interface IFansubModel {
	name: string
	infoAnimeLink: string
	link?: string
}

export default class FansubModel {
	name: string
	infoAnimeLink: string | undefined
	link: string | undefined

	constructor(model: FansubModel | IFansubModel | Fansub) {
		this.name = model.name
		this.infoAnimeLink = model.infoAnimeLink
	}

	setLink(link: string | undefined): void {
		this.link = link
	}
}
