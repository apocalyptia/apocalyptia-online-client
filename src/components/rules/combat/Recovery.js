import Rule from '../../classes/Rule'


const Recovery = new Rule({
	name: `Recovery`, 
	desc: [
		`After 3 days of rest, roll [Constitution vs total Wounds] to heal 1 Wound, and [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Wound or Trauma, depending on what you were rolling to Recover.`,
	]
})

export default Recovery