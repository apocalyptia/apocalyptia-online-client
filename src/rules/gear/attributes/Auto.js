import Rule from '/src/classes/Rule.js'

const Auto = new Rule({
	id: ``,
	name: `Auto`,
	desc: [
		`Choose either Burst or Spray.`,
		`Burst: +3 Ranged Attack vs one target.`,
		`Spray: 3yd Blast Attack.`,
		`Uses 10 bullets.`,
	]
})

export default Auto