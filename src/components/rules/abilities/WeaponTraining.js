import Ability from './Ability'
import WeaponList from '../gear/weapons/WeaponList'


const WeaponTraining = new Ability({
	id: `dd2f76e5-3f6b-46b9-bdc1-9c7d09768017`,
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default WeaponTraining