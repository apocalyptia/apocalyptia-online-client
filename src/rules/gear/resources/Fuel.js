import Resource from '$classes/gear/Resource.js'

const Fuel = new Resource({
	name: `Fuel`,
	type: `Resource`,
	description: [`Flammable liquid. Used to power Vehicles and make explosives.`],
	size: 1,
})

export default Fuel
