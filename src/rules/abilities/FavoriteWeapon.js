import Ability from '/src/classes/Ability.js'
import WeaponsList from '/src/rules/lists/gear/WeaponsList.js'

const FavoriteWeapon = new Ability({
	id: ``,
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	experience: 3,
	opts: WeaponsList
})

export default FavoriteWeapon