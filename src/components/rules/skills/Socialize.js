import Skill from './Skill'
import Specialty from './Specialty'


const Socialize = new Skill({
	name: `Socialize`,
	desc: [
		`Alter a person’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		persuade: new Specialty({
			name: `Persuade`,
			desc: [
				`(d6mins) Target seriously considers your opinion.`,
			]
		}),
		therapy: new Specialty({
			name: `Therapy`,
			desc: [
				`Heal 1 Trauma`,
				`Cannot be performed again on the same day.`,
				`d6 Trauma on a Botch.`,
			]
		})
	}
})

export default Socialize