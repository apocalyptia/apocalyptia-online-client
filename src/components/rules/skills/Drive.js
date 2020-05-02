import Skill from '../../classes/Skill'
import Specialty from '../../classes/Specialty'


const Drive = new Skill({
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		ram: new Specialty({
			name: `Ram`,
			desc: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Specialty({
			name: `Stunt`,
			desc: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
})

export default Drive