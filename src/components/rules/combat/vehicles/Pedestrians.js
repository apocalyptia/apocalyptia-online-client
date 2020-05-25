import Rule from '../../../rules/Rule'


const Pedestrians = new Rule({
	id: `525ca583-48cf-4855-838c-fbfb84e3af76`,
	name: `Pedestrians`, 
	desc: [
		`Hitting a pedestrian does Damage = [vehicle Damage Resistance].`,
		`-1 Damage Resistance after hitting pedestrians = [vehicle Damage Resistance].`,
	]
})

export default Pedestrians