import Rule from 'classes/Rule.js'

const Pedestrians = new Rule({
	name: `Pedestrians`, 
	desc: [
		`Hitting a pedestrian does Damage = [vehicle Damage Resistance].`,
		`-1 Damage Resistance after hitting pedestrians = [vehicle Damage Resistance].`,
	]
})

export default Pedestrians