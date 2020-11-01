import Gear from 'classes/Gear.js'

const StunGun = new Gear({
	id: `addf59b3-5134-4a92-770c-564f831ac30b`,
	name: `Stun Gun`,
	desc: [
		`Melee Attack.`,
		`C9# or Stun next round.`,
	],
	sz: 1
})
StunGun.dur = 120

export default StunGun