import Need from '/src/classes/Need.js'

const Asphyxiation = new Need({
	name: `Asphyxiation`,
	description: [
		`Constant air supply is required to avoid Asphyxiation.`,
		`1 Pain per minute without air.`,
		`Pain penalties from Asphyxiation are reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [ Constitution] is lethal.`,
	],
})

export default Asphyxiation
