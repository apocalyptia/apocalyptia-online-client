import Combat from '/src/classes/Combat.js'

const Pain = new Combat({
	name: `Pain`,
	description: [
		`Damage, Trauma, and a few other effects can cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain penalties fade away as you Recover from whatever caused it.`,
		`You fall Prone if your Speed drops to 0 due to Pain penalties.`,
	],
})

export default Pain
