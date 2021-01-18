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
