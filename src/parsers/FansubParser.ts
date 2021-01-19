import Fansub from '../entity/Fansub'
import FansubModel from '../models/FansubModel'
import AbstractParser from './AbstractParser'

export default class FansubParser extends AbstractParser<FansubModel> {
	fansubBaseModel: FansubModel | Fansub

	constructor(document: Document, fansubBaseModel: FansubModel | Fansub) {
		super(document)
		this.fansubBaseModel = fansubBaseModel
	}

	getLink(): string | undefined {
		const result = this.document
			.querySelector('div[title="Site"]')
			?.parentElement?.getAttribute('href') as string
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
