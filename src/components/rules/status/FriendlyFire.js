import Rule from 'rules/Rule.js'

const FriendlyFire = new Rule({
	id: `63808ef6-3fc3-411c-54c9-edcc41ba8a7b`,
	name: `Friendly Fire`, 
	desc: [
		`-3 Ranged against targets within 1yd of your ally.`,
		`If the Ranged Attack Fails, re-roll the Ranged Attack vs the ally’s Reflexive Dodge.`,
	]
})

export default FriendlyFire