import AthleticHelmet from '/src/rules/gear/armor/AthleticHelmet.js'
import AthleticPads from '/src/rules/gear/armor/AthleticPads.js'
import CombatHelmet from '/src/rules/gear/armor/CombatHelmet.js'
import Coveralls from '/src/rules/gear/armor/Coveralls.js'
import FirefighterSuit from '/src/rules/gear/armor/FirefighterSuit.js'
import FlakJacket from '/src/rules/gear/armor/FlakJacket.js'
import GhillieSuit from '/src/rules/gear/armor/GhillieSuit.js'
import HazmatSuit from '/src/rules/gear/armor/HazmatSuit.js'
import HikingBoots from '/src/rules/gear/armor/HikingBoots.js'
import KevlarVest from '/src/rules/gear/armor/KevlarVest.js'
import LeatherJacket from '/src/rules/gear/armor/LeatherJacket.js'
import MotorcycleHelmet from '/src/rules/gear/armor/MotorcycleHelmet.js'
import PlateCarrier from '/src/rules/gear/armor/PlateCarrier.js'
import WinterCoat from '/src/rules/gear/armor/WinterCoat.js'
import WorkGloves from '/src/rules/gear/armor/WorkGloves.js'

export default {
	name: `Armor`,
	list: [
		AthleticHelmet,
		AthleticPads,
		CombatHelmet,
		Coveralls,
		FirefighterSuit,
		FlakJacket,
		GhillieSuit,
		HikingBoots,
		KevlarVest,
		LeatherJacket,
		MotorcycleHelmet,
		HazmatSuit,
		PlateCarrier,
		WinterCoat,
		WorkGloves,
	]
}



// OLD ARMOR
// new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
// new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. Cold Resistance. Fire Resistance.`, 5)
// new Armor(`Kevlar Gloves`, `2`, `Arms`, `Fire Resistance.`, 1)
// new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
// new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
// new Armor(`Riot Helmet`, `4`, `Head`, `Fire Resistance. Mask.`, 2)
// new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. Fire Resistance. Kick 3BDMG`, 2)
// new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
// new Armor(`Undercover Vest`, `3`, `Torso`, `Fire Resistance.`, 3)

// RARE ARMOR
// new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `Cold Resistance. +1 Stealth.`, 1)
// new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
// new Armor(`Dragonskin Vest`, `8`, `Torso`, `Cold Resistance. Fire Resistance.`, 3)
// new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. Fire Resistance.`, 1)
// new Armor(`Land Warrior Helmet`, `4`, `Head`, `Fire Resistance. Nightvision Goggles. Radio.`, 2)
// new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)