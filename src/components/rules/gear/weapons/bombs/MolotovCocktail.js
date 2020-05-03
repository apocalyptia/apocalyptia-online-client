import Bomb from '../../../../classes/gear/weapons/Bomb'
import Blast from '../../attributes/weapon/Blast'
import FireDamage from '../../attributes/weapon/FireDamage'


const MolotovCocktail = new Bomb({
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