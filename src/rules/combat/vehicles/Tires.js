import Rule from '../../../rules/Rule'


const Tires = new Rule({
	id: `2be9303b-b513-4036-ba7b-923cfa027dee`,
	name: `Tires`, 
	desc: [
		`Roll [-3 Attack vs Drive(Stunt)] to destroy a tire.`,
		`If the tire is destroyed, the driver must roll [Drive 9#] or Wreck.`,
		`If a front tire gets destroyed, the vehicle Wrecks automatically.`,
	]
})

export default Tires