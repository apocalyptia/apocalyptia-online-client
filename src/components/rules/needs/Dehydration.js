import Rule from '../../rules/Rule'


const Dehydration = new Rule({
	id: `34974574-6455-4c07-8456-8f7bdc78ec9b`,
	name: `Dehydration`,
	desc: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
	]
})

export default Dehydration