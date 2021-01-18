import AnimeListModel from '../models/AnimeListModel'
import AbstractParser from './AbstractParser'

export default class AnimeListParser extends AbstractParser<AnimeListModel> {
	getAnimeIdList(): number[] {
		const ids: number[] = []
		Array.prototype.slice
			.call(this.document.querySelector('#myUL')?.children)
			.filter(
				(childEntry: HTMLElement) =>
					childEntry.classList.toString().length == 0
			)
			.forEach((childEntry: HTMLElement) => {
				const href = childEntry.querySelector('a')?.href
				const result = href?.match(/dados\?obra=([0-9]+)/)?.pop
				if (result !== undefined)
					ids.push(Number.parseInt(result.toString()))
			})
		return ids
	}

	getModel(): AnimeListModel {
		return new AnimeListModel(this.getAnimeIdList())
	}
}
