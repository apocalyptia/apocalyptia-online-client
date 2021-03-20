import Deflection from '/src/rules/properties/Deflection.js'
import Discipline from '/src/rules/properties/Discipline.js'
import Endurance from '/src/rules/properties/Endurance.js'
import Evasion from '/src/rules/properties/Evasion.js'
import Experience from '/src/rules/properties/Experience.js'
import Fitness from '/src/rules/properties/Fitness.js'
import Intellect from '/src/rules/properties/Intellect.js'
import Luck from '/src/rules/properties/Luck.js'
import Psyche from '/src/rules/properties/Psyche.js'
import Speed from '/src/rules/properties/Speed.js'

export default {
	name: `Properties`,
	list: [
		Evasion,
		Fitness,
		Intellect,
		Discipline,
		Luck,
		Deflection,
		Endurance,
		Experience,
		Psyche,
		Speed,
	]
}