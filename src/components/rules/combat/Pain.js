import Rule from 'rules/Rule.js'


const Pain = new Rule({
	id: `bff6e8fd-de70-4ad6-dd4b-b852400ab3ca`,
	name: `Pain`, 
	desc: [
		`Damage (and a few other effects) cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain fades away as Damage heal.`,
		`You fall Prone if your Speed drops to 0 from Pain.`,
	]
})

export default Pain