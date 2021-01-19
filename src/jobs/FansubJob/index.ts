import Fansub from '../../entity/Fansub'
import AbstractJob from '../AbstractJob'

export default class FansubJob extends AbstractJob {
	async run(): Promise<void> {
		const fansubs: Fansub[] = await Fansub.find()
		await Promise.all(
			fansubs.map(async (fansub) => {
				console.log(fansub.name)
			})
		)
	}
}
