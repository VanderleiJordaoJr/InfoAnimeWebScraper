import { BaseEntity, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ManyToOne, PrimaryColumn } from 'typeorm'
import Fansub from './Fansub'
import Genre from './Genre'
import Season from './Season'
import StaffMember from './StaffMember'
import Studio from './Studio'

export interface IAnime {
	id: number
	name: string
	episodes: number | undefined
	malId: number | undefined
	synopsis: string
	genres: Genre[]
	fansubs: Fansub[]
	studio: Studio | undefined
	season: Season | undefined
	director: StaffMember | undefined
	originalCreator: StaffMember | undefined
}
@Entity('animes')
export default class Anime extends BaseEntity {
	@PrimaryColumn()
	id!: number

	@Column()
	name!: string

	@Column({ nullable: true })
	episodes?: number

	@Column({ nullable: true })
	malId?: number

	@Column({ nullable: true })
	synopsis?: string

	@ManyToMany(() => Genre, (genre) => genre.animes)
	@JoinTable()
	genres?: Genre[]

	@ManyToMany(() => Fansub, (fansub) => fansub.animes)
	@JoinTable()
	fansubs?: Fansub[]

	@ManyToOne(() => Studio, (studio) => studio.animes)
	studio?: Studio

	@ManyToOne(() => Season, (season) => season.animes)
	season?: Season

	@ManyToOne(() => StaffMember)
	director?: StaffMember

	@ManyToOne(() => StaffMember)
	originalCreator?: StaffMember | null

	constructor() {
		super()
	}

	generate(anime: IAnime): Anime {
		this.id = anime.id
		this.name = anime.name
		this.episodes = anime.episodes
		this.malId = anime.malId
		this.synopsis = anime.synopsis
		this.genres = anime.genres
		this.fansubs = anime.fansubs
		this.studio = anime.studio
		this.season = anime.season
		this.director = anime.director
		this.originalCreator = anime.originalCreator
		return this
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
