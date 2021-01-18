export default abstract class AbstractParser<T> {
	document: Document

	constructor(document: Document) {
		this.document = document
	}

	abstract getModel(): T
}
