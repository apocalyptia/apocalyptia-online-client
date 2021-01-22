import Ability from '$classes/Ability.js'
import WeaponList from '$rules/lists/gear/WeaponList.js'

const FavoriteWeapon = new Ability({
	id: ``,
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default FavoriteWeapon