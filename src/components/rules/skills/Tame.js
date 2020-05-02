import Skill from '../../classes/Skill'
import Specialty from '../../classes/Specialty'


const tame = new Skill({
	name: `Tame`,
	desc: [
		`Alter an animal’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		command: new Specialty({
			name: `Command`,
			desc: [
				`Animal obeys your command.`,
			]
		}),
		train: new Specialty({
			name: `Train`,
			desc: [
				`(1wk) Animals learn commands = [its Brains x 2].`,
			]
		})
	}
})

export default tame