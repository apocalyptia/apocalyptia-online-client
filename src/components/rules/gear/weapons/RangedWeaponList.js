import RangedWeapon from '../../../classes/gear/RangedWeapon'
import {
	Auto,
	Rapid,
	Scatter,
	TwoHanded
} from '../attributes/WeaponAttributesList'


export const AR15 = new RangedWeapon({
	name: `AR-15`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attributes: [
		TwoHanded,
		Rapid,
	],
	mag: 30,
	cal: `5.56`
})

export const BenelliM4 = new RangedWeapon({
	name: `BenelliM4`,
	sz: 4,
	dmg: 4,
	rng: 15,
	attributes: [
		TwoHanded,
		Rapid,
		Scatter,
	],
	mag: 6,
	cal: `12g`
})

export const BrowningABolt = new RangedWeapon({
	name: `Browning A-Bolt`,
	sz: 4,
	dmg: 3,
	rng: 60,
	attributes: [
		TwoHanded,
	],
	mag: 5,
	cal: `5.56`
})

export const ColtPython = new RangedWeapon({
	name: `Colt Python`,
	sz: 1,
	dmg: 2,
	rng: 10,
	attributes: [
		TwoHanded,
	],
	mag: 6,
	cal: `.357`
})

export const CompoundBow = new RangedWeapon({
	name: `Compound Bow`,
	sz: 3,
	dmg: 1,
	rng: 15,
	attributes: [
		TwoHanded,
	],
	mag: 1,
	cal: `Arrow`
})

export const Crossbow = new RangedWeapon({
	name: `Crossbow`,
	sz: 3,
	dmg: 2,
	rng: 15,
	attributes: [
		TwoHanded,
	],
	mag: 1,
	cal: `Arrow`
})

export const DoubleBarrelShotgun = new RangedWeapon({
	name: `Double-Barrel Shotgun`,
	sz: 4,
	dmg: 4,
	rng: 15,
	attributes: [
		TwoHanded,
		Rapid,
		Scatter,
	],
	mag: 2,
	cal: `12g`
})

export const Glock17 = new RangedWeapon({
	name: `Glock 17`,
	sz: 1,
	dmg: 1,
	rng: 10,
	attributes: [
		TwoHanded,
		Rapid,
	],
	mag: 17,
	cal: `9mm`
})

export const HenryGoldenBoy = new RangedWeapon({
	name: `Henry Golden Boy`,
	sz: 3,
	dmg: 1,
	rng: 30,
	attributes: [
		TwoHanded,
	],
	mag: 16,
	cal: `.357`
})

export const HKMP5 = new RangedWeapon({
	name: `H&K MP5`,
	sz: 3,
	dmg: 1,
	rng: 20,
	attributes: [
		TwoHanded,
		Auto,
		Rapid,
	],
	mag: 30,
	cal: `9mm`
})

export const Marlin1894 = new RangedWeapon({
	name: `Marlin 1894`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attributes: [
		TwoHanded,
	],
	mag: 9,
	cal: `.357`
})

export const Mossberg500 = new RangedWeapon({
	name: `Mossberg 500`,
	sz: 2,
	dmg: 4,
	rng: 10,
	attributes: [
		TwoHanded,
		Scatter,
	],
	mag: 5,
	cal: `12g`
})

export const RecurveBow = new RangedWeapon({
	name: `Recurve Bow`,
	sz: 2,
	dmg: 1,
	rng: 10,
	attributes: [
		TwoHanded,
	],
	mag: 1,
	cal: `Arrow`
})

export const Remington700 = new RangedWeapon({
	name: `Remington 700`,
	sz: 4,
	dmg: 3,
	rng: 100,
	attributes: [
		TwoHanded,
	],
	mag: 5,
	cal: `.308`
})

export const Remington870 = new RangedWeapon({
	name: `Remington870`,
	sz: 4,
	dmg: 4,
	rng: 15,
	attributes: [
		TwoHanded,
		Scatter,
	],
	mag: 6,
	cal: `12g`
})

export const Ruger1022 = new RangedWeapon({
	name: `Ruger 10/22`,
	sz: 3,
	dmg: 1,
	rng: 30,
	attributes: [
		TwoHanded,
		Rapid,
	],
	mag: 10,
	cal: `.22`
})

export const RugerMkIII = new RangedWeapon({
	name: `Ruger Mk.III`,
	sz: 1,
	dmg: 1,
	rng: 15,
	attributes: [
		TwoHanded,
		Rapid,
	],
	mag: 10,
	cal: `.22`
})

export const SavageMkII = new RangedWeapon({
	name: `Savage Mk.II`,
	sz: 3,
	dmg: 1,
	rng: 40,
	attributes: [
		TwoHanded,
	],
	mag: 10,
	cal: `.22`
})

export const SIGSauerP290 = new RangedWeapon({
	name: `SIG Sauer P290`,
	sz: 1,
	dmg: 1,
	rng: 5,
	attributes: [
		TwoHanded,
	],
	mag: 6,
	cal: `9mm`
})

export const SpringfieldM1A = new RangedWeapon({
	name: `Springfield M1A`,
	sz: 4,
	dmg: 3,
	rng: 80,
	attributes: [
		TwoHanded,
		Rapid,
	],
	mag: 20,
	cal: `.308`
})

export const SWBodyguard = new RangedWeapon({
	name: `S&W Bodyguard`,
	sz: 1,
	dmg: 2,
	rng: 5,
	attributes: [
		TwoHanded,
	],
	mag: 5,
	cal: `.357`
})


export default [
	AR15,
	BenelliM4,
	BrowningABolt,
	ColtPython,
	CompoundBow,
	Crossbow,
	DoubleBarrelShotgun,
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
	SWBodyguard,
]



// RARE RANGED
// new RangedWeapon(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
// new RangedWeapon(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
// new RangedWeapon(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
// new RangedWeapon(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. Fire Damage.`, 6),
// new RangedWeapon(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
// new RangedWeapon(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
// new RangedWeapon(`M4A1 Carbine`, 4, 50, `5.56`, `30mag`, 2, `Auto. Rapid.`, 3),
// new RangedWeapon(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
// new RangedWeapon(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
// new RangedWeapon(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
// new RangedWeapon(`M82 Barret`, 12, 200, `.50BMG`, `10mag`, 2, `Rapid. Bipod. Scope.`, 6),
// new RangedWeapon(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
// new RangedWeapon(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
// new RangedWeapon(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
// new RangedWeapon(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
// new RangedWeapon(`Saiga-12`, 6, 15, `12g`, `12mag`, 2, `Rapid. Scatter.`, 4),
// new RangedWeapon(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
// new RangedWeapon(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2 round Reload.`, 4),
// new RangedWeapon(`Uzi`, 2, 10, `9mm`, `30mag`, 2, `Auto. Rapid. -1 RATK.`, 3),
// new RangedWeapon(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6 rounds.`, 1),

// OLD RANGED
// new RangedWeapon(`AK-47`, 4, 50, `7.62`, `30mag`, 2, `Auto. Rapid.`, 4),
// new RangedWeapon(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
// new RangedWeapon(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
// new RangedWeapon(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),



