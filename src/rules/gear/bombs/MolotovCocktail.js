import Bomb from '/src/classes/gear/Bomb.js'
import Blast from '../attributes/Blast.js'
import FireDamage from '../attributes/FireDamage.js'

const MolotovCocktail = new Bomb({
	name: `Molotov Cocktail`,
	type: `Bomb`,
	desc: [`Glass bottle of fuel with rag wick.`],
	sz: 1,
	attr: [Blast, FireDamage]
})
MolotovCocktail.dmg = `1d6`
MolotovCocktail.rng = 3
MolotovCocktail.fuse = 10
MolotovCocktail.dur = 20
MolotovCocktail.mix = 3

export default MolotovCocktail
