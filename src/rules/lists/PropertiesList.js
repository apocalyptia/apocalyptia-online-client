import Deflection from 'rules/properties/Deflection.js'
import Discipline from 'rules/properties/Discipline.js'
import Endurance from 'rules/properties/Endurance.js'
import Evasion from 'rules/properties/Evasion.js'
import Experience from 'rules/properties/Experience.js'
import Fitness from 'rules/properties/Fitness.js'
import Intellect from 'rules/properties/Intellect.js'
import Luck from 'rules/properties/Luck.js'
import Psyche from 'rules/properties/Psyche.js'
import Speed from 'rules/properties/Speed.js'

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