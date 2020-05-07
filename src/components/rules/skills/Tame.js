import Skill from './Skill'
import Specialty from './Specialty'


const Tame = new Skill({
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

export default Tame