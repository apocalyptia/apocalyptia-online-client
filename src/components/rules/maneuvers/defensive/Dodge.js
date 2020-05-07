import Maneuver from '../Maneuver'
import acrobatics from '../../skills/Acrobatics'


const Dodge = new Maneuver({
	cat: `Defensive`,
	name: acrobatics.specs.dodge.name, 
	desc: acrobatics.specs.dodge.desc
})

export default Dodge