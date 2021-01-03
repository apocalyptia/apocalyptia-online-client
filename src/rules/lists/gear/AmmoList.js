import AmmoArrowList from 'rules/lists/gear/AmmoArrowList.js'
import Ammo22List from 'rules/lists/gear/Ammo22List.js'
import Ammo9mmList from 'rules/lists/gear/Ammo9mmList.js'
import Ammo357List from 'rules/lists/gear/Ammo357List.js'
import Ammo45List from 'rules/lists/gear/Ammo45List.js'
import Ammo556List from 'rules/lists/gear/Ammo556List.js'
import Ammo762List from 'rules/lists/gear/Ammo762List.js'
import Ammo308List from 'rules/lists/gear/Ammo308List.js'
import Ammo12gList from 'rules/lists/gear/Ammo12gList.js'

export default [
	...AmmoArrowList,
	...Ammo22List,
	...Ammo9mmList,
	...Ammo357List,
	...Ammo45List,
	...Ammo556List,
	...Ammo762List,
	...Ammo308List,
	...Ammo12gList,
]


// OLD AMMO
// new Gear(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Gear(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Gear(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Gear(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Gear(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),