import Gear from 'classes/Gear.js'

const Cellphone = new Gear({
	id: ``,
	name: `Cellphone`,
	type: `Electronics`,
	desc: [
		`1yd light, camera, remote control.`,
	],
	sz: 1
})
Cellphone.dur = 3600

export default Cellphone