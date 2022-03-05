import Combat from '$classes/Combat.js'

const Burning = new Combat({
	name: `Burning`,
	description: [
		`If the Vehicle is at 0 Absorption, it bursts into flames doing 1 Fire Damage per Round to all Occupants.`,
		`It continues to burn for 1 minute per gallon of Fuel.`
	]
})

export default Burning
