import Combat from '$classes/Combat.js'

const Pedestrians = new Combat({
	name: `Pedestrians`,
	description: [
		`Hitting a pedestrian does Damage = [ vehicle Absorption ].`,
		`-1 Absorption after hitting pedestrians = [ vehicle Absorption ].`
	]
})

export default Pedestrians
