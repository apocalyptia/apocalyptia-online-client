import Rule from '../../rules/Rule'
import DamageResistance from './DamageResistance'
import FireDamage from './FireDamage'
import Pain from './Pain'
import Recovery from './Recovery'


const Damage = new Rule({
	id: `8fbad46e-af91-424a-28c5-2e8b7ff802bd`,
	name: `Damage`, 
	desc: [
		`Damage temporarily reduces Health.`,
		`When Head or Torso Health drops to 0, you fall unconscious`,
		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
		`Consciousness and limb functionality are restored once you have healed to at least 1 Health on that Body Part.`,
		`You die when Head or Torso Health drops to the negative of their scores.`,
		`You lose the limb when Arm or Leg Health drops to the negative of their scores.`,
		`Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage].`,
		`Each point of Damage cause a -1 Pain penalty until healed.`,
	]
})
Damage.subrules = [
	DamageResistance,
	FireDamage,
	Pain,
	Recovery,
]

export default Damage