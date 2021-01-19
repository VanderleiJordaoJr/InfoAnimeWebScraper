import FansubModel from '../models/FansubModel'
import AbstractParser from './AbstractParser'

export default class FansubParser extends AbstractParser<FansubModel> {
	fansubBaseModel: FansubModel

	constructor(document: Document, fansubBaseModel: FansubModel) {
		super(document)
		this.fansubBaseModel = fansubBaseModel
	}

	getLink(): string | undefined {
		const result = this.document
			.querySelector('div[title="Site"]')
			?.parentElement?.getAttribute('href') as string
		console.log(result)
		if (result !== undefined) return result
		else {
			console.log(`Undefined link at fansub ${this.fansubBaseModel.name}`)
			return undefined
		}
	}

	getModel(): FansubModel {
		const model = new FansubModel(this.fansubBaseModel)
		model.setLink(this.getLink())
		return model
	}
}
