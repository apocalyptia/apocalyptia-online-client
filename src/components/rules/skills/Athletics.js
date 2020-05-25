import Skill from './Skill'
import Specialty from './Specialty'


const Athletics = new Skill({
	id: `b13484a3-9340-47a2-9fe4-079a886beb56`,
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Specialty({
			id: `fda9b21e-5ee1-448f-a7f5-3d358e9ad062`,
			name: `Climb`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Specialty({
			id: `f35bb291-4130-4cba-9841-dcc156eba70c`,
			name: `Swim`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
})

export default Athletics