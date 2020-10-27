import Asphyxiation from 'needs/Asphyxiation.js'
import Dehydration from 'needs/Dehydration.js'
import Exhaustion from 'needs/Exhaustion.js'
import Hypothermia from 'needs/Hypothermia.js'
import Starvation from 'needs/Starvation.js'

export default {
	name: `Needs`,
	explanation: [
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