import Maneuver from '/src/classes/Maneuver.js'

const Hostage = new Maneuver({
	name: `Hostage`,
	desc: [
		`Use a Grabbed or Restrained enemy as Cover.`,
		`The Grappled enemy's Absorption acts as the Material Absorption and any excess Damage is applied to the Grappled enemy instead of you.`,
		`If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you.`,
		`This does not make you Concealed.`
	],
	mode: `Offensive`
})

export default Hostage
