import Maneuver from '../Maneuver'
import Grab from './Grab'
import Hostage from './Hostage'
import Tackle from './Tackle'
import Throw from './Throw'


const Grapple = new Maneuver({
	id: `974d2b5c-67e0-4e5d-8dd8-883d98a5926e`,
	cat: `Offensive`,
	name: `Grapple`,
	desc: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no Damage.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each round the Attacker must choose to either spend 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	]
})

Grapple.subrules = [
	Grab,
	Hostage, 
	Tackle, 
	Throw
]

export default Grapple