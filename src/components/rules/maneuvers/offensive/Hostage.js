import Maneuver from '../Maneuver'


const Hostage = new Maneuver({
	cat: `Offensive`,
	name: `Hostage`,
	desc: [
		`Use a Grabbed or Restrained enemy as Cover.`,
		`The Grappled enemy's Damage Resistance acts as the Material Damage Resistance and any excess Damage is applied to the Grappled enemy instead of you.`,
		`If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you.`,
		`This does not make you Concealed.`,
	]
})

export default Hostage