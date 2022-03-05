import Medical from '$classes/gear/Medical.js'

const WaterFilter = new Medical({
	name: `Water Filter`,
	type: `Medical`,
	description: [`Purifies 1 Water ration (.5gal) per minute.`],
	size: 1,
})

export default WaterFilter
