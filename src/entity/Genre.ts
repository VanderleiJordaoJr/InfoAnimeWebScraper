import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import { Anime } from './Anime'

@Entity('genres')
export class Genre extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToMany(() => Anime, (anime) => anime.genres)
	animes: Anime[]
}