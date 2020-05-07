import Ability from './Ability'
import WeaponList from '../gear/weapons/WeaponList'


const WeaponTraining = new Ability({
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default WeaponTraining