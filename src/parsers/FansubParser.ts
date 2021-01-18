import FansubModel from '../models/FansubModel'
import AbstractParser from './AbstractParser'

export default class FansubParser extends AbstractParser<FansubModel> {
	getModel(): FansubModel {
		return new FansubModel()
	}
}
