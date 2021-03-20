import Rule from '/src/classes/Rule.js'

const Pedestrians = new Rule({
	name: `Pedestrians`, 
	desc: [
		`Hitting a pedestrian does Damage = [vehicle Absorption].`,
		`-1 Absorption after hitting pedestrians = [vehicle Absorption].`,
	]
})

export default Pedestrians