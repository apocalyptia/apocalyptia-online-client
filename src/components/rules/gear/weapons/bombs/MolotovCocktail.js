import Gear from 'classes/Gear.js'
import Blast from 'attributes/Blast.js'
import FireDamage from 'attributes/FireDamage.js'

const MolotovCocktail = new Gear({
	id: `1b954e5d-fed1-4df7-905a-aed3fa9d2eec`,
	name: `Molotov Cocktail`,
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