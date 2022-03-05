import Maneuver from '$classes/Maneuver.js'

const Throw = new Maneuver({
	name: `Throw`,
	description: [
		`Throw a Grabbed or Restrained enemy up to [ Constitution ] yards.`,
		`The target takes 1 point of Blunt Damage to a random Body Part and land Prone.`
	],
	mode: `Offensive`
})

export default Throw
