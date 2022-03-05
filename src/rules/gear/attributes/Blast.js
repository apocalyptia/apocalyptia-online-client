import Attribute from '$classes/gear/Attribute.js'

const Blast = new Attribute({
	name: `Blast`,
	description: [`Roll [ d6 vs Reflexive Dodge ] against everyone in the Blast radius.`, `[ Damage / 2 ] on a miss (minimum 1).`]
})

export default Blast
