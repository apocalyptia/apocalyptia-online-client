import Ability from './Ability'
import WeaponList from '../gear/weapons/WeaponList'


const FavoriteWeapon = new Ability({
	id: `4ccca696-fbf0-4144-8874-011b2ab1f567`,
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
})

export default FavoriteWeapon