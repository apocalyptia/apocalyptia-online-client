import Property from '../../classes/Property'
import Melee from '../skills/Melee'


const Block = new Property({
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