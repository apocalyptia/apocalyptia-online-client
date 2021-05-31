import Electronic from '/src/classes/gear/Electronic.js'

const Megaphone = new Electronic({
	name: `Megaphone`,
	type: `Electronics`,
	desc: [`+1 Leadership when speaking to a crowd.`],
	sz: 2
})
Megaphone.dur = 14400

export default Megaphone
