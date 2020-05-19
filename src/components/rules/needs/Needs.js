import Asphyxiation from './Asphyxiation'
import Dehydration from './Dehydration'
import Exhaustion from './Exhaustion'
import Hypothermia from './Hypothermia'
import Starvation from './Starvation'


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