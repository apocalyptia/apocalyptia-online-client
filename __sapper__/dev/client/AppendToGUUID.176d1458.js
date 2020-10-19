import { a as Ax, B as BaseballBat, b as BrassKnuckles, c as Club, d as Crowbar, H as Hammer, e as Hatchet, K as Knife, M as Machete, f as RiotShield, g as Sledgehammer, h as Spear, i as Staff, j as AR15, k as BenelliM4, l as BrowningABolt, m as ColtPython, n as CompoundBow, o as Crossbow, G as Glock17, p as HenryGoldenBoy, q as HKMP5, r as Marlin1894, s as Mossberg500, t as RecurveBow, u as Remington700, v as Remington870, w as Ruger1022, x as RugerMkIII, y as SavageMkII, z as SIGSauerP290, D as SpringfieldM1A, E as StoegerCoachgun, F as SWBodyguard, R as Rule } from './SWBodyguard.54177d3a.js';
import { S as Skills } from './Skills.35c4252b.js';
import { T as Traits } from './Traits.2656d3ca.js';

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

class Ability extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		visible,
		max,
		xp,
		taken=0,
		opts=[],
		selection=0,
		notes=``,
	}) {
		super({
			id,
			name,
			desc,
			visible,
			formula,
		});
		this.max = max;
		this.xp = xp;
		this.taken = taken;
		this.opts = opts;
		this.selection = selection,
		this.notes = notes;
	}
}

const WeaponList = [
	...MeleeWeaponList,
	...RangedWeaponList,
];

const FavoriteWeapon = new Ability({
	id: `4ccca696-fbf0-4144-8874-011b2ab1f567`,
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
});

const HyperImmunity = new Ability({
	id: `fd940b7e-8502-4aed-8630-bcdc1054216e`,
	name: `Hyper Immunity`,
	desc: [
		`+1 to resist Diseases.`,
	],
	max: 3,
	xp: 3
});

const PackMentality = new Ability({
	id: `7b3b9ab6-157e-4395-ae68-3815c78ae2d4`,
	name: `Pack Mentality`,
	desc: [
		`+1 Attack at a target a Comrade Attacks this round.`,
	],
	max: 1,
	xp: 3
});

const QuickReload = new Ability({
	id: `5ec7eba9-31dc-49a5-88dc-75f1d1b22490`,
	name: `Quick Reload`,
	desc: [
		`Free Reload once per round.`,
	],
	max: 1,
	xp: 3
});

const Specialize = new Ability({
	id: `12c0ab2c-ffc9-40de-9368-b8bf34301515`,
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	xp: 3,
	opts: Skills.specs
});

const WeaponTraining = new Ability({
	id: `dd2f76e5-3f6b-46b9-bdc1-9c7d09768017`,
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
});

const XP3Abilities = [
	FavoriteWeapon,
	HyperImmunity,
	PackMentality,
	QuickReload,
	Specialize,
	WeaponTraining,
];

const EfficientWork = new Ability({
	id: `bc5ad182-ca69-46c9-b013-b92d90d48b07`,
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for a Skill (minimum 1 action).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
});

const FastDraw = new Ability({
	id: `09783c40-3370-4371-b6e2-b00c088d0fa5`,
	name: `Fast Draw`,
	desc: [
		`Free item draw once per round.`,
	],
	max: 1,
	xp: 6
});

const FleetFooted = new Ability({
	id: `2781978f-df68-49cb-be43-e96dbfafe199`,
	name: `Fleet Footed`,
	desc: [
		`+1 Speed.`,
	],
	max: 3,
	xp: 6
});

var Languages = [
	{ name: 'Amharic' },
	{ name: 'Arabic' },
	{ name: 'Assamese' },
	{ name: 'Awadhi' },
	{ name: 'Azerbaijani' },
	{ name: 'Bengali' },
	{ name: 'Bhojpuri' },
	{ name: 'Burmese' },
	{ name: 'Cebuano' },
	{ name: 'Chhattisgarhi' },
	{ name: 'Chinese' },
	{ name: 'Chittagonian' },
	{ name: 'Czech' },
	{ name: 'Deccan' },
	{ name: 'Dutch' },
	{ name: 'English' },
	{ name: 'French' },
	{ name: 'German' },
	{ name: 'Greek' },
	{ name: 'Gujarati' },
	{ name: 'Hausa' },
	{ name: 'Hindi' },
	{ name: 'Hungarian' },
	{ name: 'Igbo' },
	{ name: 'Indonesian' },
	{ name: 'Italian' },
	{ name: 'Japanese' },
	{ name: 'Javanese' },
	{ name: 'Kannada' },
	{ name: 'Kazakh' },
	{ name: 'Khmer' },
	{ name: 'Kinyarwanda' },
	{ name: 'Korean' },
	{ name: 'Kurdish' },
	{ name: 'Latin' },
	{ name: 'Maithili' },
	{ name: 'Malay' },
	{ name: 'Malayalam' },
	{ name: 'Magahi' },
	{ name: 'Marathi' },
	{ name: 'Morse Code' },
	{ name: 'Nepali' },
	{ name: 'Odia' },
	{ name: 'Pashto' },
	{ name: 'Persian' },
	{ name: 'Polish' },
	{ name: 'Portuguese' },
	{ name: 'Punjabi' },
	{ name: 'Romanian' },
	{ name: 'Russian' },
	{ name: 'Saraiki' },
	{ name: 'Serbo-Croatian' },
	{ name: 'Sign Language' },
	{ name: 'Sindhi' },
	{ name: 'Sinhala' },
	{ name: 'Somali' },
	{ name: 'Spanish' },
	{ name: 'Sunda' },
	{ name: 'Sylheti' },
	{ name: 'Tagalog' },
	{ name: 'Tamil' },
	{ name: 'Telugu' },
	{ name: 'Thai' },
	{ name: 'Turkish' },
	{ name: 'Ukrainian' },
	{ name: 'Urdu' },
	{ name: 'Uyghur' },
	{ name: 'Vietnamese' },
	{ name: 'Yoruba' },
	{ name: 'Zulu' },
];

const Multilingual = new Ability({
	id: `bb6a0fb9-a5d7-4930-a782-9742763037b5`,
	name: `Multilingual`,
	desc: [
		`Learn a different form of communication.`,
	],
	max: 1,
	xp: 6,
	opts: Languages
});

const Practice = new Ability({
	id: `2e27c3fd-aaf3-4c95-9d3a-9a0ad27abdff`,
	name: `Practice`,
	desc: [
		`+1 to a Skill (up to the parent Trait).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
});

const VehicleOperation = new Ability({
	id: `e69f8784-1323-4468-8761-7a9f1ef9e21d`,
	name: `Vehicle Operation`,
	desc: [
		`Proficiently operate a class of vehicle.`,
	],
	max: 1,
	xp: 6
}); // TODO: Need to add VehicleList when it is made

const XP6Abilities = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice,
	VehicleOperation,
];

const DangerSense = new Ability({
	id: `08da6fd9-59ca-434c-b081-f58fc19c9def`,
	name: `Danger Sense`,
	desc: [
		`+1 to Reflexive Defenses.`,
	],
	max: 1,
	xp: 9
});

const Discipline = new Ability({
	id: `de3d6bc9-d188-4936-a62c-f19d2f731dad`,
	name: `Discipline`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	max: 3,
	xp: 9
});

const Fortunate = new Ability({
	id: `0957c2e9-a743-4eca-b429-b9840f8ea931`,
	name: `Fortunate`,
	desc: [
		`+1 Luck.`,
	],
	max: 1,
	xp: 9
});

const FreeRunning = new Ability({
	id: `6a93067f-ffd4-40dc-9dea-74fdc2a56d7e`,
	name: `Free Running`,
	desc: [
		`Acrobatics 9# to Climb your Speed as a Movement action.`,
	],
	max: 1,
	xp: 9
});

const Unorthodox = new Ability({
	id: `9fb108fd-b6ba-4f9a-b225-da7ef4994e80`,
	name: `Unorthodox`,
	desc: [
		`Pick a new parent Trait for a Skill.`,
	],
	max: 1,
	xp: 9,
	opts: (function() {
		const uList = [];
		Traits.list.forEach((trait) => {
			Skills.list.forEach((skill) => {
				const tname = trait.name;
				const sname = skill.name;
				if (skill.parent != trait.name) {
					uList.push({ name: `${tname} - ${sname}` });
				}
			});
		});
		return [...uList]
	})()
});

