import Ability from '../../classes/Ability'
import WeaponList from '../gear/weapons/WeaponList'


const FavoriteWeapon = new Ability({
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default FavoriteWeapon