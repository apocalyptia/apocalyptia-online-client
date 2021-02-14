import Rule from 'classes/Rule.js'
import melee from 'rules/skills/Melee.js'

const Block = new Rule({
	name: melee.specs.block.name, 
	desc: melee.specs.block.desc
})

export default Block