import Maneuver from '../Maneuver'


const Shove = new Maneuver({
	cat: `Offensive`,
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
	]
})

export default Shove