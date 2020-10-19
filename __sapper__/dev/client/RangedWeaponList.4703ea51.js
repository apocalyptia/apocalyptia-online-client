import { a as Ax, B as BaseballBat, b as BrassKnuckles, c as Club, d as Crowbar, H as Hammer, e as Hatchet, K as Knife, M as Machete, f as RiotShield, g as Sledgehammer, h as Spear, i as Staff, j as AR15, k as BenelliM4, l as BrowningABolt, m as ColtPython, n as CompoundBow, o as Crossbow, G as Glock17, p as HenryGoldenBoy, q as HKMP5, r as Marlin1894, s as Mossberg500, t as RecurveBow, u as Remington700, v as Remington870, w as Ruger1022, x as RugerMkIII, y as SavageMkII, z as SIGSauerP290, D as SpringfieldM1A, E as StoegerCoachgun, F as SWBodyguard } from './SWBodyguard.54177d3a.js';
import { A as ArrowList, L as List22, c as List9mm, d as List357, e as List556, f as List308, g as List12g, h as AthleticHelmet, i as AthleticPads, C as CombatHelmet, j as Coveralls, F as FirefighterSuit, k as Camo, G as GhillieSuit, H as HikingBoots, K as KevlarVest, l as LeatherJacket, m as MotorcycleHelmet, n as HazmatSuit, P as PlateCarrier, W as WinterCoat, o as WorkGloves, p as Equipment, D as DocumentList, a as DrugList, E as ElectronicList, b as MedicalList, M as MiscList, S as StorageList } from './StorageList.71288974.js';

const AmmoList = [
	...ArrowList,
	...List22,
	...List9mm,
	...List357,
	...List556,
	...List308,
	...List12g,
];


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),

const ArmorList = [
	AthleticHelmet,
	AthleticPads,
	CombatHelmet,
	Coveralls,
	FirefighterSuit,
	Camo,
	GhillieSuit,
	HikingBoots,
	KevlarVest,
	LeatherJacket,
	MotorcycleHelmet,
	HazmatSuit,
	PlateCarrier,
	WinterCoat,
	WorkGloves,
];



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

const Chemical = new Equipment({
	id: `0b4cf104-79ba-454b-bc37-845b18da0935`,
	name: `Chemical`,
	desc: [
		`Substances used for Science(Chemistry).`,
	],
	sz: 1
});

const Food = new Equipment({
	id: `7da8fdf2-1af2-4aea-b246-c49ac8d6493d`,
	name: `Food`,
	desc: [
		`1 unit Needed per day to prevent Starvation.`,
	],
	sz: 1
});

const Fuel = new Equipment({
	id: `e4f52ef5-c264-4383-8a1d-b48c9790b11b`,
	name: `Fuel`,
	desc: [
		`Flammable liquid. Used to power Vehicles and make explosives.`,
	],
	sz: 1
});

const Part = new Equipment({
	id: `787c1545-e2c8-466e-bd5f-7d72907dde21`,
	name: `Part`,
	desc: [
		`Scrap used for Build and Science(Tech).`,
	],
	sz: 1
});

const Water = new Equipment({
	id: `046c84cf-e2dd-4738-93b7-862c300ccd8d`,
	name: `Water`,
	desc: [
		`1 unit Needed per day to prevent Dehydration.`,
	],
	sz: 1
});

const ResourcesList = [
	Chemical,
	Food,
	Fuel,
	Part,
	Water,
];

const BobbyPin = new Equipment({
	id: `e0b1000c-1ee7-470e-937a-230282a2cca5`,
	name: `Bobby Pin`,
	desc: [
		`Allows Larceny(Disable) roll on key locks.`,
	],
	sz: 0
});

const BoltCutters = new Equipment({
	id: `0532c870-afbb-419c-9030-c447616d7845`,
	name: `Bolt Cutters`,
	desc: [
		`C9# to cut metal (Handcuffs, Padlocks, etc).`,
	],
	sz: 3
});

const DuctTape = new Equipment({
	id: `7926ac87-740e-4b46-9f87-1d85abbd90b6`,
	name: `Duct Tape`,
	desc: [
		`+1 Build/1yd or use 2yds as Handcuffs.`,
		`60yds.`,
	],
	sz: 1
});

const GlassCutter = new Equipment({
	id: `41312b6f-d4c8-4d56-af43-dbe196799b6a`,
	name: `Glass Cutter`,
	desc: [
		`Cuts glass quietly.`,
	],
	sz: 0
});

const GunCleaningKit = new Equipment({
	id: `ea495af3-a158-490c-84d4-bbebe3b6fb2b`,
	name: `Gun Cleaning Kit`,
	desc: [
		`Gun gets +1 Ranged for 1 day.`,
		`Takes 1hr/gun.`,
	],
	sz: 1
});

const Hacksaw = new Equipment({
	id: `382854d4-c562-49b7-89c5-866a6d9daeea`,
	name: `Hacksaw`,
	desc: [
		`1 Damage/round of sawing to almost any material.`,
	],
	sz: 2
});

const Lockpicks = new Equipment({
	id: `e0aba732-0986-4f8c-8192-da1f6ea378c7`,
	name: `Lockpicks`,
	desc: [
		`+3 Larceny(Disable) key locks.`,
		`6 picks.`,
	],
	sz: 1
});

const MagnifyingGlass = new Equipment({
	id: `f2c04b01-fdef-4be6-8283-904d8fffe8b0`,
	name: `Magnifying Glass`,
	desc: [
		`+6 Perception(See) to inspect tiny details.`,
	],
	sz: 1
});

const MeasuringCup = new Equipment({
	id: `1a46681d-2163-4c43-aaa2-c6b9efe75196`,
	name: `Measuring Cup`,
	desc: [
		`+3 Science(Chemistry).`,
		`Marked glass cup.`,
	],
	sz: 1
});

const Multitool = new Equipment({
	id: `c17183d6-527d-482f-a83b-a2410b5e05bb`,
	name: `Multi-tool`,
	desc: [
		`+1 Larceny(Disable), Build, Science(Tech).`,
	],
	sz: 1
});

const SprayPaint = new Equipment({
	id: `9dd8ffb9-9e74-4aec-b355-0dc1d13eab54`,
	name: `Spray Paint`,
	desc: [
		`Ranged Attack, Called Shot: Head.`,
		`Blind d6 rounds.`,
		`10 uses.`,
	],
	sz: 1
});

const SwissArmyKnife = new Equipment({
	id: `8f69d1cb-d480-460f-8dd5-fc438910965f`,
	name: `Swiss Army Knife`,
	desc: [
		`+1 Build and Survival.`,
	],
	sz: 1
});

const TapeMeasure = new Equipment({
	id: `eccf841d-227d-4b1c-9c53-5de6756e2916`,
	name: `Tape Measure`,
	desc: [
		`+1 Build.`,
		`10yd long wind-up metal tape.`,
	],
	sz: 2
});

const ToolBag = new Equipment({
	id: `9b65e724-79b7-48f2-9dc7-54340f606b32`,
	name: `Tool Bag`,
	desc: [
		`+3 Build.`,
		`Pliers, wrenches, level, etc.`,
	],
	sz: 3
});

const WireSaw = new Equipment({
	id: `e4d0ff31-be07-4604-bc20-2bb870d62202`,
	name: `Wire Saw`,
	desc: [
		`1 Damage/round of sawing to wood or bone.`,
	],
	sz: 1
});

const ToolList = [
	BobbyPin,
	BoltCutters,
	DuctTape,
	GlassCutter,
	GunCleaningKit,
	Hacksaw,
	Lockpicks,
	MagnifyingGlass,
	MeasuringCup,
	Multitool,
	SprayPaint,
	SwissArmyKnife,
	TapeMeasure,
	ToolBag,
	WireSaw,
];

const Balaclava = new Equipment({
	id: `9e007b95-d9d8-4ce4-996c-67ab0e8780d7`,
	name: `Balaclava`,
	desc: [
		`+1 Stealth.`,
		`Mask.`,
		`Cold Resistance.`,
	],
	sz: 0
});

const Bandanna = new Equipment({
	id: `2654de72-2021-419d-bff8-2905acea9f19`,
	name: `Bandanna`,
	desc: [
		`+1 Constitution vs airborne toxins.`,
		`Can use as Bandage.`,
	],
	sz: 0
});

const BaseballCap = new Equipment({
	id: `aafd9c89-2232-46ff-b4e9-9fb0ad5c5785`,
	name: `Baseball Cap`,
	desc: [
		`Reduce Visibility(Rain and Sun) penalty by 1.`,
	],
	sz: 0
});

const Carabiner = new Equipment({
	id: `08b38da4-9a62-4392-b0a4-2f385170faa6`,
	name: `Carabiner`,
	desc: [
		`+1 Athletics(Climb and Rappel).`,
		`Holds 50Sz.`,
	],
	sz: 0
});

const ChokerLeash = new Equipment({
	id: `e384ba68-ba77-41b4-87bc-3cb557e756d7`,
	name: `Choker Leash`,
	desc: [
		`+3 Tame.`,
		`Grabbed.`,
		`Constitution +3 vs Constitution to control.`,
	],
	sz: 1
});

const CowboyHat = new Equipment({
	id: `f6b35c1e-c93b-46ca-8929-2cc471f04ce2`,
	name: `Cowboy Hat`,
	desc: [
		`Reduce Visibility(Rain and Sun) penalty by 3.`,
	],
	sz: 0
});

const DustMask = new Equipment({
	id: `29fde8e8-bca7-4561-b366-8fde6e4ab727`,
	name: `Dust Mask`,
	desc: [
		`+1 Constitution vs airborne toxins.`,
		`Mask.`,
	],
	sz: 1
});

const EarPlugs = new Equipment({
	id: `2ae22454-3213-4596-95ba-ed2c45148900`,
	name: `Ear Plugs`,
	desc: [
		`No Deafness from noise.`,
		`-3 Perception(Hear).`,
	],
	sz: 9
});

const Flippers = new Equipment({
	id: `0b819838-ab50-41c0-864f-918dda1ab43d`,
	name: `Flippers`,
	desc: [
		`+3 Athletics(Swim).`,
		`-6 walking Speed.`,
	],
	sz: 2
});

const GasMask = new Equipment({
	id: `55589bfd-03b7-4773-9f3b-5ecfbd358295`,
	name: `Gas Mask`,
	desc: [
		`+6 Constitution vs airborne toxins.`,
		`Mask.`,
		`-1 Perception.`,
	],
	sz: 1
});

const Goggles = new Equipment({
	id: `f9a6ee27-e2e7-4737-a33f-6275b625a175`,
	name: `Goggles`,
	desc: [
		`+3 Constitution to resist toxins in eyes.`,
	],
	sz: 1
});

