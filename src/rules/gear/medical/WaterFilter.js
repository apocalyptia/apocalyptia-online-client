import Gear from '../../../classes/Gear.js' 

const WaterFilter = new Gear({
	name: `Water Filter`,
	type: `Medical`,
	desc: [
		`Purifies 1 Water ration (.5gal) per minute.`,
	],
	sz: 1
})

export default WaterFilter