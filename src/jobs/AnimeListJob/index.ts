import AnimeParser from '../../parsers/AnimeParser'
import AnimeListParser from '../../parsers/AnimeListParser'
import AnimeListRequest from '../../requests/AnimeListRequest'
import AnimeRequest from '../../requests/AnimeRequest'
import AbstractJob from '../AbstractJob'
import AnimeModel from '../../models/AnimeModel'
import getMap from './persistence'
import AnimePersistence from './persistence/Anime'
export default class AnimeListJob extends AbstractJob {
	partitionSize: number
	partitionsToProcess: number | undefined
	partitionsToJump: number | undefined
	partitions: number[][]

	constructor(
		partitionSize: number,
		partitionsToProcess: number | undefined,
		partitionsToJump: number | undefined
	) {
		super()
		this.partitionSize = partitionSize
		this.partitionsToProcess = partitionsToProcess
		this.partitionsToJump = partitionsToJump
		this.partitions = []
	}

	setPartitions(idList: number[]): void {
		const partitionSize = this.partitionSize
		const numberOfPartitions = idList.length / partitionSize
		const partitions: number[][] = []
		for (let i = 0; i < numberOfPartitions; i++) {
			const first = i * partitionSize
			const end = (i + 1) * partitionSize
			partitions.push(idList.slice(first, end))
		}
		this.partitions = partitions
	}

	getPartitionsToProcess(): number[][] {
		const { partitions, partitionsToProcess } = this
		let partitionsToJump = this.partitionsToJump
		if (!partitionsToProcess) {
			console.log(
				`Processing all ${
					partitions.length * this.partitionSize
				} animes`
			)
			return partitions
		} else {
			if (!partitionsToJump) partitionsToJump = 0
			const processPartition = partitions.slice(
				partitionsToJump,
				partitionsToJump + partitionsToProcess
			)

			console.log(
				`Processing ${
					processPartition.length * this.partitionSize
				} animes`
			)
			return processPartition
		}
	}

	async getModels(idList: number[]): Promise<AnimeModel[]> {
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

	async run(): Promise<void> {
		console.log('Anime List Job Running')
		console.log('Requesting AnimeList DOM')
		const listDocument = await new AnimeListRequest().getDOM()
		console.log('List Document generated')
		const listParser = new AnimeListParser(listDocument)

		this.setPartitions(listParser.getModel().animeIdList)

		this.getPartitionsToProcess().forEach(async (ids) => {
			const models = await this.getModels(ids)
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
