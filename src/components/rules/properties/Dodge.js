import Property from '../../classes/Property'
import Acrobatics from '../skills/Acrobatics'


const Dodge = new Property({
	name: Acrobatics.specs.dodge.name,
	desc: [
		`Dodge = Acrobatics`,
		...Acrobatics.specs.dodge.desc,
	],
	formula: (c) => {
		c.props.dodge.score = c.skills.acrobatics.score
	}
})

export default Dodge