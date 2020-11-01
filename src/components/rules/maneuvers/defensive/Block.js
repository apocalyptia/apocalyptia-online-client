import Rule from 'classes/Rule.js'
import melee from 'skills/Melee.js'

const Block = new Rule({
	id: `af99f6bc-7db2-41ec-b35e-e709bd29d8a1`,
	name: melee.specs.block.name, 
	desc: melee.specs.block.desc
})

export default Block