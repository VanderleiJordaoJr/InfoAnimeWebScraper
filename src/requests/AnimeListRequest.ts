import AbstractRequest from './AbstractRequest'

export default class AnimeListRequest extends AbstractRequest {
	getPath(): string {
		return `${this.basePath}listageral?t=a`
	}
}
