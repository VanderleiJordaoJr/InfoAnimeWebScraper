import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import { Anime } from './Anime'

@Entity('studios')
export class Studio extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToMany(() => Anime, (anime) => anime.studio)
	animes: Anime[]
}
