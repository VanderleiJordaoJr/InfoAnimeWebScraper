import { getArrayFromHTMLCollection } from '../helpers/parser'
import AnimeListModel from '../models/AnimeListModel'
import AbstractParser from './AbstractParser'

export default class AnimeListParser extends AbstractParser<AnimeListModel> {
	getAnimeIdList(): number[] {
		const ids: number[] = []
		getArrayFromHTMLCollection(
			this.document.querySelector('#myUL')?.children
		)
			.filter(
				(childEntry: HTMLElement) =>
					childEntry.classList.toString().length == 0
			)
			.forEach((childEntry: HTMLElement) => {
				const href = childEntry.querySelector('a')?.href
				const result = href?.match(/dados\?obra=([0-9]+)/)?.pop()
				if (result !== undefined) {
					const idString = result.toString()
					const id = Number.parseInt(idString)
					ids.push(id)
				}
			})
		return ids
	}

	getModel(): AnimeListModel {
		return new AnimeListModel(this.getAnimeIdList())
	}
}
