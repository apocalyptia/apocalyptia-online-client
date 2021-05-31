import Medical from '/src/classes/gear/Medical.js'

const WaterFilter = new Medical({
	name: `Water Filter`,
	type: `Medical`,
	desc: [`Purifies 1 Water ration (.5gal) per minute.`],
	sz: 1
})

export default WaterFilter
