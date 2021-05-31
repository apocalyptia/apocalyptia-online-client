import Electronic from '/src/classes/gear/Electronic.js'

const Headlamp = new Electronic({
	name: `Headlamp`,
	type: `Electronics`,
	desc: [`3yd light. Hands free.`],
	sz: 0
})
Headlamp.dur = 3600

export default Headlamp
