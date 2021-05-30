import Rule from '../../classes/Rule.js'

const Attack = new Rule({
	name: `Attack`,
	desc: [
		`There are two types of Attacks: Melee and Projectile.`,
		`Spend an Action on your turn to roll [d6 + Melee or Projectile] vs the target's Defense.`,
		`Rolling a 6 on the die is an Explosion, which is then re-rolled and added cumulatively to the Attack total.`,
		`Melee Attacks can be Called Shots to any Location on the target's body at no penalty.`,
		`Projectile Attacks must roll a random Location unless the Called Shot Maneuver is declared.`
	]
})

export default Attack
