import AbstractRequest from './AbstractRequest'

export default class AnimeRequest extends AbstractRequest {
	id: number

	constructor(id: number) {
		super()
		this.id = id
	}

	getPath(): string {
		return `${this.basePath}/dados?obra=${this.id}`
	}
}
