import Rule from 'rules/Rule.js'


const Concealed = new Rule({
	id: `56037ac2-9ad0-4097-9cef-621ea8d171e7`,
	name: `Concealed`,
	desc: [
		`If an opponent cannot see you, they are considered to be Blind to you.`,
		`Any Attack they make targeting you is at a -6 penalty.`,
		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
		`Targets are Defenseless against Attacks from Concealed opponents.`,
	]
})

export default Concealed