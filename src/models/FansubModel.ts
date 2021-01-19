import FansubRequest from '../requests/FansubRequest'

export interface IFansubModel {
	name: string
	infoAnimeLink: string
	link?: string
}

export default class FansubModel {
	name: string
	infoAnimeLink: string
	link: string | undefined

	constructor(model: FansubModel | IFansubModel) {
		this.name = model.name
		this.infoAnimeLink = model.infoAnimeLink
	}

	setLink(link: string | undefined): void {
		this.link = link
	}

	getRequest(): FansubRequest {
		return new FansubRequest(this.infoAnimeLink)
	}
}
