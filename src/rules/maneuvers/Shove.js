import Rule from '../../classes/Rule.js'

const Shove = new Rule({
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`
	],
	type: `Offensive`
})

export default Shove
