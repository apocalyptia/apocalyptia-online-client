import Maneuver from 'rules/maneuvers/Maneuver.js'


const Disarm = new Maneuver({
	id: `b4812d24-3b7e-43aa-a2d6-7b734520c5e7`,
	cat: `Offensive`,
	name: `Disarm`, 
	desc: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
		`The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
})

export default Disarm