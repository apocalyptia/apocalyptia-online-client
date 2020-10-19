import Rule from 'rules/Rule.js'


const Asphyxiation = new Rule({
	id: `b3c3fa84-e24d-4112-82ff-7c346a207e47`,
	name: `Asphyxiation`,
	desc: [
		`Constant air supply is required.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
})

export default Asphyxiation