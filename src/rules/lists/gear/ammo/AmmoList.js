import Ammo12gList from '/src/rules/lists/gear/ammo/Ammo12gList.js'
import Ammo22List from '/src/rules/lists/gear/ammo/Ammo22List.js'
import Ammo308List from '/src/rules/lists/gear/ammo/Ammo308List.js'
import Ammo357List from '/src/rules/lists/gear/ammo/Ammo357List.js'
import Ammo45List from '/src/rules/lists/gear/ammo/Ammo45List.js'
import Ammo556List from '/src/rules/lists/gear/ammo/Ammo556List.js'
import Ammo762List from '/src/rules/lists/gear/ammo/Ammo762List.js'
import Ammo9mmList from '/src/rules/lists/gear/ammo/Ammo9mmList.js'
import AmmoArrowList from '/src/rules/lists/gear/ammo/AmmoArrowList.js'

export default {
	name: `Ammo`,
	list: [
		...Ammo12gList.list,
		...Ammo22List.list,
		...Ammo308List.list,
		...Ammo357List.list,
		...Ammo45List.list,
		...Ammo556List.list,
		...Ammo762List.list,
		...Ammo9mmList.list,
		...AmmoArrowList.list,
	]
}


// OLD AMMO
// new Gear(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Gear(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Gear(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Gear(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Gear(`5.56`,	 `Tracer`,			`+1 Auto RATK.`,.02),