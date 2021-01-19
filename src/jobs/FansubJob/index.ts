import FansubParser from '../../parsers/FansubParser'
import FansubRequest from '../../requests/FansubRequest'
import Fansub from '../../entity/Fansub'
import AbstractJob from '../AbstractJob'

export default class FansubJob extends AbstractJob {
	async run(): Promise<void> {
		const fansubs: Fansub[] = await Fansub.find()
		console.log(fansubs.length)
		await Promise.all(
			fansubs
				.filter((fansub) => fansub.infoAnimeLink)
				.map(async (fansub) => {
					console.log(`Getting fansub link: ${fansub.infoAnimeLink}`)
					const dom = await new FansubRequest(
						fansub.infoAnimeLink as string
					).getDOM()
					const model = new FansubParser(dom, fansub).getModel()
					if (model.link) {
						console.log(
							`Saving fansub ${fansub.name} link ${model.link}`
						)
						fansub.link = model.link
						await Fansub.save(fansub)
					}
				})
		)
	}
}
