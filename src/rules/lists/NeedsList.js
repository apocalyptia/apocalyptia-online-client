import Asphyxiation from '/src/rules/needs/Asphyxiation.js'
import Dehydration from '/src/rules/needs/Dehydration.js'
import Exhaustion from '/src/rules/needs/Exhaustion.js'
import Hypothermia from '/src/rules/needs/Hypothermia.js'
import Starvation from '/src/rules/needs/Starvation.js'

export default {
	name: `Needs`,
	text: [
		`Take 1 Pain for each unmet requirement over a given period of time.`,
	],
	list: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
	]
}