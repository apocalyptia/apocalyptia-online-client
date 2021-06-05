import Creation from '/src/classes/Creation.js'

const Gear = new Creation({
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
	type: `Creation`
})

export default Gear
