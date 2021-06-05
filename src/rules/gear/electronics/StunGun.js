import Electronic from '/src/classes/gear/Electronic.js'

const StunGun = new Electronic({
	name: `Stun Gun`,
	type: `Electronics`,
	description: [`Melee Attack.`, `C9# or Stun next Round.`],
	duration: 120,
	size: 1
})

export default StunGun
