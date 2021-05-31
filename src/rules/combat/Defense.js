import Combat from '/src/classes/Combat.js'
import ReflexiveDefense from './subrules/ReflexiveDefense.js'

const Defense = new Combat({
	name: `Defense`,
	desc: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks, or Projectile Attacks if using a Shield.`,
		`To Dodge, roll [d6 + Acrobatics] vs Melee Attacks or Projectile Attacks.`,
		`Botching a Defense roll makes you fall Prone.`
	]
})
Defense.subrules = [ReflexiveDefense]

export default Defense
