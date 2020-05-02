import Skill from '../../classes/Skill'
import Specialty from '../../classes/Specialty'


const athletics = new Skill({
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Specialty({
			name: `Climb`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Specialty({
			name: `Swim`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
})

export default athletics