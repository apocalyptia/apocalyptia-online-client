import Burning from 'rules/status/Burning.js'
import Falling from 'rules/status/Falling.js'
import FriendlyFire from 'rules/status/FriendlyFire.js'

export default {
	name: `Hazards`,
	list: [
		Burning,
		Falling,
		FriendlyFire,
	]
}