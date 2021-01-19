import AnimeModel from '../../../models/AnimeModel'
import StaffMember from '../../../entity/StaffMember'

export default async function generateStaff(
	modelList: AnimeModel[]
): Promise<Map<string, StaffMember>> {
	const map = new Map<string, StaffMember>()
	const staffWithUndefined: string[] = []
	modelList.forEach((model) => {
		staffWithUndefined.push(model.director, model.originalCreator)
	})
	const staffs = staffWithUndefined.filter((staff) => !(staff === undefined))

	new Set(staffs).forEach(async (staff) => {
		console.log(`Staff: ${staff}`)

		const searchByName = await StaffMember.createQueryBuilder('staff')
			.where('staff.name = :name', { name: staff })
			.getOne()

		if (searchByName) {
			console.log(`Staff ${searchByName.name} already exists.`)
			map.set(staff, searchByName)
			return
		}
		const newStaff = new StaffMember(staff)
		try {
			await StaffMember.save(newStaff)
			map.set(staff, newStaff)
		} catch (error) {
			console.log(`Error ${error} when trying to save ${staff}`)
		}
	})
	return map
}
