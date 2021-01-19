import axios from 'axios'
import { JSDOM } from 'jsdom'

export default abstract class AbstractRequest {
	basePath = 'https://www.infoanime.com.br'

	abstract getPath(): string

	async getDOM(): Promise<Document> {
		const promise = axios.get(this.getPath())
		const response = await promise
			.then((success) => success)
			.catch((err) => {
				console.log(`Error running axios ${err}`)
			})
		if (response !== undefined)
			return new JSDOM(response.data).window.document
		else throw new Error()
	}
}
