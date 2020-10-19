import Maneuver from 'rules/maneuvers/Maneuver.js'


const Throw = new Maneuver({
	id: `cd4abf3b-f40f-401e-8824-9a10cce729c9`,
	cat: `Offensive`,
	name: `Throw`,
	desc: [
		`Throw a Grabbed or Restrained enemy up to [Constitution] yds.`,
		`The target takes 1 point of Blunt Damage to a random Body Part and land Prone.`,
	]
})

export default Throw