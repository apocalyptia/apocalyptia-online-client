import Armor from '../../classes/Armor'
import {
	Camo,
	CR,
	FR,
	Impermeable,
	Mask
} from './attributes/ArmorAttributesList'


export const AthleticHelmet = new Armor({
	name: `Athletic Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`
})

export const AthleticPads = new Armor({
	name: `Athletic Pads`,
	sz: 2,
	dr: 1,
	loc: `Torso`
})

export const CombatHelmet = new Armor({
	name: `Combat Helmet`,
	sz: 2,
	dr: 3,
	loc: `Head`,
	attributes: [
		Camo
	]
})

export const Coveralls = new Armor({
	name: `Coveralls`,
	sz: 3,
	dr: 1,
	loc: `Arms, Torso, Legs`,
	attributes: [
		Camo,
		CR
	]
})

export const FirefighterSuit = new Armor({
	name: `Firefighter Suit`,
	sz: 5,
	dr: 2,
	loc: `Full Body`,
	attributes: [
		CR,
		FR,
		Mask
	]
})

export const FlakJacket = new Armor({
	name: `Flak Jacket`,
	sz: 4,
	dr: 2,
	loc: `Torso`,
	attributes: [
		Camo
	]
})

export const GhillieSuit = new Armor({
	name: `Ghillie Suit`,
	sz: 4,
	dr: 1,
	loc: `Full Body`,
	attributes: [
		Camo,
		CR
	]
})

export const HikingBoots = new Armor({
	name: `Hiking Boots`,
	sz: 2,
	dr: 1,
	loc: `Legs`,
	attributes: [
		CR,
		FR
	]
})

export const KevlarVest = new Armor({
	name: `Kevlar Vest`,
	sz: 4,
	dr: 3,
	loc: `Torso`,
	attributes: [
		CR,
		FR
	]
})

export const LeatherJacket = new Armor({
	name: `Leather Jacket`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`
})

export const MotorcycleHelmet = new Armor({
	name: `Motorcycle Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`,
	attributes: [
		FR,
		Mask
	]
})

export const HazmatSuit = new Armor({
	name: `Hazmat Suit`,
	sz: 2,
	dr: 0,
	loc: `Full Body`,
	attributes: [
		Mask,
		Impermeable
	]
})

export const PlateCarrier = new Armor({
	name: `Plate Carrier`,
	sz: 4,
	dr: 4,
	loc: `Torso`,
	attributes: [
		Camo,
		CR,
		FR
	]
})

export const WinterCoat = new Armor({
	name: `Winter Coat`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`,
	attributes: [
		CR
	]
})

export const WorkGloves = new Armor({
	name: `Work Gloves`,
	sz: 1,
	dr: 1,
	loc: `Arms`,
	attributes: [
		FR
	]
})


const ArmorList = [
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
	WorkGloves
]

export default ArmorList



// OLD ARMOR
// new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
// new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. CR. FR.`, 5)
// new Armor(`Kevlar Gloves`, `2`, `Arms`, `FR.`, 1)
// new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
// new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
// new Armor(`Riot Helmet`, `4`, `Head`, `FR. Mask.`, 2)
// new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. FR. Kick 3BDMG`, 2)
// new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
// new Armor(`Undercover Vest`, `3`, `Torso`, `FR.`, 3)

// RARE ARMOR
// new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `CR. +1 Stealth.`, 1)
// new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
// new Armor(`Dragonskin Vest`, `8`, `Torso`, `CR. FR.`, 3)
// new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. FR.`, 1)
// new Armor(`Land Warrior Helmet`, `4`, `Head`, `FR. Nightvision Goggles. Radio.`, 2)
// new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)