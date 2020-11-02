import Rule from 'classes/Rule.js'
import acrobatics from 'skills/Acrobatics.js'

const Dodge = new Rule({
	name: acrobatics.specs.dodge.name, 
	desc: acrobatics.specs.dodge.desc
})

export default Dodge