import Request from './Request'

export default class AnimeListRequest extends Request {
	getPath(): string {
		return `${this.basePath}listageral?t=a`
	}
}
