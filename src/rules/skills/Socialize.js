import Rule from 'classes/Rule.js'

const Socialize = new Rule({
	name: `Socialize`,
	desc: [
		`Alter a person’s Attitude by one step.`,
	],
	type: `Skill`
})
Socialize.parent = `Demeanor`
Socialize.diff = `Demeanor`
Socialize.specs = {
	persuade: new Rule({
		id: `8ad47e9b-a223-455f-9499-72a012509577`,
		name: `Persuade`,
		desc: [
			`(d6mins) Target seriously considers your opinion.`,
		]
	}),
	therapy: new Rule({
		id: `83398ae1-5fad-45ef-a523-09d2b403ac7c`,
		name: `Therapy`,
		desc: [
			`Heal 1 Trauma`,
			`Cannot be performed again on the same day.`,
			`d6 Trauma on a Botch.`,
		]
	})
}

export default Socialize