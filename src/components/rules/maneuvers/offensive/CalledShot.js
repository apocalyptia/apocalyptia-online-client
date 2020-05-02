import Maneuver from '../../../classes/Maneuver'
import CalledShotTable from '../../../views/tables/CalledShotTable.svelte'


const CalledShot = new Maneuver({
	cat: `Offensive`,
	name: `Called Shot`, 
	desc: [
		`Attacks target the Torso by default.`,
		`A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects based on Location.`,
	]
})

CalledShot.table = CalledShotTable

export default CalledShot