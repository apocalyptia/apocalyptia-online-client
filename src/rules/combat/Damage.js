import Combat from '/src/classes/Combat.js'
import Absorption from './subrules/Absorption.js'
import FireDamage from './subrules/FireDamage.js'
import Pain from './subrules/Pain.js'
import Recovery from './subrules/Recovery.js'

const Damage = new Combat({
	name: `Damage`,
	desc: [
		`Damage temporarily reduces Health.`,
		`Each point of Damage causes a -1 Pain penalty until healed.`,
		`Successful Attacks do Damage = [(Attack total - target's Defense) + Weapon Damage] - Armor Absorption.`,
	]
})
Damage.subrules = [Absorption, FireDamage, Pain, Recovery]

export default Damage