const Resilient = new Ability({
	id: `975e122b-2e35-4c8e-a1ed-16abc91e32fe`,
	name: `Resilient`,
	desc: [
		`Reduce any Trauma by 1.`
	],
	max: 3,
	xp: 9
});

const XP9Abilities = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox,
	Resilient,
];

const Parry = new Ability({
	id: `4b617dee-aed3-4187-ae5a-25eb83245c20`,
	name: `Parry`,
	desc: [
		`Free Block Action once per round.`,
	],
	max: 1,
	xp: 12
});

const Sidestep = new Ability({
	id: `e052bd60-6e03-4d90-9bd8-8b6950a24393`,
	name: `Side-step`,
	desc: [
		`Free Dodge Action once per round.`,
	],
	max: 1,
	xp: 12
});

const Wrestling = new Ability({
	id: `c565d573-c281-4849-b935-f3388bcd1b1d`,
	name: `Wrestling`,
	desc: [
		`Free Grapple Action once per round.`,
	],
	max: 1,
	xp: 12
});

const XP12Abilities = [
	Parry,
	Sidestep,
	Wrestling,
];

const Charge = new Ability({
	id: `c44580dd-3a0a-41d5-b97f-ec1f9f4bea0d`,
	name: `Charge`,
	desc: [
		`Ignore Unstable penalty to Melee Attacks when you Run.`,
		`Ignore Prone effect from Leg Damage.`,
	],
	max: 1,
	xp: 15
});

const FirmGrip = new Ability({
	id: `c55b0940-8e72-4c5a-a7bc-0b9b27353ae7`,
	name: `Firm Grip`,
	desc: [
		`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`,
		`Ignore Drop effect from Arm Damage.`,
	],
	max: 1,
	xp: 15
});

const HardHeaded = new Ability({
	id: `b02bccad-64ce-477b-9cb3-3883fc2c59f5`,
	name: `Hard Headed`,
	desc: [
		`Ignore Stun effect from Head Damage.`,
	],
	max: 1,
	xp: 15
});

const XP15Abilities = [
	Charge,
	FirmGrip,
	HardHeaded,
];

const Ambidextrous = new Ability({
	id: `1460e48d-10fc-4469-a183-74f6060d0bb4`,
	name: `Ambidextrous`,
	desc: [
		`Off-hand penalty is -1 instead of -3.`,
	],
	max: 1,
	xp: 18
});

const Assassin = new Ability({
	id: `742279a1-7749-49c5-b6da-d57eaaa511e4`,
	name: `Assassin`,
	desc: [
		`+3 Damage for Attacks made while Concealed.`,
	],
	max: 1,
	xp: 18
});

const XP18Abilities = [
	Ambidextrous,
	Assassin,
];

const Rational = new Ability({
	id: `0eb90ec1-e3ac-4e70-a8c1-e6299f1c3abf`,
	name: `Rational`,
	desc: [
		`+1 Psyche.`,
	],
	max: 3,
	xp: 24
});

const Tough = new Ability({
	id: `4567f11a-5ee0-4e8d-ae19-b2ebb816397e`,
	name: `Tough`,
	desc: [
		`+1 Health for each Body Part.`,
	],
	max: 3,
	xp: 24
});

const XP24Abilities = [
	Rational,
	Tough,
];

const CloseCall = new Ability({
	id: `6d724fe0-89d1-48ad-b8a0-98bb70b1008c`,
	name: `Close Call`,
	desc: [
		`Spend this Ability to survive an otherwise lethal encounter.`,
	],
	max: 1,
	xp: 30
});

const SelfImprovement = new Ability({
	id: `34bdd675-5a1c-4fe1-96d4-bac61572cf74`,
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	xp: 30,
	opts: Traits.list
});

const XP30Abilities = [
	CloseCall,
	SelfImprovement,
];

var AppendToGUUID = (guuid, mod) => {
	let hash = mod.split('')
					.map(m => m = m.charCodeAt(0))
					.reduce((a, b) => a + b + parseInt(guuid.split(`-`)[4], 16))
					.toString(16);

	if (hash.length > 12) hash = hash.substr(hash.length - 12, hash.length);

	return guuid.substr(0, guuid.lastIndexOf('-') + 1) + hash
};

