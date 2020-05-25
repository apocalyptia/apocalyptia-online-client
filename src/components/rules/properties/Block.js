import Property from './Property'
import Melee from '../skills/Melee'


const Block = new Property({
	id: `ceb4a52f-8e47-4892-8d34-4ff4de12a486`,
	name: Melee.specs.block.name,
	desc: [
		`Block = Melee`,
		...Melee.specs.block.desc,
	],
	formula: (c) => {
		c.props.block.score = c.skills.melee.score
	},
	base: 0,
	score: 0
})

export default Block