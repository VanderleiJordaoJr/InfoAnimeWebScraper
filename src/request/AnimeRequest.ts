import Request from './Request'

export default class AnimeRequest extends Request {
	id: number

	constructor(id: number) {
		super()
		this.id = id
	}

	getPath(): string {
		return `${this.basePath}dados?obra=${this.id}`
	}
}
