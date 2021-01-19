import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('staff')
export default class StaffMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ unique: true })
	name: string

	constructor(name: string) {
		super()
		this.name = name
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
