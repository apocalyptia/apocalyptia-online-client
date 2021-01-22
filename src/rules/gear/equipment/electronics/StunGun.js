import Gear from '$classes/Gear.js'

const StunGun = new Gear({
	id: ``,
	name: `Stun Gun`,
	type: `Electronics`,
	desc: [
		`Melee Attack.`,
		`C9# or Stun next round.`,
	],
	sz: 1
})
StunGun.dur = 120

export default StunGun