import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import Anime from './Anime'

export enum ESeason {
	FALL = 'Fall',
	SUMMER = 'Summer',
	SPRING = 'Spring',
	WINTER = 'Winter',
}

const seasonMap = new Map<string, ESeason>([
	['OUTONO', ESeason.FALL],
	['FALL', ESeason.FALL],
	['VERÃO', ESeason.SUMMER],
	['SUMMER', ESeason.SUMMER],
	['PRIMAVERA', ESeason.SPRING],
	['SPRING', ESeason.SPRING],
	['INVERNO', ESeason.WINTER],
	['WINTER', ESeason.WINTER],
])

@Entity('seasons')
export default class Season extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ unique: true })
	name!: string

	@Column()
	year!: number

	@Column({
		type: 'enum',
		enum: ESeason,
	})
	season!: ESeason

	@OneToMany(() => Anime, (anime) => anime.season)
	animes!: Anime[]

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}

	generate(name: string): Season {
		const seasonString: string[] = name.split(' ')
		const eSeason = seasonMap.get(seasonString[0].toUpperCase())
		const year = Number.parseInt(seasonString[1])
		if (eSeason === undefined || year === undefined) {
			console.log(`Error at ${name}`)
			throw new Error()
		}
		if (eSeason === null || year === null) {
			console.log(`Error at ${name}`)
			throw new Error()
		}

		this.season = eSeason
		this.year = year
		this.name = name
		return this
	}
}
