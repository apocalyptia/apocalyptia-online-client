import Gear from '../../../classes/Gear.js'

const Canteen = new Gear({
	name: `Canteen`,
	desc: [`Holds 1 unit (.5gal) of liquid.`, `Metal.`],
	sz: 1
})
Canteen.slots = 1

export default Canteen
