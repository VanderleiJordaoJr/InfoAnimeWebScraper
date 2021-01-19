import FansubModel from 'src/models/FansubModel'
import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import Anime from './Anime'

@Entity('fansubs')
export default class Fansub extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	name!: string

	@Column({ nullable: true })
	link?: string

	@Column({ nullable: true })
	infoAnimeLink?: string

	@ManyToMany(() => Anime, (anime) => anime.fansubs)
	animes?: Anime[]

	constructor() {
		super()
	}

	generate(fansub: FansubModel): Fansub {
		this.name = fansub.name
		this.infoAnimeLink = fansub.infoAnimeLink
		this.link = fansub.link
		return this
	}
}
