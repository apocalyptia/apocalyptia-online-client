import Rule from '../../rules/Rule'


const Recovery = new Rule({
	name: `Recovery`, 
	desc: [
		`After 3 days of rest, you have a chance to recover a little bit, both physically and mentally.`,
		`Roll [Constitution vs total Damage] to heal 1 Health on a random Damaged Location`,
		`Roll [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Damage or Trauma, depending on what you were rolling to Recover.`,
	]
})

export default Recovery