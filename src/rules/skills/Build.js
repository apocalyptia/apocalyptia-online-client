import Rule from '/src/classes/Rule.js'

const Build = new Rule({
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
			`Customizations take a number of hours to complete equal to the Difficulty.`,
			`Each Customization can only be applied once on per item.`,
			`Each item can have up to 3 unique Customizations.`,
			`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Weapon Attribute.`,
			`Armor: +1 Absorption or a new Armor Attribute.`,
		]
	}),
	repair: new Rule({
		id: `5dcd9938-820f-40b6-b1db-051c99295997`,
		name: `Repair`,
		desc: [
			`Fixing a broken item takes a number of hours to complete equal to the Difficulty.`,
			`+1 to the Build(Repair) roll when using Parts from the same kind of item.`,
		]
	})
}

export default Build