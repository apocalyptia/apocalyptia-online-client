import Ability from 'classes/Ability.js'
import WeaponsList from 'rules/lists/gear/WeaponsList.js'

const WeaponTraining = new Ability({
	id: ``,
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	experience: 3,
	opts: WeaponsList
})

export default WeaponTraining