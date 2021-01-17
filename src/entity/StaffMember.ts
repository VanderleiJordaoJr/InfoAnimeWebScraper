import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('staff')
export class StaffMember extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string
}
