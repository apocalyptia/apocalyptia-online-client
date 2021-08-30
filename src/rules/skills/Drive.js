import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Drive = new Skill({
	name: `Drive`,
	description: [`Operate vehicles.`],
	type: `Skill`,
	parent: `Constitution`,
	difficulty: `varies`,
	specialties: {
		ram: new Specialty({
			name: `Ram`,
			type: `Specialty`,
			description: [`Roll vs [ Drive (Stunt) ] to Attack with a vehicle.`],
		}),
		stunt: new Specialty({
			name: `Stunt`,
			type: `Specialty`,
			description: [`Roll vs [ Drive (Ram) ] for Defense with a vehicle.`],
		}),
	},
})

export default Drive
