import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import { Anime } from './Anime'

@Entity('fansubs')
export class Fansub extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	infoAnimeLink: string

	@Column({ nullable: true })
	link: string

	@ManyToMany(() => Anime, (anime) => anime.fansubs)
	animes: Anime[]
}