const Handcuffs = new Equipment({
	id: `e8da5e5c-f467-4ff0-88c1-6159b6be4f8a`,
	name: `Handcuffs`,
	desc: [
		`Restrained if placed on Arms.`,
		`Speed = 1 if placed on Legs.`,
		`A15# to escape.`,
		`Larceny(Disable) 12#.`,
	],
	sz: 1
});

const LeatherBelt = new Equipment({
	id: `7441d79f-2a41-49ff-a494-4c7b960e4652`,
	name: `Leather Belt`,
	desc: [
		`1yd strap.`,
		`Stops Limb Bleeding.`,
		`Holds 50Sz.`,
	],
	sz: 1
});

const Lifejacket = new Equipment({
	id: `d0c4d02c-d3cb-43a2-ae8d-f7d49b2039e1`,
	name: `Lifejacket`,
	desc: [
		`+6 Athletics(Swim).`,
		`Prevents drowning.`,
	],
	sz: 2
});

const Makeup = new Equipment({
	id: `86b19d29-0416-4582-9caf-492189f4c374`,
	name: `Makeup`,
	desc: [
		`+1 Socialize and Entertain for 6hrs.`,
		`30 uses.`,
	],
	sz: 0
});

const Poncho = new Equipment({
	id: `f8696907-f9b0-40ba-852c-cdd4db1b1b0a`,
	name: `Poncho`,
	desc: [
		`Cold Resistance.`,
		`Waterproof.`,
	],
	sz: 0
});

const Rollerblades = new Equipment({
	id: `9c8a233d-ad46-4061-bccb-83d0c8d3675d`,
	name: `Rollerblades`,
	desc: [
		`Athletics 6#.`,
		`Speed x3.`,
		`1 round equip.`,
		`Fail:Prone.`,
	],
	sz: 2
});

const RunningShoes = new Equipment({
	id: `0e2fd35b-7ad8-48e2-9ce0-d3c75d4fbc96`,
	name: `Running Shoes`,
	desc: [
		`+1 mile of Jogging distance.`,
	],
	sz: 2
});

const Snorkel = new Equipment({
	id: `363caa92-34f5-4170-940f-9c908f5d513b`,
	name: `Snorkel`,
	desc: [
		`Breathe while just beneath water's surface.`,
	],
	sz: 1
});

const Sunglasses = new Equipment({
	id: `896a7b9a-f6bc-4275-84d9-f4d6d06fb5b5`,
	name: `Sunglasses`,
	desc: [
		`No Visibility(Sun) penalty.`,
		`+1 Constitution vs light.`,
	],
	sz: 0
});

const ThermalUnderwear = new Equipment({
	id: `0c9b6cba-f1e2-4538-96c4-15340ab5e5e3`,
	name: `Thermal Underwear`,
	desc: [
		`Cold Resistance.`,
		`Can use as 6 Bandages.`,
	],
	sz: 1
});

const Wristwatch = new Equipment({
	id: `d29b3e8f-de0d-4c5e-8b23-f6d131baf014`,
	name: `Wristwatch`,
	desc: [
		`Tells time and +1 Survival(Navigate).`,
	],
	sz: 0
});

const WearableList = [
	Balaclava,
	Bandanna,
	BaseballCap,
	Carabiner,
	ChokerLeash,
	CowboyHat,
	DustMask,
	EarPlugs,
	Flippers,
	GasMask,
	Goggles,
	Handcuffs,
	LeatherBelt,
	Lifejacket,
	Makeup,
	Poncho,
	Rollerblades,
	RunningShoes,
	Snorkel,
	Sunglasses,
	ThermalUnderwear,
	Wristwatch,
];

const EquipmentList = [
	...DocumentList,
	...DrugList,
	...ElectronicList,
	...MedicalList,
	...MiscList,
	...ResourcesList,
	...StorageList,
	...ToolList,
	...WearableList,
];

const MeleeWeaponList = [
	Ax,
	BaseballBat,
	BrassKnuckles,
	Club,
	Crowbar,
	Hammer,
	Hatchet,
	Knife,
	Machete,
	RiotShield,
	Sledgehammer,
	Spear,
	Staff,
];


// RARE MELEE
// new MeleeWeapon(`Barbwire Club`, 3, 1, ``, 2),
// new MeleeWeapon(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
// new MeleeWeapon(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
// new MeleeWeapon(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
// new MeleeWeapon(`Chainsaw`, 6, 2, `.5gal Fuel. d6 rounds to start. 1: Empty. Loud.`, 4),
// new MeleeWeapon(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
// new MeleeWeapon(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
// new MeleeWeapon(`Kukri`, 3, 1, `Chop`, 2),
// new MeleeWeapon(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (Range:3)`, 2),
// new MeleeWeapon(`Net`, 0, 2, `+6 Grab.`, 3),
// new MeleeWeapon(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
// new MeleeWeapon(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
// new MeleeWeapon(`Sign Shield`, 2, 1, `+3 Block. Cover 6 Damage Resistance.`, 4),
// new MeleeWeapon(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
// new MeleeWeapon(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. Range:3.`, 1),

// OLD MELEE
// new MeleeWeapon(`Baton`, 2, 1, `Blunt. Rapid.`, 2),
// new MeleeWeapon(`Cane`, 1, 1, `Blunt. +1 Trip. Can be used as a Crutch.`, 3),
// new MeleeWeapon(`Cleaver`, 2, 1, `Chop.`, 1),
// new MeleeWeapon(`Firepoker`, 3, 1, `Lever. Pierce.`, 3),
// new MeleeWeapon(`Garrote`, 1, 2, `Blunt. +3 to Grab(Lock) Head.`, 1),
// new MeleeWeapon(`Metal Club`, 3, 2, `Blunt.`, 3),
// new MeleeWeapon(`Pickax`, 6, 2, `Lever. Pierce.`, 5),
// new MeleeWeapon(`Pitchfork`, 3, 2, `+1 Block. Pierce.`, 4),
// new MeleeWeapon(`Screwdriver`, 1, 1, `Lever. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Shovel`, 3, 2, `+1 Block`, 4),
// new MeleeWeapon(`Tire Iron`, 2, 1, `Lever.`, 2),
// new MeleeWeapon(`Torch`, 1, 1, `Blunt. +1 Fire Damage. 5yd light radius 1hr.`, 2),

const RangedWeaponList = [
	AR15,
	BenelliM4,
	BrowningABolt,
	ColtPython,
	CompoundBow,
	Crossbow,
	Glock17,
	HenryGoldenBoy,
	HKMP5,
	Marlin1894,
	Mossberg500,
	RecurveBow,
	Remington700,
	Remington870,
	Ruger1022,
	RugerMkIII,
	SavageMkII,
	SIGSauerP290,
	SpringfieldM1A,
	StoegerCoachgun,
	SWBodyguard,
];



// RARE RANGED
// new RangedWeapon(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
// new RangedWeapon(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
// new RangedWeapon(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
// new RangedWeapon(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. Fire Dacape.`, 6),
// new RangedWeapon(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
// new RangedWeapon(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
// new RangedWeapon(`M4A1 Carbine`, 4, 50, `5.56`, `30cap`, 2, `Auto. Rapid.`, 3),
// new RangedWeapon(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
// new RangedWeapon(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
// new RangedWeapon(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
// new RangedWeapon(`M82 Barret`, 12, 200, `.50BMG`, `10cap`, 2, `Rapid. Bipod. Scope.`, 6),
// new RangedWeapon(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
// new RangedWeapon(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
// new RangedWeapon(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
// new RangedWeapon(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
// new RangedWeapon(`Saiga-12`, 6, 15, `12g`, `12cap`, 2, `Rapid. Scatter.`, 4),
// new RangedWeapon(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
// new RangedWeapon(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2 round Reload.`, 4),
// new RangedWeapon(`Uzi`, 2, 10, `9mm`, `30cap`, 2, `Auto. Rapid. -1 RATK.`, 3),
// new RangedWeapon(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6 rounds.`, 1),

// OLD RANGED
// new RangedWeapon(`AK-47`, 4, 50, `7.62`, `30cap`, 2, `Auto. Rapid.`, 4),
// new RangedWeapon(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
// new RangedWeapon(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
// new RangedWeapon(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),

