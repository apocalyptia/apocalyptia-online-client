import Bomb from './Bomb'
import Blast from '../../attributes/weapon/Blast'
import FireDamage from '../../attributes/weapon/FireDamage'


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