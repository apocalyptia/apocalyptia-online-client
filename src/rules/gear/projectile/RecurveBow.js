import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'

const RecurveBow = new Projectile({
	name: `Recurve Bow`,
	type: `Projectile Weapon`,
	sz: 2,
	attr: [TwoHanded]
})
RecurveBow.dmg = 1
RecurveBow.rng = 10
RecurveBow.cap = 1
RecurveBow.cal = `Arrow`

export default RecurveBow
