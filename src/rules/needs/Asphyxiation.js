import Rule from '$classes/Rule.js'

const Asphyxiation = new Rule({
	name: `Asphyxiation`,
	desc: [
		`Constant air supply is required to avoid Asphyxiation.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
})

export default Asphyxiation