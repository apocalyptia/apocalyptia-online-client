import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'

const RecurveBow = new Gear({
	id: ``,
	name: `Recurve Bow`,
	type: `Ranged Weapon`,
	sz: 2,
	attr: [
		TwoHanded,
	]
})
RecurveBow.dmg = 1
RecurveBow.rng = 10
RecurveBow.cap = 1
RecurveBow.cal = `Arrow`

export default RecurveBow