import Combat from '/src/classes/Combat.js'

const Recovery = new Combat({
	name: `Recovery`,
	description: [
		`After 3 days of rest, you have a chance to recover a little bit.`,
		`Roll to recover both physically ( Health ) and mentally ( Psyche ) for this period of rest.`,
		`Roll [ Constitution vs total Damage ] to heal 1 Health on a random Damaged Body Part.`,
		`Roll [ Demeanor vs total Trauma ] to heal 1 Psyche.`,
		`On a Failed roll you take 1 additional Damage or Trauma, depending on what you were rolling to Recover.`,
	],
})

export default Recovery
