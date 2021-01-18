import AnimeModel from '../models/AnimeModel'
import AbstractParser from './AbstractParser'
import { getArrayFromHTMLCollection, getElementInListByHref } from '../helpers'
import { getElementsInListByHref } from '../helpers'
import FansubModel from '../models/FansubModel'

export default class AnimeParser extends AbstractParser<AnimeModel> {
	id: number

	constructor(document: Document, id: number) {
		super(document)
		this.id = id
	}

	getDataGrid(): Element {
		const element = this.document.querySelector('.grid_i_dados')
		if (element === null) throw new Error()
		else return element
	}

	getDataGridElementList(): HTMLElement[] {
		return getArrayFromHTMLCollection(
			this.getDataGrid().querySelectorAll('a')
		)
	}

	getDataGridText(): string {
		const text = this.getDataGrid().textContent
		if (text !== null) return text
		else throw new Error()
	}

	getName(): string {
		const name = this.document.querySelector('.titulo_obra')?.innerHTML
		if (name !== undefined) return name
		else throw new Error()
	}

	getGenres(): string[] {
		return getElementsInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=gen/
		)
	}

	getSeason(): string {
		return getElementInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=ano/
		)
	}

	getDirector(): string {
		return getElementInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=staff&pos=dir/
		)
	}

	getOriginalCreator(): string {
		return getElementInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=staff&pos=aut/
		)
	}

	getStudio(): string {
		return getElementInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=dist/
		)
	}

	getSynopsis(): string {
		return this.getDataGridText()
			.split('Resumo: ')[1]
			.split('Outros Títulos: ')[0]
			.trim()
	}

	getEpisodes(): number {
		const text = this.getDataGridText()
			.split('Número de Episódios: ')[1]
			.split('Direção: ')[0]
			.trim()
		return Number.parseInt(text)
	}

	getFansubs(): FansubModel[] {
		return getArrayFromHTMLCollection(
			this.document.querySelectorAll('td span a')
		)
			.map((element) => ({
				name: element.innerHTML,
				infoAnimeLink: element.getAttribute('href') as string,
			}))
			.map((iModel) => new FansubModel(iModel))
	}

	getMalId(): number {
		const result = this.document
			.querySelector('div[title="MyAnimeList"]')
			?.parentElement?.getAttribute('href')
			?.match(/anime\/([0-9]+)/)
			?.pop()
		if (result !== undefined) return Number.parseInt(result)
		else throw new Error()
	}

	getModel(): AnimeModel {
		return new AnimeModel({
			id: this.id,
			name: this.getName(),
			episodes: this.getEpisodes(),
			malId: this.getMalId(),
			synopsis: this.getSynopsis(),
			genres: this.getGenres(),
			fansubs: this.getFansubs(),
			studio: this.getStudio(),
			season: this.getSeason(),
			director: this.getDirector(),
			originalCreator: this.getOriginalCreator(),
		})
	}
}
