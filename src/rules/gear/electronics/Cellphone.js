import Electronic from '/src/classes/gear/Electronic.js'

const Cellphone = new Electronic({
	name: `Cellphone`,
	type: `Electronics`,
	desc: [`1yd light, camera, remote control.`],
	sz: 0
})
Cellphone.dur = 3600

export default Cellphone
