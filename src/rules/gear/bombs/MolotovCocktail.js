import Bomb from '$classes/gear/Bomb.js'
import Blast from '../attributes/Blast.js'
import Fire from '../attributes/Fire.js'

const MolotovCocktail = new Bomb({
	name: `Molotov Cocktail`,
	type: `Bomb`,
	description: [`Glass bottle of fuel with rag wick.`],
	size: 1,
	attributes: [ Blast, Fire ],
	damage: `1d6`,
	range: 3,
	fuse: 10,
	duration: 20,
	mix: 3,
})

export default MolotovCocktail
