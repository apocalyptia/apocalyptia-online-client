import Rule from 'rules/Rule.js'

const Shove = new Rule({
	id: `0c791227-b8d2-42a6-b5c1-b2aedcab0aad`,
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
	]
})

export default Shove