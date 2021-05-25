import Skill from '../../classes/Skill.js' 
import Specialty from '../../classes/Specialty.js' 

const Socialize = new Skill({
	name: `Socialize`,
	desc: [
		`Alter a person’s Attitude by one step.`,
	],
	type: `Skill`,
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		persuade: new Specialty({
			name: `Persuade`,
			type: `Specialty`,
			desc: [
				`(d6mins) Target seriously considers your opinion.`,
			]
		}),
		therapy: new Specialty({
			name: `Therapy`,
			type: `Specialty`,
			desc: [
				`Heal 1 Trauma`,
				`Cannot be performed again on the same target for one week.`,
				`d6 Trauma on a Botch.`,
			]
		})
	}
})

export default Socialize