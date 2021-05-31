import Combat from '/src/classes/Combat.js'
import ReflexiveDefense from './subrules/ReflexiveDefense.js'

const Defense = new Combat({
	name: `Defense`,
	desc: [
		`Set aside 1 or more of your Actions in a Round to use on either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks, or Projectile Attacks if using a Shield.`,
		`To Dodge, roll [d6 + Acrobatics] vs Melee Attacks or Projectile Attacks.`,
		`You choose which type of Defense you want to respond with when you are attacked.`,
		`If you are not attacked in the Round, your Defense Actions are not required and so no Endurance is spent.`,
		`Botching a Defense roll makes you fall Prone.`
	]
})
Defense.subrules = [ReflexiveDefense]

export default Defense
