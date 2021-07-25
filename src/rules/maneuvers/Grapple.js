import Maneuver from '/src/classes/Maneuver.js'
import Grab from './Grab.js'
import Hostage from './Hostage.js'
import Tackle from './Tackle.js'
import Throw from './Throw.js'

const Grapple = new Maneuver({
	name: `Grapple`,
	description: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no Damage.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each Round the Attacker must choose to either allocate 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	],
	mode: `Offensive`,
})

Grapple.subrules = [Grab, Hostage, Tackle, Throw]

export default Grapple
