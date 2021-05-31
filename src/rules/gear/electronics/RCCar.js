import Electronic from '/src/classes/gear/Electronic.js'

const RCCar = new Electronic({
	name: `RC Car`,
	type: `Electronics`,
	desc: [`Science 3# to use.`, `45yd Speed.`],
	sz: 3
})
RCCar.dur = 600

export default RCCar
