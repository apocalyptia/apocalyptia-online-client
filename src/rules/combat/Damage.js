import Rule from '/src/classes/Rule.js'
import Absorption from '/src/rules/combat/subrules/Absorption.js'
import FireDamage from '/src/rules/combat/subrules/FireDamage.js'
import Pain from '/src/rules/combat/subrules/Pain.js'
import Recovery from '/src/rules/combat/subrules/Recovery.js'

const Damage = new Rule({
	name: `Damage`, 
	desc: [
		`Damage temporarily reduces Health.`,
		`When Head or Torso Health drops to 0, you fall unconscious`,
		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
		`Consciousness and limb functionality are restored once you have healed to at least 1 Health on that Body Part.`,
		`You die when Head or Torso Health drops to the negative of their scores.`,
		`You lose the limb when Arm or Leg Health drops to the negative of their scores.`,
		`Successful Attacks do Damage = [(Attack total - target's Defense) + Weapon Damage] - Armor Absorption.`,
		`Each point of Damage causes a -1 Pain penalty until healed.`,
	]
})
Damage.subrules = [
	Absorption,
	FireDamage,
	Pain,
	Recovery,
]

export default Damage