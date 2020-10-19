import Bomb from 'gear/weapons/bombs/Bomb.js'
import Blast from 'gear/attributes/weapon/Blast.js'
import FireDamage from 'gear/attributes/weapon/FireDamage.js'


const MolotovCocktail = new Bomb({
	id: `1b954e5d-fed1-4df7-905a-aed3fa9d2eec`,
	name: `Molotov Cocktail`,
	desc: [
		`Glass bottle of fuel with rag wick.`,
	],
	sz: 1,
	dmg: `d6 + 1 Fire Damage/round`,
	rng: `3yd`,
	attr: [
		Blast,
		FireDamage,
	],
	fuse: `1 round`,
	dur: `1min`,
	mix: 3
})

export default MolotovCocktail