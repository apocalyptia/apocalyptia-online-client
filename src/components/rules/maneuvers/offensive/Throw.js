import Maneuver from '../../../classes/Maneuver'


const Throw = new Maneuver({
	cat: `Offensive`,
	name: `Throw`,
	desc: [
		`Throw a Grabbed or Restrained enemy up to [Constitution] yds.`,
		`The target takes 1 point of Blunt Damage to a random Location and land Prone.`,
	]
})

export default Throw