import Armor from '../../classes/Armor'
import {
	Camo,
	ColdResistance,
	FireResistance,
	Impermeable,
	Mask
} from './attributes/ArmorAttributesList'


export const AthleticHelmet = new Armor({
	name: `Athletic Helmet`,
	sz: 2,
	dr: 1,
	location: `Head`
})

export const AthleticPads = new Armor({
	name: `Athletic Pads`,
	sz: 2,
	dr: 1,
	location: `Torso`
})

export const CombatHelmet = new Armor({
	name: `Combat Helmet`,
	sz: 2,
	dr: 3,
	location: `Head`,
	attributes: [
		Camo
	]
})

export const Coveralls = new Armor({
	name: `Coveralls`,
	sz: 3,
	dr: 1,
	location: `Arms, Torso, Legs`,
	attributes: [
		Camo,
		ColdResistance
	]
})

export const FirefighterSuit = new Armor({
	name: `Firefighter Suit`,
	sz: 5,
	dr: 2,
	location: `Full Body`,
	attributes: [
		ColdResistance,
		FireResistance,
		Mask
	]
})

export const FlakJacket = new Armor({
	name: `Flak Jacket`,
	sz: 4,
	dr: 2,
	location: `Torso`,
	attributes: [
		Camo
	]
})

export const GhillieSuit = new Armor({
	name: `Ghillie Suit`,
	sz: 4,
	dr: 1,
	location: `Full Body`,
	attributes: [
		Camo,
		ColdResistance
	]
})

export const HikingBoots = new Armor({
	name: `Hiking Boots`,
	sz: 2,
	dr: 1,
	location: `Legs`,
	attributes: [
		ColdResistance,
		FireResistance
	]
})

export const KevlarVest = new Armor({
	name: `Kevlar Vest`,
	sz: 4,
	dr: 3,
	location: `Torso`,
	attributes: [
		ColdResistance,
		FireResistance
	]
})

export const LeatherJacket = new Armor({
	name: `Leather Jacket`,
	sz: 2,
	dr: 1,
	location: `Arms, Torso`
})

export const MotorcycleHelmet = new Armor({
	name: `Motorcycle Helmet`,
	sz: 2,
	dr: 1,
	location: `Head`,
	attributes: [
		FireResistance,
		Mask
	]
})

export const HazmatSuit = new Armor({
	name: `Hazmat Suit`,
	sz: 2,
	dr: 0,
	location: `Full Body`,
	attributes: [
		Mask,
		Impermeable
	]
})

export const PlateCarrier = new Armor({
	name: `Plate Carrier`,
	sz: 4,
	dr: 4,
	location: `Torso`,
	attributes: [
		Camo,
		ColdResistance,
		FireResistance
	]
})

export const WinterCoat = new Armor({
	name: `Winter Coat`,
	sz: 2,
	dr: 1,
	location: `Arms, Torso`,
	attributes: [
		ColdResistance
	]
})

export const WorkGloves = new Armor({
	name: `Work Gloves`,
	sz: 1,
	dr: 1,
	location: `Arms`,
	attributes: [
		FireResistance
	]
})


export default [
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