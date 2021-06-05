import Electronic from '/src/classes/gear/Electronic.js'

const SolarLamp = new Electronic({
	name: `Solar Lamp`,
	type: `Electronics`,
	description: [`1yd light radius.`, `1 day charge.`],
	duration: 10800,
	size: 1
})

export default SolarLamp
