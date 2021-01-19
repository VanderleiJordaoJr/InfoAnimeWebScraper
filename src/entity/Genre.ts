import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import Anime from './Anime'

@Entity('genres')
export default class Genre extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ unique: true })
	name: string

	@ManyToMany(() => Anime, (anime) => anime.genres)
	animes!: Anime[]

	constructor(name: string) {
		super()
		this.name = name
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
