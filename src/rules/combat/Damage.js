import Combat from '$classes/Combat.js'
import Absorption from './subrules/Absorption.js'
import Fire from './subrules/Fire.js'

const Damage = new Combat({
	name: `Damage`,
	description: [
		`Damage temporarily reduces Health.`,
		`Each point of Damage causes a -1 Pain penalty until healed.`,
		`Successful Attacks do Damage = [ ( Attack total - target's Defense ) + Weapon Damage ] - Armor Absorption.`,
		`If Damage from one Attack before Armor Absorption is subtracted is greater than your Constitution, you fall Prone.`,
		`Damage can be healed during Recovery.`
	],
	subrules: [
		Absorption,
		Fire,
	]
})

export default Damage
