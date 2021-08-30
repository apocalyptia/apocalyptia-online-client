import Combat from '/src/classes/Combat.js'

const Attack = new Combat({
	name: `Attack`,
	description: [
		`There are two types of Attacks: Melee and Projectile.`,
		`Use an Action to roll [ d6 + Melee or Projectile ] vs the target's Defense.`,
		`Rolling a 6 on the die is an Explosion, which is then re-rolled and added cumulatively to the Attack total.`,
		`Melee Attacks can be Called Shots to any Location on the target's body at no penalty.`,
		`Projectile Attacks must roll a random Location unless the Called Shot Maneuver is declared.`,
	],
})

export default Attack
