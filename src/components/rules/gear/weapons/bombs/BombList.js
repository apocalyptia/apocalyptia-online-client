import FlashbangGrenade from '../bombs/FlashbangGrenade'
import FragGrenade from '../bombs/FragGrenade'
import MolotovCocktail from '../bombs/MolotovCocktail'
import SmokeGrenade from '../bombs/SmokeGrenade'
import TeargasGrenade from '../bombs/TeargasGrenade'
import Thermite from '../bombs/Thermite'


const BombList = [
	FlashbangGrenade,
	FragGrenade,
	MolotovCocktail,
	SmokeGrenade,
	TeargasGrenade,
	Thermite,
]

export default BombList



// OLD BOMBS
// new Bomb(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
// new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
// new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
// new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

