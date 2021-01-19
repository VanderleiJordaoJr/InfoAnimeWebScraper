import generateGenres from './Genre'
import generateFansubs from './Fansub'
import generateSeason from './Season'
import generateStaff from './Staff'
import generateStudio from './Studio'

import Genre from '../../../entity/Genre'
import Fansub from '../../../entity/Fansub'
import Season from '../../../entity/Season'
import StaffMember from '../../../entity/StaffMember'
import Studio from '../../../entity/Studio'
import AnimeModel from '../../../models/AnimeModel'
export interface Maps {
	genreMap: Map<string, Genre>
	fansubMap: Map<string, Fansub>
	seasonMap: Map<string, Season>
	staffMap: Map<string, StaffMember>
	studioMap: Map<string, Studio>
}

export default async function getMap(models: AnimeModel[]): Promise<Maps> {
	return {
		genreMap: await generateGenres(models),
		fansubMap: await generateFansubs(models),
		seasonMap: await generateSeason(models),
		staffMap: await generateStaff(models),
		studioMap: await generateStudio(models),
	}
}
