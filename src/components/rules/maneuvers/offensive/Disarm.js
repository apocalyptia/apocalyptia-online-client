import Maneuver from '../Maneuver'


const Disarm = new Maneuver({
	cat: `Offensive`,
	name: `Disarm`, 
	desc: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
		`The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
})

export default Disarm