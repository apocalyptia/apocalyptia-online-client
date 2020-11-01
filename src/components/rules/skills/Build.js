import Rule from 'classes/Rule.js'

const Build = new Rule({
	id: `20af75d7-79ef-4b7d-b408-1721a7ae11c6`,
	name: `Build`,
	desc: [
		`Make an item from [d6 + #] Parts.`,
	],
	type: `Skill`
})
Build.parent = `Constitution`
Build.diff = `varies`
Build.specs = {
	customize: new Rule({
		id: `4d055bd5-9413-482f-aeef-ec64ced8d7a0`,
		name: `Customize`,
		desc: [
			`(#hrs) 3 per item`,
			`Each must be unique`,
			`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Rule`,
			`Armor: +1 Damage Resistance or a new Rule.`,
		]
	}),
	repair: new Rule({
		id: `5dcd9938-820f-40b6-b1db-051c99295997`,
		name: `Repair`,
		desc: [
			`(#hrs) Fix broken item`,
			`+1 with same Parts.`,
		]
	})
}

export default Build