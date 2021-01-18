import AbstractRequest from './AbstractRequest'

export default class FansubRequest extends AbstractRequest {
	link: string

	constructor(link: string) {
		super()
		this.link = link
	}

	getPath(): string {
		return `${this.basePath}${this.link}`
	}
}
