import Gear from '../../../classes/Gear.js' 

const Crutch = new Gear({
	name: `Crutch`,
	type: `Medical`,
	desc: [
		`Halves Leg Damage Pain penalty to Speed.`,
	],
	sz: 3
})

export default Crutch