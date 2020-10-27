import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const RecurveBow = new Gear({
	id: `6852a491-fb8d-4fc3-a35e-2986ee70cd3f`,
	name: `Recurve Bow`,
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