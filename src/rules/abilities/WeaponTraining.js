import Ability from '$classes/Ability.js'
import WeaponList from '$rules/lists/gear/WeaponList.js'

const WeaponTraining = new Ability({
	id: ``,
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default WeaponTraining