import Gear from 'classes/Gear.js'
import Blast from 'rules/gear/attributes/Blast.js'
import FireDamage from 'rules/gear/attributes/FireDamage.js'

const MolotovCocktail = new Gear({
	name: `Molotov Cocktail`,
	type: `Bomb`,
	desc: [
		`Glass bottle of fuel with rag wick.`,
	],
	sz: 1,
	attr: [
		Blast,
		FireDamage,
	]
})
MolotovCocktail.dmg = `1d6`
MolotovCocktail.rng = 3
MolotovCocktail.fuse = 10
MolotovCocktail.dur = 20
MolotovCocktail.mix = 3

export default MolotovCocktail