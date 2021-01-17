import { BaseEntity, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ManyToOne, PrimaryColumn } from 'typeorm'
import { Fansub } from './Fansub'
import { Genre } from './Genre'
import { Season } from './Season'
import { StaffMember } from './StaffMember'
import { Studio } from './Studio'

@Entity('animes')
export class Anime extends BaseEntity {
	@PrimaryColumn()
	id: number

	@Column()
	name: string

	@Column()
	episodes: number

	@Column()
	malId: number

	@Column()
	synopsis: string

	@ManyToMany(() => Genre, (genre) => genre.animes)
	@JoinTable()
	genres: Genre[]

	@ManyToMany(() => Fansub, (fansub) => fansub.animes)
	@JoinTable()
	fansubs: Fansub[]

	@ManyToOne(() => Studio, (studio) => studio.animes)
	studio: Studio

	@ManyToOne(() => Season, (season) => season.animes)
	season: Season

	@ManyToOne(() => StaffMember)
	director: StaffMember

	@ManyToOne(() => StaffMember)
	originalCreator: StaffMember
}
