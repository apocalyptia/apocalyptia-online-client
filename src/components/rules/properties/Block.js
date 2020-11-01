import Rule from 'classes/Rule.js'
import Melee from 'skills/Melee.js'

const Block = new Rule({
	id: `ceb4a52f-8e47-4892-8d34-4ff4de12a486`,
	name: Melee.specs.block.name,
	desc: [
		`Block = Melee`,
		...Melee.specs.block.desc,
	],
	formula: (c) => {
		c.props.block.score = c.skills.melee.score
	},
	type: `Property`
})

export default Block