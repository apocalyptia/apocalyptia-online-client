import Rule from 'rules/Rule.js'


const Burning = new Rule({
	id: `99551696-bf78-4463-867e-d92dd14c4728`,
	name: `Burning`, 
	desc: [
		`If the Vehicle is at 0 Damage Resistance, it bursts into flames doing 1 Fire Damage per round to all Occupants.`,
		`It continues to burn for 1 minute per gallon of Fuel.`,
	]
})

export default Burning