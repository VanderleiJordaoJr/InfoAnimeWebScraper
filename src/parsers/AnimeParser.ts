import AnimeModel from '../models/AnimeModel'
import AbstractParser from './AbstractParser'
import {
	getArrayFromHTMLCollection,
	getElementInListByHref,
	getElementsInListByHref,
	getSeasonName,
} from '../helpers/parser'
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
		else throw new Error(`Error with anime ${this.id}`)
	}

	getGenres(): string[] {
		return getElementsInListByHref(
			this.getDataGridElementList(),
			/lista\?lista=gen/
		)
	}

	getSeason(): string | undefined {
		return getSeasonName(
			getElementInListByHref(
				this.getDataGridElementList(),
				/lista\?lista=ano/
			),
			this.getName()
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

	getEpisodes(): number | undefined {
		const text = this.getDataGridText()
			.split('Número de Episódios: ')[1]
			.split('Direção: ')[0]
			.trim()
		const eps = Number.parseInt(text)
		if (isNaN(eps)) {
			console.log(`NaN | Undefined eps in ${this.getName()}`)
			return undefined
		}
		return eps
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

	getMalId(): number | undefined {
		try {
			const div = this.document.querySelector('div[title="MyAnimeList"]')
			if (div === null) throw new Error('Element not founded')
			const parentElement = div.parentElement
			if (parentElement === null)
				throw new Error('Parent element not founded')
			const href = parentElement.getAttribute('href')
			if (href === null) throw new Error('Href not founded')
			const matchResult = href.match(/anime\/([0-9]+)/)
			if (matchResult === null) throw new Error('matchResult not founded')
			const malId = matchResult.pop()
			if (malId === undefined) throw new Error('malId not founded')
			return Number.parseInt(malId)
		} catch (err) {
			console.log(`${err} in anime ${this.id}`)
			return undefined
		}
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
