import { ESeason } from '../entity/Season'

export function getArrayFromHTMLCollection(
	list:
		| HTMLCollection
		| NodeListOf<HTMLAnchorElement | HTMLElement>
		| undefined
): HTMLElement[] {
	if (list !== undefined) return Array.prototype.slice.call(list)
	else return []
}

export function getElementsInListByHref(
	elementList: HTMLElement[],
	regex: RegExp
): string[] {
	const filteredList = elementList.filter(
		(element) => !!element.getAttribute('href')?.match(regex)
	)
	return filteredList.map((element) => element.innerHTML)
}

export function getElementInListByHref(
	elementList: HTMLElement[],
	regex: RegExp
): string {
	const filteredList = elementList.filter(
		(element) => !!element.getAttribute('href')?.match(regex)
	)
	return filteredList.map((element) => element.innerHTML)[0]
}

export function getSeasonName(
	infoAnimeName: string,
	anime: string
): string | undefined {
	if (!infoAnimeName || infoAnimeName.length === 0) return
	const seasonMap = new Map<string, ESeason>([
		['OUTONO', ESeason.FALL],
		['FALL', ESeason.FALL],
		['VERÃO', ESeason.SUMMER],
		['SUMMER', ESeason.SUMMER],
		['PRIMAVERA', ESeason.SPRING],
		['SPRING', ESeason.SPRING],
		['INVERNO', ESeason.WINTER],
		['WINTER', ESeason.WINTER],
	])

	const monthSeasonMap = new Map<string, ESeason>([
		['JANEIRO', ESeason.WINTER],
		['FEVEREIRO', ESeason.WINTER],
		['MARÇO', ESeason.WINTER],

		['ABRIL', ESeason.SPRING],
		['MAIO', ESeason.SPRING],
		['JUNHO', ESeason.SPRING],

		['JULHO', ESeason.SUMMER],
		['AGOSTO', ESeason.SUMMER],
		['SETEMBRO', ESeason.SUMMER],

		['OUTUBRO', ESeason.FALL],
		['NOVEMBRO', ESeason.FALL],
		['DEZEMBRO', ESeason.FALL],
	])

	const matched = infoAnimeName.match(/([a-zA-ZÇç]+)[ /]?([0-9]+)/)
	if (matched === null) {
		console.log(`Invalid season ${anime}:  ${infoAnimeName}`)
		return undefined
	}
	const year = matched.pop()
	let month = matched.pop()
	if (year === undefined || month === undefined) {
		console.log(`Invalid season ${anime}:  ${infoAnimeName} ${month}`)
		return undefined
	}

	month = month.toUpperCase()
	const season =
		monthSeasonMap.get(month) === undefined
			? seasonMap.get(month)
			: monthSeasonMap.get(month)
	if (season === undefined) {
		console.log(`Invalid season ${anime}:  ${infoAnimeName} ${month}`)
		return undefined
	}

	return `${season} ${year}`
}
