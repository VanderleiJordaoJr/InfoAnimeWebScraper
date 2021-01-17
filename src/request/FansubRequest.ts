import Request from './Request'

export default class FansubRequest extends Request {
	savedLink: string

	constructor(savedLink: string) {
		super()
		this.savedLink = savedLink
	}

	getPath(): string {
		return this.savedLink
	}
}
