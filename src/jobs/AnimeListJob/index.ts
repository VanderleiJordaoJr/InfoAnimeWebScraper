import AnimeParser from '../../parsers/AnimeParser'
import AnimeListParser from '../../parsers/AnimeListParser'
import AnimeListRequest from '../../requests/AnimeListRequest'
import AnimeRequest from '../../requests/AnimeRequest'
import AbstractJob from '../AbstractJob'
import AnimeModel from '../../models/AnimeModel'
import getMap from './persistence'
import AnimePersistence from './persistence/Anime'

const getModels = async (idList: number[]): Promise<AnimeModel[]> => {
	const animeDocumentMap: Map<number, Document> = new Map()

	await Promise.all(
		idList.map(async (id) => {
			const document = await new AnimeRequest(id).getDOM()
			console.log(`Request ${id}`)
			animeDocumentMap.set(id, document)
		})
	)

	const models: AnimeModel[] = []
	animeDocumentMap.forEach((document, id) => {
		models.push(new AnimeParser(document, id).getModel())
	})
	return models
}

const getPartition = (idList: number[], partitionSize: number): number[][] => {
	const numberOfPartitions = idList.length / partitionSize
	const partitions: number[][] = []
	for (let i = 0; i < numberOfPartitions; i++) {
		const first = i * partitionSize
		const end = (i + 1) * partitionSize
		partitions.push(idList.slice(first, end))
	}
	return partitions
}
export default class AnimeListJob extends AbstractJob {
	partitionSize: number
	partitionsToProcess: number | undefined

	constructor(
		partitionSize: number,
		partitionsToProcess: number | undefined
	) {
		super()
		this.partitionSize = partitionSize
		this.partitionsToProcess = partitionsToProcess
	}

	async run(): Promise<void> {
		console.log('Anime List Job Running')
		const listDocument = await new AnimeListRequest().getDOM()
		console.log('List Document generated')
		const listParser = new AnimeListParser(listDocument)

		const partition: number[][] = getPartition(
			listParser.getModel().animeIdList,
			this.partitionSize
		)
		const processPartition = this.partitionsToProcess
			? partition.slice(0, this.partitionsToProcess)
			: partition

		processPartition.forEach(async (ids) => {
			const models = await getModels(ids)
			const maps = await getMap(models)
			setTimeout(async () => {
				await Promise.all(
					models.map(async (model) => {
						new AnimePersistence(model, maps).saveAnime()
					})
				)
			}, 1000)
		})
	}
}
