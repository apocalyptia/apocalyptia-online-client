import CreationStep from '/src/classes/CreationStep.js'

const Gear = new CreationStep({
	name: `Gear`,
	description: [
		`You start with some random Gear:`,
		`One piece of Armor`,
		`One Melee weapon`,
		`One Projectile weapon`,
		`1d6 rounds of Ammo`,
		`Random items = Luck`,
		`1 Food and 1 Water`
	],
	step: 4,
	type: `CreationStep`
})

export default Gear
