import Resource from '/src/classes/gear/Resource.js'

const Fuel = new Resource({
	name: `Fuel`,
	type: `Resource`,
	desc: [`Flammable liquid. Used to power Vehicles and make explosives.`],
	sz: 1
})

export default Fuel
