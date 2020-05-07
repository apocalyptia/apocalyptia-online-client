import Rule from '../../rules/Rule'


const Pain = new Rule({
	name: `Pain`, 
	desc: [
		`Wounds (and a few other effects) cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain fades away as Wounds heal.`,
		`You fall Prone if your Speed drops to 0 from Pain.`,
	]
})

export default Pain