import Electronic from '/src/classes/gear/Electronic.js'

const GeigerCounter = new Electronic({
	name: `Geiger Counter`,
	type: `Electronics`,
	description: [`Science 6# to detect Radiation in 1yd.`],
	duration: 28800,
	size: 1
})

export default GeigerCounter
