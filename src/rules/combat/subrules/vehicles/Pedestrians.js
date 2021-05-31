import Combat from '/src/classes/Combat.js'

const Pedestrians = new Combat({
	name: `Pedestrians`,
	desc: [
		`Hitting a pedestrian does Damage = [vehicle Absorption].`,
		`-1 Absorption after hitting pedestrians = [vehicle Absorption].`
	]
})

export default Pedestrians
