import Maneuver from '/src/classes/Maneuver.js'

const Aim = new Maneuver({
	name: `Aim`,
	description: [
		`Allocate 1 or 2 Actions to get +3 or +6 to your next Melee or Projectile Attack against a specific target.`,
		`This bonus is lost if you make any Movement before you make the Attack.`,
	],
	mode: `Offensive`,
})

export default Aim