export { AppendToGUUID as A, MeleeWeaponList as M, RangedWeaponList as R, XP3Abilities as X, XP6Abilities as a, XP9Abilities as b, XP12Abilities as c, XP15Abilities as d, XP18Abilities as e, XP24Abilities as f, XP30Abilities as g, Ability as h };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwZW5kVG9HVVVJRC4xNzZkMTQ1OC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL21lbGVlL01lbGVlV2VhcG9uTGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9yYW5nZWQvUmFuZ2VkV2VhcG9uTGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL1dlYXBvbkxpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRmF2b3JpdGVXZWFwb24uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvSHlwZXJJbW11bml0eS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9QYWNrTWVudGFsaXR5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1F1aWNrUmVsb2FkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1NwZWNpYWxpemUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvV2VhcG9uVHJhaW5pbmcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvWFAzQWJpbGl0aWVzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL0VmZmljaWVudFdvcmsuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRmFzdERyYXcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRmxlZXRGb290ZWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9oZWxwZXJzL2xpc3RzL0xhbmd1YWdlcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9NdWx0aWxpbmd1YWwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvUHJhY3RpY2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvVmVoaWNsZU9wZXJhdGlvbi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9YUDZBYmlsaXRpZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRGFuZ2VyU2Vuc2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRGlzY2lwbGluZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9Gb3J0dW5hdGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvRnJlZVJ1bm5pbmcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvVW5vcnRob2RveC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9SZXNpbGllbnQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvWFA5QWJpbGl0aWVzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1BhcnJ5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1NpZGVzdGVwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1dyZXN0bGluZy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9YUDEyQWJpbGl0aWVzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL0NoYXJnZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9GaXJtR3JpcC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9IYXJkSGVhZGVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1hQMTVBYmlsaXRpZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvQW1iaWRleHRyb3VzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL0Fzc2Fzc2luLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1hQMThBYmlsaXRpZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvUmF0aW9uYWwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvVG91Z2guanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvWFAyNEFiaWxpdGllcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2FiaWxpdGllcy9DbG9zZUNhbGwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9hYmlsaXRpZXMvU2VsZkltcHJvdmVtZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL1hQMzBBYmlsaXRpZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9oZWxwZXJzL3V0aWxzL0FwcGVuZFRvR1VVSUQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF4IGZyb20gJy4vQXgnXG5pbXBvcnQgQmFzZWJhbGxCYXQgZnJvbSAnLi9CYXNlYmFsbEJhdCdcbmltcG9ydCBCcmFzc0tudWNrbGVzIGZyb20gJy4vQnJhc3NLbnVja2xlcydcbmltcG9ydCBDbHViIGZyb20gJy4vQ2x1YidcbmltcG9ydCBDcm93YmFyIGZyb20gJy4vQ3Jvd2JhcidcbmltcG9ydCBIYW1tZXIgZnJvbSAnLi9IYW1tZXInXG5pbXBvcnQgSGF0Y2hldCBmcm9tICcuL0hhdGNoZXQnXG5pbXBvcnQgS25pZmUgZnJvbSAnLi9LbmlmZSdcbmltcG9ydCBNYWNoZXRlIGZyb20gJy4vTWFjaGV0ZSdcbmltcG9ydCBSaW90U2hpZWxkIGZyb20gJy4vUmlvdFNoaWVsZCdcbmltcG9ydCBTbGVkZ2VoYW1tZXIgZnJvbSAnLi9TbGVkZ2VoYW1tZXInXG5pbXBvcnQgU3BlYXIgZnJvbSAnLi9TcGVhcidcbmltcG9ydCBTdGFmZiBmcm9tICcuL1N0YWZmJ1xuXG5cbmNvbnN0IE1lbGVlV2VhcG9uTGlzdCA9IFtcblx0QXgsXG5cdEJhc2ViYWxsQmF0LFxuXHRCcmFzc0tudWNrbGVzLFxuXHRDbHViLFxuXHRDcm93YmFyLFxuXHRIYW1tZXIsXG5cdEhhdGNoZXQsXG5cdEtuaWZlLFxuXHRNYWNoZXRlLFxuXHRSaW90U2hpZWxkLFxuXHRTbGVkZ2VoYW1tZXIsXG5cdFNwZWFyLFxuXHRTdGFmZixcbl1cblxuZXhwb3J0IGRlZmF1bHQgTWVsZWVXZWFwb25MaXN0XG5cblxuLy8gUkFSRSBNRUxFRVxuLy8gbmV3IE1lbGVlV2VhcG9uKGBCYXJid2lyZSBDbHViYCwgMywgMSwgYGAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBCb3dpZSBLbmlmZWAsIDIsIDEsIGBDaG9wLiBSYXBpZC5gLCAxKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgQnJvYWRzd29yZGAsIDQsIDIsIGBDaG9wIG9yIFBpZXJjZS5gLCA0KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgQ2F0Y2ggUG9sZWAsIDAsIDIsIGArMSBCbG9jay4gQmx1bnQuICsxIEdyYWIuYCwgMyksXG4vLyBuZXcgTWVsZWVXZWFwb24oYENoYWluc2F3YCwgNiwgMiwgYC41Z2FsIEZ1ZWwuIGQ2IHJvdW5kcyB0byBzdGFydC4gMTogRW1wdHkuIExvdWQuYCwgNCksXG4vLyBuZXcgTWVsZWVXZWFwb24oYEljZSBBeGAsIDMsIDEsIGBMZXZlci4gUGllcmNlLmAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBLYXRhbmFgLCA1LCAyLCBgQ2hvcCBvciBQaWVyY2UuIFJhcGlkLmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBLdWtyaWAsIDMsIDEsIGBDaG9wYCwgMiksXG4vLyBuZXcgTWVsZWVXZWFwb24oYExhc3NvYCwgMCwgMiwgYEJsdW50LiArMSBHcmFiLiBUaHJvdyAoUmFuZ2U6MylgLCAyKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgTmV0YCwgMCwgMiwgYCs2IEdyYWIuYCwgMyksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFJhcGllcmAsIDMsIDEsIGBQaWVyY2UuIFJhcGlkLmAsIDIpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBTY3l0aGVgLCA2LCAyLCBgQ2hvcC4gUGllcmNlLmAsIDQpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBTaWduIFNoaWVsZGAsIDIsIDEsIGArMyBCbG9jay4gQ292ZXIgNiBEYW1hZ2UgUmVzaXN0YW5jZS5gLCA0KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgU3dpdGNoYmxhZGVgLCAxLCAxLCBgUGllcmNlLiBSYXBpZC5gLCAwKSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgVHJlbmNoIEtuaWZlYCwgMiwgMSwgYEJsdW50IFB1bmNoLiBQaWVyY2UuIFJhcGlkLmAsIDEpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBXaGlwYCwgMCwgMSwgYEJsdW50LiArMSBEaXNhcm0uICsxIEdyYWIuIFJhbmdlOjMuYCwgMSksXG5cbi8vIE9MRCBNRUxFRVxuLy8gbmV3IE1lbGVlV2VhcG9uKGBCYXRvbmAsIDIsIDEsIGBCbHVudC4gUmFwaWQuYCwgMiksXG4vLyBuZXcgTWVsZWVXZWFwb24oYENhbmVgLCAxLCAxLCBgQmx1bnQuICsxIFRyaXAuIENhbiBiZSB1c2VkIGFzIGEgQ3J1dGNoLmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBDbGVhdmVyYCwgMiwgMSwgYENob3AuYCwgMSksXG4vLyBuZXcgTWVsZWVXZWFwb24oYEZpcmVwb2tlcmAsIDMsIDEsIGBMZXZlci4gUGllcmNlLmAsIDMpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBHYXJyb3RlYCwgMSwgMiwgYEJsdW50LiArMyB0byBHcmFiKExvY2spIEhlYWQuYCwgMSksXG4vLyBuZXcgTWVsZWVXZWFwb24oYE1ldGFsIENsdWJgLCAzLCAyLCBgQmx1bnQuYCwgMyksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFBpY2theGAsIDYsIDIsIGBMZXZlci4gUGllcmNlLmAsIDUpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBQaXRjaGZvcmtgLCAzLCAyLCBgKzEgQmxvY2suIFBpZXJjZS5gLCA0KSxcbi8vIG5ldyBNZWxlZVdlYXBvbihgU2NyZXdkcml2ZXJgLCAxLCAxLCBgTGV2ZXIuIFBpZXJjZS4gUmFwaWQuYCwgMSksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFNob3ZlbGAsIDMsIDIsIGArMSBCbG9ja2AsIDQpLFxuLy8gbmV3IE1lbGVlV2VhcG9uKGBUaXJlIElyb25gLCAyLCAxLCBgTGV2ZXIuYCwgMiksXG4vLyBuZXcgTWVsZWVXZWFwb24oYFRvcmNoYCwgMSwgMSwgYEJsdW50LiArMSBGaXJlIERhbWFnZS4gNXlkIGxpZ2h0IHJhZGl1cyAxaHIuYCwgMiksIiwiaW1wb3J0IEFSMTUgZnJvbSAnLi9BUjE1J1xuaW1wb3J0IEJlbmVsbGlNNCBmcm9tICcuL0JlbmVsbGlNNCdcbmltcG9ydCBCcm93bmluZ0FCb2x0IGZyb20gJy4vQnJvd25pbmdBQm9sdCdcbmltcG9ydCBDb2x0UHl0aG9uIGZyb20gJy4vQ29sdFB5dGhvbidcbmltcG9ydCBDb21wb3VuZEJvdyBmcm9tICcuL0NvbXBvdW5kQm93J1xuaW1wb3J0IENyb3NzYm93IGZyb20gJy4vQ3Jvc3Nib3cnXG5pbXBvcnQgR2xvY2sxNyBmcm9tICcuL0dsb2NrMTcnXG5pbXBvcnQgSGVucnlHb2xkZW5Cb3kgZnJvbSAnLi9IZW5yeUdvbGRlbkJveSdcbmltcG9ydCBIS01QNSBmcm9tICcuL0hLTVA1J1xuaW1wb3J0IE1hcmxpbjE4OTQgZnJvbSAnLi9NYXJsaW4xODk0J1xuaW1wb3J0IE1vc3NiZXJnNTAwIGZyb20gJy4vTW9zc2Jlcmc1MDAnXG5pbXBvcnQgUmVjdXJ2ZUJvdyBmcm9tICcuL1JlY3VydmVCb3cnXG5pbXBvcnQgUmVtaW5ndG9uNzAwIGZyb20gJy4vUmVtaW5ndG9uNzAwJ1xuaW1wb3J0IFJlbWluZ3Rvbjg3MCBmcm9tICcuL1JlbWluZ3Rvbjg3MCdcbmltcG9ydCBSdWdlcjEwMjIgZnJvbSAnLi9SdWdlcjEwMjInXG5pbXBvcnQgUnVnZXJNa0lJSSBmcm9tICcuL1J1Z2VyTWtJSUknXG5pbXBvcnQgU2F2YWdlTWtJSSBmcm9tICcuL1NhdmFnZU1rSUknXG5pbXBvcnQgU0lHU2F1ZXJQMjkwIGZyb20gJy4vU0lHU2F1ZXJQMjkwJ1xuaW1wb3J0IFNwcmluZ2ZpZWxkTTFBIGZyb20gJy4vU3ByaW5nZmllbGRNMUEnXG5pbXBvcnQgU3RvZWdlckNvYWNoZ3VuIGZyb20gJy4vU3RvZWdlckNvYWNoZ3VuJ1xuaW1wb3J0IFNXQm9keWd1YXJkIGZyb20gJy4vU1dCb2R5Z3VhcmQnXG5cblxuY29uc3QgUmFuZ2VkV2VhcG9uTGlzdCA9IFtcblx0QVIxNSxcblx0QmVuZWxsaU00LFxuXHRCcm93bmluZ0FCb2x0LFxuXHRDb2x0UHl0aG9uLFxuXHRDb21wb3VuZEJvdyxcblx0Q3Jvc3Nib3csXG5cdEdsb2NrMTcsXG5cdEhlbnJ5R29sZGVuQm95LFxuXHRIS01QNSxcblx0TWFybGluMTg5NCxcblx0TW9zc2Jlcmc1MDAsXG5cdFJlY3VydmVCb3csXG5cdFJlbWluZ3RvbjcwMCxcblx0UmVtaW5ndG9uODcwLFxuXHRSdWdlcjEwMjIsXG5cdFJ1Z2VyTWtJSUksXG5cdFNhdmFnZU1rSUksXG5cdFNJR1NhdWVyUDI5MCxcblx0U3ByaW5nZmllbGRNMUEsXG5cdFN0b2VnZXJDb2FjaGd1bixcblx0U1dCb2R5Z3VhcmQsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IFJhbmdlZFdlYXBvbkxpc3RcblxuXG5cbi8vIFJBUkUgUkFOR0VEXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBCbG93Z3VuYCwgMCwgYEN4MmAsIGBEYXJ0YCwgMSwgMiwgYFBpZXJjZS4gRE1HIE1vZC5gLCAxKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYEJvbGFzYCwgMCwgYEN4MmAsIGAtYCwgYC1gLCAxLCBgQmx1bnQuIERNRyBNb2QuIFRyaXAuIFRocm93LmAsIDEpLFx0XG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBEZXJyaW5nZXJgLCAxLCAzLCBgLjIyYCwgMiwgMSwgYC0xIFJBVEsuYCwgMCksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBGbGFtZXRocm93ZXJgLCBgZDZ4M2AsIDUsIGBGdWVsYCwgNywgYEF1dG8uIDN5ZCBCbGFzdC4gRmlyZSBEYWNhcGUuYCwgNiksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBMb25nYm93YCwgMSwgMjAsIGBBcnJvd2AsIDEsIDIsIGBETUcgTW9kLiAtMSBSQVRLLmAsIDMpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTIgQnJvd25pbmdgLCAxMiwgMjAwLCBgLjUwQk1HYCwgYGJlbHRgLCAyLCBgQXV0by4gTW91bnRlZC5gLCAxNiksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNNEExIENhcmJpbmVgLCA0LCA1MCwgYDUuNTZgLCBgMzBjYXBgLCAyLCBgQXV0by4gUmFwaWQuYCwgMyksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNMzIgTGF1bmNoZXJgLCBgdmFyaWVzYCwgMjUsIGA0MG1tYCwgNiwgMiwgYFJhcGlkLmAsIDQpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTYwIE1hY2hpbmVndW5gLCA1LCAxMDAsIGAuMzA4YCwgMzAwLCAyLCBgQXV0by4gUmFwaWQuIEJpcG9kLmAsIDYpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTcyIExBV2AsIGBkNng5YCwgNTAsIGBSb2NrZXRgLCAxLCAyLCBgMTJ5ZCBCbGFzdC4gUGllcmNlLmAsIDMpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTTgyIEJhcnJldGAsIDEyLCAyMDAsIGAuNTBCTUdgLCBgMTBjYXBgLCAyLCBgUmFwaWQuIEJpcG9kLiBTY29wZS5gLCA2KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE0xMzQgTWluaWd1bmAsIDUsIDEwMCwgYC4zMDhgLCAxMDAwLCAyLCBgQXV0byBvbmx5LiBSYXBpZC4gTW91bnRlZC5gLCA4KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE0yMDMgTGF1bmNoZXJgLCBgdmFyaWVzYCwgMjUsIGA0MG1tYCwgMSwgMiwgYDJoIEdVTiBBQ0NFU1NPUlkuYCwgMiksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBNMjQ5IFNBV2AsIDQsIDEwMCwgYDUuNTZgLCAxMDAsIDIsIGBBdXRvLiBSYXBpZC5gLCA1KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE1lZHVzYSA0N2AsIGAyLCAzYCwgYDltbSwgLjM1N2AsIGA2Y3lsYCwgMSwgYFJldm9sdmVyLiBNdWx0aS1DYWxpYmVyLmAsIDIpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgU2FpZ2EtMTJgLCA2LCAxNSwgYDEyZ2AsIGAxMmNhcGAsIDIsIGBSYXBpZC4gU2NhdHRlci5gLCA0KSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYFNsaW5nc2hvdGAsIDEsIDUsIGBSb2Nrc2AsIDEsIDIsIGBCbHVudC4gRE1HIE1vZC5gLCAxKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYFNwZWFyZ3VuYCwgNCwgNSwgYEFycm93ICsgUm9wZWAsIDEsIDIsIGBQaWVyY2UuIDIgcm91bmQgUmVsb2FkLmAsIDQpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgVXppYCwgMiwgMTAsIGA5bW1gLCBgMzBjYXBgLCAyLCBgQXV0by4gUmFwaWQuIC0xIFJBVEsuYCwgMyksXG4vLyBuZXcgUmFuZ2VkV2VhcG9uKGBXLiBQLiBHcmVuYWRlYCwgYGQ2eDNgLCAzLCBgR3JlbmFkZWAsIDEsIDEsIGA2eWQgQmxhc3QuIEJsaW5kLiBkNiByb3VuZHMuYCwgMSksXG5cbi8vIE9MRCBSQU5HRURcbi8vIG5ldyBSYW5nZWRXZWFwb24oYEFLLTQ3YCwgNCwgNTAsIGA3LjYyYCwgYDMwY2FwYCwgMiwgYEF1dG8uIFJhcGlkLmAsIDQpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgTm9yaW5jbyBTS1NgLCA0LCA1MCwgYDcuNjJgLCAxMCwgMiwgYFJhcGlkLiBCYXlvbmV0LmAsIDQpLFxuLy8gbmV3IFJhbmdlZFdlYXBvbihgS2ltYmVyIDE5MTFgLCAyLCAyNSwgYC40NWAsIDcsIDEsIGBSYXBpZC5gLCAxKSxcbi8vIG5ldyBSYW5nZWRXZWFwb24oYE1BQy0xMGAsIDIsIDUsIGAuNDVgLCAzMCwgMiwgYEF1dG8uIFJhcGlkLiAtMSBSQVRLYCwgMiksXG5cblxuXG4iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYmlsaXR5IGV4dGVuZHMgUnVsZSB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRpZCxcblx0XHRuYW1lLFxuXHRcdGRlc2MsXG5cdFx0Zm9ybXVsYSxcblx0XHR2aXNpYmxlLFxuXHRcdG1heCxcblx0XHR4cCxcblx0XHR0YWtlbj0wLFxuXHRcdG9wdHM9W10sXG5cdFx0c2VsZWN0aW9uPTAsXG5cdFx0bm90ZXM9YGAsXG5cdH0pIHtcblx0XHRzdXBlcih7XG5cdFx0XHRpZCxcblx0XHRcdG5hbWUsXG5cdFx0XHRkZXNjLFxuXHRcdFx0dmlzaWJsZSxcblx0XHRcdGZvcm11bGEsXG5cdFx0fSlcblx0XHR0aGlzLm1heCA9IG1heFxuXHRcdHRoaXMueHAgPSB4cFxuXHRcdHRoaXMudGFrZW4gPSB0YWtlblxuXHRcdHRoaXMub3B0cyA9IG9wdHNcblx0XHR0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbixcblx0XHR0aGlzLm5vdGVzID0gbm90ZXNcblx0fVxufSIsImltcG9ydCBNZWxlZVdlYXBvbkxpc3QgZnJvbSAnLi9tZWxlZS9NZWxlZVdlYXBvbkxpc3QnXG5pbXBvcnQgUmFuZ2VkV2VhcG9uTGlzdCBmcm9tICcuL3JhbmdlZC9SYW5nZWRXZWFwb25MaXN0J1xuXG5cbmNvbnN0IFdlYXBvbkxpc3QgPSBbXG5cdC4uLk1lbGVlV2VhcG9uTGlzdCxcblx0Li4uUmFuZ2VkV2VhcG9uTGlzdCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgV2VhcG9uTGlzdCIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuaW1wb3J0IFdlYXBvbkxpc3QgZnJvbSAnZ2Vhci93ZWFwb25zL1dlYXBvbkxpc3QuanMnXG5cblxuY29uc3QgRmF2b3JpdGVXZWFwb24gPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgNGNjY2E2OTYtZmJmMC00MTQ0LTg4NzQtMDExYjJhYjFmNTY3YCxcblx0bmFtZTogYEZhdm9yaXRlIFdlYXBvbmAsXG5cdGRlc2M6IFtcblx0XHRgQW55IEJvdGNoIHdpdGggYSBzcGVjaWZpZWQgd2VhcG9uIHR5cGUgaXMgcmVkdWNlZCBpbiBzZXZlcml0eSB0byBhIG5vcm1hbCBGYWlsLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDMsXG5cdG9wdHM6IFdlYXBvbkxpc3Rcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZhdm9yaXRlV2VhcG9uIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgSHlwZXJJbW11bml0eSA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGBmZDk0MGI3ZS04NTAyLTRhZWQtODYzMC1iY2RjMTA1NDIxNmVgLFxuXHRuYW1lOiBgSHlwZXIgSW1tdW5pdHlgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIHRvIHJlc2lzdCBEaXNlYXNlcy5gLFxuXHRdLFxuXHRtYXg6IDMsXG5cdHhwOiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIeXBlckltbXVuaXR5IiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgUGFja01lbnRhbGl0eSA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGA3YjNiOWFiNi0xNTdlLTQzOTUtYWU2OC0zODE1Yzc4YWUyZDRgLFxuXHRuYW1lOiBgUGFjayBNZW50YWxpdHlgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEF0dGFjayBhdCBhIHRhcmdldCBhIENvbXJhZGUgQXR0YWNrcyB0aGlzIHJvdW5kLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFBhY2tNZW50YWxpdHkiLCJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcblxuXG5jb25zdCBRdWlja1JlbG9hZCA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGA1ZWM3ZWJhOS0zMWRjLTQ5YTUtODhkYy03NWYxZDFiMjI0OTBgLFxuXHRuYW1lOiBgUXVpY2sgUmVsb2FkYCxcblx0ZGVzYzogW1xuXHRcdGBGcmVlIFJlbG9hZCBvbmNlIHBlciByb3VuZC5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBRdWlja1JlbG9hZCIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuaW1wb3J0IFNraWxscyBmcm9tICdydWxlcy9za2lsbHMvU2tpbGxzLmpzJ1xuXG5cbmNvbnN0IFNwZWNpYWxpemUgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgMTJjMGFiMmMtZmZjOS00MGRlLTkzNjgtYjhiZjM0MzAxNTE1YCxcblx0bmFtZTogYFNwZWNpYWxpemVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIHRvIGEgU2tpbGwgU3BlY2lhbHR5LmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDMsXG5cdG9wdHM6IFNraWxscy5zcGVjc1xufSlcblxuZXhwb3J0IGRlZmF1bHQgU3BlY2lhbGl6ZSIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuaW1wb3J0IFdlYXBvbkxpc3QgZnJvbSAnZ2Vhci93ZWFwb25zL1dlYXBvbkxpc3QuanMnXG5cblxuY29uc3QgV2VhcG9uVHJhaW5pbmcgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgZGQyZjc2ZTUtM2Y2Yi00NmI5LWJkYzEtOWM3ZDA5NzY4MDE3YCxcblx0bmFtZTogYFdlYXBvbiBUcmFpbmluZ2AsXG5cdGRlc2M6IFtcblx0XHRgKzEgQXR0YWNrIHdpdGggYSBzcGVjaWZpZWQgd2VhcG9uIHR5cGUuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogMyxcblx0b3B0czogV2VhcG9uTGlzdFxufSlcblxuZXhwb3J0IGRlZmF1bHQgV2VhcG9uVHJhaW5pbmciLCJpbXBvcnQgRmF2b3JpdGVXZWFwb24gZnJvbSAnLi9GYXZvcml0ZVdlYXBvbidcbmltcG9ydCBIeXBlckltbXVuaXR5IGZyb20gJy4vSHlwZXJJbW11bml0eSdcbmltcG9ydCBQYWNrTWVudGFsaXR5IGZyb20gJy4vUGFja01lbnRhbGl0eSdcbmltcG9ydCBRdWlja1JlbG9hZCBmcm9tICcuL1F1aWNrUmVsb2FkJ1xuaW1wb3J0IFNwZWNpYWxpemUgZnJvbSAnLi9TcGVjaWFsaXplJ1xuaW1wb3J0IFdlYXBvblRyYWluaW5nIGZyb20gJy4vV2VhcG9uVHJhaW5pbmcnXG5cblxuY29uc3QgWFAzQWJpbGl0aWVzID0gW1xuXHRGYXZvcml0ZVdlYXBvbixcblx0SHlwZXJJbW11bml0eSxcblx0UGFja01lbnRhbGl0eSxcblx0UXVpY2tSZWxvYWQsXG5cdFNwZWNpYWxpemUsXG5cdFdlYXBvblRyYWluaW5nLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBYUDNBYmlsaXRpZXMiLCJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcbmltcG9ydCBTa2lsbHMgZnJvbSAncnVsZXMvc2tpbGxzL1NraWxscy5qcydcblxuXG5jb25zdCBFZmZpY2llbnRXb3JrID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYGJjNWFkMTgyLWNhNjktNDZjOS1iMDEzLWI5MmQ5MGQ0OGIwN2AsXG5cdG5hbWU6IGBFZmZpY2llbnQgV29ya2AsXG5cdGRlc2M6IFtcblx0XHRgW1RpbWUgLyAyXSBmb3IgYSBTa2lsbCAobWluaW11bSAxIGFjdGlvbikuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogNixcblx0b3B0czogU2tpbGxzLmxpc3Rcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVmZmljaWVudFdvcmsiLCJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcblxuXG5jb25zdCBGYXN0RHJhdyA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGAwOTc4M2M0MC0zMzcwLTQzNzEtYjZlMi1iMDBjMDg4ZDBmYTVgLFxuXHRuYW1lOiBgRmFzdCBEcmF3YCxcblx0ZGVzYzogW1xuXHRcdGBGcmVlIGl0ZW0gZHJhdyBvbmNlIHBlciByb3VuZC5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiA2XG59KVxuXG5leHBvcnQgZGVmYXVsdCBGYXN0RHJhdyIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IEZsZWV0Rm9vdGVkID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDI3ODE5NzhmLWRmNjgtNDljYi1iZTQzLWU5NmRiZmFmZTE5OWAsXG5cdG5hbWU6IGBGbGVldCBGb290ZWRgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIFNwZWVkLmAsXG5cdF0sXG5cdG1heDogMyxcblx0eHA6IDZcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZsZWV0Rm9vdGVkIiwiZXhwb3J0IGRlZmF1bHQgW1xuXHR7IG5hbWU6ICdBbWhhcmljJyB9LFxuXHR7IG5hbWU6ICdBcmFiaWMnIH0sXG5cdHsgbmFtZTogJ0Fzc2FtZXNlJyB9LFxuXHR7IG5hbWU6ICdBd2FkaGknIH0sXG5cdHsgbmFtZTogJ0F6ZXJiYWlqYW5pJyB9LFxuXHR7IG5hbWU6ICdCZW5nYWxpJyB9LFxuXHR7IG5hbWU6ICdCaG9qcHVyaScgfSxcblx0eyBuYW1lOiAnQnVybWVzZScgfSxcblx0eyBuYW1lOiAnQ2VidWFubycgfSxcblx0eyBuYW1lOiAnQ2hoYXR0aXNnYXJoaScgfSxcblx0eyBuYW1lOiAnQ2hpbmVzZScgfSxcblx0eyBuYW1lOiAnQ2hpdHRhZ29uaWFuJyB9LFxuXHR7IG5hbWU6ICdDemVjaCcgfSxcblx0eyBuYW1lOiAnRGVjY2FuJyB9LFxuXHR7IG5hbWU6ICdEdXRjaCcgfSxcblx0eyBuYW1lOiAnRW5nbGlzaCcgfSxcblx0eyBuYW1lOiAnRnJlbmNoJyB9LFxuXHR7IG5hbWU6ICdHZXJtYW4nIH0sXG5cdHsgbmFtZTogJ0dyZWVrJyB9LFxuXHR7IG5hbWU6ICdHdWphcmF0aScgfSxcblx0eyBuYW1lOiAnSGF1c2EnIH0sXG5cdHsgbmFtZTogJ0hpbmRpJyB9LFxuXHR7IG5hbWU6ICdIdW5nYXJpYW4nIH0sXG5cdHsgbmFtZTogJ0lnYm8nIH0sXG5cdHsgbmFtZTogJ0luZG9uZXNpYW4nIH0sXG5cdHsgbmFtZTogJ0l0YWxpYW4nIH0sXG5cdHsgbmFtZTogJ0phcGFuZXNlJyB9LFxuXHR7IG5hbWU6ICdKYXZhbmVzZScgfSxcblx0eyBuYW1lOiAnS2FubmFkYScgfSxcblx0eyBuYW1lOiAnS2F6YWtoJyB9LFxuXHR7IG5hbWU6ICdLaG1lcicgfSxcblx0eyBuYW1lOiAnS2lueWFyd2FuZGEnIH0sXG5cdHsgbmFtZTogJ0tvcmVhbicgfSxcblx0eyBuYW1lOiAnS3VyZGlzaCcgfSxcblx0eyBuYW1lOiAnTGF0aW4nIH0sXG5cdHsgbmFtZTogJ01haXRoaWxpJyB9LFxuXHR7IG5hbWU6ICdNYWxheScgfSxcblx0eyBuYW1lOiAnTWFsYXlhbGFtJyB9LFxuXHR7IG5hbWU6ICdNYWdhaGknIH0sXG5cdHsgbmFtZTogJ01hcmF0aGknIH0sXG5cdHsgbmFtZTogJ01vcnNlIENvZGUnIH0sXG5cdHsgbmFtZTogJ05lcGFsaScgfSxcblx0eyBuYW1lOiAnT2RpYScgfSxcblx0eyBuYW1lOiAnUGFzaHRvJyB9LFxuXHR7IG5hbWU6ICdQZXJzaWFuJyB9LFxuXHR7IG5hbWU6ICdQb2xpc2gnIH0sXG5cdHsgbmFtZTogJ1BvcnR1Z3Vlc2UnIH0sXG5cdHsgbmFtZTogJ1B1bmphYmknIH0sXG5cdHsgbmFtZTogJ1JvbWFuaWFuJyB9LFxuXHR7IG5hbWU6ICdSdXNzaWFuJyB9LFxuXHR7IG5hbWU6ICdTYXJhaWtpJyB9LFxuXHR7IG5hbWU6ICdTZXJiby1Dcm9hdGlhbicgfSxcblx0eyBuYW1lOiAnU2lnbiBMYW5ndWFnZScgfSxcblx0eyBuYW1lOiAnU2luZGhpJyB9LFxuXHR7IG5hbWU6ICdTaW5oYWxhJyB9LFxuXHR7IG5hbWU6ICdTb21hbGknIH0sXG5cdHsgbmFtZTogJ1NwYW5pc2gnIH0sXG5cdHsgbmFtZTogJ1N1bmRhJyB9LFxuXHR7IG5hbWU6ICdTeWxoZXRpJyB9LFxuXHR7IG5hbWU6ICdUYWdhbG9nJyB9LFxuXHR7IG5hbWU6ICdUYW1pbCcgfSxcblx0eyBuYW1lOiAnVGVsdWd1JyB9LFxuXHR7IG5hbWU6ICdUaGFpJyB9LFxuXHR7IG5hbWU6ICdUdXJraXNoJyB9LFxuXHR7IG5hbWU6ICdVa3JhaW5pYW4nIH0sXG5cdHsgbmFtZTogJ1VyZHUnIH0sXG5cdHsgbmFtZTogJ1V5Z2h1cicgfSxcblx0eyBuYW1lOiAnVmlldG5hbWVzZScgfSxcblx0eyBuYW1lOiAnWW9ydWJhJyB9LFxuXHR7IG5hbWU6ICdadWx1JyB9LFxuXSIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuaW1wb3J0IExhbmd1YWdlcyBmcm9tICdsaXN0cy9MYW5ndWFnZXMuanMnXG5cblxuY29uc3QgTXVsdGlsaW5ndWFsID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYGJiNmEwZmI5LWE1ZDctNDkzMC1hNzgyLTk3NDI3NjMwMzdiNWAsXG5cdG5hbWU6IGBNdWx0aWxpbmd1YWxgLFxuXHRkZXNjOiBbXG5cdFx0YExlYXJuIGEgZGlmZmVyZW50IGZvcm0gb2YgY29tbXVuaWNhdGlvbi5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiA2LFxuXHRvcHRzOiBMYW5ndWFnZXNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpbGluZ3VhbCIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuaW1wb3J0IFNraWxscyBmcm9tICdydWxlcy9za2lsbHMvU2tpbGxzLmpzJ1xuXG5cbmNvbnN0IFByYWN0aWNlID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDJlMjdjM2ZkLWFhZjMtNGM5NS05ZDNhLTlhMGFkMjdhYmRmZmAsXG5cdG5hbWU6IGBQcmFjdGljZWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgdG8gYSBTa2lsbCAodXAgdG8gdGhlIHBhcmVudCBUcmFpdCkuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogNixcblx0b3B0czogU2tpbGxzLmxpc3Rcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFByYWN0aWNlIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgVmVoaWNsZU9wZXJhdGlvbiA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGBlNjlmODc4NC0xMzIzLTQ0NjgtODc2MS03YTlmMWVmOWUyMWRgLFxuXHRuYW1lOiBgVmVoaWNsZSBPcGVyYXRpb25gLFxuXHRkZXNjOiBbXG5cdFx0YFByb2ZpY2llbnRseSBvcGVyYXRlIGEgY2xhc3Mgb2YgdmVoaWNsZS5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiA2XG59KSAvLyBUT0RPOiBOZWVkIHRvIGFkZCBWZWhpY2xlTGlzdCB3aGVuIGl0IGlzIG1hZGVcblxuZXhwb3J0IGRlZmF1bHQgVmVoaWNsZU9wZXJhdGlvbiIsImltcG9ydCBFZmZpY2llbnRXb3JrIGZyb20gJy4vRWZmaWNpZW50V29yaydcbmltcG9ydCBGYXN0RHJhdyBmcm9tICcuL0Zhc3REcmF3J1xuaW1wb3J0IEZsZWV0Rm9vdGVkIGZyb20gJy4vRmxlZXRGb290ZWQnXG5pbXBvcnQgTXVsdGlsaW5ndWFsIGZyb20gJy4vTXVsdGlsaW5ndWFsJ1xuaW1wb3J0IFByYWN0aWNlIGZyb20gJy4vUHJhY3RpY2UnXG5pbXBvcnQgVmVoaWNsZU9wZXJhdGlvbiBmcm9tICcuL1ZlaGljbGVPcGVyYXRpb24nXG5cblxuY29uc3QgWFA2QWJpbGl0aWVzID0gW1xuXHRFZmZpY2llbnRXb3JrLFxuXHRGYXN0RHJhdyxcblx0RmxlZXRGb290ZWQsXG5cdE11bHRpbGluZ3VhbCxcblx0UHJhY3RpY2UsXG5cdFZlaGljbGVPcGVyYXRpb24sXG5dXG5cbmV4cG9ydCBkZWZhdWx0IFhQNkFiaWxpdGllcyIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IERhbmdlclNlbnNlID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDA4ZGE2ZmQ5LTU5Y2EtNDM0Yy1iMDgxLWY1OGZjMTljOWRlZmAsXG5cdG5hbWU6IGBEYW5nZXIgU2Vuc2VgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIHRvIFJlZmxleGl2ZSBEZWZlbnNlcy5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiA5XG59KVxuXG5leHBvcnQgZGVmYXVsdCBEYW5nZXJTZW5zZSIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IERpc2NpcGxpbmUgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgZGUzZDZiYzktZDE4OC00OTM2LWE2MmMtZjE5ZDJmNzMxZGFkYCxcblx0bmFtZTogYERpc2NpcGxpbmVgLFxuXHRkZXNjOiBbXG5cdFx0YElnbm9yZSAxIFBhaW4gcGVuYWx0eS5gLFxuXHRdLFxuXHRtYXg6IDMsXG5cdHhwOiA5XG59KVxuXG5leHBvcnQgZGVmYXVsdCBEaXNjaXBsaW5lIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgRm9ydHVuYXRlID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDA5NTdjMmU5LWE3NDMtNGVjYS1iNDI5LWI5ODQwZjhlYTkzMWAsXG5cdG5hbWU6IGBGb3J0dW5hdGVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEx1Y2suYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogOVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRm9ydHVuYXRlIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgRnJlZVJ1bm5pbmcgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgNmE5MzA2N2YtZmZkNC00MGRjLTlkZWEtNzRmZGMyYTU2ZDdlYCxcblx0bmFtZTogYEZyZWUgUnVubmluZ2AsXG5cdGRlc2M6IFtcblx0XHRgQWNyb2JhdGljcyA5IyB0byBDbGltYiB5b3VyIFNwZWVkIGFzIGEgTW92ZW1lbnQgYWN0aW9uLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZyZWVSdW5uaW5nIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5pbXBvcnQgU2tpbGxzIGZyb20gJ3J1bGVzL3NraWxscy9Ta2lsbHMuanMnXG5pbXBvcnQgVHJhaXRzIGZyb20gJ3J1bGVzL3RyYWl0cy9UcmFpdHMuanMnXG5cblxuY29uc3QgVW5vcnRob2RveCA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGA5ZmIxMDhmZC1iNmJhLTRmOWEtYjIyNS1kYTdlZjQ5OTRlODBgLFxuXHRuYW1lOiBgVW5vcnRob2RveGAsXG5cdGRlc2M6IFtcblx0XHRgUGljayBhIG5ldyBwYXJlbnQgVHJhaXQgZm9yIGEgU2tpbGwuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogOSxcblx0b3B0czogKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IHVMaXN0ID0gW11cblx0XHRUcmFpdHMubGlzdC5mb3JFYWNoKCh0cmFpdCkgPT4ge1xuXHRcdFx0U2tpbGxzLmxpc3QuZm9yRWFjaCgoc2tpbGwpID0+IHtcblx0XHRcdFx0Y29uc3QgdG5hbWUgPSB0cmFpdC5uYW1lXG5cdFx0XHRcdGNvbnN0IHNuYW1lID0gc2tpbGwubmFtZVxuXHRcdFx0XHRpZiAoc2tpbGwucGFyZW50ICE9IHRyYWl0Lm5hbWUpIHtcblx0XHRcdFx0XHR1TGlzdC5wdXNoKHsgbmFtZTogYCR7dG5hbWV9IC0gJHtzbmFtZX1gIH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHRyZXR1cm4gWy4uLnVMaXN0XVxuXHR9KSgpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBVbm9ydGhvZG94IiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgUmVzaWxpZW50ID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDk3NWUxMjJiLTJlMzUtNGM4ZS1hMWVkLTE2YWJjOTFlMzJmZWAsXG5cdG5hbWU6IGBSZXNpbGllbnRgLFxuXHRkZXNjOiBbXG5cdFx0YFJlZHVjZSBhbnkgVHJhdW1hIGJ5IDEuYFxuXHRdLFxuXHRtYXg6IDMsXG5cdHhwOiA5XG59KVxuXG5leHBvcnQgZGVmYXVsdCBSZXNpbGllbnQiLCJpbXBvcnQgRGFuZ2VyU2Vuc2UgZnJvbSAnLi9EYW5nZXJTZW5zZSdcbmltcG9ydCBEaXNjaXBsaW5lIGZyb20gJy4vRGlzY2lwbGluZSdcbmltcG9ydCBGb3J0dW5hdGUgZnJvbSAnLi9Gb3J0dW5hdGUnXG5pbXBvcnQgRnJlZVJ1bm5pbmcgZnJvbSAnLi9GcmVlUnVubmluZydcbmltcG9ydCBVbm9ydGhvZG94IGZyb20gJy4vVW5vcnRob2RveCdcbmltcG9ydCBSZXNpbGllbnQgZnJvbSAnLi9SZXNpbGllbnQnXG5cblxuY29uc3QgWFA5QWJpbGl0aWVzID0gW1xuXHREYW5nZXJTZW5zZSxcblx0RGlzY2lwbGluZSxcblx0Rm9ydHVuYXRlLFxuXHRGcmVlUnVubmluZyxcblx0VW5vcnRob2RveCxcblx0UmVzaWxpZW50LFxuXVxuXG5leHBvcnQgZGVmYXVsdCBYUDlBYmlsaXRpZXMiLCJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcblxuXG5jb25zdCBQYXJyeSA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGA0YjYxN2RlZS1hZWQzLTQxODctYWU1YS0yNWViODMyNDVjMjBgLFxuXHRuYW1lOiBgUGFycnlgLFxuXHRkZXNjOiBbXG5cdFx0YEZyZWUgQmxvY2sgQWN0aW9uIG9uY2UgcGVyIHJvdW5kLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDEyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBQYXJyeSIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IFNpZGVzdGVwID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYGUwNTJiZDYwLTZlMDMtNGQ5MC05YmQ4LThiNjk1MGEyNDM5M2AsXG5cdG5hbWU6IGBTaWRlLXN0ZXBgLFxuXHRkZXNjOiBbXG5cdFx0YEZyZWUgRG9kZ2UgQWN0aW9uIG9uY2UgcGVyIHJvdW5kLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDEyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlc3RlcCIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IFdyZXN0bGluZyA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGBjNTY1ZDU3My1jMjgxLTQ4NDktYjkzNS1mMzM4OGJjZDFiMWRgLFxuXHRuYW1lOiBgV3Jlc3RsaW5nYCxcblx0ZGVzYzogW1xuXHRcdGBGcmVlIEdyYXBwbGUgQWN0aW9uIG9uY2UgcGVyIHJvdW5kLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDEyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBXcmVzdGxpbmciLCJpbXBvcnQgUGFycnkgZnJvbSAnLi9QYXJyeSdcbmltcG9ydCBTaWRlc3RlcCBmcm9tICcuL1NpZGVzdGVwJ1xuaW1wb3J0IFdyZXN0bGluZyBmcm9tICcuL1dyZXN0bGluZydcblxuXG5jb25zdCBYUDEyQWJpbGl0aWVzID0gW1xuXHRQYXJyeSxcblx0U2lkZXN0ZXAsXG5cdFdyZXN0bGluZyxcbl1cblxuZXhwb3J0IGRlZmF1bHQgWFAxMkFiaWxpdGllcyIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IENoYXJnZSA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGBjNDQ1ODBkZC0zYTBhLTQxZDUtYjk3Zi1lYzFmOWY0YmVhMGRgLFxuXHRuYW1lOiBgQ2hhcmdlYCxcblx0ZGVzYzogW1xuXHRcdGBJZ25vcmUgVW5zdGFibGUgcGVuYWx0eSB0byBNZWxlZSBBdHRhY2tzIHdoZW4geW91IFJ1bi5gLFxuXHRcdGBJZ25vcmUgUHJvbmUgZWZmZWN0IGZyb20gTGVnIERhbWFnZS5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiAxNVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ2hhcmdlIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgRmlybUdyaXAgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgYzU1YjA5NDAtOGU3Mi00YzVhLWE3YmMtMGI5YjI3MzUzYWU3YCxcblx0bmFtZTogYEZpcm0gR3JpcGAsXG5cdGRlc2M6IFtcblx0XHRgSWdub3JlIHBlbmFsdHkgdG8gdXNlIDJoIHdlYXBvbnMgaW4gMWgsIHVwIHRvIFNpemUgPSBDb25zdGl0dXRpb24uYCxcblx0XHRgSWdub3JlIERyb3AgZWZmZWN0IGZyb20gQXJtIERhbWFnZS5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiAxNVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRmlybUdyaXAiLCJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcblxuXG5jb25zdCBIYXJkSGVhZGVkID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYGIwMmJjY2FkLTY0Y2UtNDc3Yi05Y2IzLTM4ODNmYzJjNTlmNWAsXG5cdG5hbWU6IGBIYXJkIEhlYWRlZGAsXG5cdGRlc2M6IFtcblx0XHRgSWdub3JlIFN0dW4gZWZmZWN0IGZyb20gSGVhZCBEYW1hZ2UuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogMTVcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhhcmRIZWFkZWQiLCJpbXBvcnQgQ2hhcmdlIGZyb20gJy4vQ2hhcmdlJ1xuaW1wb3J0IEZpcm1HcmlwIGZyb20gJy4vRmlybUdyaXAnXG5pbXBvcnQgSGFyZEhlYWRlZCBmcm9tICcuL0hhcmRIZWFkZWQnXG5cblxuY29uc3QgWFAxNUFiaWxpdGllcyA9IFtcblx0Q2hhcmdlLFxuXHRGaXJtR3JpcCxcblx0SGFyZEhlYWRlZCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgWFAxNUFiaWxpdGllcyIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IEFtYmlkZXh0cm91cyA9IG5ldyBBYmlsaXR5KHtcblx0aWQ6IGAxNDYwZTQ4ZC0xMGZjLTQ0NjktYTE4My03NGY2MDYwZDBiYjRgLFxuXHRuYW1lOiBgQW1iaWRleHRyb3VzYCxcblx0ZGVzYzogW1xuXHRcdGBPZmYtaGFuZCBwZW5hbHR5IGlzIC0xIGluc3RlYWQgb2YgLTMuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogMThcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFtYmlkZXh0cm91cyIsImltcG9ydCBBYmlsaXR5IGZyb20gJ3J1bGVzL2FiaWxpdGllcy9BYmlsaXR5LmpzJ1xuXG5cbmNvbnN0IEFzc2Fzc2luID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDc0MjI3OWExLTc3NDktNDljNS1iNmRhLWQ1N2VhYWE1MTFlNGAsXG5cdG5hbWU6IGBBc3Nhc3NpbmAsXG5cdGRlc2M6IFtcblx0XHRgKzMgRGFtYWdlIGZvciBBdHRhY2tzIG1hZGUgd2hpbGUgQ29uY2VhbGVkLmAsXG5cdF0sXG5cdG1heDogMSxcblx0eHA6IDE4XG59KVxuXG5leHBvcnQgZGVmYXVsdCBBc3Nhc3NpbiIsImltcG9ydCBBbWJpZGV4dHJvdXMgZnJvbSAnLi9BbWJpZGV4dHJvdXMnXG5pbXBvcnQgQXNzYXNzaW4gZnJvbSAnLi9Bc3Nhc3NpbidcblxuXG5jb25zdCBYUDE4QWJpbGl0aWVzID0gW1xuXHRBbWJpZGV4dHJvdXMsXG5cdEFzc2Fzc2luLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBYUDE4QWJpbGl0aWVzIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgUmF0aW9uYWwgPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgMGViOTBlYzEtZTNhYy00ZTcwLWE4YzEtZTYyOTlmMWMzYWJmYCxcblx0bmFtZTogYFJhdGlvbmFsYCxcblx0ZGVzYzogW1xuXHRcdGArMSBQc3ljaGUuYCxcblx0XSxcblx0bWF4OiAzLFxuXHR4cDogMjRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJhdGlvbmFsIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgVG91Z2ggPSBuZXcgQWJpbGl0eSh7XG5cdGlkOiBgNDU2N2YxMWEtNWVlMC00ZThkLWFlMTktYjJlYmI4MTYzOTdlYCxcblx0bmFtZTogYFRvdWdoYCxcblx0ZGVzYzogW1xuXHRcdGArMSBIZWFsdGggZm9yIGVhY2ggQm9keSBQYXJ0LmAsXG5cdF0sXG5cdG1heDogMyxcblx0eHA6IDI0XG59KVxuXG5leHBvcnQgZGVmYXVsdCBUb3VnaCIsImltcG9ydCBSYXRpb25hbCBmcm9tICcuL1JhdGlvbmFsJ1xuaW1wb3J0IFRvdWdoIGZyb20gJy4vVG91Z2gnXG5cblxuY29uc3QgWFAyNEFiaWxpdGllcyA9IFtcblx0UmF0aW9uYWwsXG5cdFRvdWdoLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBYUDI0QWJpbGl0aWVzIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cblxuY29uc3QgQ2xvc2VDYWxsID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDZkNzI0ZmUwLTg5ZDEtNDhhZC1iOGEwLTk4YmI3MGIxMDA4Y2AsXG5cdG5hbWU6IGBDbG9zZSBDYWxsYCxcblx0ZGVzYzogW1xuXHRcdGBTcGVuZCB0aGlzIEFiaWxpdHkgdG8gc3Vydml2ZSBhbiBvdGhlcndpc2UgbGV0aGFsIGVuY291bnRlci5gLFxuXHRdLFxuXHRtYXg6IDEsXG5cdHhwOiAzMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ2xvc2VDYWxsIiwiaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5pbXBvcnQgVHJhaXRzIGZyb20gJ3J1bGVzL3RyYWl0cy9UcmFpdHMuanMnXG5cblxuY29uc3QgU2VsZkltcHJvdmVtZW50ID0gbmV3IEFiaWxpdHkoe1xuXHRpZDogYDM0YmRkNjc1LTVhMWMtNGZlMS05NmQ0LWJhYzYxNTcyY2Y3NGAsXG5cdG5hbWU6IGBTZWxmIEltcHJvdmVtZW50YCxcblx0ZGVzYzogW1xuXHRcdGArMSB0byBhIFRyYWl0IChtYXggNikuYCxcblx0XSxcblx0bWF4OiAxLFxuXHR4cDogMzAsXG5cdG9wdHM6IFRyYWl0cy5saXN0XG59KVxuXG5leHBvcnQgZGVmYXVsdCBTZWxmSW1wcm92ZW1lbnQiLCJpbXBvcnQgQ2xvc2VDYWxsIGZyb20gJy4vQ2xvc2VDYWxsJ1xuaW1wb3J0IFNlbGZJbXByb3ZlbWVudCBmcm9tICcuL1NlbGZJbXByb3ZlbWVudCdcblxuXG5jb25zdCBYUDMwQWJpbGl0aWVzID0gW1xuXHRDbG9zZUNhbGwsXG5cdFNlbGZJbXByb3ZlbWVudCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgWFAzMEFiaWxpdGllcyIsImV4cG9ydCBkZWZhdWx0IChndXVpZCwgbW9kKSA9PiB7XG5cdGxldCBoYXNoID0gbW9kLnNwbGl0KCcnKVxuXHRcdFx0XHRcdC5tYXAobSA9PiBtID0gbS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0XHRcdC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiICsgcGFyc2VJbnQoZ3V1aWQuc3BsaXQoYC1gKVs0XSwgMTYpKVxuXHRcdFx0XHRcdC50b1N0cmluZygxNilcblxuXHRpZiAoaGFzaC5sZW5ndGggPiAxMikgaGFzaCA9IGhhc2guc3Vic3RyKGhhc2gubGVuZ3RoIC0gMTIsIGhhc2gubGVuZ3RoKVxuXG5cdHJldHVybiBndXVpZC5zdWJzdHIoMCwgZ3V1aWQubGFzdEluZGV4T2YoJy0nKSArIDEpICsgaGFzaFxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBZUssTUFBQyxlQUFlLEdBQUc7QUFDeEIsQ0FBQyxFQUFFO0FBQ0gsQ0FBQyxXQUFXO0FBQ1osQ0FBQyxhQUFhO0FBQ2QsQ0FBQyxJQUFJO0FBQ0wsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxNQUFNO0FBQ1AsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxVQUFVO0FBQ1gsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxLQUFLO0FBQ04sRUFBQztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0ssTUFBQyxnQkFBZ0IsR0FBRztBQUN6QixDQUFDLElBQUk7QUFDTCxDQUFDLFNBQVM7QUFDVixDQUFDLGFBQWE7QUFDZCxDQUFDLFVBQVU7QUFDWCxDQUFDLFdBQVc7QUFDWixDQUFDLFFBQVE7QUFDVCxDQUFDLE9BQU87QUFDUixDQUFDLGNBQWM7QUFDZixDQUFDLEtBQUs7QUFDTixDQUFDLFVBQVU7QUFDWCxDQUFDLFdBQVc7QUFDWixDQUFDLFVBQVU7QUFDWCxDQUFDLFlBQVk7QUFDYixDQUFDLFlBQVk7QUFDYixDQUFDLFNBQVM7QUFDVixDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxDQUFDLFlBQVk7QUFDYixDQUFDLGNBQWM7QUFDZixDQUFDLGVBQWU7QUFDaEIsQ0FB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QUN6QixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUN0QixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNqQixDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtBQUN2QixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTtBQUN4QixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNsQixDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUN0QixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtBQUN2QixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNqQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtBQUN2QixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO0FBQzNCLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFO0FBQzFCLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3BCLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3BCLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3BCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3BCLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFF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
