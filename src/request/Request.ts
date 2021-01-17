import axios from 'axios'
import { JSDOM } from 'jsdom'

export default abstract class Request {
	basePath = 'https://www.infoanime.com.br/'

	abstract getPath(): string

	async getDOM(): Promise<Document> {
		const response = await axios.get(this.getPath())
		return new JSDOM(response.data).window.document
	}
}
