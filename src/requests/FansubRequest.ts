import AbstractRequest from './AbstractRequest'

export default class FansubRequest extends AbstractRequest {
	savedLink: string

	constructor(savedLink: string) {
		super()
		this.savedLink = savedLink
	}

	getPath(): string {
		return this.savedLink
	}
}
