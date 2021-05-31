import Status from '/src/classes/Status.js'

const Concealed = new Status({
	name: `Concealed`,
	desc: [
		`If an opponent cannot see you, they are considered to be Blind to you.`,
		`Any Attack they make targeting you is at a -6 penalty.`,
		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
		`Targets are Defenseless against Attacks from Concealed opponents.`
	],
	type: `Status`
})

export default Concealed
