import FlashbangGrenade from '/src/rules/gear/weapons/bombs/FlashbangGrenade.js'
import FragGrenade from '/src/rules/gear/weapons/bombs/FragGrenade.js'
import MolotovCocktail from '/src/rules/gear/weapons/bombs/MolotovCocktail.js'
import SmokeGrenade from '/src/rules/gear/weapons/bombs/SmokeGrenade.js'
import TeargasGrenade from '/src/rules/gear/weapons/bombs/TeargasGrenade.js'
import Thermite from '/src/rules/gear/weapons/bombs/Thermite.js'

export default {
	name: `Bombs`,
	list: [
		FlashbangGrenade,
		FragGrenade,
		MolotovCocktail,
		SmokeGrenade,
		TeargasGrenade,
		Thermite,
	]
}



// OLD BOMBS
// new Gear(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
// new Gear(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Gear(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
// new Gear(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
// new Gear(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Gear(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

