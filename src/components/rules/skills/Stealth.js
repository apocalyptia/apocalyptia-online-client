import Rule from 'classes/Rule.js'

const Stealth = new Rule({
	id: `8acb7f56-c5c5-4918-97b9-15260024fb15`,
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	type: `Skill`
})
Stealth.parent = `Agility`
Stealth.diff = `Perception`
Stealth.specs = {
	hide: new Rule({
		id: `bcec6762-9716-497d-894a-626f8e0d77d7`,
		name: `Hide`,
		desc: [
			`Stay motionless and Concealed`,
			`+3 if Prone.`,
		]
	}),
	sneak: new Rule({
		id: `7d49df11-ede2-4a18-bb20-711e44f2445b`,
		name: `Sneak`,
		desc: [
			`Move Walk Speed while Concealed.`,
		]
	})
}

export default Stealth