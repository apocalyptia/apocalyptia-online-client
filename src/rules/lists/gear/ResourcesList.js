import Chemical from '/src/rules/gear/equipment/resources/Chemical.js'
import Food from '/src/rules/gear/equipment/resources/Food.js'
import Fuel from '/src/rules/gear/equipment/resources/Fuel.js'
import Part from '/src/rules/gear/equipment/resources/Part.js'
import Water from '/src/rules/gear/equipment/resources/Water.js'

export default {
	name: `Resources`,
	list: [
		Chemical,
		Food,
		Fuel,
		Part,
		Water,
	]
}