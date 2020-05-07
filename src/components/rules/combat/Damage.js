import Rule from '../../rules/Rule'
import DamageResistance from './DamageResistance'
import FireDamage from './FireDamage'
import Pain from './Pain'
import Recovery from './Recovery'
import Wounds from './Wounds'


const Damage = new Rule({
	name: `Damage`, 
	desc: [
		`Damage causes Wounds.`,
		`You die when Damage = Health.`,
		`Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage].`,
		`All Damage cause Pain penalties.`,
	]
})
Damage.subrules = [
	DamageResistance,
	FireDamage,
	Pain,
	Recovery,
	Wounds,
]

export default Damage