import AnimeModel from '../models/AnimeModel'
import AbstractParser from './AbstractParser'

export default class AnimeParser extends AbstractParser<AnimeModel> {
	getModel(): AnimeModel {
		return new AnimeModel()
	}
}
