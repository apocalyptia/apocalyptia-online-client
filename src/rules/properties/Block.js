import Rule from 'classes/Rule.js'
import Melee from 'rules/skills/Melee.js'

const Block = new Rule({
	name: Melee.specs.block.name,
	desc: [
		`Block = Melee`,
		...Melee.specs.block.desc,
	],
	formula: (c) => {
		c.properties.block.score = c.skills.melee.score
	},
	type: `Property`
})

export default Block