import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import { Anime } from './Anime'

export enum ESeason {
	FALL = 'Fall',
	SUMMER = 'Summer',
	SPRING = 'Spring',
	WINTER = 'Winter',
}

@Entity('seasons')
export class Season extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'date' })
	start: Date

	@Column()
	year: number

	@Column({
		type: 'enum',
		enum: ESeason,
	})
	season: ESeason

	@OneToMany(() => Anime, (anime) => anime.season)
	animes: Anime[]

	name(): string {
		return `${this.season}\\${this.year}`
	}
}
