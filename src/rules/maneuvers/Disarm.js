import Maneuver from '/src/classes/Maneuver.js'

const Disarm = new Maneuver({
	name: `Disarm`,
	description: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
		`The weapon flies d6 yards away in a random direction or the Attacker may choose to grab the weapon if they have an empty hand.`
	],
	mode: `Offensive`
})

export default Disarm
