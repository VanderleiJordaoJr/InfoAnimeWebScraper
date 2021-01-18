import FansubRequest from '../requests/FansubRequest'

export interface IFansubModel {
	name: string
	infoAnimeLink: string
}

export default class FansubModel {
	name: string
	infoAnimeLink: string
	link?: string

	constructor(model: FansubModel | IFansubModel) {
		this.name = model.name
		this.infoAnimeLink = model.infoAnimeLink
	}

	setLink(link: string): void {
		this.link = link
	}

	getRequest(): FansubRequest {
		return new FansubRequest(this.infoAnimeLink)
	}
}
