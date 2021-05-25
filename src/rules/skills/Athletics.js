import Skill from '../../classes/Skill.js' 
import Specialty from '../../classes/Specialty.js' 

const Athletics = new Skill({
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	type: `Skill`,
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Specialty({
			name: `Climb`,
			type: `Specialty`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Specialty({
			name: `Swim`,
			type: `Specialty`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
})

export default Athletics