export { AmmoList as A, EquipmentList as E, MeleeWeaponList as M, RangedWeaponList as R, ArmorList as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2VkV2VhcG9uTGlzdC40NzAzZWE1MS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vQW1tb0xpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0FybW9yTGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Jlc291cmNlcy9DaGVtaWNhbC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Jlc291cmNlcy9Gb29kLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvcmVzb3VyY2VzL0Z1ZWwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9yZXNvdXJjZXMvUGFydC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Jlc291cmNlcy9XYXRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Jlc291cmNlcy9SZXNvdXJjZXNMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvdG9vbHMvQm9iYnlQaW4uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9Cb2x0Q3V0dGVycy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Rvb2xzL0R1Y3RUYXBlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvdG9vbHMvR2xhc3NDdXR0ZXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9HdW5DbGVhbmluZ0tpdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Rvb2xzL0hhY2tzYXcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9Mb2NrcGlja3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9NYWduaWZ5aW5nR2xhc3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9NZWFzdXJpbmdDdXAuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9NdWx0aXRvb2wuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9TcHJheVBhaW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvdG9vbHMvU3dpc3NBcm15S25pZmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9UYXBlTWVhc3VyZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3Rvb2xzL1Rvb2xCYWcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC90b29scy9XaXJlU2F3LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvdG9vbHMvVG9vbHNMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvQmFsYWNsYXZhLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvQmFuZGFubmEuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9CYXNlYmFsbENhcC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL0NhcmFiaW5lci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL0Nob2tlckxlYXNoLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvQ293Ym95SGF0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvRHVzdE1hc2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9FYXJQbHVncy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL0ZsaXBwZXJzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvR2FzTWFzay5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL0dvZ2dsZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9IYW5kY3VmZnMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9MZWF0aGVyQmVsdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL0xpZmVqYWNrZXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9NYWtldXAuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9Qb25jaG8uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9Sb2xsZXJibGFkZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9SdW5uaW5nU2hvZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9Tbm9ya2VsLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvU3VuZ2xhc3Nlcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3dlYXJhYmxlL1RoZXJtYWxVbmRlcndlYXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC93ZWFyYWJsZS9XcmlzdHdhdGNoLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvd2VhcmFibGUvV2VhcmFibGVMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50TGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9tZWxlZS9NZWxlZVdlYXBvbkxpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvcmFuZ2VkL1JhbmdlZFdlYXBvbkxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFtbW9BcnJvdyBmcm9tICcuL2Fycm93L0FtbW9BcnJvdydcbmltcG9ydCBBbW1vMjIgZnJvbSAnLi8yMi9BbW1vMjInXG5pbXBvcnQgQW1tbzltbSBmcm9tICcuLzltbS9BbW1vOW1tJ1xuaW1wb3J0IEFtbW8zNTcgZnJvbSAnLi8zNTcvQW1tbzM1NydcbmltcG9ydCBBbW1vNTU2IGZyb20gJy4vNTU2L0FtbW81NTYnXG5pbXBvcnQgQW1tbzMwOCBmcm9tICcuLzMwOC9BbW1vMzA4J1xuaW1wb3J0IEFtbW8xMmcgZnJvbSAnLi8xMmcvQW1tbzEyZydcblxuXG5jb25zdCBBbW1vTGlzdCA9IFtcblx0Li4uQW1tb0Fycm93LFxuXHQuLi5BbW1vMjIsXG5cdC4uLkFtbW85bW0sXG5cdC4uLkFtbW8zNTcsXG5cdC4uLkFtbW81NTYsXG5cdC4uLkFtbW8zMDgsXG5cdC4uLkFtbW8xMmcsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEFtbW9MaXN0XG5cblxuLy8gT0xEIEFNTU9cbi8vIG5ldyBBbW1vKGAuMjJgLFx0IGBUcmFjZXJgLFx0XHRcdGArMSBBdXRvIFJBdHRhY2suYCwuMDA1KSxcbi8vIG5ldyBBbW1vKGAxMmdgLFx0IGBCaXJkc2hvdGAsXHRcdCAgYEJhc2ljIGFtbW8uIFNjYXR0ZXIuYCwuMDUpLFxuLy8gbmV3IEFtbW8oYDEyZ2AsXHQgYEZsYXJlYCxcdFx0XHQgYDMgRmlyZSBEYW1hZ2Uvcm91bmQgZm9yIDMgcm91bmRzLiA1MHlkIGxpZ2h0IHJhZGl1cy5gLC4wNSksXG4vLyBuZXcgQW1tbyhgMTJnYCxcdCBgUnViYmVyYCxcdFx0XHRgQmx1bnQuYCwuMDUpLFxuLy8gbmV3IEFtbW8oYDUuNTZgLFx0YFRyYWNlcmAsXHRcdFx0YCsxIEF1dG8gUkFUSy5gLC4wMiksIiwiaW1wb3J0IEF0aGxldGljSGVsbWV0IGZyb20gJy4vQXRobGV0aWNIZWxtZXQnXG5pbXBvcnQgQXRobGV0aWNQYWRzIGZyb20gJy4vQXRobGV0aWNQYWRzJ1xuaW1wb3J0IENvbWJhdEhlbG1ldCBmcm9tICcuL0NvbWJhdEhlbG1ldCdcbmltcG9ydCBDb3ZlcmFsbHMgZnJvbSAnLi9Db3ZlcmFsbHMnXG5pbXBvcnQgRmlyZWZpZ2h0ZXJTdWl0IGZyb20gJy4vRmlyZWZpZ2h0ZXJTdWl0J1xuaW1wb3J0IEZsYWtKYWNrZXQgZnJvbSAnLi9GbGFrSmFja2V0J1xuaW1wb3J0IEdoaWxsaWVTdWl0IGZyb20gJy4vR2hpbGxpZVN1aXQnXG5pbXBvcnQgSGF6bWF0U3VpdCBmcm9tICcuL0hhem1hdFN1aXQnXG5pbXBvcnQgSGlraW5nQm9vdHMgZnJvbSAnLi9IaWtpbmdCb290cydcbmltcG9ydCBLZXZsYXJWZXN0IGZyb20gJy4vS2V2bGFyVmVzdCdcbmltcG9ydCBMZWF0aGVySmFja2V0IGZyb20gJy4vTGVhdGhlckphY2tldCdcbmltcG9ydCBNb3RvcmN5Y2xlSGVsbWV0IGZyb20gJy4vTW90b3JjeWNsZUhlbG1ldCdcbmltcG9ydCBQbGF0ZUNhcnJpZXIgZnJvbSAnLi9QbGF0ZUNhcnJpZXInXG5pbXBvcnQgV2ludGVyQ29hdCBmcm9tICcuL1dpbnRlckNvYXQnXG5pbXBvcnQgV29ya0dsb3ZlcyBmcm9tICcuL1dvcmtHbG92ZXMnXG5cblxuY29uc3QgQXJtb3JMaXN0ID0gW1xuXHRBdGhsZXRpY0hlbG1ldCxcblx0QXRobGV0aWNQYWRzLFxuXHRDb21iYXRIZWxtZXQsXG5cdENvdmVyYWxscyxcblx0RmlyZWZpZ2h0ZXJTdWl0LFxuXHRGbGFrSmFja2V0LFxuXHRHaGlsbGllU3VpdCxcblx0SGlraW5nQm9vdHMsXG5cdEtldmxhclZlc3QsXG5cdExlYXRoZXJKYWNrZXQsXG5cdE1vdG9yY3ljbGVIZWxtZXQsXG5cdEhhem1hdFN1aXQsXG5cdFBsYXRlQ2Fycmllcixcblx0V2ludGVyQ29hdCxcblx0V29ya0dsb3Zlcyxcbl1cblxuZXhwb3J0IGRlZmF1bHQgQXJtb3JMaXN0XG5cblxuXG4vLyBPTEQgQVJNT1Jcbi8vIG5ldyBBcm1vcihgRGVuaW0gSmFja2V0YCwgYDEsMWAsIGBBcm1zLCBUb3Jzb2AsIGBgLCAyKVxuLy8gbmV3IEFybW9yKGBJbnRlcmNlcHRvciBBcm1vcmAsIGAzLDZgLCBgQXJtcywgVG9yc29gLCBgQ2Ftby4gQ29sZCBSZXNpc3RhbmNlLiBGaXJlIFJlc2lzdGFuY2UuYCwgNSlcbi8vIG5ldyBBcm1vcihgS2V2bGFyIEdsb3Zlc2AsIGAyYCwgYEFybXNgLCBgRmlyZSBSZXNpc3RhbmNlLmAsIDEpXG4vLyBuZXcgQXJtb3IoYEtuZWUgUGFkc2AsIGAxYCwgYExlZ3NgLCBgYCwgMSlcbi8vIG5ldyBBcm1vcihgUGFpbnRiYWxsIE1hc2tgLCBgMWAsIGBIZWFkYCwgYE1hc2suYCwgMSlcbi8vIG5ldyBBcm1vcihgUmlvdCBIZWxtZXRgLCBgNGAsIGBIZWFkYCwgYEZpcmUgUmVzaXN0YW5jZS4gTWFzay5gLCAyKVxuLy8gbmV3IEFybW9yKGBTdGVlbC1Ub2UgQm9vdHNgLCBgMmAsIGBMZWdzYCwgYEJsdW50LiBGaXJlIFJlc2lzdGFuY2UuIEtpY2sgM0JETUdgLCAyKVxuLy8gbmV3IEFybW9yKGBUYWN0aWNhbCBWZXN0YCwgYDFgLCBgVG9yc29gLCBgNiBTdG9yYWdlLmAsIDEpXG4vLyBuZXcgQXJtb3IoYFVuZGVyY292ZXIgVmVzdGAsIGAzYCwgYFRvcnNvYCwgYEZpcmUgUmVzaXN0YW5jZS5gLCAzKVxuXG4vLyBSQVJFIEFSTU9SXG4vLyBuZXcgQXJtb3IoYEJsYWNrIFJvYmVgLCBgMSwxLDEsMWAsIGBIZWFkLCBUb3JzbywgQXJtcywgTGVnc2AsIGBDb2xkIFJlc2lzdGFuY2UuICsxIFN0ZWFsdGguYCwgMSlcbi8vIG5ldyBBcm1vcihgQ2hhaW5tYWlsIFNoaXJ0YCwgYDMsMywzYCwgYEhlYWQsIFRvcnNvLCBBcm1zYCwgYElnbm9yZSBDaG9wLmAsIDYpXG4vLyBuZXcgQXJtb3IoYERyYWdvbnNraW4gVmVzdGAsIGA4YCwgYFRvcnNvYCwgYENvbGQgUmVzaXN0YW5jZS4gRmlyZSBSZXNpc3RhbmNlLmAsIDMpXG4vLyBuZXcgQXJtb3IoYEtudWNrbGUgR2xvdmVzYCwgYDJgLCBgQXJtc2AsIGAyRE1HIFB1bmNoLiBCbHVudC4gRmlyZSBSZXNpc3RhbmNlLmAsIDEpXG4vLyBuZXcgQXJtb3IoYExhbmQgV2FycmlvciBIZWxtZXRgLCBgNGAsIGBIZWFkYCwgYEZpcmUgUmVzaXN0YW5jZS4gTmlnaHR2aXNpb24gR29nZ2xlcy4gUmFkaW8uYCwgMilcbi8vIG5ldyBBcm1vcihgU3Bpa2VkIEphY2tldGAsIGAyLCAyYCwgYFRvcnNvLCBBcm1zYCwgYCsxIERNRyBHcmFiLmAsIDMpIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQ2hlbWljYWwgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAwYjRjZjEwNC03OWJhLTQ1NGItYmMzNy04NDViMThkYTA5MzVgLFxuXHRuYW1lOiBgQ2hlbWljYWxgLFxuXHRkZXNjOiBbXG5cdFx0YFN1YnN0YW5jZXMgdXNlZCBmb3IgU2NpZW5jZShDaGVtaXN0cnkpLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDaGVtaWNhbCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEZvb2QgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGA3ZGE4ZmRmMi0xYWYyLTRhZWEtYjI0Ni1jNDlhYzhkNjQ5M2RgLFxuXHRuYW1lOiBgRm9vZGAsXG5cdGRlc2M6IFtcblx0XHRgMSB1bml0IE5lZWRlZCBwZXIgZGF5IHRvIHByZXZlbnQgU3RhcnZhdGlvbi5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRm9vZCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEZ1ZWwgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBlNGY1MmVmNS1jMjY0LTQzODMtOGExZC1iNDhjOTc5MGIxMWJgLFxuXHRuYW1lOiBgRnVlbGAsXG5cdGRlc2M6IFtcblx0XHRgRmxhbW1hYmxlIGxpcXVpZC4gVXNlZCB0byBwb3dlciBWZWhpY2xlcyBhbmQgbWFrZSBleHBsb3NpdmVzLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGdWVsIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUGFydCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDc4N2MxNTQ1LWUyYzgtNDY2ZS1iZDVmLTdkNzI5MDdkZGUyMWAsXG5cdG5hbWU6IGBQYXJ0YCxcblx0ZGVzYzogW1xuXHRcdGBTY3JhcCB1c2VkIGZvciBCdWlsZCBhbmQgU2NpZW5jZShUZWNoKS5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGFydCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFdhdGVyID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgMDQ2Yzg0Y2YtZTJkZC00NzM4LTkzYjctODYyYzMwMGNjZDhkYCxcblx0bmFtZTogYFdhdGVyYCxcblx0ZGVzYzogW1xuXHRcdGAxIHVuaXQgTmVlZGVkIHBlciBkYXkgdG8gcHJldmVudCBEZWh5ZHJhdGlvbi5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXIiLCJpbXBvcnQgQ2hlbWljYWwgZnJvbSAnLi9DaGVtaWNhbCdcbmltcG9ydCBGb29kIGZyb20gJy4vRm9vZCdcbmltcG9ydCBGdWVsIGZyb20gJy4vRnVlbCdcbmltcG9ydCBQYXJ0IGZyb20gJy4vUGFydCdcbmltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyJ1xuXG5cbmNvbnN0IFJlc291cmNlc0xpc3QgPSBbXG5cdENoZW1pY2FsLFxuXHRGb29kLFxuXHRGdWVsLFxuXHRQYXJ0LFxuXHRXYXRlcixcbl1cblxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VzTGlzdCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEJvYmJ5UGluID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgZTBiMTAwMGMtMWVlNy00NzBlLTkzN2EtMjMwMjgyYTJjY2E1YCxcblx0bmFtZTogYEJvYmJ5IFBpbmAsXG5cdGRlc2M6IFtcblx0XHRgQWxsb3dzIExhcmNlbnkoRGlzYWJsZSkgcm9sbCBvbiBrZXkgbG9ja3MuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEJvYmJ5UGluIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQm9sdEN1dHRlcnMgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAwNTMyYzg3MC1hZmJiLTQxOWMtOTAzMC1jNDQ3NjE2ZDc4NDVgLFxuXHRuYW1lOiBgQm9sdCBDdXR0ZXJzYCxcblx0ZGVzYzogW1xuXHRcdGBDOSMgdG8gY3V0IG1ldGFsIChIYW5kY3VmZnMsIFBhZGxvY2tzLCBldGMpLmAsXG5cdF0sXG5cdHN6OiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCb2x0Q3V0dGVycyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IER1Y3RUYXBlID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgNzkyNmFjODctNzQwZS00YjQ2LTlmODctMWQ4NWFiYmQ5MGI2YCxcblx0bmFtZTogYER1Y3QgVGFwZWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgQnVpbGQvMXlkIG9yIHVzZSAyeWRzIGFzIEhhbmRjdWZmcy5gLFxuXHRcdGA2MHlkcy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRHVjdFRhcGUiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBHbGFzc0N1dHRlciA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDQxMzEyYjZmLWQ0YzgtNGQ1Ni1hZjQzLWRiZTE5Njc5OWI2YWAsXG5cdG5hbWU6IGBHbGFzcyBDdXR0ZXJgLFxuXHRkZXNjOiBbXG5cdFx0YEN1dHMgZ2xhc3MgcXVpZXRseS5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgR2xhc3NDdXR0ZXIiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBHdW5DbGVhbmluZ0tpdCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGVhNDk1YWYzLWExNTgtNDkwYy04NGQ0LWJiZWJlM2I2ZmIyYmAsXG5cdG5hbWU6IGBHdW4gQ2xlYW5pbmcgS2l0YCxcblx0ZGVzYzogW1xuXHRcdGBHdW4gZ2V0cyArMSBSYW5nZWQgZm9yIDEgZGF5LmAsXG5cdFx0YFRha2VzIDFoci9ndW4uYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEd1bkNsZWFuaW5nS2l0IiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgSGFja3NhdyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDM4Mjg1NGQ0LWM1NjItNDliNy04OWM1LTg2NmE2ZDlkYWVlYWAsXG5cdG5hbWU6IGBIYWNrc2F3YCxcblx0ZGVzYzogW1xuXHRcdGAxIERhbWFnZS9yb3VuZCBvZiBzYXdpbmcgdG8gYWxtb3N0IGFueSBtYXRlcmlhbC5gLFxuXHRdLFxuXHRzejogMlxufSlcblxuZXhwb3J0IGRlZmF1bHQgSGFja3NhdyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IExvY2twaWNrcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGUwYWJhNzMyLTA5ODYtNGY4Yy04MTkyLWRhMWY2ZWEzNzhjN2AsXG5cdG5hbWU6IGBMb2NrcGlja3NgLFxuXHRkZXNjOiBbXG5cdFx0YCszIExhcmNlbnkoRGlzYWJsZSkga2V5IGxvY2tzLmAsXG5cdFx0YDYgcGlja3MuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExvY2twaWNrcyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IE1hZ25pZnlpbmdHbGFzcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGYyYzA0YjAxLWZkZWYtNGJlNi04MjgzLTkwNGQ4ZmZmZThiMGAsXG5cdG5hbWU6IGBNYWduaWZ5aW5nIEdsYXNzYCxcblx0ZGVzYzogW1xuXHRcdGArNiBQZXJjZXB0aW9uKFNlZSkgdG8gaW5zcGVjdCB0aW55IGRldGFpbHMuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1hZ25pZnlpbmdHbGFzcyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IE1lYXN1cmluZ0N1cCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDFhNDY2ODFkLTIxNjMtNGM0My1hYWEyLWM2YjllZmU3NTE5NmAsXG5cdG5hbWU6IGBNZWFzdXJpbmcgQ3VwYCxcblx0ZGVzYzogW1xuXHRcdGArMyBTY2llbmNlKENoZW1pc3RyeSkuYCxcblx0XHRgTWFya2VkIGdsYXNzIGN1cC5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWVhc3VyaW5nQ3VwIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTXVsdGl0b29sID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgYzE3MTgzZDYtNTI3ZC00ODJmLWE4M2ItYTI0MTBiNWUwNWJiYCxcblx0bmFtZTogYE11bHRpLXRvb2xgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIExhcmNlbnkoRGlzYWJsZSksIEJ1aWxkLCBTY2llbmNlKFRlY2gpLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNdWx0aXRvb2wiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBTcHJheVBhaW50ID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgOWRkOGZmYjktOWU3NC00YWVjLWIzNTUtMGRjMWQxM2VhYjU0YCxcblx0bmFtZTogYFNwcmF5IFBhaW50YCxcblx0ZGVzYzogW1xuXHRcdGBSYW5nZWQgQXR0YWNrLCBDYWxsZWQgU2hvdDogSGVhZC5gLFxuXHRcdGBCbGluZCBkNiByb3VuZHMuYCxcblx0XHRgMTAgdXNlcy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3ByYXlQYWludCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFN3aXNzQXJteUtuaWZlID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgOGY2OWQxY2ItZDQ4MC00NjBmLThkZDUtZmM0Mzg5MTA5NjVmYCxcblx0bmFtZTogYFN3aXNzIEFybXkgS25pZmVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEJ1aWxkIGFuZCBTdXJ2aXZhbC5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3dpc3NBcm15S25pZmUiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBUYXBlTWVhc3VyZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGVjY2Y4NDFkLTIyN2QtNGIxYy05YzUzLTVkZTY3NTZlMjkxNmAsXG5cdG5hbWU6IGBUYXBlIE1lYXN1cmVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEJ1aWxkLmAsXG5cdFx0YDEweWQgbG9uZyB3aW5kLXVwIG1ldGFsIHRhcGUuYCxcblx0XSxcblx0c3o6IDJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFRhcGVNZWFzdXJlIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgVG9vbEJhZyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDliNjVlNzI0LTc5YjctNDhmMi05ZGM3LTU0MzQwZjYwNmIzMmAsXG5cdG5hbWU6IGBUb29sIEJhZ2AsXG5cdGRlc2M6IFtcblx0XHRgKzMgQnVpbGQuYCxcblx0XHRgUGxpZXJzLCB3cmVuY2hlcywgbGV2ZWwsIGV0Yy5gLFxuXHRdLFxuXHRzejogM1xufSlcblxuZXhwb3J0IGRlZmF1bHQgVG9vbEJhZyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFdpcmVTYXcgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBlNGQwZmYzMS1iZTA3LTQ2MDQtYmMyMC0yYmI4NzBkNjIyMDJgLFxuXHRuYW1lOiBgV2lyZSBTYXdgLFxuXHRkZXNjOiBbXG5cdFx0YDEgRGFtYWdlL3JvdW5kIG9mIHNhd2luZyB0byB3b29kIG9yIGJvbmUuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFdpcmVTYXciLCJpbXBvcnQgQm9iYnlQaW4gZnJvbSAnLi9Cb2JieVBpbidcbmltcG9ydCBCb2x0Q3V0dGVycyBmcm9tICcuL0JvbHRDdXR0ZXJzJ1xuaW1wb3J0IER1Y3RUYXBlIGZyb20gJy4vRHVjdFRhcGUnXG5pbXBvcnQgR2xhc3NDdXR0ZXIgZnJvbSAnLi9HbGFzc0N1dHRlcidcbmltcG9ydCBHdW5DbGVhbmluZ0tpdCBmcm9tICcuL0d1bkNsZWFuaW5nS2l0J1xuaW1wb3J0IEhhY2tzYXcgZnJvbSAnLi9IYWNrc2F3J1xuaW1wb3J0IExvY2twaWNrIGZyb20gJy4vTG9ja3BpY2tzJ1xuaW1wb3J0IE1hZ25pZnlpbmdHbGFzcyBmcm9tICcuL01hZ25pZnlpbmdHbGFzcydcbmltcG9ydCBNZWFzdXJpbmdDdXAgZnJvbSAnLi9NZWFzdXJpbmdDdXAnXG5pbXBvcnQgTXVsdGl0b29sIGZyb20gJy4vTXVsdGl0b29sJ1xuaW1wb3J0IFNwcmF5UGFpbnQgZnJvbSAnLi9TcHJheVBhaW50J1xuaW1wb3J0IFN3aXNzQXJteUtuaWZlIGZyb20gJy4vU3dpc3NBcm15S25pZmUnXG5pbXBvcnQgVGFwZU1lYXN1cmUgZnJvbSAnLi9UYXBlTWVhc3VyZSdcbmltcG9ydCBUb29sQmFnIGZyb20gJy4vVG9vbEJhZydcbmltcG9ydCBXaXJlU2F3IGZyb20gJy4vV2lyZVNhdydcblxuXG5jb25zdCBUb29sTGlzdCA9IFtcblx0Qm9iYnlQaW4sXG5cdEJvbHRDdXR0ZXJzLFxuXHREdWN0VGFwZSxcblx0R2xhc3NDdXR0ZXIsXG5cdEd1bkNsZWFuaW5nS2l0LFxuXHRIYWNrc2F3LFxuXHRMb2NrcGljayxcblx0TWFnbmlmeWluZ0dsYXNzLFxuXHRNZWFzdXJpbmdDdXAsXG5cdE11bHRpdG9vbCxcblx0U3ByYXlQYWludCxcblx0U3dpc3NBcm15S25pZmUsXG5cdFRhcGVNZWFzdXJlLFxuXHRUb29sQmFnLFxuXHRXaXJlU2F3LFxuXVxuXG5leHBvcnQgZGVmYXVsdCBUb29sTGlzdCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEJhbGFjbGF2YSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDllMDA3Yjk1LWQ5ZDgtNGNlNC05OTZjLTY3YWIwZTg3ODBkN2AsXG5cdG5hbWU6IGBCYWxhY2xhdmFgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIFN0ZWFsdGguYCxcblx0XHRgTWFzay5gLFxuXHRcdGBDb2xkIFJlc2lzdGFuY2UuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEJhbGFjbGF2YSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEJhbmRhbm5hID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgMjY1NGRlNzItMjAyMS00MTlkLWJmZjgtMjkwNWFjZWE5ZjE5YCxcblx0bmFtZTogYEJhbmRhbm5hYCxcblx0ZGVzYzogW1xuXHRcdGArMSBDb25zdGl0dXRpb24gdnMgYWlyYm9ybmUgdG94aW5zLmAsXG5cdFx0YENhbiB1c2UgYXMgQmFuZGFnZS5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmFuZGFubmEiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBCYXNlYmFsbENhcCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGFhZmQ5Yzg5LTIyMzItNDZmZi1iNGU5LTlmYjBhZDVjNTc4NWAsXG5cdG5hbWU6IGBCYXNlYmFsbCBDYXBgLFxuXHRkZXNjOiBbXG5cdFx0YFJlZHVjZSBWaXNpYmlsaXR5KFJhaW4gYW5kIFN1bikgcGVuYWx0eSBieSAxLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlYmFsbENhcCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IENhcmFiaW5lciA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDA4YjM4ZGE0LTlhNjItNDM5Mi1iMGE0LTJmMzg1MTcwZmFhNmAsXG5cdG5hbWU6IGBDYXJhYmluZXJgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEF0aGxldGljcyhDbGltYiBhbmQgUmFwcGVsKS5gLFxuXHRcdGBIb2xkcyA1MFN6LmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDYXJhYmluZXIiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBDaG9rZXJMZWFzaCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGUzODRiYTY4LWJhNzctNDFiNC04N2JjLTNjYjU1N2U3NTZkN2AsXG5cdG5hbWU6IGBDaG9rZXIgTGVhc2hgLFxuXHRkZXNjOiBbXG5cdFx0YCszIFRhbWUuYCxcblx0XHRgR3JhYmJlZC5gLFxuXHRcdGBDb25zdGl0dXRpb24gKzMgdnMgQ29uc3RpdHV0aW9uIHRvIGNvbnRyb2wuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENob2tlckxlYXNoIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQ293Ym95SGF0ID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgZjZiMzVjMWUtYzkzYi00NmNhLTg5MjktMmNjNDcxZjA0Y2UyYCxcblx0bmFtZTogYENvd2JveSBIYXRgLFxuXHRkZXNjOiBbXG5cdFx0YFJlZHVjZSBWaXNpYmlsaXR5KFJhaW4gYW5kIFN1bikgcGVuYWx0eSBieSAzLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDb3dib3lIYXQiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBEdXN0TWFzayA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDI5ZmRlOGU4LWJjYTctNDU2MS1iMzY2LThmZGU2ZTRhYjcyN2AsXG5cdG5hbWU6IGBEdXN0IE1hc2tgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIENvbnN0aXR1dGlvbiB2cyBhaXJib3JuZSB0b3hpbnMuYCxcblx0XHRgTWFzay5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRHVzdE1hc2siLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBFYXJQbHVncyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDJhZTIyNDU0LTMyMTMtNDU5Ni05NWJhLWVkMmM0NTE0ODkwMGAsXG5cdG5hbWU6IGBFYXIgUGx1Z3NgLFxuXHRkZXNjOiBbXG5cdFx0YE5vIERlYWZuZXNzIGZyb20gbm9pc2UuYCxcblx0XHRgLTMgUGVyY2VwdGlvbihIZWFyKS5gLFxuXHRdLFxuXHRzejogOVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRWFyUGx1Z3MiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBGbGlwcGVycyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDBiODE5ODM4LWFiNTAtNDFjMC04NjRmLTkxOGRkYTFhYjQzZGAsXG5cdG5hbWU6IGBGbGlwcGVyc2AsXG5cdGRlc2M6IFtcblx0XHRgKzMgQXRobGV0aWNzKFN3aW0pLmAsXG5cdFx0YC02IHdhbGtpbmcgU3BlZWQuYCxcblx0XSxcblx0c3o6IDJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZsaXBwZXJzIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgR2FzTWFzayA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDU1NTg5YmZkLTAzYjctNDc3My05ZjNiLTVlY2ZiZDM1ODI5NWAsXG5cdG5hbWU6IGBHYXMgTWFza2AsXG5cdGRlc2M6IFtcblx0XHRgKzYgQ29uc3RpdHV0aW9uIHZzIGFpcmJvcm5lIHRveGlucy5gLFxuXHRcdGBNYXNrLmAsXG5cdFx0YC0xIFBlcmNlcHRpb24uYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEdhc01hc2siLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBHb2dnbGVzID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgZjlhNmVlMjctZTJlNy00NzM3LWEzM2YtNjI3NWI2MjVhMTc1YCxcblx0bmFtZTogYEdvZ2dsZXNgLFxuXHRkZXNjOiBbXG5cdFx0YCszIENvbnN0aXR1dGlvbiB0byByZXNpc3QgdG94aW5zIGluIGV5ZXMuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEdvZ2dsZXMiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBIYW5kY3VmZnMgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBlOGRhNWU1Yy1mNDY3LTRmZjAtODhjMS02MTU5YjZiZTRmOGFgLFxuXHRuYW1lOiBgSGFuZGN1ZmZzYCxcblx0ZGVzYzogW1xuXHRcdGBSZXN0cmFpbmVkIGlmIHBsYWNlZCBvbiBBcm1zLmAsXG5cdFx0YFNwZWVkID0gMSBpZiBwbGFjZWQgb24gTGVncy5gLFxuXHRcdGBBMTUjIHRvIGVzY2FwZS5gLFxuXHRcdGBMYXJjZW55KERpc2FibGUpIDEyIy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgSGFuZGN1ZmZzIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTGVhdGhlckJlbHQgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGA3NDQxZDc5Zi0yYTQxLTQ5ZmYtYTQ5NC00YzdiOTYwZTQ2NTJgLFxuXHRuYW1lOiBgTGVhdGhlciBCZWx0YCxcblx0ZGVzYzogW1xuXHRcdGAxeWQgc3RyYXAuYCxcblx0XHRgU3RvcHMgTGltYiBCbGVlZGluZy5gLFxuXHRcdGBIb2xkcyA1MFN6LmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMZWF0aGVyQmVsdCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IExpZmVqYWNrZXQgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBkMGM0ZDAyYy1kM2NiLTQzYTItYWU4ZC1mN2Q0OWIyMDM5ZTFgLFxuXHRuYW1lOiBgTGlmZWphY2tldGAsXG5cdGRlc2M6IFtcblx0XHRgKzYgQXRobGV0aWNzKFN3aW0pLmAsXG5cdFx0YFByZXZlbnRzIGRyb3duaW5nLmAsXG5cdF0sXG5cdHN6OiAyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMaWZlamFja2V0IiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTWFrZXVwID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgODZiMTlkMjktMDQxNi00NTgyLTljYWYtNDkyMTg5ZjRjMzc0YCxcblx0bmFtZTogYE1ha2V1cGAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU29jaWFsaXplIGFuZCBFbnRlcnRhaW4gZm9yIDZocnMuYCxcblx0XHRgMzAgdXNlcy5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWFrZXVwIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUG9uY2hvID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgZjg2OTY5MDctZjliMC00MGJhLTg1MmMtY2RkNGRiMWIxYjBhYCxcblx0bmFtZTogYFBvbmNob2AsXG5cdGRlc2M6IFtcblx0XHRgQ29sZCBSZXNpc3RhbmNlLmAsXG5cdFx0YFdhdGVycHJvb2YuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFBvbmNobyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFJvbGxlcmJsYWRlcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDljOGEyMzNkLWFkNDYtNDA2MS1iY2NiLTgzZDBjOGQzNjc1ZGAsXG5cdG5hbWU6IGBSb2xsZXJibGFkZXNgLFxuXHRkZXNjOiBbXG5cdFx0YEF0aGxldGljcyA2Iy5gLFxuXHRcdGBTcGVlZCB4My5gLFxuXHRcdGAxIHJvdW5kIGVxdWlwLmAsXG5cdFx0YEZhaWw6UHJvbmUuYCxcblx0XSxcblx0c3o6IDJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJvbGxlcmJsYWRlcyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFJ1bm5pbmdTaG9lcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDBlMmZkMzViLTdhZDgtNDhlMi05Y2UwLWQzYzc1ZDRmYmM5NmAsXG5cdG5hbWU6IGBSdW5uaW5nIFNob2VzYCxcblx0ZGVzYzogW1xuXHRcdGArMSBtaWxlIG9mIEpvZ2dpbmcgZGlzdGFuY2UuYCxcblx0XSxcblx0c3o6IDJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJ1bm5pbmdTaG9lcyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFNub3JrZWwgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAzNjNjYWE5Mi0zNGY1LTQxNzAtOTQwZi05YzkwOGY1ZDUxM2JgLFxuXHRuYW1lOiBgU25vcmtlbGAsXG5cdGRlc2M6IFtcblx0XHRgQnJlYXRoZSB3aGlsZSBqdXN0IGJlbmVhdGggd2F0ZXIncyBzdXJmYWNlLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTbm9ya2VsIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgU3VuZ2xhc3NlcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDg5NmE3YjlhLWY2YmMtNDI3NS04NGQ5LWY0ZDZkMDZmYjViNWAsXG5cdG5hbWU6IGBTdW5nbGFzc2VzYCxcblx0ZGVzYzogW1xuXHRcdGBObyBWaXNpYmlsaXR5KFN1bikgcGVuYWx0eS5gLFxuXHRcdGArMSBDb25zdGl0dXRpb24gdnMgbGlnaHQuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN1bmdsYXNzZXMiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBUaGVybWFsVW5kZXJ3ZWFyID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgMGM5YjZjYmEtZjFlMi00NTM4LTk2YzQtMTUzNDBhYjVlNWUzYCxcblx0bmFtZTogYFRoZXJtYWwgVW5kZXJ3ZWFyYCxcblx0ZGVzYzogW1xuXHRcdGBDb2xkIFJlc2lzdGFuY2UuYCxcblx0XHRgQ2FuIHVzZSBhcyA2IEJhbmRhZ2VzLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBUaGVybWFsVW5kZXJ3ZWFyIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgV3Jpc3R3YXRjaCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGQyOWIzZThmLWRlMGQtNGM1ZS04YjIzLWY2ZDEzMWJhZjAxNGAsXG5cdG5hbWU6IGBXcmlzdHdhdGNoYCxcblx0ZGVzYzogW1xuXHRcdGBUZWxscyB0aW1lIGFuZCArMSBTdXJ2aXZhbChOYXZpZ2F0ZSkuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFdyaXN0d2F0Y2giLCJpbXBvcnQgQmFsYWNsYXZhIGZyb20gJy4vQmFsYWNsYXZhJ1xuaW1wb3J0IEJhbmRhbm5hIGZyb20gJy4vQmFuZGFubmEnXG5pbXBvcnQgQmFzZWJhbGxDYXAgZnJvbSAnLi9CYXNlYmFsbENhcCdcbmltcG9ydCBDYXJhYmluZXIgZnJvbSAnLi9DYXJhYmluZXInXG5pbXBvcnQgQ2hva2VyTGVhc2ggZnJvbSAnLi9DaG9rZXJMZWFzaCdcbmltcG9ydCBDb3dib3lIYXQgZnJvbSAnLi9Db3dib3lIYXQnXG5pbXBvcnQgRHVzdE1hc2sgZnJvbSAnLi9EdXN0TWFzaydcbmltcG9ydCBFYXJQbHVncyBmcm9tICcuL0VhclBsdWdzJ1xuaW1wb3J0IEZsaXBwZXJzIGZyb20gJy4vRmxpcHBlcnMnXG5pbXBvcnQgR2FzTWFzayBmcm9tICcuL0dhc01hc2snXG5pbXBvcnQgR29nZ2xlcyBmcm9tICcuL0dvZ2dsZXMnXG5pbXBvcnQgSGFuZGN1ZmZzIGZyb20gJy4vSGFuZGN1ZmZzJ1xuaW1wb3J0IExlYXRoZXJCZWx0IGZyb20gJy4vTGVhdGhlckJlbHQnXG5pbXBvcnQgTGlmZWphY2tldCBmcm9tICcuL0xpZmVqYWNrZXQnXG5pbXBvcnQgTWFrZXVwIGZyb20gJy4vTWFrZXVwJ1xuaW1wb3J0IFBvbmNobyBmcm9tICcuL1BvbmNobydcbmltcG9ydCBSb2xsZXJibGFkZXMgZnJvbSAnLi9Sb2xsZXJibGFkZXMnXG5pbXBvcnQgUnVubmluZ1Nob2VzIGZyb20gJy4vUnVubmluZ1Nob2VzJ1xuaW1wb3J0IFNub3JrZWwgZnJvbSAnLi9Tbm9ya2VsJ1xuaW1wb3J0IFN1bmdsYXNzZXMgZnJvbSAnLi9TdW5nbGFzc2VzJ1xuaW1wb3J0IFRoZXJtYWxVbmRlcndlYXIgZnJvbSAnLi9UaGVybWFsVW5kZXJ3ZWFyJ1xuaW1wb3J0IFdyaXN0d2F0Y2ggZnJvbSAnLi9XcmlzdHdhdGNoJ1xuXG5jb25zdCBXZWFyYWJsZUxpc3QgPSBbXG5cdEJhbGFjbGF2YSxcblx0QmFuZGFubmEsXG5cdEJhc2ViYWxsQ2FwLFxuXHRDYXJhYmluZXIsXG5cdENob2tlckxlYXNoLFxuXHRDb3dib3lIYXQsXG5cdER1c3RNYXNrLFxuXHRFYXJQbHVncyxcblx0RmxpcHBlcnMsXG5cdEdhc01hc2ssXG5cdEdvZ2dsZXMsXG5cdEhhbmRjdWZmcyxcblx0TGVhdGhlckJlbHQsXG5cdExpZmVqYWNrZXQsXG5cdE1ha2V1cCxcblx0UG9uY2hvLFxuXHRSb2xsZXJibGFkZXMsXG5cdFJ1bm5pbmdTaG9lcyxcblx0U25vcmtlbCxcblx0U3VuZ2xhc3Nlcyxcblx0VGhlcm1hbFVuZGVyd2Vhcixcblx0V3Jpc3R3YXRjaCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgV2VhcmFibGVMaXN0IiwiaW1wb3J0IERvY3VtZW50TGlzdCBmcm9tICcuL2RvY3VtZW50cy9Eb2N1bWVudExpc3QnXG5pbXBvcnQgRHJ1Z3NMaXN0IGZyb20gJy4vZHJ1Z3MvRHJ1Z3NMaXN0J1xuaW1wb3J0IEVsZWN0cm9uaWNzTGlzdCBmcm9tICcuL2VsZWN0cm9uaWNzL0VsZWN0cm9uaWNzTGlzdCdcbmltcG9ydCBNZWRpY2FsTGlzdCBmcm9tICcuL21lZGljYWwvTWVkaWNhbExpc3QnXG5pbXBvcnQgTWlzY0xpc3QgZnJvbSAnLi9taXNjL01pc2NMaXN0J1xuaW1wb3J0IFJlc291cmNlc0xpc3QgZnJvbSAnLi9yZXNvdXJjZXMvUmVzb3VyY2VzTGlzdCdcbmltcG9ydCBTdG9yYWdlTGlzdCBmcm9tICcuL3N0b3JhZ2UvU3RvcmFnZUxpc3QnXG5pbXBvcnQgVG9vbHNMaXN0IGZyb20gJy4vdG9vbHMvVG9vbHNMaXN0J1xuaW1wb3J0IFdlYXJhYmxlTGlzdCBmcm9tICcuL3dlYXJhYmxlL1dlYXJhYmxlTGlzdCdcblxuXG5jb25zdCBFcXVpcG1lbnRMaXN0ID0gW1xuXHQuLi5Eb2N1bWVudExpc3QsXG5cdC4uLkRydWdzTGlzdCxcblx0Li4uRWxlY3Ryb25pY3NMaXN0LFxuXHQuLi5NZWRpY2FsTGlzdCxcblx0Li4uTWlzY0xpc3QsXG5cdC4uLlJlc291cmNlc0xpc3QsXG5cdC4uLlN0b3JhZ2VMaXN0LFxuXHQuLi5Ub29sc0xpc3QsXG5cdC4uLldlYXJhYmxlTGlzdCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgRXF1aXBtZW50TGlzdCIsImltcG9ydCBBeCBmcm9tICcuL0F4J1xuaW1wb3J0IEJhc2ViYWxsQmF0IGZyb20gJy4vQmFzZWJhbGxCYXQnXG5pbXBvcnQgQnJhc3NLbnVja2xlcyBmcm9tICcuL0JyYXNzS251Y2tsZXMnXG5pbXBvcnQgQ2x1YiBmcm9tICcuL0NsdWInXG5pbXBvcnQgQ3Jvd2JhciBmcm9tICcuL0Nyb3diYXInXG5pbXBvcnQgSGFtbWVyIGZyb20gJy4vSGFtbWVyJ1xuaW1wb3J0IEhhdGNoZXQgZnJvbSAnLi9IYXRjaGV0J1xuaW1wb3J0IEtuaWZlIGZyb20gJy4vS25pZmUnXG5pbXBvcnQgTWFjaGV0ZSBmcm9tICcuL01hY2hldGUnXG5pbXBvcnQgUmlvdFNoaWVsZCBmcm9tICcuL1Jpb3RTaGllbGQnXG5pbXBvcnQgU2xlZGdlaGFtbWVyIGZyb20gJy4vU2xlZGdlaGFtbWVyJ1xuaW1wb3J0IFNwZWFyIGZyb20gJy4vU3BlYXInXG5pbXBvcnQgU3RhZmYgZnJvbSAnLi9TdGFmZidcblxuXG5jb25zdCBNZWxlZVdlYXBvbkxpc3QgPSBbXG5cdEF4LFxuXHRCYXNlYmFsbEJhdCxcblx0QnJhc3NLbnVja2xlcyxcblx0Q2x1Yixcblx0Q3Jvd2Jhcixcblx0SGFtbWVyLFxuXHRIYXRjaGV0LFxuXHRLbmlmZSxcblx0TWFjaGV0ZSxcblx0UmlvdFNoaWVsZCxcblx0U2xlZGdlaGFtbWVyLFxuXHRTcGVhcixcblx0U3RhZmYsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IE1lbGVlV2VhcG9uTGlzdFxuXG5cbi8vIFJBUkUgTUVMRUVcbi8vIG5ldyBNZWxlZVdlYXBvbihgQmFyYndpcmUgQ2x1YmAsIDMsIDEsIGBgLCAyKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgQm93aWUgS25pZmVgLCAyLCAxLCBgQ2hvcC4gUmFwaWQuYCwgMSksXG4vLyBuZXcgTWVsZWVXZWFwb24oYEJyb2Fkc3dvcmRgLCA0LCAyLCBgQ2hvcCBvciBQaWVyY2UuYCwgNCksXG4vLyBuZXcgTWVsZWVXZWFwb24oYENhdGNoIFBvbGVgLCAwLCAyLCBgKzEgQmxvY2suIEJsdW50LiArMSBHcmFiLmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBDaGFpbnNhd2AsIDYsIDIsIGAuNWdhbCBGdWVsLiBkNiByb3VuZHMgdG8gc3RhcnQuIDE6IEVtcHR5LiBMb3VkLmAsIDQpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBJY2UgQXhgLCAzLCAxLCBgTGV2ZXIuIFBpZXJjZS5gLCAyKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgS2F0YW5hYCwgNSwgMiwgYENob3Agb3IgUGllcmNlLiBSYXBpZC5gLCAzKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgS3VrcmlgLCAzLCAxLCBgQ2hvcGAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBMYXNzb2AsIDAsIDIsIGBCbHVudC4gKzEgR3JhYi4gVGhyb3cgKFJhbmdlOjMpYCwgMiksXG4vLyBuZXcgTWVsZWVXZWFwb24oYE5ldGAsIDAsIDIsIGArNiBHcmFiLmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBSYXBpZXJgLCAzLCAxLCBgUGllcmNlLiBSYXBpZC5gLCAyKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgU2N5dGhlYCwgNiwgMiwgYENob3AuIFBpZXJjZS5gLCA0KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgU2lnbiBTaGllbGRgLCAyLCAxLCBgKzMgQmxvY2suIENvdmVyIDYgRGFtYWdlIFJlc2lzdGFuY2UuYCwgNCksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFN3aXRjaGJsYWRlYCwgMSwgMSwgYFBpZXJjZS4gUmFwaWQuYCwgMCksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFRyZW5jaCBLbmlmZWAsIDIsIDEsIGBCbHVudCBQdW5jaC4gUGllcmNlLiBSYXBpZC5gLCAxKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgV2hpcGAsIDAsIDEsIGBCbHVudC4gKzEgRGlzYXJtLiArMSBHcmFiLiBSYW5nZTozLmAsIDEpLFxuXG4vLyBPTEQgTUVMRUVcbi8vIG5ldyBNZWxlZVdlYXBvbihgQmF0b25gLCAyLCAxLCBgQmx1bnQuIFJhcGlkLmAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBDYW5lYCwgMSwgMSwgYEJsdW50LiArMSBUcmlwLiBDYW4gYmUgdXNlZCBhcyBhIENydXRjaC5gLCAzKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgQ2xlYXZlcmAsIDIsIDEsIGBDaG9wLmAsIDEpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBGaXJlcG9rZXJgLCAzLCAxLCBgTGV2ZXIuIFBpZXJjZS5gLCAzKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgR2Fycm90ZWAsIDEsIDIsIGBCbHVudC4gKzMgdG8gR3JhYihMb2NrKSBIZWFkLmAsIDEpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBNZXRhbCBDbHViYCwgMywgMiwgYEJsdW50LmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBQaWNrYXhgLCA2LCAyLCBgTGV2ZXIuIFBpZXJjZS5gLCA1KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgUGl0Y2hmb3JrYCwgMywgMiwgYCsxIEJsb2NrLiBQaWVyY2UuYCwgNCksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFNjcmV3ZHJpdmVyYCwgMSwgMSwgYExldmVyLiBQaWVyY2UuIFJhcGlkLmAsIDEpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBTaG92ZWxgLCAzLCAyLCBgKzEgQmxvY2tgLCA0KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgVGlyZSBJcm9uYCwgMiwgMSwgYExldmVyLmAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBUb3JjaGAsIDEsIDEsIGBCbHVudC4gKzEgRmlyZSBEYW1hZ2UuIDV5ZCBsaWdodCByYWRpdXMgMWhyLmAsIDIpLCIsImltcG9ydCBBUjE1IGZyb20gJy4vQVIxNSdcbmltcG9ydCBCZW5lbGxpTTQgZnJvbSAnLi9CZW5lbGxpTTQnXG5pbXBvcnQgQnJvd25pbmdBQm9sdCBmcm9tICcuL0Jyb3duaW5nQUJvbHQnXG5pbXBvcnQgQ29sdFB5dGhvbiBmcm9tICcuL0NvbHRQeXRob24nXG5pbXBvcnQgQ29tcG91bmRCb3cgZnJvbSAnLi9Db21wb3VuZEJvdydcbmltcG9ydCBDcm9zc2JvdyBmcm9tICcuL0Nyb3NzYm93J1xuaW1wb3J0IEdsb2NrMTcgZnJvbSAnLi9HbG9jazE3J1xuaW1wb3J0IEhlbnJ5R29sZGVuQm95IGZyb20gJy4vSGVucnlHb2xkZW5Cb3knXG5pbXBvcnQgSEtNUDUgZnJvbSAnLi9IS01QNSdcbmltcG9ydCBNYXJsaW4xODk0IGZyb20gJy4vTWFybGluMTg5NCdcbmltcG9ydCBNb3NzYmVyZzUwMCBmcm9tICcuL01vc3NiZXJnNTAwJ1xuaW1wb3J0IFJlY3VydmVCb3cgZnJvbSAnLi9SZWN1cnZlQm93J1xuaW1wb3J0IFJlbWluZ3RvbjcwMCBmcm9tICcuL1JlbWluZ3RvbjcwMCdcbmltcG9ydCBSZW1pbmd0b244NzAgZnJvbSAnLi9SZW1pbmd0b244NzAnXG5pbXBvcnQgUnVnZXIxMDIyIGZyb20gJy4vUnVnZXIxMDIyJ1xuaW1wb3J0IFJ1Z2VyTWtJSUkgZnJvbSAnLi9SdWdlck1rSUlJJ1xuaW1wb3J0IFNhdmFnZU1rSUkgZnJvbSAnLi9TYXZhZ2VNa0lJJ1xuaW1wb3J0IFNJR1NhdWVyUDI5MCBmcm9tICcuL1NJR1NhdWVyUDI5MCdcbmltcG9ydCBTcHJpbmdmaWVsZE0xQSBmcm9tICcuL1NwcmluZ2ZpZWxkTTFBJ1xuaW1wb3J0IFN0b2VnZXJDb2FjaGd1biBmcm9tICcuL1N0b2VnZXJDb2FjaGd1bidcbmltcG9ydCBTV0JvZHlndWFyZCBmcm9tICcuL1NXQm9keWd1YXJkJ1xuXG5cbmNvbnN0IFJhbmdlZFdlYXBvbkxpc3QgPSBbXG5cdEFSMTUsXG5cdEJlbmVsbGlNNCxcblx0QnJvd25pbmdBQm9sdCxcblx0Q29sdFB5dGhvbixcblx0Q29tcG91bmRCb3csXG5cdENyb3NzYm93LFxuXHRHbG9jazE3LFxuXHRIZW5yeUdvbGRlbkJveSxcblx0SEtNUDUsXG5cdE1hcmxpbjE4OTQsXG5cdE1vc3NiZXJnNTAwLFxuXHRSZWN1cnZlQm93LFxuXHRSZW1pbmd0b243MDAsXG5cdFJlbWluZ3Rvbjg3MCxcblx0UnVnZXIxMDIyLFxuXHRSdWdlck1rSUlJLFxuXHRTYXZhZ2VNa0lJLFxuXHRTSUdTYXVlclAyOTAsXG5cdFNwcmluZ2ZpZWxkTTFBLFxuXHRTdG9lZ2VyQ29hY2hndW4sXG5cdFNXQm9keWd1YXJkLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBSYW5nZWRXZWFwb25MaXN0XG5cblxuXG4vLyBSQVJFIFJBTkdFRFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgQmxvd2d1bmAsIDAsIGBDeDJgLCBgRGFydGAsIDEsIDIsIGBQaWVyY2UuIERNRyBNb2QuYCwgMSksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBCb2xhc2AsIDAsIGBDeDJgLCBgLWAsIGAtYCwgMSwgYEJsdW50LiBETUcgTW9kLiBUcmlwLiBUaHJvdy5gLCAxKSxcdFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgRGVycmluZ2VyYCwgMSwgMywgYC4yMmAsIDIsIDEsIGAtMSBSQVRLLmAsIDApLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgRmxhbWV0aHJvd2VyYCwgYGQ2eDNgLCA1LCBgRnVlbGAsIDcsIGBBdXRvLiAzeWQgQmxhc3QuIEZpcmUgRGFjYXBlLmAsIDYpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTG9uZ2Jvd2AsIDEsIDIwLCBgQXJyb3dgLCAxLCAyLCBgRE1HIE1vZC4gLTEgUkFUSy5gLCAzKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE0yIEJyb3duaW5nYCwgMTIsIDIwMCwgYC41MEJNR2AsIGBiZWx0YCwgMiwgYEF1dG8uIE1vdW50ZWQuYCwgMTYpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTRBMSBDYXJiaW5lYCwgNCwgNTAsIGA1LjU2YCwgYDMwY2FwYCwgMiwgYEF1dG8uIFJhcGlkLmAsIDMpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTMyIExhdW5jaGVyYCwgYHZhcmllc2AsIDI1LCBgNDBtbWAsIDYsIDIsIGBSYXBpZC5gLCA0KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE02MCBNYWNoaW5lZ3VuYCwgNSwgMTAwLCBgLjMwOGAsIDMwMCwgMiwgYEF1dG8uIFJhcGlkLiBCaXBvZC5gLCA2KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE03MiBMQVdgLCBgZDZ4OWAsIDUwLCBgUm9ja2V0YCwgMSwgMiwgYDEyeWQgQmxhc3QuIFBpZXJjZS5gLCAzKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE04MiBCYXJyZXRgLCAxMiwgMjAwLCBgLjUwQk1HYCwgYDEwY2FwYCwgMiwgYFJhcGlkLiBCaXBvZC4gU2NvcGUuYCwgNiksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNMTM0IE1pbmlndW5gLCA1LCAxMDAsIGAuMzA4YCwgMTAwMCwgMiwgYEF1dG8gb25seS4gUmFwaWQuIE1vdW50ZWQuYCwgOCksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNMjAzIExhdW5jaGVyYCwgYHZhcmllc2AsIDI1LCBgNDBtbWAsIDEsIDIsIGAyaCBHVU4gQUNDRVNTT1JZLmAsIDIpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTI0OSBTQVdgLCA0LCAxMDAsIGA1LjU2YCwgMTAwLCAyLCBgQXV0by4gUmFwaWQuYCwgNSksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNZWR1c2EgNDdgLCBgMiwgM2AsIGA5bW0sIC4zNTdgLCBgNmN5bGAsIDEsIGBSZXZvbHZlci4gTXVsdGktQ2FsaWJlci5gLCAyKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYFNhaWdhLTEyYCwgNiwgMTUsIGAxMmdgLCBgMTJjYXBgLCAyLCBgUmFwaWQuIFNjYXR0ZXIuYCwgNCksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBTbGluZ3Nob3RgLCAxLCA1LCBgUm9ja3NgLCAxLCAyLCBgQmx1bnQuIERNRyBNb2QuYCwgMSksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBTcGVhcmd1bmAsIDQsIDUsIGBBcnJvdyArIFJvcGVgLCAxLCAyLCBgUGllcmNlLiAyIHJvdW5kIFJlbG9hZC5gLCA0KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYFV6aWAsIDIsIDEwLCBgOW1tYCwgYDMwY2FwYCwgMiwgYEF1dG8uIFJhcGlkLiAtMSBSQVRLLmAsIDMpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgVy4gUC4gR3JlbmFkZWAsIGBkNngzYCwgMywgYEdyZW5hZGVgLCAxLCAxLCBgNnlkIEJsYXN0LiBCbGluZC4gZDYgcm91bmRzLmAsIDEpLFxuXG4vLyBPTEQgUkFOR0VEXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBBSy00N2AsIDQsIDUwLCBgNy42MmAsIGAzMGNhcGAsIDIsIGBBdXRvLiBSYXBpZC5gLCA0KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE5vcmluY28gU0tTYCwgNCwgNTAsIGA3LjYyYCwgMTAsIDIsIGBSYXBpZC4gQmF5b25ldC5gLCA0KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYEtpbWJlciAxOTExYCwgMiwgMjUsIGAuNDVgLCA3LCAxLCBgUmFwaWQuYCwgMSksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNQUMtMTBgLCAyLCA1LCBgLjQ1YCwgMzAsIDIsIGBBdXRvLiBSYXBpZC4gLTEgUkFUS2AsIDIpLFxuXG5cblxuIl0sIm5hbWVzIjpbIkFtbW9BcnJvdyIsIkFtbW8yMiIsIkFtbW85bW0iLCJBbW1vMzU3IiwiQW1tbzU1NiIsIkFtbW8zMDgiLCJBbW1vMTJnIiwiRmxha0phY2tldCIsIkxvY2twaWNrIiwiRHJ1Z3NMaXN0IiwiRWxlY3Ryb25pY3NMaXN0IiwiVG9vbHNMaXN0Il0sIm1hcHBpbmdzIjoiOzs7QUFTSyxNQUFDLFFBQVEsR0FBRztBQUNqQixDQUFDLEdBQUdBLFNBQVM7QUFDYixDQUFDLEdBQUdDLE1BQU07QUFDVixDQUFDLEdBQUdDLE9BQU87QUFDWCxDQUFDLEdBQUdDLE9BQU87QUFDWCxDQUFDLEdBQUdDLE9BQU87QUFDWCxDQUFDLEdBQUdDLE9BQU87QUFDWCxDQUFDLEdBQUdDLE9BQU87QUFDWCxFQUFDO0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWSyxNQUFDLFNBQVMsR0FBRztBQUNsQixDQUFDLGNBQWM7QUFDZixDQUFDLFlBQVk7QUFDYixDQUFDLFlBQVk7QUFDYixDQUFDLFNBQVM7QUFDVixDQUFDLGVBQWU7QUFDaEIsQ0FBQ0MsSUFBVTtBQUNYLENBQUMsV0FBVztBQUNaLENBQUMsV0FBVztBQUNaLENBQUMsVUFBVTtBQUNYLENBQUMsYUFBYTtBQUNkLENBQUMsZ0JBQWdCO0FBQ2pCLENBQUMsVUFBVTtBQUNYLENBQUMsWUFBWTtBQUNiLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLEVBQUM7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBLE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQy9CLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7QUFDakIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsdUNBQXVDLENBQUM7QUFDM0MsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1BELE1BQU0sSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQzNCLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDYixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztBQUNoRCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDM0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztBQUNiLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLDZEQUE2RCxDQUFDO0FBQ2pFLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNQRCxNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUMzQixDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ2IsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsdUNBQXVDLENBQUM7QUFDM0MsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1BELE1BQU0sS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQzVCLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDZCxDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztBQUNqRCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDSEQsTUFBTSxhQUFhLEdBQUc7QUFDdEIsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxJQUFJO0FBQ0wsQ0FBQyxJQUFJO0FBQ0wsQ0FBQyxJQUFJO0FBQ0wsQ0FBQyxLQUFLO0FBQ047O0FDVkEsTUFBTSxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDL0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztBQUM5QyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDbEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztBQUNyQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztBQUNoRCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDL0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztBQUMxQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ1YsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDckIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsbUJBQW1CLENBQUM7QUFDdkIsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1BELE1BQU0sY0FBYyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ3JDLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztBQUN6QixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztBQUNqQyxFQUFFLENBQUMsY0FBYyxDQUFDO0FBQ2xCLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNSRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ2hCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLGdEQUFnRCxDQUFDO0FBQ3BELEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNQRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUNoQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ2xCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0FBQ2xDLEVBQUUsQ0FBQyxRQUFRLENBQUM7QUFDWixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDdEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDO0FBQ3pCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLDJDQUEyQyxDQUFDO0FBQy9DLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNQRCxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUNuQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDO0FBQ3RCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0FBQzFCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztBQUNyQixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztBQUM5QyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztBQUNwQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztBQUNyQyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7QUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNaLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNURCxNQUFNLGNBQWMsR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUNyQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7QUFDekIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsc0JBQXNCLENBQUM7QUFDMUIsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1BELE1BQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDckIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ2IsRUFBRSxDQUFDLDZCQUE2QixDQUFDO0FBQ2pDLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNSRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ2pCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNiLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztBQUNqQyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNqQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztBQUM3QyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDT0QsTUFBTSxRQUFRLEdBQUc7QUFDakIsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxjQUFjO0FBQ2YsQ0FBQyxPQUFPO0FBQ1IsQ0FBQ0MsU0FBUTtBQUNULENBQUMsZUFBZTtBQUNoQixDQUFDLFlBQVk7QUFDYixDQUFDLFNBQVM7QUFDVixDQUFDLFVBQVU7QUFDWCxDQUFDLGNBQWM7QUFDZixDQUFDLFdBQVc7QUFDWixDQUFDLE9BQU87QUFDUixDQUFDLE9BQU87QUFDUjs7QUM5QkEsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxXQUFXLENBQUM7QUFDZixFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ1QsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0FBQ3BCLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNURCxNQUFNLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUMvQixDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ2pCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0FBQ3ZDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztBQUN2QixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDbEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztBQUNyQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztBQUNqRCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztBQUNuQyxFQUFFLENBQUMsV0FBVyxDQUFDO0FBQ2YsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDckIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ1osRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNaLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztBQUMvQyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDVEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztBQUNqRCxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDL0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztBQUN2QyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ1QsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQy9CLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDbEIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsdUJBQXVCLENBQUM7QUFDM0IsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0FBQ3hCLEVBQUU7QUFDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ04sQ0FBQzs7QUNSRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQztBQUMvQixDQUFDLEVBQUUsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0FBQzNDLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ2pCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0FBQ3ZCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztBQUNyQixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNqQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztBQUN2QyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ1QsRUFBRSxDQUFDLGNBQWMsQ0FBQztBQUNsQixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDVEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUNoQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztBQUM3QyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNsQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztBQUNqQyxFQUFFLENBQUMsNEJBQTRCLENBQUM7QUFDaEMsRUFBRSxDQUFDLGVBQWUsQ0FBQztBQUNuQixFQUFFLENBQUMscUJBQXFCLENBQUM7QUFDekIsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1ZELE1BQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ2xDLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDckIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsVUFBVSxDQUFDO0FBQ2QsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0FBQ3hCLEVBQUUsQ0FBQyxXQUFXLENBQUM7QUFDZixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDVEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztBQUN2QixFQUFFLENBQUMsa0JBQWtCLENBQUM7QUFDdEIsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQzdCLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDZixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUN4QyxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ1osRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQzdCLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDZixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNwQixFQUFFLENBQUMsV0FBVyxDQUFDO0FBQ2YsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQ25DLENBQUMsRUFBRSxFQUFFLENBQUMsb0NBQW9DLENBQUM7QUFDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDckIsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLENBQUMsYUFBYSxDQUFDO0FBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDYixFQUFFLENBQUMsY0FBYyxDQUFDO0FBQ2xCLEVBQUUsQ0FBQyxXQUFXLENBQUM7QUFDZixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDVkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDbkMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQztBQUN0QixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztBQUNoQyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUNoQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztBQUMvQyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztBQUMvQixFQUFFLENBQUMseUJBQXlCLENBQUM7QUFDN0IsRUFBRTtBQUNGLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDTixDQUFDOztBQ1JELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDdkMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDO0FBQzFCLENBQUMsSUFBSSxFQUFFO0FBQ1AsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0FBQ3BCLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztBQUMxQixFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDUkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7QUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixDQUFDLElBQUksRUFBRTtBQUNQLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztBQUN6QyxFQUFFO0FBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNOLENBQUM7O0FDYUQsTUFBTSxZQUFZLEdBQUc7QUFDckIsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxVQUFVO0FBQ1g7O0FDbkNLLE1BQUMsYUFBYSxHQUFHO0FBQ3RCLENBQUMsR0FBRyxZQUFZO0FBQ2hCLENBQUMsR0FBR0MsUUFBUztBQUNiLENBQUMsR0FBR0MsY0FBZTtBQUNuQixDQUFDLEdBQUcsV0FBVztBQUNmLENBQUMsR0FBRyxRQUFRO0FBQ1osQ0FBQyxHQUFHLGFBQWE7QUFDakIsQ0FBQyxHQUFHLFdBQVc7QUFDZixDQUFDLEdBQUdDLFFBQVM7QUFDYixDQUFDLEdBQUcsWUFBWTtBQUNoQjs7QUNOSyxNQUFDLGVBQWUsR0FBRztBQUN4QixDQUFDLEVBQUU7QUFDSCxDQUFDLFdBQVc7QUFDWixDQUFDLGFBQWE7QUFDZCxDQUFDLElBQUk7QUFDTCxDQUFDLE9BQU87QUFDUixDQUFDLE1BQU07QUFDUCxDQUFDLE9BQU87QUFDUixDQUFDLEtBQUs7QUFDTixDQUFDLE9BQU87QUFDUixDQUFDLFVBQVU7QUFDWCxDQUFDLFlBQVk7QUFDYixDQUFDLEtBQUs7QUFDTixDQUFDLEtBQUs7QUFDTixFQUFDO0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDSyxNQUFDLGdCQUFnQixHQUFHO0FBQ3pCLENBQUMsSUFBSTtBQUNMLENBQUMsU0FBUztBQUNWLENBQUMsYUFBYTtBQUNkLENBQUMsVUFBVTtBQUNYLENBQUMsV0FBVztBQUNaLENBQUMsUUFBUTtBQUNULENBQUMsT0FBTztBQUNSLENBQUMsY0FBYztBQUNmLENBQUMsS0FBSztBQUNOLENBQUMsVUFBVTtBQUNYLENBQUMsV0FBVztBQUNaLENBQUMsVUFBVTtBQUNYLENBQUMsWUFBWTtBQUNiLENBQUMsWUFBWTtBQUNiLENBQUMsU0FBUztBQUNWLENBQUMsVUFBVTtBQUNYLENBQUMsVUFBVTtBQUNYLENBQUMsWUFBWTtBQUNiLENBQUMsY0FBYztBQUNmLENBQUMsZUFBZTtBQUNoQixDQUFDLFdBQVc7QUFDWixFQUFDO0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyJ9
