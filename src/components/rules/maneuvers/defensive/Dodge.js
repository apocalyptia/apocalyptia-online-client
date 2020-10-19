import Maneuver from 'rules/maneuvers/Maneuver.js'
import acrobatics from 'rules/skills/Acrobatics.js'


const Dodge = new Maneuver({
	id: `dcc3220d-72cd-46b2-991d-a6568f5ccdf9`,
	cat: `Defensive`,
	name: acrobatics.specs.dodge.name, 
	desc: acrobatics.specs.dodge.desc
})

export default Dodge