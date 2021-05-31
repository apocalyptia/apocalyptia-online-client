import Electronic from '/src/classes/gear/Electronic.js'

const QuadcopterDrone = new Electronic({
	name: `Quadcopter Drone`,
	type: `Electronics`,
	desc: [`Science 6# to use.`, `Onboard camera.`, `90yd Speed.`],
	sz: 2
})
QuadcopterDrone.dur = 300

export default QuadcopterDrone
