import { C as CombatGear, A as Attribute, P as Pierce, S as Scatter, R as Rule } from './SWBodyguard.54177d3a.js';

class Ammo extends CombatGear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		attr,
		cal=``
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty,
			attr
		});
		this.cal = cal;
	}
}

class AmmoAttr extends Attribute {
	constructor({
		id,
		name,
		desc,
		cal
	}) {
		super({
			id,
			name,
			desc
		});
		this.cal = cal;
	}
}

const Broadhead = new AmmoAttr({
	id: `f505bab5-8584-461d-067a-ac0f45cc4eb3`,
	name: `Broadhead`,
	desc: [
		`+1 Damage.`,
	],
	cal: [
		`Arrow`,
	]
});

const ArrowBroadhead = new Ammo({
	id: `b157becd-2144-4e55-9e3b-be88089ec6fe`,
	name: `Broadhead Arrow`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	cal: `Arrow`,
	attr: [
		Broadhead,
		Pierce,
	],
});

const ArrowStandard = new Ammo({
	id: `f05595e3-0e2c-42fb-82b0-2e46dd2fd43f`,
	name: `Target Arrow`,
	desc: [
		`Practice arrow.`,
	],
	sz: 0.1,
	cal: `Arrow`,
});

const ArrowList = [
	ArrowBroadhead,
	ArrowStandard,
];

const HollowPoint = new AmmoAttr({
	id: `993005af-9d1a-440a-6b22-501ba1eafb28`,
	name: `Hollow Point`,
	desc: [
		`+1 Damage.`,
	],
	cal: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
});

const HollowPoint22 = new Ammo({
	id: `af1d4448-b795-4340-b1d6-2eeb601eeea7`,
	name: `.22 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: .005,
	cal: `.22`,
	attr: [
		HollowPoint,
	],
});

const Match = new AmmoAttr({
	id: `b45dcd31-3da4-45a9-1bbf-f9132373bcf8`,
	name: `Match`,
	desc: [
		`+1 Ranged Attack.`,
	],
	cal: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
});

const Match22 = new Ammo({
	id: `abcff657-e505-4981-ad07-8a4d5ff0fcee`,
	name: `.22 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.005,
	cal: `.22`,
	attr: [
		Match,
	],
});

const Standard22 = new Ammo({
	id: `4c09000b-23fd-4085-a49f-d16f14367ea0`,
	name: `.22 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.005,
	cal: `.22`,
});

const List22 = [
	HollowPoint22,
	Match22,
	Standard22,
];

const HollowPoint9mm = new Ammo({
	id: `2ae93589-3bd7-4abf-a6a1-153bd1b4e7ed`,
	name: `9mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		HollowPoint,
	]
});

const Match9mm = new Ammo({
	id: `dcfa9f26-6c02-4646-b369-ff8ba26246da`,
	name: `9mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		Match,
	]
});

const Standard9mm = new Ammo({
	id: `552009c4-d6a9-4287-ac4f-598014adbbba`,
	name: `9mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
});

const List9mm = [
	HollowPoint9mm,
	Match9mm,
	Standard9mm,
];

const HollowPoint357 = new Ammo({
	id: `798c6783-f44b-447f-9f9b-8332bd4ab74e`,
	name: `.357 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `.357`,
	attr: [
		HollowPoint,
	]
});

const Standard357 = new Ammo({
	id: `4266c19a-2978-4d12-88b9-d05ef59c9620`,
	name: `.357 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01,
	cal: `.357`,
});

const List357 = [
	HollowPoint357,
	Standard357,
];

const ArmorPiercing556 = new Ammo({
	id: `c911b821-137b-4e08-8685-84d82c854b69`,
	name: `5.56mm Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Pierce,
	]
});

const HollowPoint556 = new Ammo({
	id: `f6f0b22f-df8c-4604-ae1e-1f381ea60e4a`,
	name: `5.56mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		HollowPoint,
	]
});

const Match556 = new Ammo({
	id: `5bd2b42f-78bb-4b7a-a4c1-86ba01caddd0`,
	name: `5.56mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Match,
	]
});

const Standard556 = new Ammo({
	id: `2e3ef39f-b6f8-4d79-b2f6-a73186f0fa6c`,
	name: `5.56mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
});

const List556 = [
	ArmorPiercing556,
	HollowPoint556,
	Match556,
	Standard556,
];

const ArmorPiercing308 = new Ammo({
	id: `08f1864b-66cf-4d61-be54-4139b4242c02`,
	name: `.308 Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Pierce,
	]
});

const HollowPoint308 = new Ammo({
	id: `d9ef6e71-5f4c-4372-a1fb-70ad48637276`,
	name: `.308 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		HollowPoint,
	]
});

const Match308 = new Ammo({
	id: `fd9887fc-ffa3-4d7d-9984-f9d18eeaa0bf`,
	name: `.308 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Match,
	]
});

const Standard308 = new Ammo({
	id: `ee9e5c28-98bd-4dcd-b531-a0dc2086f551`,
	name: `.308 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
});

const List308 = [
	ArmorPiercing308,
	HollowPoint308,
	Match308,
	Standard308,
];

const Buckshot12g = new Ammo({
	id: `facd4679-38bc-4a4d-9da9-8dda5d569094`,
	name: `12g Buckshot`,
	desc: [
		`Scatter-shot ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Scatter,
	]
});

const Slug = new AmmoAttr({
	id: `0563870a-9302-4825-579c-c28cfb478c90`,
	name: `Slug`,
	desc: [
		`Range x2.`,
	],
	cal: [
		`12g`,
	]
});

const Slug12g = new Ammo({
	id: `3d42c43d-4507-4c35-9bcf-88fee3cdb943`,
	name: `12g Slug`,
	desc: [
		`Single-projectile ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Slug,
	]
});

const List12g = [
	Buckshot12g,
	Slug12g,
];

class Armor extends CombatGear {
	constructor({
		name,
		desc,
		sz,
		qty,
		attr,
		dr,
		loc
	}) {
		super({
			name,
			desc,
			sz,
			qty,
			attr
		});
		this.dr = dr;
		this.loc = loc;
	}
}

const AthleticHelmet = new Armor({
	id: `d6861b08-b92a-468d-a929-410c130b2a2d`,
	name: `Athletic Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`
});

const AthleticPads = new Armor({
	id: `799b9afa-d54b-4c9e-9cf8-f498be18b1c0`,
	name: `Athletic Pads`,
	sz: 2,
	dr: 1,
	loc: `Torso`
});

class ArmorAttr extends Attribute {
	constructor({
		id,
		name,
		desc
	}) {
		super({
			id,
			name,
			desc
		});
	}
}

const Camo = new ArmorAttr({
	id: `e492e043-fcc0-49ed-262f-01b4c60208ad`,
	name: `Camo`,
	desc: [
		`+1 Stealth per Body Part when in a given Biome.`,
	]
});

const FireResistance = new ArmorAttr({
	id: `a9c9954a-2803-45d0-4a65-257a521db481`,
	name: `Fire Resistance`,
	desc: [
		`Armor Damage Resistance reduces Fire Damage.`,
	]
});

const CombatHelmet = new Armor({
	id: `6b26c241-5fef-463f-bfc6-cadab2281711`,
	name: `Combat Helmet`,
	sz: 2,
	dr: 3,
	loc: `Head`,
	attr: [
		Camo,
		FireResistance,
	]
});

const ColdResistance = new ArmorAttr({
	id: `f2fa3f07-b7ac-4c7b-fb22-2baf6f39f8cb`,
	name: `Cold Resistance`,
	desc: [
		`Delay Hypothermia for 1hr per Body Part.`,
	]
});

const Coveralls = new Armor({
	id: `71ede3ad-c8a7-4556-86f1-c4037244757e`,
	name: `Coveralls`,
	sz: 3,
	dr: 1,
	loc: `Arms, Torso, Legs`,
	attr: [
		Camo,
		ColdResistance,
	]
});

const Mask = new ArmorAttr({
	id: `5bd4ae85-eeaf-4031-8a8c-e0e712f6a236`,
	name: `Mask`,
	desc: [
		`Obscures identity and protects face. -1 Perception.`,
	]
});

const FirefighterSuit = new Armor({
	id: `eefc5c02-3139-42cd-b5f9-fe055a915098`,
	name: `Firefighter Suit`,
	sz: 5,
	dr: 2,
	loc: `Full Body`,
	attr: [
		ColdResistance,
		FireResistance,
		Mask,
	]
});

const FlakJacket = new Armor({
	id: `31e3f366-1adf-4141-912d-0664c5644430`,
	name: `Flak Jacket`,
	sz: 4,
	dr: 2,
	loc: `Torso`,
	attr: [
		Camo,
	]
});

const GhillieSuit = new Armor({
	id: `6ec3af0b-27c8-4dde-b8b5-05a51633241b`,
	name: `Ghillie Suit`,
	sz: 4,
	dr: 1,
	loc: `Full Body`,
	attr: [
		Camo,
		ColdResistance,
	]
});

const Impermeable = new ArmorAttr({
	id: `cc89a67e-746f-48db-2466-c5f2d6bf5378`,
	name: `Impermeable`,
	desc: [
		`Automatic Success to resist exposure to Diseases and Toxins.`,
	]
});

const HazmatSuit = new Armor({
	id: `6f6e31ff-67fa-4d25-9652-8541c3fabc0c`,
	name: `Hazmat Suit`,
	sz: 2,
	dr: 0,
	loc: `Full Body`,
	attr: [
		Impermeable,
		Mask,
	]
});

const HikingBoots = new Armor({
	id: `5cd1e496-431f-4eff-bd34-5e2b74ef06e9`,
	name: `Hiking Boots`,
	sz: 2,
	dr: 1,
	loc: `Legs`,
	attr: [
		ColdResistance,
		FireResistance,
	]
});

const KevlarVest = new Armor({
	id: `a4d0d99a-3546-4805-912c-4ffb2fbe0c85`,
	name: `Kevlar Vest`,
	sz: 4,
	dr: 3,
	loc: `Torso`,
	attr: [
		ColdResistance,
		FireResistance,
	]
});

const LeatherJacket = new Armor({
	id: `cf560d38-9a41-40c8-9f14-f7839a3ecf82`,
	name: `Leather Jacket`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`
});

const MotorcycleHelmet = new Armor({
	id: `9b54d7fd-c70c-4b97-b471-eff6477622d3`,
	name: `Motorcycle Helmet`,
	sz: 2,
	dr: 1,
	loc: `Head`,
	attr: [
		FireResistance,
		Mask,
	]
});

const PlateCarrier = new Armor({
	id: `6734c9c6-d9b0-4e3d-b455-6db395645014`,
	name: `Plate Carrier`,
	sz: 4,
	dr: 4,
	loc: `Torso`,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	]
});

const WinterCoat = new Armor({
	id: `102e1133-3242-4a89-9658-e58aa5636e45`,
	name: `Winter Coat`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`,
	attr: [
		ColdResistance,
	]
});

const WorkGloves = new Armor({
	id: `05dbfaf0-40aa-498e-a19e-d57bcdd1d6b7`,
	name: `Work Gloves`,
	sz: 1,
	dr: 1,
	loc: `Arms`,
	attr: [
		FireResistance,
	]
});

class Gear extends Rule {
	constructor({
		id,
		name,
		desc,
		sz,
		qty=0
	}) {
		super({
			id,
			name,
			desc
		});
		this.sz = sz;
		this.qty = qty;
	}
}

class Document extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
	}
}

const BilingualDictionary = new Document({
	id: `0bd4e81f-184a-4022-ca40-ffb1b8ecc59f`,
	name: `Bilingual Dictionary`,
	desc: [
		`Multilingual Ability`,
	],
	sz: 1
});

const BodyInBalance = new Document({
	id: `3355f314-57f5-4875-4496-d1e80a89bec2`,
	name: `Body in Balance`,
	desc: [
		`+1 Athletics`,
	],
	sz: 1
});

const BookOfFiveRings = new Document({
	id: `b8734117-d386-4a48-4547-d64733cabcd7`,
	name: `Tao of Jeet Kune Do`,
	desc: [
		`+1 Melee`,
	],
	sz: 1
});

const ClassicNovel = new Document({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Classic Novel`,
	desc: [
		`+1 Psyche`,
	],
	sz: 1
});

const BriefHistoryOfTime = new Document({
	id: `0e75fc4b-6a94-4126-01ef-98de7833bbd9`,
	name: `Brief History of Time`,
	desc: [
		`+1 Science`,
	],
	sz: 1
});

const DefensiveDriving = new Document({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Defensive Driving`,
	desc: [
		`+1 Drive`,
	],
	sz: 1
});

const DogTricks = new Document({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Dog Tricks`,
	desc: [
		`+1 Tame`,
	],
	sz: 1
});

const EffectiveHabits = new Document({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Effective Habits`,
	desc: [
		`+1 to any one Skill`,
	],
	sz: 1
});

const EngineeringConcepts = new Document({
	id: `1473e9cc-aa60-432d-c963-706f6027ec3a`,
	name: `Engineering Concepts`,
	desc: [
		`+1 Build`,
	],
	sz: 1
});

const GraysAnatomy = new Document({
	id: `631c4ab8-e6ed-4b03-58f2-5a18e367f0a2`,
	name: `Gray's Anatomy`,
	desc: [
		`+1 Medicine`,
	],
	sz: 1
});

const HolyBook = new Document({
	id: `0d34f869-b076-48d0-39f3-9d7d01949df7`,
	name: `Holy Book`,
	desc: [
		`-1 Psyche`,
	],
	sz: 1
});

const HomeSecurity = new Document({
	id: `53f6c3b9-8df8-4374-057c-3a38973a49fc`,
	name: `Home Security`,
	desc: [
		`+1 Larceny`,
	],
	sz: 1
});

const HowToWinFriends = new Document({
	id: `4f22c946-4376-4006-9f07-6a9294b89bcf`,
	name: `How to Win Friends`,
	desc: [
		`+1 Socialize`,
	],
	sz: 1
});

const HowYogaWorks = new Document({
	id: `c2e1dfd4-d5dd-4149-a6fc-d696179ae9d2`,
	name: `How Yoga Works`,
	desc: [
		`+1 Acrobatics`,
	],
	sz: 1
});

const LeadershipBasics = new Document({
	id: `aae544a7-01c8-4f98-bc38-34b6332b1868`,
	name: `Leadership Basics`,
	desc: [
		`+1 Leadership`,
	],
	sz: 1
});

const MapAtlas = new Document({
	id: `aada7d2a-381d-4988-d915-81ce5f595d2d`,
	name: `Map (Atlas)`,
	desc: [
		`+1 Survival(Navigate)`,
	],
	sz: 1
});

const MapLocal = new Document({
	id: `b3c55045-16de-4193-4196-5681db54e755`,
	name: `Map (Local)`,
	desc: [
		`+1 Survival(Navigate) in a given Region.`,
	],
	sz: 0
});

const MapTopographic = new Document({
	id: `5e0e17b4-8771-44e2-607d-d16754fce17d`,
	name: `Map (Topographic)`,
	desc: [
		`+3 Survival(Navigate) in a given Region.`,
	],
	sz: 0
});

const PersonalDefense = new Document({
	id: `8bce5059-df27-43be-aacd-94e5685fe537`,
	name: `Personal Defense`,
	desc: [
		`+1 Ranged`,
	],
	sz: 1
});

const SASSurvivalGuide = new Document({
	id: `1bad72d4-a758-473e-d1bf-f52a200a5f5a`,
	name: `SAS Survival Guide`,
	desc: [
		`+1 Survival`,
	],
	sz: 1
});

const StandupComedy = new Document({
	id: `d6b2ddeb-7033-4530-4c57-0d71b099785a`,
	name: `Stand-up Comedy`,
	desc: [
		`+1 Entertain`,
	],
	sz: 1
});

const YellowPages = new Document({
	id: `ac4656eb-0903-4f60-f323-83a1c63f84e6`,
	name: `Yellow Pages`,
	desc: [
		`+1 Scavenging in a given Region.`,
	],
	sz: 1
});

const ZenMind = new Document({
	id: `2c017ecd-b770-4704-4a16-7a3037a82d49`,
	name: `Zen Mind`,
	desc: [
		`+1 Perception`,
	],
	sz: 1
});

const DocumentList = [
	BilingualDictionary,
	BodyInBalance,
	BookOfFiveRings,
	ClassicNovel,
	BriefHistoryOfTime,
	ClassicNovel,
	DefensiveDriving,
	DogTricks,
	EffectiveHabits,
	EngineeringConcepts,
	GraysAnatomy,
	HolyBook,
	HomeSecurity,
	HowToWinFriends,
	HowYogaWorks,
	LeadershipBasics,
	MapAtlas,
	MapLocal,
	MapTopographic,
	PersonalDefense,
	SASSurvivalGuide,
	StandupComedy,
	YellowPages,
	ZenMind,
];

class Drug extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		mix,
		od
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
		this.mix = mix;
		this.od = od;
	}
}

const Alcohol = new Drug({
	id: `de0dd5f5-8630-4827-121d-e39fc099a9ab`,
	name: `Alcohol`,
	desc: [
		`Can be used as an Antibiotic or Fuel.`,
		`C9# or Unstable.`,
	],
	sz: 1,
	mix: 9,
	od: true
});

const Antibiotic = new Drug({
	id: `5d0b08ad-11c0-490d-00ca-6a8bbeb3b4fa`,
	name: `Antibiotic`,
	desc: [
		`Prevents infection in Recovery for 1 day.`,
	],
	sz: 0,
	mix: 12,
	od: false
});

const Hallucinogen = new Drug({
	id: `462f38ee-ef66-4f76-9110-95802de92a6b`,
	name: `Hallucinogen`,
	desc: [
		`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`,
	],
	sz: 0,
	mix: 15,
	od: false
});

const Painkiller = new Drug({
	id: `c9be0c61-4165-45eb-5460-995a546e1e6f`,
	name: `Painkiller`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	sz: 0,
	mix: 9,
	od: true
});

const Sedative = new Drug({
	id: `4fb51505-52ff-45a1-5b73-129aabc09b83`,
	name: `Sedative`,
	desc: [
		`Demeanor#6/round to take any action.`,
	],
	sz: 0,
	mix: 12,
	od: true
});

const Stimulant = new Drug({
	id: `e124e538-8a31-4ed3-442e-06c040e353ce`,
	name: `Stimulant`,
	desc: [
		`Ignore Exhaustion penalties for 6hrs.`,
	],
	sz: 0,
	mix: 9,
	od: true
});

const DrugList = [
	Alcohol,
	Antibiotic,
	Hallucinogen,
	Painkiller,
	Sedative,
	Stimulant,
];


// OLD Damage ResistanceUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6 rounds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/round for 5 rounds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Resuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)

class Electronic extends Gear {
	constructor ({
		id,
		name,
		hrs,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
		this.hrs = hrs;
	}
}

const Cellphone = new Electronic({
	id: `fdf4711d-ccc0-4a37-3808-f3334c827c30`,
	name: `Cellphone`,
	desc: [
		`1yd light, camera, remote control.`,
	],
	sz: 1,
	hrs: 3
});

const EmergencyRadio = new Electronic({
	id: `6914f941-5c30-48b4-f4ca-131e39075fb3`,
	name: `Emergency Radio`,
	desc: [
		`AM/FM/Shortwave.`,
		`1yd light.`,
	],
	sz: 1,
	hrs: 6
});

const Flashlight = new Electronic({
	id: `100f3da0-5b60-4a73-b828-0009c2702bf0`,
	name: `Flashlight`,
	desc: [
		`10yd light. -3 Ranged Attack to Blind 1 round.`,
	],
	sz: 1,
	hrs: 3
});

const GeigerCounter = new Electronic({
	id: `0b857eb3-3aea-44b4-34a2-93f578870af4`,
	name: `Geiger Counter`,
	desc: [
		`Science 6# to detect Radiation in 1yd.`,
	],
	sz: 2,
	hrs: 24
});

const HandRadio = new Electronic({
	id: `6aa47c61-a2f3-472a-f9c6-d6fedc08aefc`,
	name: `Hand Radio`,
	desc: [
		`9-channel 2-way radio.`,
		`3 mile range.`,
	],
	sz: 1,
	hrs: 9
});

const Headlamp = new Electronic({
	id: `7374fe66-3389-407c-20cc-3b8c53fd8a7a`,
	name: `Headlamp`,
	desc: [
		`3yd light. Hands free.`,
	],
	sz: 0,
	hrs: 3
});

const Lantern = new Electronic({
	id: `c25dadce-1873-4bd0-4da5-a5675504fe46`,
	name: `Lantern`,
	desc: [
		`3yd light radius.`,
	],
	sz: 2,
	hrs: 6
});

const Megaphone = new Electronic({
	id: `5e242eff-66c8-41d6-1350-28071590b956`,
	name: `Megaphone`,
	desc: [
		`+1 Leadership when speaking to a crowd.`,
	],
	sz: 2,
	hrs: 12
});

const Multimeter = new Electronic({
	id: `53ffeb0d-4324-437f-e06e-19b84ca2acc0`,
	name: `Multimeter`,
	desc: [
		`+3 Science(Technology).`,
		`Detects voltage, battery life, and closed circuits.`,
	],
	sz: 1,
	hrs: 48
});

const NightvisionGoggles = new Electronic({
	id: `c2506a47-bbf1-45e0-daa9-297af21a11ea`,
	name: `Nightvision Goggles`,
	desc: [
		`Ignore Visibility penalties in darkness.`,
	],
	sz: 1,
	hrs: 36
});

const QuadcopterDrone = new Electronic({
	id: `b8de49bf-83d7-4d99-554a-bdf378b0672e`,
	name: `Quadcopter Drone`,
	desc: [
		`Science 6# to use.`,
		`Onboard camera.`,
		`90yd Speed.`,
	],
	sz: 2,
	hrs: .25
});

const RCCar = new Electronic({
	id: `d7cb8c39-edbf-4dba-180f-f5a90c8a3c2c`,
	name: `RC Car`,
	desc: [
		`Science 3# to use.`,
		`45yd Speed.`,
	],
	sz: 3,
	hrs: .5
});

const SolarLamp = new Electronic({
	id: `aa480ec7-9df9-4011-ff78-d4b34567c144`,
	name: `Solar Lamp`,
	desc: [
		`1yd light radius.`,
		`1 day charge.`,
	],
	sz: 1,
	hrs: 9
});

const StunGun = new Electronic({
	id: `addf59b3-5134-4a92-770c-564f831ac30b`,
	name: `Stun Gun`,
	desc: [
		`Melee Attack.`,
		`C9# or Stun next round.`,
	],
	sz: 1,
	hrs: .1
});

const ElectronicList = [
	Cellphone,
	EmergencyRadio,
	Flashlight,
	GeigerCounter,
	HandRadio,
	Headlamp,
	Lantern,
	Megaphone,
	Multimeter,
	NightvisionGoggles,
	QuadcopterDrone,
	RCCar,
	SolarLamp,
	StunGun,
];


// OLD ELECTRONICS
//  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)

class Equipment extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
	}
}

const AirHorn = new Equipment({
	id: `3227f45d-6091-4d3f-c6b3-9ad65810be80`,
	name: `Air Horn`,
	desc: [
		`Emits a loud shriek up to a 1 mile radius.`,
	],
	sz: 1
});

const Bicycle = new Equipment({
	id: `b368d8c5-e9f7-4c65-efba-60146a39be78`,
	name: `Bicycle`,
	desc: [
		`Athletics 3#.`,
		`Speed x3yds (x.7mph).`,
		`2h.`,
	],
	sz: 8
});

const Binoculars = new Equipment({
	id: `20b85479-d079-4fc0-44e1-dd3fd989850d`,
	name: `Binoculars`,
	desc: [
		`+3 Perception(See) at 50+yds.`,
	],
	sz: 1
});

const CageTrap = new Equipment({
	id: `888116f7-35ad-4822-7a05-2ec1607a27a1`,
	name: `Cage Trap`,
	desc: [
		`+3 Survival(Forage).`,
		`Takes 1day.`,
	],
	sz: 6
});

const Candle = new Equipment({
	id: `3c1ae77d-8b52-452a-01a1-68aa5a6be931`,
	name: `Candle`,
	desc: [
		`1yd light radius for 6hrs.`,
	],
	sz: 0
});

const Candy = new Equipment({
	id: `57d01f7d-b16c-4e1a-2628-8b0d63b030cd`,
	name: `Candy`,
	desc: [
		`Restores 1 Luck point.`,
		`1/day.`,
	],
	sz: 0
});

const Chalk = new Equipment({
	id: `cb6ca246-f672-499c-ac06-64f36b70d559`,
	name: `Chalk`,
	desc: [
		`Used to temporarily write on any surface.`,
	],
	sz: 0
});

const Compass = new Equipment({
	id: `af94f8fc-afed-489c-dafd-3e342c06a2af`,
	name: `Compass`,
	desc: [
		`+3 Survival(Navigate).`,
		`Always points North.`,
	],
	sz: 0
});

const EggTimer = new Equipment({
	id: `286804f0-6e15-4522-f705-228d37aefb2e`,
	name: `Egg Timer`,
	desc: [
		`Set up to 60mins.`,
		`Loud ringing for 1min.`,
	],
	sz: 1
});

const Firestick = new Equipment({
	id: `97ab1837-f6ba-447f-e527-9390cea6b780`,
	name: `Fire-stick`,
	desc: [
		`+3 Survival(Camp).`,
		`Magnesium rod and steel.`,
	],
	sz: 0
});

const FishingPole = new Equipment({
	id: `b3d467fc-fb21-43ff-8c28-036596dee4dc`,
	name: `Fishing Pole`,
	desc: [
		`+1 Survival(Forage) at river, lake, or ocean.`,
	],
	sz: 2
});

const FlareGun = new Equipment({
	id: `5821a2de-279f-483d-876c-b3635e4d4df3`,
	name: `Flare Gun`,
	desc: [
		`Pistol.`,
		`Range:3.`,
		`Ammo: 12g Flares or 1 use 12g.`,
	],
	sz: 1
});

const GrapplingHook = new Equipment({
	id: `d12c1c96-ac98-4208-f602-0867e5e3bb23`,
	name: `Grappling Hook`,
	desc: [
		`+3 Athletics(Climb and Rappel).`,
		`Holds 100Sz.`,
	],
	sz: 2
});

const Hammock = new Equipment({
	id: `4486f872-8456-4d18-95d5-629dcbff3f40`,
	name: `Hammock`,
	desc: [
		`Suspended sleeping device for 1 person.`,
	],
	sz: 1
});

const Lighter = new Equipment({
	id: `f5393228-3433-4ba1-6aee-4e0a17b276d7`,
	name: `Lighter`,
	desc: [
		`Makes a small fire.`,
		`1yd radius light.`,
	],
	sz: 0
});

const LuxuryItem = new Equipment({
	id: `c62ac23d-b60d-4bbc-7b1e-cb7de1db5f9c`,
	name: `Luxury Item`,
	desc: [
		`Toilet paper, cigarette, etc.`,
		`+1 Psyche 1/wk.`,
	],
	sz: 0
});

const Marbles = new Equipment({
	id: `a1933da2-1353-41ff-a303-67239f26c39e`,
	name: `Marbles`,
	desc: [
		`30/bag.`,
		`2sqyd area.`,
		`A12# or fall Prone.`,
	],
	sz: 1
});

const Marker = new Equipment({
	id: `20ba8a90-aae0-480d-588c-c42e73ad07c3`,
	name: `Marker`,
	desc: [
		`Used to permanently write on any surface.`,
	],
	sz: 0
});

const Matchbook = new Equipment({
	id: `3c615dc7-8c73-4384-4ad3-07fa991cb899`,
	name: `Matchbook`,
	desc: [
		`+1 Survival(Camp).`,
		`1yd light radius, 3 rounds.`,
	],
	sz: 0
});

const Monocular = new Equipment({
	id: `9a1ed4f3-3845-43a1-e114-c19fd37e7085`,
	name: `Monocular`,
	desc: [
		`+1 Perception(See) at 25+yds.`,
	],
	sz: 1
});

const MusicalInstrument = new Equipment({
	id: `901a5d7e-8731-46d1-5597-7511b52118ab`,
	name: `Musical Instrument`,
	desc: [
		`+1 Entertain(Distract and Inspire).`,
	],
	sz: 1
});

const MylarBlanket = new Equipment({
	id: `a3ec02d2-f62b-4854-7122-af87d17303aa`,
	name: `Mylar Blanket`,
	desc: [
		`Cold Resistance.`,
		`1yd x 2yd reflective foil sheet.`,
	],
	sz: 0
});

const Notebook = new Equipment({
	id: `edcd3449-6b01-4e47-fef5-2e65359176ec`,
	name: `Notebook`,
	desc: [
		`100 pages of paper with a wire binding.`,
	],
	sz: 1
});

const Padlock = new Equipment({
	id: `3036a514-0773-4bbe-99ab-37e73ae37adb`,
	name: `Padlock`,
	desc: [
		`2 Damage Resistance.`,
		`Larceny(Disable) 9#.`,
	],
	sz: 1
});

const Paracord = new Equipment({
	id: `db7dc950-2272-4619-d84c-0794e4ab6181`,
	name: `Paracord`,
	desc: [
		`60yd coil.`,
		`Holds 50Sz.`,
	],
	sz: 1
});

const PepperSpray = new Equipment({
	id: `bc0af616-f2b7-46fe-7c40-c248950c436a`,
	name: `Pepper Spray`,
	desc: [
		`+3 Ranged(Shoot) with this weapon.`,
		`Range:1.`,
		`Successful Called Shot: Head causes 6 Pain.`,
		`Takes 1 round for Pain to start.`,
		`Pain lasts for d6x5 minutes.`,
		`3 uses.`,
		`Toxin.`,
	],
	sz: 0
});

const PocketMirror = new Equipment({
	id: `b61d42d4-cce8-4da4-6eae-930f7a7da673`,
	name: `Pocket Mirror`,
	desc: [
		`Perception(See) 6# to see from behind Cover.`,
	],
	sz: 0
});

const RatTrap = new Equipment({
	id: `7f17fc95-3e41-4720-78e7-43caff07d751`,
	name: `Rat Trap`,
	desc: [
		`+1 Survival(Forage).`,
		`Takes 1day.`,
	],
	sz: 1
});

const RoadFlare = new Equipment({
	id: `0d1618d3-a749-453a-7142-8ad0baada784`,
	name: `Road Flare`,
	desc: [
		`3 Fire Damage.`,
		`10yd light radius for 20mins.`,
	],
	sz: 1
});

const Rope = new Equipment({
	id: `48af2ad2-8313-454e-866e-21ddd60e6c42`,
	name: `Rope`,
	desc: [
		`30yd nylon coil.`,
		`Holds 100Sz.`,
		`Survival 6# to use as Handcuffs.`,
	],
	sz: 2
});

const Skateboard = new Equipment({
	id: `eda75200-b159-42b6-4029-6dba3d392127`,
	name: `Skateboard`,
	desc: [
		`Athletics 6#.`,
		`Speed x3.`,
		`Fail:Prone.`,
	],
	sz: 3
});

const SleepingBag = new Equipment({
	id: `1d32992c-02d3-4739-4a92-0714018ff743`,
	name: `Sleeping Bag`,
	desc: [
		`Insulated bag for up to 2 people.`,
		`Cold Resistance +3hrs.`,
	],
	sz: 3
});

const SpottingScope = new Equipment({
	id: `6f65efe9-f547-4ee4-2fea-1f1c5be8ad69`,
	name: `Spotting Scope`,
	desc: [
		`+6 Perception(See) at 100+yds.`,
	],
	sz: 2
});

const Tarp = new Equipment({
	id: `2d517256-6dea-42ed-1040-48247b6f4b4d`,
	name: `Tarp`,
	desc: [
		`3yd x 3yd plastic sheet.`,
		`Cold Resistance.`,
		`Waterproof.`,
	],
	sz: 1
});

const Tent = new Equipment({
	id: `68073937-9618-405f-b4c5-5b80a08bde6f`,
	name: `Tent`,
	desc: [
		`4 person.`,
		`5min setup/take-down.`,
		`Cold Resistance +3hrs.`,
	],
	sz: 6
});

const Whetstone = new Equipment({
	id: `1935e1a4-76d6-4de0-02bc-9583cf974c1a`,
	name: `Whetstone`,
	desc: [
		`Blade gets +1 Damage for 1day.`,
		`Takes 1hr/blade.`,
	],
	sz: 1
});

const Whistle = new Equipment({
	id: `18888c68-ef39-4613-9e2d-f600cc7d000b`,
	name: `Whistle`,
	desc: [
		`+1 Tame(Train).`,
		`Loud shriek 500yd radius.`,
	],
	sz: 0
});

const ZipTie = new Equipment({
	id: `3d9a0750-5858-41da-b103-99f5a31130bb`,
	name: `Zip Tie`,
	desc: [
		`Place on Arms behind target's back to make them Harmless.`,
		`Place on Legs to make target Immobilized.`,
		`Constitution or Acrobatics 12# to escape.`,
		`Use for +1 Build.`,
	],
	sz: 0
});

const MiscList = [
	AirHorn,
	Bicycle,
	Binoculars,
	CageTrap,
	Candle,
	Candy,
	Chalk,
	Compass,
	EggTimer,
	Firestick,
	FishingPole,
	FlareGun,
	GrapplingHook,
	Hammock,
	Lighter,
	LuxuryItem,
	Marbles,
	Marker,
	Matchbook,
	Monocular,
	MusicalInstrument,
	MylarBlanket,
	Notebook,
	Padlock,
	Paracord,
	PepperSpray,
	PocketMirror,
	RatTrap,
	RoadFlare,
	Rope,
	Skateboard,
	SleepingBag,
	SpottingScope,
	Tarp,
	Tent,
	Whetstone,
	Whistle,
	ZipTie,
];

class Medical extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
	}
}

const Bandage = new Medical({
	id: `d886320f-a3b9-4576-9ad9-aa882e5544e3`,
	name: `Bandage`,
	desc: [
		`+1 Medicine(First-Aid).`,
		`1 use.`,
	],
	sz: 0
});

const Crutch = new Medical({
	id: `9d4b5d7f-59fd-4a9f-a7f1-59c60f4a8dc3`,
	name: `Crutch`,
	desc: [
		`Halves Leg Damage Pain penalty to Speed.`,
	],
	sz: 3
});

const EMTBag = new Medical({
	id: `a2fa2383-c6fe-4569-961e-09fc9f537403`,
	name: `EMT Bag`,
	desc: [
		`+3 Medicine(First-Aid).`,
		`30 uses.`,
	],
	sz: 5
});

const FirstAidKit = new Medical({
	id: `a6a66459-d98c-4d2a-cd5d-a76a83b229d2`,
	name: `First-Aid Kit`,
	desc: [
		`+1 Medicine(First-Aid).`,
		`5 uses.`,
	],
	sz: 1
});

const PressureCuff = new Medical({
	id: `7a5e1d36-e88e-4c93-4d1c-537ba80119bb`,
	name: `Pressure Cuff`,
	desc: [
		`+1 Medicine.`,
	],
	sz: 1
});

const Stethoscope = new Medical({
	id: `a76f880c-da27-401f-4463-5a16f58a0799`,
	name: `Stethoscope`,
	desc: [
		`+1 Medicine.`,
		`Perception(Hear) 6# through doors.`,
	],
	sz: 1
});

const SurgeryKit = new Medical({
	id: `5c63537c-9b70-44cb-9244-911da739b03d`,
	name: `Surgery Kit`,
	desc: [
		`+3 Medicine(Surgery).`,
	],
	sz: 3
});

const Thermometer = new Medical({
	id: `5c84cf80-cb41-40da-0d0d-f0ea70566ee0`,
	name: `Thermometer`,
	desc: [
		`+1 Medicine.`,
		`Accurately reads temperature.`,
	],
	sz: 0
});

const TransfusionKit = new Medical({
	id: `4cccec0d-4732-4421-dec9-12fd84a54611`,
	name: `Transfusion Kit`,
	desc: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`,
	],
	sz: 1
});

const WaterFilter = new Medical({
	id: `d055db56-81db-4cfe-f709-85f8de83586a`,
	name: `Water Filter`,
	desc: [
		`Purifies 1 Water ration (.5gal) per minute.`,
	],
	sz: 1
});

const MedicalList = [
	Bandage,
	Crutch,
	EMTBag,
	FirstAidKit,
	PressureCuff,
	Stethoscope,
	SurgeryKit,
	Thermometer,
	TransfusionKit,
	WaterFilter,
];

class Storage extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		slots
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		});
		this.slots = slots;
	}
}

const Backpack = new Storage({
	id: `7caea7f9-2dd6-4a98-8d6c-899d66e734e7`,
	name: `Backpack`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 1,
	slots: 30
});

const Bandoleer = new Storage({
	id: `ddb41f64-a0fa-43e8-a4cc-60eb2932e82b`,
	name: `Bandoleer`,
	desc: [
		`Holds 50 bullets of any caliber.`,
	],
	sz: 0,
	slots: 1
});

const BDUJacket = new Storage({
	id: `4288e7a8-01c0-49aa-8093-0bfaad3f9011`,
	name: `BDU Jacket`,
	desc: [
		`Camo.`,
	],
	sz: 0,
	slots: 4
});

const CargoPants = new Storage({
	id: `5120d13e-d85d-4f58-a74e-e9a1d2d5c4c2`,
	name: `Cargo Pants`,
	desc: [
		`Camo.`,
	],
	sz: 1,
	slots: 6
});

const Canteen = new Storage({
	id: `a61e20a4-89c8-438e-b483-9da4de93d112`,
	name: `Canteen`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
		`Metal.`,
	],
	sz: 1,
	slots: 1
});

const ConcealedHolster = new Storage({
	id: `4796d7d9-15ad-4d4f-9e5c-f85944a9de41`,
	name: `Concealed Holster`,
	desc: [
		`Perception 12# to spot a Size 1 Gun.`,
	],
	sz: 0,
	slots: 1
});

const Cooler = new Storage({
	id: `3305d4c0-1049-48fd-a478-76f487280f71`,
	name: `Cooler`,
	desc: [
		`Hunted or Foraged Food lasts 6 days.`,
	],
	sz: 4,
	slots: 30
});

const DuffelBag = new Storage({
	id: `8b2feee5-b9c9-4a0e-9e9b-c4971de669c3`,
	name: `Duffel Bag`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 3,
	slots: 40
});

const FuelCan = new Storage({
	id: `42db67a0-e9a1-44fe-99ba-e5c62a986bec`,
	name: `Fuel Can`,
	desc: [
		`5gal Fuel.`,
		`d6 Fire Damage/gal, 1min, 1yd/gal Blast.`,
	],
	sz: 2,
	slots: 5
});

const Hoody = new Storage({
	id: `cf65b23b-706d-438b-b89d-31e4eb8e6329`,
	name: `Hoody`,
	desc: [
		`Cold Resistance.`,
	],
	sz: 0,
	slots: 2
});

const HydrationPack = new Storage({
	id: `5287fe67-386f-43e1-9e65-5be527769990`,
	name: `Hydration Pack`,
	desc: [
		`Holds 4 units (2gal) of liquid.`,
	],
	sz: 1,
	slots: 4
});

const Lockbox = new Storage({
	id: `84a145e0-51b4-423b-bb39-2ef9672a1768`,
	name: `Lockbox`,
	desc: [
		`2 Damage Resistance.`,
		`Fire Resistance.`,
		`Larceny(Disable) 9#.`,
	],
	sz: 2,
	slots: 1
});

const MessengerBag = new Storage({
	id: `6002e120-8d3c-448a-a6cf-e96a53e9cd5d`,
	name: `Messenger Bag`,
	desc: [
		`1 round to access.`,
	],
	sz: 2,
	slots: 4
});

const PlasticJug = new Storage({
	id: `84943a54-249d-4a6e-b374-c4f4b853003c`,
	name: `Plastic Jug`,
	desc: [
		`Holds 2 units (1gal) of liquid.`,
	],
	sz: 1,
	slots: 2
});

const Purse = new Storage({
	id: `7abdf601-5d37-4d04-9187-6c145f64aa72`,
	name: `Purse`,
	desc: [
		`1 round to access.`,
	],
	sz: 1,
	slots: 3
});

const Speedloader = new Storage({
	id: `11224942-3b02-412a-a8f5-294ccedd8d15`,
	name: `Speed-loader`,
	desc: [
		`Reload a revolver cylinder as 1 action.`,
	],
	sz: 0,
	slots: 0
});

const ToolBelt = new Storage({
	id: `f82fec74-827a-4ce7-988e-d3f7c4da2aec`,
	name: `Tool Belt`,
	desc: [
		`6x 1 Slots.`,
		`+1 Build.`,
		`Miscellaneous small tools.`,
	],
	sz: 2,
	slots: 6
});

const TrenchCoat = new Storage({
	id: `fbcf0beb-01c5-443d-b86f-69e0a89078e4`,
	name: `Trench Coat`,
	desc: [
		`Cold Resistance.`,
		`+1 Stealth.`,
	],
	sz: 1,
	slots: 4
});

const WaterBottle = new Storage({
	id: `ce28fa26-8497-4234-b2df-2b0560f8d76b`,
	name: `Water Bottle`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
	],
	sz: 1,
	slots: 1
});

const StorageList = [
	Backpack,
	Bandoleer,
	BDUJacket,
	CargoPants,
	Canteen,
	ConcealedHolster,
	Cooler,
	DuffelBag,
	FuelCan,
	Hoody,
	HydrationPack,
	Lockbox,
	MessengerBag,
	PlasticJug,
	Purse,
	Speedloader,
	ToolBelt,
	TrenchCoat,
	WaterBottle,
];

export { Antibiotic as $, ArrowList as A, BilingualDictionary as B, CombatHelmet as C, DocumentList as D, ElectronicList as E, FirefighterSuit as F, GhillieSuit as G, HikingBoots as H, HomeSecurity as I, HowToWinFriends as J, KevlarVest as K, List22 as L, MiscList as M, HowYogaWorks as N, LeadershipBasics as O, PlateCarrier as P, MapAtlas as Q, MapLocal as R, StorageList as S, MapTopographic as T, PersonalDefense as U, SASSurvivalGuide as V, WinterCoat as W, StandupComedy as X, YellowPages as Y, ZenMind as Z, Alcohol as _, DrugList as a, Hallucinogen as a0, Painkiller as a1, Sedative as a2, Stimulant as a3, Cellphone as a4, EmergencyRadio as a5, Flashlight as a6, GeigerCounter as a7, HandRadio as a8, Headlamp as a9, FuelCan as aA, Hoody as aB, HydrationPack as aC, Lockbox as aD, MessengerBag as aE, PlasticJug as aF, Purse as aG, Speedloader as aH, ToolBelt as aI, TrenchCoat as aJ, WaterBottle as aK, Gear as aL, Lantern as aa, Megaphone as ab, Multimeter as ac, NightvisionGoggles as ad, QuadcopterDrone as ae, RCCar as af, SolarLamp as ag, StunGun as ah, Bandage as ai, Crutch as aj, EMTBag as ak, FirstAidKit as al, PressureCuff as am, Stethoscope as an, SurgeryKit as ao, Thermometer as ap, TransfusionKit as aq, WaterFilter as ar, Backpack as as, Bandoleer as at, BDUJacket as au, CargoPants as av, Canteen as aw, ConcealedHolster as ax, Cooler as ay, DuffelBag as az, MedicalList as b, List9mm as c, List357 as d, List556 as e, List308 as f, List12g as g, AthleticHelmet as h, AthleticPads as i, Coveralls as j, Camo as k, LeatherJacket as l, MotorcycleHelmet as m, HazmatSuit as n, WorkGloves as o, Equipment as p, BodyInBalance as q, BookOfFiveRings as r, ClassicNovel as s, BriefHistoryOfTime as t, DefensiveDriving as u, DogTricks as v, EffectiveHabits as w, EngineeringConcepts as x, GraysAnatomy as y, HolyBook as z };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmFnZUxpc3QuNzEyODg5NzQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0FtbW9BdHRyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hdHRyaWJ1dGVzL3dlYXBvbi9Ccm9hZGhlYWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby9hcnJvdy9BcnJvd0Jyb2FkaGVhZC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vL2Fycm93L0Fycm93U3RhbmRhcmQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby9hcnJvdy9BbW1vQXJyb3cuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0hvbGxvd1BvaW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMjIvSG9sbG93UG9pbnQyMi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXR0cmlidXRlcy93ZWFwb24vTWF0Y2guanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby8yMi9NYXRjaDIyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMjIvU3RhbmRhcmQyMi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzIyL0FtbW8yMi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzltbS9Ib2xsb3dQb2ludDltbS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzltbS9NYXRjaDltbS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzltbS9TdGFuZGFyZDltbS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzltbS9BbW1vOW1tLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMzU3L0hvbGxvd1BvaW50MzU3LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMzU3L1N0YW5kYXJkMzU3LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMzU3L0FtbW8zNTcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby81NTYvQXJtb3JQaWVyY2luZzU1Ni5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzU1Ni9Ib2xsb3dQb2ludDU1Ni5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzU1Ni9NYXRjaDU1Ni5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzU1Ni9TdGFuZGFyZDU1Ni5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzU1Ni9BbW1vNTU2LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMzA4L0FybW9yUGllcmNpbmczMDguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby8zMDgvSG9sbG93UG9pbnQzMDguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby8zMDgvTWF0Y2gzMDguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby8zMDgvU3RhbmRhcmQzMDguanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL3dlYXBvbnMvYW1tby8zMDgvQW1tbzMwOC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzEyZy9CdWNrc2hvdDEyZy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXR0cmlidXRlcy93ZWFwb24vU2x1Zy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hbW1vLzEyZy9TbHVnMTJnLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vMTJnL0FtbW8xMmcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0FybW9yLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9BdGhsZXRpY0hlbG1ldC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXJtb3IvQXRobGV0aWNQYWRzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0FybW9yQXR0ci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXR0cmlidXRlcy9hcm1vci9DYW1vLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0ZpcmVSZXNpc3RhbmNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9Db21iYXRIZWxtZXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2F0dHJpYnV0ZXMvYXJtb3IvQ29sZFJlc2lzdGFuY2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0NvdmVyYWxscy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXR0cmlidXRlcy9hcm1vci9NYXNrLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9GaXJlZmlnaHRlclN1aXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0ZsYWtKYWNrZXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0doaWxsaWVTdWl0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0ltcGVybWVhYmxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9IYXptYXRTdWl0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9IaWtpbmdCb290cy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXJtb3IvS2V2bGFyVmVzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXJtb3IvTGVhdGhlckphY2tldC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXJtb3IvTW90b3JjeWNsZUhlbG1ldC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvYXJtb3IvUGxhdGVDYXJyaWVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9XaW50ZXJDb2F0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9hcm1vci9Xb3JrR2xvdmVzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9HZWFyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL0RvY3VtZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL0JpbGluZ3VhbERpY3Rpb25hcnkuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvQm9keUluQmFsYW5jZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9Cb29rT2ZGaXZlUmluZ3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvQ2xhc3NpY05vdmVsLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL0JyaWVmSGlzdG9yeU9mVGltZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9EZWZlbnNpdmVEcml2aW5nLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL0RvZ1RyaWNrcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9FZmZlY3RpdmVIYWJpdHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvRW5naW5lZXJpbmdDb25jZXB0cy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9HcmF5c0FuYXRvbXkuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvSG9seUJvb2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvSG9tZVNlY3VyaXR5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL0hvd1RvV2luRnJpZW5kcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9Ib3dZb2dhV29ya3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvTGVhZGVyc2hpcEJhc2ljcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9NYXBBdGxhcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9NYXBMb2NhbC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9NYXBUb3BvZ3JhcGhpYy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9QZXJzb25hbERlZmVuc2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvU0FTU3Vydml2YWxHdWlkZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RvY3VtZW50cy9TdGFuZHVwQ29tZWR5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL1llbGxvd1BhZ2VzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZG9jdW1lbnRzL1plbk1pbmQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kb2N1bWVudHMvRG9jdW1lbnRMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZHJ1Z3MvRHJ1Zy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RydWdzL0FsY29ob2wuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9kcnVncy9BbnRpYmlvdGljLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZHJ1Z3MvSGFsbHVjaW5vZ2VuLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZHJ1Z3MvUGFpbmtpbGxlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2RydWdzL1NlZGF0aXZlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZHJ1Z3MvU3RpbXVsYW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZHJ1Z3MvRHJ1Z3NMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvRWxlY3Ryb25pYy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2VsZWN0cm9uaWNzL0NlbGxwaG9uZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2VsZWN0cm9uaWNzL0VtZXJnZW5jeVJhZGlvLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvRmxhc2hsaWdodC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2VsZWN0cm9uaWNzL0dlaWdlckNvdW50ZXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9IYW5kUmFkaW8uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9IZWFkbGFtcC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L2VsZWN0cm9uaWNzL0xhbnRlcm4uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9NZWdhcGhvbmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9NdWx0aW1ldGVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvTmlnaHR2aXNpb25Hb2dnbGVzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvUXVhZGNvcHRlckRyb25lLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvUkNDYXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9Tb2xhckxhbXAuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9lbGVjdHJvbmljcy9TdHVuR3VuLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvRWxlY3Ryb25pY3NMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9BaXJIb3JuLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9CaWN5Y2xlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9CaW5vY3VsYXJzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9DYWdlVHJhcC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvQ2FuZGxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9DYW5keS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvQ2hhbGsuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL0NvbXBhc3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL0VnZ1RpbWVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9GaXJlc3RpY2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL0Zpc2hpbmdQb2xlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9GbGFyZUd1bi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvR3JhcHBsaW5nSG9vay5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvSGFtbW9jay5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTGlnaHRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTHV4dXJ5SXRlbS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTWFyYmxlcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTWFya2VyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9NYXRjaGJvb2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL01vbm9jdWxhci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTXVzaWNhbEluc3RydW1lbnQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL015bGFyQmxhbmtldC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTm90ZWJvb2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1BhZGxvY2suanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1BhcmFjb3JkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9QZXBwZXJTcHJheS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvUG9ja2V0TWlycm9yLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9SYXRUcmFwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9Sb2FkRmxhcmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1JvcGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1NrYXRlYm9hcmQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1NsZWVwaW5nQmFnLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9TcG90dGluZ1Njb3BlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9UYXJwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9UZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWlzYy9XaGV0c3RvbmUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1doaXN0bGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9taXNjL1ppcFRpZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21pc2MvTWlzY0xpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9tZWRpY2FsL01lZGljYWwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9tZWRpY2FsL0JhbmRhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9tZWRpY2FsL0NydXRjaC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21lZGljYWwvRU1UQmFnLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWVkaWNhbC9GaXJzdEFpZEtpdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21lZGljYWwvUHJlc3N1cmVDdWZmLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWVkaWNhbC9TdGV0aG9zY29wZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21lZGljYWwvU3VyZ2VyeUtpdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21lZGljYWwvVGhlcm1vbWV0ZXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9tZWRpY2FsL1RyYW5zZnVzaW9uS2l0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvbWVkaWNhbC9XYXRlckZpbHRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L21lZGljYWwvTWVkaWNhbExpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL1N0b3JhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL0JhY2twYWNrLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9CYW5kb2xlZXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL0JEVUphY2tldC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3N0b3JhZ2UvQ2FyZ29QYW50cy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3N0b3JhZ2UvQ2FudGVlbi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3N0b3JhZ2UvQ29uY2VhbGVkSG9sc3Rlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3N0b3JhZ2UvQ29vbGVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9EdWZmZWxCYWcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL0Z1ZWxDYW4uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL0hvb2R5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9IeWRyYXRpb25QYWNrLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9Mb2NrYm94LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9NZXNzZW5nZXJCYWcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL1BsYXN0aWNKdWcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL1B1cnNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9TcGVlZGxvYWRlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvZXF1aXBtZW50L3N0b3JhZ2UvVG9vbEJlbHQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL1RyZW5jaENvYXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2VxdWlwbWVudC9zdG9yYWdlL1dhdGVyQm90dGxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci9lcXVpcG1lbnQvc3RvcmFnZS9TdG9yYWdlTGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tYmF0R2VhciBmcm9tICdnZWFyL0NvbWJhdEdlYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFtbW8gZXh0ZW5kcyBDb21iYXRHZWFyIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0ZGVzYyxcblx0XHRzeixcblx0XHRxdHksXG5cdFx0YXR0cixcblx0XHRjYWw9YGBcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2MsXG5cdFx0XHRzeixcblx0XHRcdHF0eSxcblx0XHRcdGF0dHJcblx0XHR9KVxuXHRcdHRoaXMuY2FsID0gY2FsXG5cdH1cbn0iLCJpbXBvcnQgQXR0cmlidXRlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9BdHRyaWJ1dGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFtbW9BdHRyIGV4dGVuZHMgQXR0cmlidXRlIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0ZGVzYyxcblx0XHRjYWxcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2Ncblx0XHR9KVxuXHRcdHRoaXMuY2FsID0gY2FsXG5cdH1cbn0iLCJpbXBvcnQgQW1tb0F0dHIgZnJvbSAnLi9BbW1vQXR0cidcblxuXG5jb25zdCBCcm9hZGhlYWQgPSBuZXcgQW1tb0F0dHIoe1xuXHRpZDogYGY1MDViYWI1LTg1ODQtNDYxZC0wNjdhLWFjMGY0NWNjNGViM2AsXG5cdG5hbWU6IGBCcm9hZGhlYWRgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIERhbWFnZS5gLFxuXHRdLFxuXHRjYWw6IFtcblx0XHRgQXJyb3dgLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCcm9hZGhlYWQiLCJpbXBvcnQgQW1tbyBmcm9tICdnZWFyL3dlYXBvbnMvYW1tby9BbW1vLmpzJ1xuaW1wb3J0IEJyb2FkaGVhZCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0Jyb2FkaGVhZC5qcydcbmltcG9ydCBQaWVyY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL3dlYXBvbi9QaWVyY2UuanMnXG5cblxuY29uc3QgQXJyb3dCcm9hZGhlYWQgPSBuZXcgQW1tbyh7XG5cdGlkOiBgYjE1N2JlY2QtMjE0NC00ZTU1LTllM2ItYmU4ODA4OWVjNmZlYCxcblx0bmFtZTogYEJyb2FkaGVhZCBBcnJvd2AsXG5cdGRlc2M6IFtcblx0XHRgSHVudGluZyBhcnJvdy5gLFxuXHRdLFxuXHRzejogMC4xLFxuXHRjYWw6IGBBcnJvd2AsXG5cdGF0dHI6IFtcblx0XHRCcm9hZGhlYWQsXG5cdFx0UGllcmNlLFxuXHRdLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXJyb3dCcm9hZGhlYWQiLCJpbXBvcnQgQW1tbyBmcm9tICdnZWFyL3dlYXBvbnMvYW1tby9BbW1vLmpzJ1xuXG5cbmNvbnN0IEFycm93U3RhbmRhcmQgPSBuZXcgQW1tbyh7XG5cdGlkOiBgZjA1NTk1ZTMtMGUyYy00MmZiLTgyYjAtMmU0NmRkMmZkNDNmYCxcblx0bmFtZTogYFRhcmdldCBBcnJvd2AsXG5cdGRlc2M6IFtcblx0XHRgUHJhY3RpY2UgYXJyb3cuYCxcblx0XSxcblx0c3o6IDAuMSxcblx0Y2FsOiBgQXJyb3dgLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXJyb3dTdGFuZGFyZCIsImltcG9ydCBBcnJvd0Jyb2FkaGVhZCBmcm9tICcuL0Fycm93QnJvYWRoZWFkJ1xuaW1wb3J0IEFycm93U3RhbmRhcmQgZnJvbSAnLi9BcnJvd1N0YW5kYXJkJ1xuXG5cbmNvbnN0IEFycm93TGlzdCA9IFtcblx0QXJyb3dCcm9hZGhlYWQsXG5cdEFycm93U3RhbmRhcmQsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEFycm93TGlzdCIsImltcG9ydCBBbW1vQXR0ciBmcm9tICcuL0FtbW9BdHRyJ1xuXG5cbmNvbnN0IEhvbGxvd1BvaW50ID0gbmV3IEFtbW9BdHRyKHtcblx0aWQ6IGA5OTMwMDVhZi05ZDFhLTQ0MGEtNmIyMi01MDFiYTFlYWZiMjhgLFxuXHRuYW1lOiBgSG9sbG93IFBvaW50YCxcblx0ZGVzYzogW1xuXHRcdGArMSBEYW1hZ2UuYCxcblx0XSxcblx0Y2FsOiBbXG5cdFx0YC4yMmAsXG5cdFx0YDltbWAsXG5cdFx0YC4zNTdgLFxuXHRcdGA1LjU2YCxcblx0XHRgLjMwOGAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbGxvd1BvaW50IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBIb2xsb3dQb2ludCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0hvbGxvd1BvaW50LmpzJ1xuXG5cbmNvbnN0IEhvbGxvd1BvaW50MjIgPSBuZXcgQW1tbyh7XG5cdGlkOiBgYWYxZDQ0NDgtYjc5NS00MzQwLWIxZDYtMmVlYjYwMWVlZWE3YCxcblx0bmFtZTogYC4yMiBIb2xsb3cgUG9pbnRgLFxuXHRkZXNjOiBbXG5cdFx0YFNlbGYtZGVmZW5zZSBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAuMDA1LFxuXHRjYWw6IGAuMjJgLFxuXHRhdHRyOiBbXG5cdFx0SG9sbG93UG9pbnQsXG5cdF0sXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIb2xsb3dQb2ludDIyIiwiaW1wb3J0IEFtbW9BdHRyIGZyb20gJy4vQW1tb0F0dHInXG5cblxuY29uc3QgTWF0Y2ggPSBuZXcgQW1tb0F0dHIoe1xuXHRpZDogYGI0NWRjZDMxLTNkYTQtNDVhOS0xYmJmLWY5MTMyMzczYmNmOGAsXG5cdG5hbWU6IGBNYXRjaGAsXG5cdGRlc2M6IFtcblx0XHRgKzEgUmFuZ2VkIEF0dGFjay5gLFxuXHRdLFxuXHRjYWw6IFtcblx0XHRgLjIyYCxcblx0XHRgOW1tYCxcblx0XHRgLjM1N2AsXG5cdFx0YDUuNTZgLFxuXHRcdGAuMzA4YCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2giLCJpbXBvcnQgQW1tbyBmcm9tICdnZWFyL3dlYXBvbnMvYW1tby9BbW1vLmpzJ1xuaW1wb3J0IE1hdGNoIGZyb20gJ2dlYXIvYXR0cmlidXRlcy93ZWFwb24vTWF0Y2guanMnXG5cblxuY29uc3QgTWF0Y2gyMiA9IG5ldyBBbW1vKHtcblx0aWQ6IGBhYmNmZjY1Ny1lNTA1LTQ5ODEtYWQwNy04YTRkNWZmMGZjZWVgLFxuXHRuYW1lOiBgLjIyIE1hdGNoYCxcblx0ZGVzYzogW1xuXHRcdGBDb21wZXRpdGlvbi1ncmFkZSBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAwNSxcblx0Y2FsOiBgLjIyYCxcblx0YXR0cjogW1xuXHRcdE1hdGNoLFxuXHRdLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2gyMiIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5cblxuY29uc3QgU3RhbmRhcmQyMiA9IG5ldyBBbW1vKHtcblx0aWQ6IGA0YzA5MDAwYi0yM2ZkLTQwODUtYTQ5Zi1kMTZmMTQzNjdlYTBgLFxuXHRuYW1lOiBgLjIyIFN0YW5kYXJkYCxcblx0ZGVzYzogW1xuXHRcdGBCYXNpYyBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAwNSxcblx0Y2FsOiBgLjIyYCxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YW5kYXJkMjIiLCJpbXBvcnQgSG9sbG93UG9pbnQyMiBmcm9tICcuL0hvbGxvd1BvaW50MjInXG5pbXBvcnQgTWF0Y2gyMiBmcm9tICcuL01hdGNoMjInXG5pbXBvcnQgU3RhbmRhcmQyMiBmcm9tICcuL1N0YW5kYXJkMjInXG5cblxuY29uc3QgTGlzdDIyID0gW1xuXHRIb2xsb3dQb2ludDIyLFxuXHRNYXRjaDIyLFxuXHRTdGFuZGFyZDIyLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0MjIiLCJpbXBvcnQgQW1tbyBmcm9tICdnZWFyL3dlYXBvbnMvYW1tby9BbW1vLmpzJ1xuaW1wb3J0IEhvbGxvd1BvaW50IGZyb20gJ2dlYXIvYXR0cmlidXRlcy93ZWFwb24vSG9sbG93UG9pbnQuanMnXG5cblxuY29uc3QgSG9sbG93UG9pbnQ5bW0gPSBuZXcgQW1tbyh7XG5cdGlkOiBgMmFlOTM1ODktM2JkNy00YWJmLWE2YTEtMTUzYmQxYjRlN2VkYCxcblx0bmFtZTogYDltbSBIb2xsb3cgUG9pbnRgLFxuXHRkZXNjOiBbXG5cdFx0YFNlbGYtZGVmZW5zZSBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAxLFxuXHRjYWw6IGA5bW1gLFxuXHRhdHRyOiBbXG5cdFx0SG9sbG93UG9pbnQsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbGxvd1BvaW50OW1tIiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBNYXRjaCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL01hdGNoLmpzJ1xuXG5cbmNvbnN0IE1hdGNoOW1tID0gbmV3IEFtbW8oe1xuXHRpZDogYGRjZmE5ZjI2LTZjMDItNDY0Ni1iMzY5LWZmOGJhMjYyNDZkYWAsXG5cdG5hbWU6IGA5bW0gTWF0Y2hgLFxuXHRkZXNjOiBbXG5cdFx0YENvbXBldGl0aW9uLWdyYWRlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDEsXG5cdGNhbDogYDltbWAsXG5cdGF0dHI6IFtcblx0XHRNYXRjaCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2g5bW0iLCJpbXBvcnQgQW1tbyBmcm9tICdnZWFyL3dlYXBvbnMvYW1tby9BbW1vLmpzJ1xuXG5cbmNvbnN0IFN0YW5kYXJkOW1tID0gbmV3IEFtbW8oe1xuXHRpZDogYDU1MjAwOWM0LWQ2YTktNDI4Ny1hYzRmLTU5ODAxNGFkYmJiYWAsXG5cdG5hbWU6IGA5bW0gU3RhbmRhcmRgLFxuXHRkZXNjOiBbXG5cdFx0YEJhc2ljIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDEsXG5cdGNhbDogYDltbWAsXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdGFuZGFyZDltbSIsImltcG9ydCBIb2xsb3dQb2ludDltbSBmcm9tICcuL0hvbGxvd1BvaW50OW1tJ1xuaW1wb3J0IE1hdGNoOW1tIGZyb20gJy4vTWF0Y2g5bW0nXG5pbXBvcnQgU3RhbmRhcmQ5bW0gZnJvbSAnLi9TdGFuZGFyZDltbSdcblxuXG5jb25zdCBMaXN0OW1tID0gW1xuXHRIb2xsb3dQb2ludDltbSxcblx0TWF0Y2g5bW0sXG5cdFN0YW5kYXJkOW1tLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0OW1tIiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBIb2xsb3dQb2ludCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0hvbGxvd1BvaW50LmpzJ1xuXG5cbmNvbnN0IEhvbGxvd1BvaW50MzU3ID0gbmV3IEFtbW8oe1xuXHRpZDogYDc5OGM2NzgzLWY0NGItNDQ3Zi05ZjliLTgzMzJiZDRhYjc0ZWAsXG5cdG5hbWU6IGAuMzU3IEhvbGxvdyBQb2ludGAsXG5cdGRlc2M6IFtcblx0XHRgU2VsZi1kZWZlbnNlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDEsXG5cdGNhbDogYC4zNTdgLFxuXHRhdHRyOiBbXG5cdFx0SG9sbG93UG9pbnQsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbGxvd1BvaW50MzU3IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcblxuXG5jb25zdCBTdGFuZGFyZDM1NyA9IG5ldyBBbW1vKHtcblx0aWQ6IGA0MjY2YzE5YS0yOTc4LTRkMTItODhiOS1kMDVlZjU5Yzk2MjBgLFxuXHRuYW1lOiBgLjM1NyBTdGFuZGFyZGAsXG5cdGRlc2M6IFtcblx0XHRgQmFzaWMgYW1tdW5pdGlvbi5gLFxuXHRdLFxuXHRzejogMC4wMSxcblx0Y2FsOiBgLjM1N2AsXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdGFuZGFyZDM1NyIsImltcG9ydCBIb2xsb3dQb2ludDM1NyBmcm9tICcuL0hvbGxvd1BvaW50MzU3J1xuaW1wb3J0IFN0YW5kYXJkMzU3IGZyb20gJy4vU3RhbmRhcmQzNTcnXG5cblxuY29uc3QgTGlzdDM1NyA9IFtcblx0SG9sbG93UG9pbnQzNTcsXG5cdFN0YW5kYXJkMzU3LFxuXVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0MzU3IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBQaWVyY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL3dlYXBvbi9QaWVyY2UuanMnXG5cblxuY29uc3QgQXJtb3JQaWVyY2luZzU1NiA9IG5ldyBBbW1vKHtcblx0aWQ6IGBjOTExYjgyMS0xMzdiLTRlMDgtODY4NS04NGQ4MmM4NTRiNjlgLFxuXHRuYW1lOiBgNS41Nm1tIEFybW9yIFBpZXJjaW5nYCxcblx0ZGVzYzogW1xuXHRcdGBCYXR0bGVmaWVsZCBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAyLFxuXHRjYWw6IGA1LjU2YCxcblx0YXR0cjogW1xuXHRcdFBpZXJjZSxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXJtb3JQaWVyY2luZzU1NiIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5pbXBvcnQgSG9sbG93UG9pbnQgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL3dlYXBvbi9Ib2xsb3dQb2ludC5qcydcblxuXG5jb25zdCBIb2xsb3dQb2ludDU1NiA9IG5ldyBBbW1vKHtcblx0aWQ6IGBmNmYwYjIyZi1kZjhjLTQ2MDQtYWUxZS0xZjM4MWVhNjBlNGFgLFxuXHRuYW1lOiBgNS41Nm1tIEhvbGxvdyBQb2ludGAsXG5cdGRlc2M6IFtcblx0XHRgU2VsZi1kZWZlbnNlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDIsXG5cdGNhbDogYDUuNTZgLFxuXHRhdHRyOiBbXG5cdFx0SG9sbG93UG9pbnQsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbGxvd1BvaW50NTU2IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBNYXRjaCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL01hdGNoLmpzJ1xuXG5cbmNvbnN0IE1hdGNoNTU2ID0gbmV3IEFtbW8oe1xuXHRpZDogYDViZDJiNDJmLTc4YmItNGI3YS1hNGMxLTg2YmEwMWNhZGRkMGAsXG5cdG5hbWU6IGA1LjU2bW0gTWF0Y2hgLFxuXHRkZXNjOiBbXG5cdFx0YENvbXBldGl0aW9uLWdyYWRlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDIsXG5cdGNhbDogYDUuNTZgLFxuXHRhdHRyOiBbXG5cdFx0TWF0Y2gsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoNTU2IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcblxuXG5jb25zdCBTdGFuZGFyZDU1NiA9IG5ldyBBbW1vKHtcblx0aWQ6IGAyZTNlZjM5Zi1iNmY4LTRkNzktYjJmNi1hNzMxODZmMGZhNmNgLFxuXHRuYW1lOiBgNS41Nm1tIFN0YW5kYXJkYCxcblx0ZGVzYzogW1xuXHRcdGBCYXNpYyBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAyLFxuXHRjYWw6IGA1LjU2YCxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YW5kYXJkNTU2IiwiXG5pbXBvcnQgQXJtb3JQaWVyY2luZzU1NiBmcm9tICcuL0FybW9yUGllcmNpbmc1NTYnXG5pbXBvcnQgSG9sbG93UG9pbnQ1NTYgZnJvbSAnLi9Ib2xsb3dQb2ludDU1NidcbmltcG9ydCBNYXRjaDU1NiBmcm9tICcuL01hdGNoNTU2J1xuaW1wb3J0IFN0YW5kYXJkNTU2IGZyb20gJy4vU3RhbmRhcmQ1NTYnXG5cblxuY29uc3QgTGlzdDU1NiA9IFtcblx0QXJtb3JQaWVyY2luZzU1Nixcblx0SG9sbG93UG9pbnQ1NTYsXG5cdE1hdGNoNTU2LFxuXHRTdGFuZGFyZDU1Nixcbl1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdDU1NiIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5pbXBvcnQgUGllcmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy93ZWFwb24vUGllcmNlLmpzJ1xuXG5cbmNvbnN0IEFybW9yUGllcmNpbmczMDggPSBuZXcgQW1tbyh7XG5cdGlkOiBgMDhmMTg2NGItNjZjZi00ZDYxLWJlNTQtNDEzOWI0MjQyYzAyYCxcblx0bmFtZTogYC4zMDggQXJtb3IgUGllcmNpbmdgLFxuXHRkZXNjOiBbXG5cdFx0YEJhdHRsZWZpZWxkIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDIsXG5cdGNhbDogYC4zMDhgLFxuXHRhdHRyOiBbXG5cdFx0UGllcmNlLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBcm1vclBpZXJjaW5nMzA4IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBIb2xsb3dQb2ludCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL0hvbGxvd1BvaW50LmpzJ1xuXG5cbmNvbnN0IEhvbGxvd1BvaW50MzA4ID0gbmV3IEFtbW8oe1xuXHRpZDogYGQ5ZWY2ZTcxLTVmNGMtNDM3Mi1hMWZiLTcwYWQ0ODYzNzI3NmAsXG5cdG5hbWU6IGAuMzA4IEhvbGxvdyBQb2ludGAsXG5cdGRlc2M6IFtcblx0XHRgU2VsZi1kZWZlbnNlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDIsXG5cdGNhbDogYC4zMDhgLFxuXHRhdHRyOiBbXG5cdFx0SG9sbG93UG9pbnQsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbGxvd1BvaW50MzA4IiwiaW1wb3J0IEFtbW8gZnJvbSAnZ2Vhci93ZWFwb25zL2FtbW8vQW1tby5qcydcbmltcG9ydCBNYXRjaCBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL01hdGNoLmpzJ1xuXG5cbmNvbnN0IE1hdGNoMzA4ID0gbmV3IEFtbW8oe1xuXHRpZDogYGZkOTg4N2ZjLWZmYTMtNGQ3ZC05OTg0LWY5ZDE4ZWVhYTBiZmAsXG5cdG5hbWU6IGAuMzA4IE1hdGNoYCxcblx0ZGVzYzogW1xuXHRcdGBDb21wZXRpdGlvbi1ncmFkZSBhbW11bml0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLjAyLFxuXHRjYWw6IGAuMzA4YCxcblx0YXR0cjogW1xuXHRcdE1hdGNoLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaDMwOCIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5cblxuY29uc3QgU3RhbmRhcmQzMDggPSBuZXcgQW1tbyh7XG5cdGlkOiBgZWU5ZTVjMjgtOThiZC00ZGNkLWI1MzEtYTBkYzIwODZmNTUxYCxcblx0bmFtZTogYC4zMDggU3RhbmRhcmRgLFxuXHRkZXNjOiBbXG5cdFx0YEJhc2ljIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDIsXG5cdGNhbDogYC4zMDhgLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3RhbmRhcmQzMDgiLCJpbXBvcnQgQXJtb3JQaWVyY2luZzMwOCBmcm9tICcuL0FybW9yUGllcmNpbmczMDgnXG5pbXBvcnQgSG9sbG93UG9pbnQzMDggZnJvbSAnLi9Ib2xsb3dQb2ludDMwOCdcbmltcG9ydCBNYXRjaDMwOCBmcm9tICcuL01hdGNoMzA4J1xuaW1wb3J0IFN0YW5kYXJkMzA4IGZyb20gJy4vU3RhbmRhcmQzMDgnXG5cblxuY29uc3QgTGlzdDMwOCA9IFtcblx0QXJtb3JQaWVyY2luZzMwOCxcblx0SG9sbG93UG9pbnQzMDgsXG5cdE1hdGNoMzA4LFxuXHRTdGFuZGFyZDMwOCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdDMwOCIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5pbXBvcnQgU2NhdHRlciBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL1NjYXR0ZXIuanMnXG5cblxuY29uc3QgQnVja3Nob3QxMmcgPSBuZXcgQW1tbyh7XG5cdGlkOiBgZmFjZDQ2NzktMzhiYy00YTRkLTlkYTktOGRkYTVkNTY5MDk0YCxcblx0bmFtZTogYDEyZyBCdWNrc2hvdGAsXG5cdGRlc2M6IFtcblx0XHRgU2NhdHRlci1zaG90IGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDUsXG5cdGNhbDogYDEyZ2AsXG5cdGF0dHI6IFtcblx0XHRTY2F0dGVyLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCdWNrc2hvdDEyZyIsImltcG9ydCBBbW1vQXR0ciBmcm9tICcuL0FtbW9BdHRyJ1xuXG5cbmNvbnN0IFNsdWcgPSBuZXcgQW1tb0F0dHIoe1xuXHRpZDogYDA1NjM4NzBhLTkzMDItNDgyNS01NzljLWMyOGNmYjQ3OGM5MGAsXG5cdG5hbWU6IGBTbHVnYCxcblx0ZGVzYzogW1xuXHRcdGBSYW5nZSB4Mi5gLFxuXHRdLFxuXHRjYWw6IFtcblx0XHRgMTJnYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU2x1ZyIsImltcG9ydCBBbW1vIGZyb20gJ2dlYXIvd2VhcG9ucy9hbW1vL0FtbW8uanMnXG5pbXBvcnQgU2x1ZyBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvd2VhcG9uL1NsdWcuanMnXG5cblxuY29uc3QgU2x1ZzEyZyA9IG5ldyBBbW1vKHtcblx0aWQ6IGAzZDQyYzQzZC00NTA3LTRjMzUtOWJjZi04OGZlZTNjZGI5NDNgLFxuXHRuYW1lOiBgMTJnIFNsdWdgLFxuXHRkZXNjOiBbXG5cdFx0YFNpbmdsZS1wcm9qZWN0aWxlIGFtbXVuaXRpb24uYCxcblx0XSxcblx0c3o6IDAuMDUsXG5cdGNhbDogYDEyZ2AsXG5cdGF0dHI6IFtcblx0XHRTbHVnLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTbHVnMTJnIiwiaW1wb3J0IEJ1Y2tzaG90MTJnIGZyb20gJy4vQnVja3Nob3QxMmcnXG5pbXBvcnQgU2x1ZzEyZyBmcm9tICcuL1NsdWcxMmcnXG5cblxuY29uc3QgTGlzdDEyZyA9IFtcblx0QnVja3Nob3QxMmcsXG5cdFNsdWcxMmcsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IExpc3QxMmciLCJpbXBvcnQgQ29tYmF0R2VhciBmcm9tICdnZWFyL0NvbWJhdEdlYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFybW9yIGV4dGVuZHMgQ29tYmF0R2VhciB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRuYW1lLFxuXHRcdGRlc2MsXG5cdFx0c3osXG5cdFx0cXR5LFxuXHRcdGF0dHIsXG5cdFx0ZHIsXG5cdFx0bG9jXG5cdH0pIHtcblx0XHRzdXBlcih7XG5cdFx0XHRuYW1lLFxuXHRcdFx0ZGVzYyxcblx0XHRcdHN6LFxuXHRcdFx0cXR5LFxuXHRcdFx0YXR0clxuXHRcdH0pXG5cdFx0dGhpcy5kciA9IGRyXG5cdFx0dGhpcy5sb2MgPSBsb2Ncblx0fVxufSIsImltcG9ydCBBcm1vciBmcm9tICdnZWFyL2FybW9yL0FybW9yLmpzJ1xuXG5cbmNvbnN0IEF0aGxldGljSGVsbWV0ID0gbmV3IEFybW9yKHtcblx0aWQ6IGBkNjg2MWIwOC1iOTJhLTQ2OGQtYTkyOS00MTBjMTMwYjJhMmRgLFxuXHRuYW1lOiBgQXRobGV0aWMgSGVsbWV0YCxcblx0c3o6IDIsXG5cdGRyOiAxLFxuXHRsb2M6IGBIZWFkYFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXRobGV0aWNIZWxtZXQiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcblxuXG5jb25zdCBBdGhsZXRpY1BhZHMgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDc5OWI5YWZhLWQ1NGItNGM5ZS05Y2Y4LWY0OThiZTE4YjFjMGAsXG5cdG5hbWU6IGBBdGhsZXRpYyBQYWRzYCxcblx0c3o6IDIsXG5cdGRyOiAxLFxuXHRsb2M6IGBUb3Jzb2Bcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEF0aGxldGljUGFkcyIsImltcG9ydCBBdHRyaWJ1dGUgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL0F0dHJpYnV0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJtb3JBdHRyIGV4dGVuZHMgQXR0cmlidXRlIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0ZGVzY1xuXHR9KSB7XG5cdFx0c3VwZXIoe1xuXHRcdFx0aWQsXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZGVzY1xuXHRcdH0pXG5cdH1cbn0iLCJpbXBvcnQgQXJtb3JBdHRyIGZyb20gJy4vQXJtb3JBdHRyJ1xuXG5cbmNvbnN0IENhbW8gPSBuZXcgQXJtb3JBdHRyKHtcblx0aWQ6IGBlNDkyZTA0My1mY2MwLTQ5ZWQtMjYyZi0wMWI0YzYwMjA4YWRgLFxuXHRuYW1lOiBgQ2Ftb2AsXG5cdGRlc2M6IFtcblx0XHRgKzEgU3RlYWx0aCBwZXIgQm9keSBQYXJ0IHdoZW4gaW4gYSBnaXZlbiBCaW9tZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDYW1vIiwiaW1wb3J0IEFybW9yQXR0ciBmcm9tICcuL0FybW9yQXR0cidcblxuXG5jb25zdCBGaXJlUmVzaXN0YW5jZSA9IG5ldyBBcm1vckF0dHIoe1xuXHRpZDogYGE5Yzk5NTRhLTI4MDMtNDVkMC00YTY1LTI1N2E1MjFkYjQ4MWAsXG5cdG5hbWU6IGBGaXJlIFJlc2lzdGFuY2VgLFxuXHRkZXNjOiBbXG5cdFx0YEFybW9yIERhbWFnZSBSZXNpc3RhbmNlIHJlZHVjZXMgRmlyZSBEYW1hZ2UuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRmlyZVJlc2lzdGFuY2UiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBDYW1vIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9DYW1vLmpzJ1xuaW1wb3J0IEZpcmVSZXNpc3RhbmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9GaXJlUmVzaXN0YW5jZS5qcydcblxuXG5jb25zdCBDb21iYXRIZWxtZXQgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDZiMjZjMjQxLTVmZWYtNDYzZi1iZmM2LWNhZGFiMjI4MTcxMWAsXG5cdG5hbWU6IGBDb21iYXQgSGVsbWV0YCxcblx0c3o6IDIsXG5cdGRyOiAzLFxuXHRsb2M6IGBIZWFkYCxcblx0YXR0cjogW1xuXHRcdENhbW8sXG5cdFx0RmlyZVJlc2lzdGFuY2UsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvbWJhdEhlbG1ldCIsImltcG9ydCBBcm1vckF0dHIgZnJvbSAnLi9Bcm1vckF0dHInXG5cblxuY29uc3QgQ29sZFJlc2lzdGFuY2UgPSBuZXcgQXJtb3JBdHRyKHtcblx0aWQ6IGBmMmZhM2YwNy1iN2FjLTRjN2ItZmIyMi0yYmFmNmYzOWY4Y2JgLFxuXHRuYW1lOiBgQ29sZCBSZXNpc3RhbmNlYCxcblx0ZGVzYzogW1xuXHRcdGBEZWxheSBIeXBvdGhlcm1pYSBmb3IgMWhyIHBlciBCb2R5IFBhcnQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ29sZFJlc2lzdGFuY2UiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBDYW1vIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9DYW1vLmpzJ1xuaW1wb3J0IENvbGRSZXNpc3RhbmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9Db2xkUmVzaXN0YW5jZS5qcydcblxuXG5jb25zdCBDb3ZlcmFsbHMgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDcxZWRlM2FkLWM4YTctNDU1Ni04NmYxLWM0MDM3MjQ0NzU3ZWAsXG5cdG5hbWU6IGBDb3ZlcmFsbHNgLFxuXHRzejogMyxcblx0ZHI6IDEsXG5cdGxvYzogYEFybXMsIFRvcnNvLCBMZWdzYCxcblx0YXR0cjogW1xuXHRcdENhbW8sXG5cdFx0Q29sZFJlc2lzdGFuY2UsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvdmVyYWxscyIsImltcG9ydCBBcm1vckF0dHIgZnJvbSAnLi9Bcm1vckF0dHInXG5cblxuY29uc3QgTWFzayA9IG5ldyBBcm1vckF0dHIoe1xuXHRpZDogYDViZDRhZTg1LWVlYWYtNDAzMS04YThjLWUwZTcxMmY2YTIzNmAsXG5cdG5hbWU6IGBNYXNrYCxcblx0ZGVzYzogW1xuXHRcdGBPYnNjdXJlcyBpZGVudGl0eSBhbmQgcHJvdGVjdHMgZmFjZS4gLTEgUGVyY2VwdGlvbi5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNYXNrIiwiaW1wb3J0IEFybW9yIGZyb20gJ2dlYXIvYXJtb3IvQXJtb3IuanMnXG5pbXBvcnQgQ29sZFJlc2lzdGFuY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0NvbGRSZXNpc3RhbmNlLmpzJ1xuaW1wb3J0IEZpcmVSZXNpc3RhbmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9GaXJlUmVzaXN0YW5jZS5qcydcbmltcG9ydCBNYXNrIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9NYXNrLmpzJ1xuXG5cbmNvbnN0IEZpcmVmaWdodGVyU3VpdCA9IG5ldyBBcm1vcih7XG5cdGlkOiBgZWVmYzVjMDItMzEzOS00MmNkLWI1ZjktZmUwNTVhOTE1MDk4YCxcblx0bmFtZTogYEZpcmVmaWdodGVyIFN1aXRgLFxuXHRzejogNSxcblx0ZHI6IDIsXG5cdGxvYzogYEZ1bGwgQm9keWAsXG5cdGF0dHI6IFtcblx0XHRDb2xkUmVzaXN0YW5jZSxcblx0XHRGaXJlUmVzaXN0YW5jZSxcblx0XHRNYXNrLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGaXJlZmlnaHRlclN1aXQiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBDYW1vIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9DYW1vLmpzJ1xuXG5cbmNvbnN0IEZsYWtKYWNrZXQgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDMxZTNmMzY2LTFhZGYtNDE0MS05MTJkLTA2NjRjNTY0NDQzMGAsXG5cdG5hbWU6IGBGbGFrIEphY2tldGAsXG5cdHN6OiA0LFxuXHRkcjogMixcblx0bG9jOiBgVG9yc29gLFxuXHRhdHRyOiBbXG5cdFx0Q2Ftbyxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ2FtbyIsImltcG9ydCBBcm1vciBmcm9tICdnZWFyL2FybW9yL0FybW9yLmpzJ1xuaW1wb3J0IENhbW8gZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0NhbW8uanMnXG5pbXBvcnQgQ29sZFJlc2lzdGFuY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0NvbGRSZXNpc3RhbmNlLmpzJ1xuXG5cbmNvbnN0IEdoaWxsaWVTdWl0ID0gbmV3IEFybW9yKHtcblx0aWQ6IGA2ZWMzYWYwYi0yN2M4LTRkZGUtYjhiNS0wNWE1MTYzMzI0MWJgLFxuXHRuYW1lOiBgR2hpbGxpZSBTdWl0YCxcblx0c3o6IDQsXG5cdGRyOiAxLFxuXHRsb2M6IGBGdWxsIEJvZHlgLFxuXHRhdHRyOiBbXG5cdFx0Q2Ftbyxcblx0XHRDb2xkUmVzaXN0YW5jZSxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgR2hpbGxpZVN1aXQiLCJpbXBvcnQgQXJtb3JBdHRyIGZyb20gJy4vQXJtb3JBdHRyJ1xuXG5cbmNvbnN0IEltcGVybWVhYmxlID0gbmV3IEFybW9yQXR0cih7XG5cdGlkOiBgY2M4OWE2N2UtNzQ2Zi00OGRiLTI0NjYtYzVmMmQ2YmY1Mzc4YCxcblx0bmFtZTogYEltcGVybWVhYmxlYCxcblx0ZGVzYzogW1xuXHRcdGBBdXRvbWF0aWMgU3VjY2VzcyB0byByZXNpc3QgZXhwb3N1cmUgdG8gRGlzZWFzZXMgYW5kIFRveGlucy5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBJbXBlcm1lYWJsZSIsImltcG9ydCBBcm1vciBmcm9tICdnZWFyL2FybW9yL0FybW9yLmpzJ1xuaW1wb3J0IEltcGVybWVhYmxlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9JbXBlcm1lYWJsZS5qcydcbmltcG9ydCBNYXNrIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9NYXNrLmpzJ1xuXG5cbmNvbnN0IEhhem1hdFN1aXQgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDZmNmUzMWZmLTY3ZmEtNGQyNS05NjUyLTg1NDFjM2ZhYmMwY2AsXG5cdG5hbWU6IGBIYXptYXQgU3VpdGAsXG5cdHN6OiAyLFxuXHRkcjogMCxcblx0bG9jOiBgRnVsbCBCb2R5YCxcblx0YXR0cjogW1xuXHRcdEltcGVybWVhYmxlLFxuXHRcdE1hc2ssXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhhem1hdFN1aXQiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBDb2xkUmVzaXN0YW5jZSBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvYXJtb3IvQ29sZFJlc2lzdGFuY2UuanMnXG5pbXBvcnQgRmlyZVJlc2lzdGFuY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0ZpcmVSZXNpc3RhbmNlLmpzJ1xuXG5cbmNvbnN0IEhpa2luZ0Jvb3RzID0gbmV3IEFybW9yKHtcblx0aWQ6IGA1Y2QxZTQ5Ni00MzFmLTRlZmYtYmQzNC01ZTJiNzRlZjA2ZTlgLFxuXHRuYW1lOiBgSGlraW5nIEJvb3RzYCxcblx0c3o6IDIsXG5cdGRyOiAxLFxuXHRsb2M6IGBMZWdzYCxcblx0YXR0cjogW1xuXHRcdENvbGRSZXNpc3RhbmNlLFxuXHRcdEZpcmVSZXNpc3RhbmNlLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIaWtpbmdCb290cyIsImltcG9ydCBBcm1vciBmcm9tICdnZWFyL2FybW9yL0FybW9yLmpzJ1xuaW1wb3J0IENvbGRSZXNpc3RhbmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9Db2xkUmVzaXN0YW5jZS5qcydcbmltcG9ydCBGaXJlUmVzaXN0YW5jZSBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvYXJtb3IvRmlyZVJlc2lzdGFuY2UuanMnXG5cblxuY29uc3QgS2V2bGFyVmVzdCA9IG5ldyBBcm1vcih7XG5cdGlkOiBgYTRkMGQ5OWEtMzU0Ni00ODA1LTkxMmMtNGZmYjJmYmUwYzg1YCxcblx0bmFtZTogYEtldmxhciBWZXN0YCxcblx0c3o6IDQsXG5cdGRyOiAzLFxuXHRsb2M6IGBUb3Jzb2AsXG5cdGF0dHI6IFtcblx0XHRDb2xkUmVzaXN0YW5jZSxcblx0XHRGaXJlUmVzaXN0YW5jZSxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgS2V2bGFyVmVzdCIsImltcG9ydCBBcm1vciBmcm9tICdnZWFyL2FybW9yL0FybW9yLmpzJ1xuXG5cbmNvbnN0IExlYXRoZXJKYWNrZXQgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYGNmNTYwZDM4LTlhNDEtNDBjOC05ZjE0LWY3ODM5YTNlY2Y4MmAsXG5cdG5hbWU6IGBMZWF0aGVyIEphY2tldGAsXG5cdHN6OiAyLFxuXHRkcjogMSxcblx0bG9jOiBgQXJtcywgVG9yc29gXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMZWF0aGVySmFja2V0IiwiaW1wb3J0IEFybW9yIGZyb20gJ2dlYXIvYXJtb3IvQXJtb3IuanMnXG5pbXBvcnQgRmlyZVJlc2lzdGFuY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0ZpcmVSZXNpc3RhbmNlLmpzJ1xuaW1wb3J0IE1hc2sgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL01hc2suanMnXG5cblxuY29uc3QgTW90b3JjeWNsZUhlbG1ldCA9IG5ldyBBcm1vcih7XG5cdGlkOiBgOWI1NGQ3ZmQtYzcwYy00Yjk3LWI0NzEtZWZmNjQ3NzYyMmQzYCxcblx0bmFtZTogYE1vdG9yY3ljbGUgSGVsbWV0YCxcblx0c3o6IDIsXG5cdGRyOiAxLFxuXHRsb2M6IGBIZWFkYCxcblx0YXR0cjogW1xuXHRcdEZpcmVSZXNpc3RhbmNlLFxuXHRcdE1hc2ssXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1vdG9yY3ljbGVIZWxtZXQiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBDYW1vIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9DYW1vLmpzJ1xuaW1wb3J0IENvbGRSZXNpc3RhbmNlIGZyb20gJ2dlYXIvYXR0cmlidXRlcy9hcm1vci9Db2xkUmVzaXN0YW5jZS5qcydcbmltcG9ydCBGaXJlUmVzaXN0YW5jZSBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvYXJtb3IvRmlyZVJlc2lzdGFuY2UuanMnXG5cblxuY29uc3QgUGxhdGVDYXJyaWVyID0gbmV3IEFybW9yKHtcblx0aWQ6IGA2NzM0YzljNi1kOWIwLTRlM2QtYjQ1NS02ZGIzOTU2NDUwMTRgLFxuXHRuYW1lOiBgUGxhdGUgQ2FycmllcmAsXG5cdHN6OiA0LFxuXHRkcjogNCxcblx0bG9jOiBgVG9yc29gLFxuXHRhdHRyOiBbXG5cdFx0Q2Ftbyxcblx0XHRDb2xkUmVzaXN0YW5jZSxcblx0XHRGaXJlUmVzaXN0YW5jZSxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGxhdGVDYXJyaWVyIiwiaW1wb3J0IEFybW9yIGZyb20gJ2dlYXIvYXJtb3IvQXJtb3IuanMnXG5pbXBvcnQgQ29sZFJlc2lzdGFuY2UgZnJvbSAnZ2Vhci9hdHRyaWJ1dGVzL2FybW9yL0NvbGRSZXNpc3RhbmNlLmpzJ1xuXG5cbmNvbnN0IFdpbnRlckNvYXQgPSBuZXcgQXJtb3Ioe1xuXHRpZDogYDEwMmUxMTMzLTMyNDItNGE4OS05NjU4LWU1OGFhNTYzNmU0NWAsXG5cdG5hbWU6IGBXaW50ZXIgQ29hdGAsXG5cdHN6OiAyLFxuXHRkcjogMSxcblx0bG9jOiBgQXJtcywgVG9yc29gLFxuXHRhdHRyOiBbXG5cdFx0Q29sZFJlc2lzdGFuY2UsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFdpbnRlckNvYXQiLCJpbXBvcnQgQXJtb3IgZnJvbSAnZ2Vhci9hcm1vci9Bcm1vci5qcydcbmltcG9ydCBGaXJlUmVzaXN0YW5jZSBmcm9tICdnZWFyL2F0dHJpYnV0ZXMvYXJtb3IvRmlyZVJlc2lzdGFuY2UuanMnXG5cblxuY29uc3QgV29ya0dsb3ZlcyA9IG5ldyBBcm1vcih7XG5cdGlkOiBgMDVkYmZhZjAtNDBhYS00OThlLWExOWUtZDU3YmNkZDFkNmI3YCxcblx0bmFtZTogYFdvcmsgR2xvdmVzYCxcblx0c3o6IDEsXG5cdGRyOiAxLFxuXHRsb2M6IGBBcm1zYCxcblx0YXR0cjogW1xuXHRcdEZpcmVSZXNpc3RhbmNlLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBXb3JrR2xvdmVzIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VhciBleHRlbmRzIFJ1bGUge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRkZXNjLFxuXHRcdHN6LFxuXHRcdHF0eT0wXG5cdH0pIHtcblx0XHRzdXBlcih7XG5cdFx0XHRpZCxcblx0XHRcdG5hbWUsXG5cdFx0XHRkZXNjXG5cdFx0fSlcblx0XHR0aGlzLnN6ID0gc3pcblx0XHR0aGlzLnF0eSA9IHF0eVxuXHR9XG59IiwiaW1wb3J0IEdlYXIgZnJvbSAnZ2Vhci9HZWFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEdlYXIge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0aWQsXG5cdFx0bmFtZSxcblx0XHRkZXNjLFxuXHRcdHN6LFxuXHRcdHF0eVxuXHR9KSB7XG5cdFx0c3VwZXIoe1xuXHRcdFx0aWQsXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZGVzYyxcblx0XHRcdHN6LFxuXHRcdFx0cXR5XG5cdFx0fSlcblx0fVxufSIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEJpbGluZ3VhbERpY3Rpb25hcnkgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYDBiZDRlODFmLTE4NGEtNDAyMi1jYTQwLWZmYjFiOGVjYzU5ZmAsXG5cdG5hbWU6IGBCaWxpbmd1YWwgRGljdGlvbmFyeWAsXG5cdGRlc2M6IFtcblx0XHRgTXVsdGlsaW5ndWFsIEFiaWxpdHlgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmlsaW5ndWFsRGljdGlvbmFyeSIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEJvZHlJbkJhbGFuY2UgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYDMzNTVmMzE0LTU3ZjUtNDg3NS00NDk2LWQxZTgwYTg5YmVjMmAsXG5cdG5hbWU6IGBCb2R5IGluIEJhbGFuY2VgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEF0aGxldGljc2AsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCb2R5SW5CYWxhbmNlIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgQm9va09mRml2ZVJpbmdzID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGBiODczNDExNy1kMzg2LTRhNDgtNDU0Ny1kNjQ3MzNjYWJjZDdgLFxuXHRuYW1lOiBgVGFvIG9mIEplZXQgS3VuZSBEb2AsXG5cdGRlc2M6IFtcblx0XHRgKzEgTWVsZWVgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQm9va09mRml2ZVJpbmdzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgQ2xhc3NpY05vdmVsID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGBhNmMyODkyYS0wYWZiLTQ4M2EtODNhZi0wZDQyODU2MDcwZGNgLFxuXHRuYW1lOiBgQ2xhc3NpYyBOb3ZlbGAsXG5cdGRlc2M6IFtcblx0XHRgKzEgUHN5Y2hlYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzaWNOb3ZlbCIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEJyaWVmSGlzdG9yeU9mVGltZSA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgMGU3NWZjNGItNmE5NC00MTI2LTAxZWYtOThkZTc4MzNiYmQ5YCxcblx0bmFtZTogYEJyaWVmIEhpc3Rvcnkgb2YgVGltZWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU2NpZW5jZWAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCcmllZkhpc3RvcnlPZlRpbWUiLCJpbXBvcnQgRG9jdW1lbnQgZnJvbSAnLi9Eb2N1bWVudCdcblxuXG5jb25zdCBEZWZlbnNpdmVEcml2aW5nID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGBhNmMyODkyYS0wYWZiLTQ4M2EtODNhZi0wZDQyODU2MDcwZGNgLFxuXHRuYW1lOiBgRGVmZW5zaXZlIERyaXZpbmdgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIERyaXZlYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERlZmVuc2l2ZURyaXZpbmciLCJpbXBvcnQgRG9jdW1lbnQgZnJvbSAnLi9Eb2N1bWVudCdcblxuXG5jb25zdCBEb2dUcmlja3MgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGE2YzI4OTJhLTBhZmItNDgzYS04M2FmLTBkNDI4NTYwNzBkY2AsXG5cdG5hbWU6IGBEb2cgVHJpY2tzYCxcblx0ZGVzYzogW1xuXHRcdGArMSBUYW1lYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERvZ1RyaWNrcyIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEVmZmVjdGl2ZUhhYml0cyA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgYTZjMjg5MmEtMGFmYi00ODNhLTgzYWYtMGQ0Mjg1NjA3MGRjYCxcblx0bmFtZTogYEVmZmVjdGl2ZSBIYWJpdHNgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIHRvIGFueSBvbmUgU2tpbGxgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRWZmZWN0aXZlSGFiaXRzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgRW5naW5lZXJpbmdDb25jZXB0cyA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgMTQ3M2U5Y2MtYWE2MC00MzJkLWM5NjMtNzA2ZjYwMjdlYzNhYCxcblx0bmFtZTogYEVuZ2luZWVyaW5nIENvbmNlcHRzYCxcblx0ZGVzYzogW1xuXHRcdGArMSBCdWlsZGAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBFbmdpbmVlcmluZ0NvbmNlcHRzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgR3JheXNBbmF0b215ID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGA2MzFjNGFiOC1lNmVkLTRiMDMtNThmMi01YTE4ZTM2N2YwYTJgLFxuXHRuYW1lOiBgR3JheSdzIEFuYXRvbXlgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIE1lZGljaW5lYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEdyYXlzQW5hdG9teSIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEhvbHlCb29rID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGAwZDM0Zjg2OS1iMDc2LTQ4ZDAtMzlmMy05ZDdkMDE5NDlkZjdgLFxuXHRuYW1lOiBgSG9seSBCb29rYCxcblx0ZGVzYzogW1xuXHRcdGAtMSBQc3ljaGVgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgSG9seUJvb2siLCJpbXBvcnQgRG9jdW1lbnQgZnJvbSAnLi9Eb2N1bWVudCdcblxuXG5jb25zdCBIb21lU2VjdXJpdHkgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYDUzZjZjM2I5LThkZjgtNDM3NC0wNTdjLTNhMzg5NzNhNDlmY2AsXG5cdG5hbWU6IGBIb21lIFNlY3VyaXR5YCxcblx0ZGVzYzogW1xuXHRcdGArMSBMYXJjZW55YCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVTZWN1cml0eSIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEhvd1RvV2luRnJpZW5kcyA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgNGYyMmM5NDYtNDM3Ni00MDA2LTlmMDctNmE5Mjk0Yjg5YmNmYCxcblx0bmFtZTogYEhvdyB0byBXaW4gRnJpZW5kc2AsXG5cdGRlc2M6IFtcblx0XHRgKzEgU29jaWFsaXplYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvd1RvV2luRnJpZW5kcyIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IEhvd1lvZ2FXb3JrcyA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgYzJlMWRmZDQtZDVkZC00MTQ5LWE2ZmMtZDY5NjE3OWFlOWQyYCxcblx0bmFtZTogYEhvdyBZb2dhIFdvcmtzYCxcblx0ZGVzYzogW1xuXHRcdGArMSBBY3JvYmF0aWNzYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvd1lvZ2FXb3JrcyIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IExlYWRlcnNoaXBCYXNpY3MgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGFhZTU0NGE3LTAxYzgtNGY5OC1iYzM4LTM0YjYzMzJiMTg2OGAsXG5cdG5hbWU6IGBMZWFkZXJzaGlwIEJhc2ljc2AsXG5cdGRlc2M6IFtcblx0XHRgKzEgTGVhZGVyc2hpcGAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMZWFkZXJzaGlwQmFzaWNzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgTWFwQXRsYXMgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGFhZGE3ZDJhLTM4MWQtNDk4OC1kOTE1LTgxY2U1ZjU5NWQyZGAsXG5cdG5hbWU6IGBNYXAgKEF0bGFzKWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU3Vydml2YWwoTmF2aWdhdGUpYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1hcEF0bGFzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgTWFwTG9jYWwgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGIzYzU1MDQ1LTE2ZGUtNDE5My00MTk2LTU2ODFkYjU0ZTc1NWAsXG5cdG5hbWU6IGBNYXAgKExvY2FsKWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU3Vydml2YWwoTmF2aWdhdGUpIGluIGEgZ2l2ZW4gUmVnaW9uLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNYXBMb2NhbCIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IE1hcFRvcG9ncmFwaGljID0gbmV3IERvY3VtZW50KHtcblx0aWQ6IGA1ZTBlMTdiNC04NzcxLTQ0ZTItNjA3ZC1kMTY3NTRmY2UxN2RgLFxuXHRuYW1lOiBgTWFwIChUb3BvZ3JhcGhpYylgLFxuXHRkZXNjOiBbXG5cdFx0YCszIFN1cnZpdmFsKE5hdmlnYXRlKSBpbiBhIGdpdmVuIFJlZ2lvbi5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWFwVG9wb2dyYXBoaWMiLCJpbXBvcnQgRG9jdW1lbnQgZnJvbSAnLi9Eb2N1bWVudCdcblxuXG5jb25zdCBQZXJzb25hbERlZmVuc2UgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYDhiY2U1MDU5LWRmMjctNDNiZS1hYWNkLTk0ZTU2ODVmZTUzN2AsXG5cdG5hbWU6IGBQZXJzb25hbCBEZWZlbnNlYCxcblx0ZGVzYzogW1xuXHRcdGArMSBSYW5nZWRgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGVyc29uYWxEZWZlbnNlIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgU0FTU3Vydml2YWxHdWlkZSA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgMWJhZDcyZDQtYTc1OC00NzNlLWQxYmYtZjUyYTIwMGE1ZjVhYCxcblx0bmFtZTogYFNBUyBTdXJ2aXZhbCBHdWlkZWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU3Vydml2YWxgLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU0FTU3Vydml2YWxHdWlkZSIsImltcG9ydCBEb2N1bWVudCBmcm9tICcuL0RvY3VtZW50J1xuXG5cbmNvbnN0IFN0YW5kdXBDb21lZHkgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGQ2YjJkZGViLTcwMzMtNDUzMC00YzU3LTBkNzFiMDk5Nzg1YWAsXG5cdG5hbWU6IGBTdGFuZC11cCBDb21lZHlgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIEVudGVydGFpbmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdGFuZHVwQ29tZWR5IiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgWWVsbG93UGFnZXMgPSBuZXcgRG9jdW1lbnQoe1xuXHRpZDogYGFjNDY1NmViLTA5MDMtNGY2MC1mMzIzLTgzYTFjNjNmODRlNmAsXG5cdG5hbWU6IGBZZWxsb3cgUGFnZXNgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIFNjYXZlbmdpbmcgaW4gYSBnaXZlbiBSZWdpb24uYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFllbGxvd1BhZ2VzIiwiaW1wb3J0IERvY3VtZW50IGZyb20gJy4vRG9jdW1lbnQnXG5cblxuY29uc3QgWmVuTWluZCA9IG5ldyBEb2N1bWVudCh7XG5cdGlkOiBgMmMwMTdlY2QtYjc3MC00NzA0LTRhMTYtN2EzMDM3YTgyZDQ5YCxcblx0bmFtZTogYFplbiBNaW5kYCxcblx0ZGVzYzogW1xuXHRcdGArMSBQZXJjZXB0aW9uYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFplbk1pbmQiLCJpbXBvcnQgQmlsaW5ndWFsRGljdGlvbmFyeSBmcm9tICcuL0JpbGluZ3VhbERpY3Rpb25hcnknXG5pbXBvcnQgQm9keUluQmFsYW5jZSBmcm9tICcuL0JvZHlJbkJhbGFuY2UnXG5pbXBvcnQgQm9va09mRml2ZVJpbmdzIGZyb20gJy4vQm9va09mRml2ZVJpbmdzJ1xuaW1wb3J0IEJvb2tPZk5pbmphIGZyb20gJy4vQ2xhc3NpY05vdmVsJ1xuaW1wb3J0IEJyaWVmSGlzdG9yeU9mVGltZSBmcm9tICcuL0JyaWVmSGlzdG9yeU9mVGltZSdcbmltcG9ydCBDbGFzc2ljTm92ZWwgZnJvbSAnLi9DbGFzc2ljTm92ZWwnXG5pbXBvcnQgRGVmZW5zaXZlRHJpdmluZyBmcm9tICcuL0RlZmVuc2l2ZURyaXZpbmcnXG5pbXBvcnQgRG9nVHJpY2tzIGZyb20gJy4vRG9nVHJpY2tzJ1xuaW1wb3J0IEVmZmVjdGl2ZUhhYml0cyBmcm9tICcuL0VmZmVjdGl2ZUhhYml0cydcbmltcG9ydCBFbmdpbmVlcmluZ0NvbmNlcHRzIGZyb20gJy4vRW5naW5lZXJpbmdDb25jZXB0cydcbmltcG9ydCBHcmF5c0FuYXRvbXkgZnJvbSAnLi9HcmF5c0FuYXRvbXknXG5pbXBvcnQgSG9seUJvb2sgZnJvbSAnLi9Ib2x5Qm9vaydcbmltcG9ydCBIb21lU2VjdXJpdHkgZnJvbSAnLi9Ib21lU2VjdXJpdHknXG5pbXBvcnQgSG93VG9XaW5GcmllbmRzIGZyb20gJy4vSG93VG9XaW5GcmllbmRzJ1xuaW1wb3J0IEhvd1lvZ2FXb3JrcyBmcm9tICcuL0hvd1lvZ2FXb3JrcydcbmltcG9ydCBMZWFkZXJzaGlwQmFzaWNzIGZyb20gJy4vTGVhZGVyc2hpcEJhc2ljcydcbmltcG9ydCBNYXBBdGxhcyBmcm9tICcuL01hcEF0bGFzJ1xuaW1wb3J0IE1hcExvY2FsIGZyb20gJy4vTWFwTG9jYWwnXG5pbXBvcnQgTWFwVG9wb2dyYXBoaWMgZnJvbSAnLi9NYXBUb3BvZ3JhcGhpYydcbmltcG9ydCBQZXJzb25hbERlZmVuc2UgZnJvbSAnLi9QZXJzb25hbERlZmVuc2UnXG5pbXBvcnQgU0FTU3Vydml2YWxHdWlkZSBmcm9tICcuL1NBU1N1cnZpdmFsR3VpZGUnXG5pbXBvcnQgU3RhbmR1cENvbWVkeSBmcm9tICcuL1N0YW5kdXBDb21lZHknXG5pbXBvcnQgWWVsbG93UGFnZXMgZnJvbSAnLi9ZZWxsb3dQYWdlcydcbmltcG9ydCBaZW5NaW5kIGZyb20gJy4vWmVuTWluZCdcblxuXG5jb25zdCBEb2N1bWVudExpc3QgPSBbXG5cdEJpbGluZ3VhbERpY3Rpb25hcnksXG5cdEJvZHlJbkJhbGFuY2UsXG5cdEJvb2tPZkZpdmVSaW5ncyxcblx0Qm9va09mTmluamEsXG5cdEJyaWVmSGlzdG9yeU9mVGltZSxcblx0Q2xhc3NpY05vdmVsLFxuXHREZWZlbnNpdmVEcml2aW5nLFxuXHREb2dUcmlja3MsXG5cdEVmZmVjdGl2ZUhhYml0cyxcblx0RW5naW5lZXJpbmdDb25jZXB0cyxcblx0R3JheXNBbmF0b215LFxuXHRIb2x5Qm9vayxcblx0SG9tZVNlY3VyaXR5LFxuXHRIb3dUb1dpbkZyaWVuZHMsXG5cdEhvd1lvZ2FXb3Jrcyxcblx0TGVhZGVyc2hpcEJhc2ljcyxcblx0TWFwQXRsYXMsXG5cdE1hcExvY2FsLFxuXHRNYXBUb3BvZ3JhcGhpYyxcblx0UGVyc29uYWxEZWZlbnNlLFxuXHRTQVNTdXJ2aXZhbEd1aWRlLFxuXHRTdGFuZHVwQ29tZWR5LFxuXHRZZWxsb3dQYWdlcyxcblx0WmVuTWluZCxcbl1cblxuZXhwb3J0IGRlZmF1bHQgRG9jdW1lbnRMaXN0IiwiaW1wb3J0IEdlYXIgZnJvbSAnZ2Vhci9HZWFyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcnVnIGV4dGVuZHMgR2VhciB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRpZCxcblx0XHRuYW1lLFxuXHRcdGRlc2MsXG5cdFx0c3osXG5cdFx0cXR5LFxuXHRcdG1peCxcblx0XHRvZFxuXHR9KSB7XG5cdFx0c3VwZXIoe1xuXHRcdFx0aWQsXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZGVzYyxcblx0XHRcdHN6LFxuXHRcdFx0cXR5XG5cdFx0fSlcblx0XHR0aGlzLm1peCA9IG1peFxuXHRcdHRoaXMub2QgPSBvZFxuXHR9XG59IiwiaW1wb3J0IERydWcgZnJvbSAnLi9EcnVnJ1xuXG5cbmNvbnN0IEFsY29ob2wgPSBuZXcgRHJ1Zyh7XG5cdGlkOiBgZGUwZGQ1ZjUtODYzMC00ODI3LTEyMWQtZTM5ZmMwOTlhOWFiYCxcblx0bmFtZTogYEFsY29ob2xgLFxuXHRkZXNjOiBbXG5cdFx0YENhbiBiZSB1c2VkIGFzIGFuIEFudGliaW90aWMgb3IgRnVlbC5gLFxuXHRcdGBDOSMgb3IgVW5zdGFibGUuYCxcblx0XSxcblx0c3o6IDEsXG5cdG1peDogOSxcblx0b2Q6IHRydWVcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFsY29ob2wiLCJpbXBvcnQgRHJ1ZyBmcm9tICcuL0RydWcnXG5cblxuY29uc3QgQW50aWJpb3RpYyA9IG5ldyBEcnVnKHtcblx0aWQ6IGA1ZDBiMDhhZC0xMWMwLTQ5MGQtMDBjYS02YThiYmViM2I0ZmFgLFxuXHRuYW1lOiBgQW50aWJpb3RpY2AsXG5cdGRlc2M6IFtcblx0XHRgUHJldmVudHMgaW5mZWN0aW9uIGluIFJlY292ZXJ5IGZvciAxIGRheS5gLFxuXHRdLFxuXHRzejogMCxcblx0bWl4OiAxMixcblx0b2Q6IGZhbHNlXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBbnRpYmlvdGljIiwiaW1wb3J0IERydWcgZnJvbSAnLi9EcnVnJ1xuXG5cbmNvbnN0IEhhbGx1Y2lub2dlbiA9IG5ldyBEcnVnKHtcblx0aWQ6IGA0NjJmMzhlZS1lZjY2LTRmNzYtOTExMC05NTgwMmRlOTJhNmJgLFxuXHRuYW1lOiBgSGFsbHVjaW5vZ2VuYCxcblx0ZGVzYzogW1xuXHRcdGArMSBQZXJmb3JtIGFuZCBUYW1lLCAtMyB0byBhbGwgb3RoZXIgcm9sbHMsIGFuZCAtMSBQc3ljaGUuYCxcblx0XSxcblx0c3o6IDAsXG5cdG1peDogMTUsXG5cdG9kOiBmYWxzZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgSGFsbHVjaW5vZ2VuIiwiaW1wb3J0IERydWcgZnJvbSAnLi9EcnVnJ1xuXG5cbmNvbnN0IFBhaW5raWxsZXIgPSBuZXcgRHJ1Zyh7XG5cdGlkOiBgYzliZTBjNjEtNDE2NS00NWViLTU0NjAtOTk1YTU0NmUxZTZmYCxcblx0bmFtZTogYFBhaW5raWxsZXJgLFxuXHRkZXNjOiBbXG5cdFx0YElnbm9yZSAxIFBhaW4gcGVuYWx0eS5gLFxuXHRdLFxuXHRzejogMCxcblx0bWl4OiA5LFxuXHRvZDogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGFpbmtpbGxlciIsImltcG9ydCBEcnVnIGZyb20gJy4vRHJ1ZydcblxuXG5jb25zdCBTZWRhdGl2ZSA9IG5ldyBEcnVnKHtcblx0aWQ6IGA0ZmI1MTUwNS01MmZmLTQ1YTEtNWI3My0xMjlhYWJjMDliODNgLFxuXHRuYW1lOiBgU2VkYXRpdmVgLFxuXHRkZXNjOiBbXG5cdFx0YERlbWVhbm9yIzYvcm91bmQgdG8gdGFrZSBhbnkgYWN0aW9uLmAsXG5cdF0sXG5cdHN6OiAwLFxuXHRtaXg6IDEyLFxuXHRvZDogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU2VkYXRpdmUiLCJpbXBvcnQgRHJ1ZyBmcm9tICcuL0RydWcnXG5cblxuY29uc3QgU3RpbXVsYW50ID0gbmV3IERydWcoe1xuXHRpZDogYGUxMjRlNTM4LThhMzEtNGVkMy00NDJlLTA2YzA0MGUzNTNjZWAsXG5cdG5hbWU6IGBTdGltdWxhbnRgLFxuXHRkZXNjOiBbXG5cdFx0YElnbm9yZSBFeGhhdXN0aW9uIHBlbmFsdGllcyBmb3IgNmhycy5gLFxuXHRdLFxuXHRzejogMCxcblx0bWl4OiA5LFxuXHRvZDogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3RpbXVsYW50IiwiaW1wb3J0IEFsY29ob2wgZnJvbSAnLi9BbGNvaG9sJ1xuaW1wb3J0IEFudGliaW90aWMgZnJvbSAnLi9BbnRpYmlvdGljJ1xuaW1wb3J0IEhhbGx1Y2lub2dlbiBmcm9tICcuL0hhbGx1Y2lub2dlbidcbmltcG9ydCBQYWlua2lsbGVyIGZyb20gJy4vUGFpbmtpbGxlcidcbmltcG9ydCBTZWRhdGl2ZSBmcm9tICcuL1NlZGF0aXZlJ1xuaW1wb3J0IFN0aW11bGFudCBmcm9tICcuL1N0aW11bGFudCdcblxuXG5jb25zdCBEcnVnTGlzdCA9IFtcblx0QWxjb2hvbCxcblx0QW50aWJpb3RpYyxcblx0SGFsbHVjaW5vZ2VuLFxuXHRQYWlua2lsbGVyLFxuXHRTZWRhdGl2ZSxcblx0U3RpbXVsYW50LFxuXVxuXG5leHBvcnQgZGVmYXVsdCBEcnVnTGlzdFxuXG5cbi8vIE9MRCBEYW1hZ2UgUmVzaXN0YW5jZVVHU1xuLy8gbmV3IERydWcoYENobG9yb2Zvcm1gLFx0XHQgIDE1LCB0cnVlLCAgIGBMaXF1aWQuIEMjMTIgb3IgVW5jb25zY2lvdXMuIFRha2VzIGQ2IHJvdW5kcy5gLFx0ICAgMClcbi8vIG5ldyBEcnVnKGBDeWFuaWRlYCxcdFx0XHQgMTgsIHRydWUsICAgYFBpbGwuIGQ2IFRvcnNvIERNRy9yb3VuZCBmb3IgNSByb3VuZHMuYCxcdFx0XHRcdDApXG4vLyBuZXcgRHJ1ZyhgRXBpbmVwaHJpbmVgLFx0XHQgMTUsIHRydWUsICAgYEluamVjdGlvbi4gUmVzdXNjaXRhdGUgd2l0aGluIEMrM21pbnMuYCxcdFx0ICAwKVxuLy8gbmV3IERydWcoYElvZGluZWAsXHRcdFx0ICA2LCAgZmFsc2UsICBgUHVyaWZ5IDFnYWwgb2YgV2F0ZXIuIFByZXZlbnRzIFJhZGlhdGlvbi5gLFx0XHQwKVxuLy8gbmV3IERydWcoYFBvdGFzc2l1bSBDaGxvcmlkZWAsICAxOCwgdHJ1ZSwgICBgSW5qZWN0aW9uLiBkNiBUb3JzbyBETUcvbWluIGZvciA1bWlucy5gLFx0XHQgICAwKVxuLy8gbmV3IERydWcoYFNvZGl1bSBQZW50b3RoYWxgLFx0MTUsIHRydWUsICAgYEluamVjdGlvbi4gLTYgRW50ZXJ0YWluKExpZSkuYCxcdFx0XHRcdFx0MCkiLCJpbXBvcnQgR2VhciBmcm9tICdnZWFyL0dlYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZWN0cm9uaWMgZXh0ZW5kcyBHZWFyIHtcblx0Y29uc3RydWN0b3IgKHtcblx0XHRpZCxcblx0XHRuYW1lLFxuXHRcdGhycyxcblx0XHRkZXNjLFxuXHRcdHN6LFxuXHRcdHF0eVxuXHR9KSB7XG5cdFx0c3VwZXIoe1xuXHRcdFx0aWQsXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZGVzYyxcblx0XHRcdHN6LFxuXHRcdFx0cXR5XG5cdFx0fSlcblx0XHR0aGlzLmhycyA9IGhyc1xuXHR9XG59IiwiaW1wb3J0IEVsZWN0cm9uaWMgZnJvbSAnLi9FbGVjdHJvbmljJ1xuXG5cbmNvbnN0IENlbGxwaG9uZSA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGBmZGY0NzExZC1jY2MwLTRhMzctMzgwOC1mMzMzNGM4MjdjMzBgLFxuXHRuYW1lOiBgQ2VsbHBob25lYCxcblx0ZGVzYzogW1xuXHRcdGAxeWQgbGlnaHQsIGNhbWVyYSwgcmVtb3RlIGNvbnRyb2wuYCxcblx0XSxcblx0c3o6IDEsXG5cdGhyczogM1xufSlcblxuZXhwb3J0IGRlZmF1bHQgQ2VsbHBob25lIiwiaW1wb3J0IEVsZWN0cm9uaWMgZnJvbSAnLi9FbGVjdHJvbmljJ1xuXG5cbmNvbnN0IEVtZXJnZW5jeVJhZGlvID0gbmV3IEVsZWN0cm9uaWMoe1xuXHRpZDogYDY5MTRmOTQxLTVjMzAtNDhiNC1mNGNhLTEzMWUzOTA3NWZiM2AsXG5cdG5hbWU6IGBFbWVyZ2VuY3kgUmFkaW9gLFxuXHRkZXNjOiBbXG5cdFx0YEFNL0ZNL1Nob3J0d2F2ZS5gLFxuXHRcdGAxeWQgbGlnaHQuYCxcblx0XSxcblx0c3o6IDEsXG5cdGhyczogNlxufSlcblxuZXhwb3J0IGRlZmF1bHQgRW1lcmdlbmN5UmFkaW8iLCJpbXBvcnQgRWxlY3Ryb25pYyBmcm9tICcuL0VsZWN0cm9uaWMnXG5cblxuY29uc3QgRmxhc2hsaWdodCA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGAxMDBmM2RhMC01YjYwLTRhNzMtYjgyOC0wMDA5YzI3MDJiZjBgLFxuXHRuYW1lOiBgRmxhc2hsaWdodGAsXG5cdGRlc2M6IFtcblx0XHRgMTB5ZCBsaWdodC4gLTMgUmFuZ2VkIEF0dGFjayB0byBCbGluZCAxIHJvdW5kLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRocnM6IDNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZsYXNobGlnaHQiLCJpbXBvcnQgRWxlY3Ryb25pYyBmcm9tICcuL0VsZWN0cm9uaWMnXG5cblxuY29uc3QgR2VpZ2VyQ291bnRlciA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGAwYjg1N2ViMy0zYWVhLTQ0YjQtMzRhMi05M2Y1Nzg4NzBhZjRgLFxuXHRuYW1lOiBgR2VpZ2VyIENvdW50ZXJgLFxuXHRkZXNjOiBbXG5cdFx0YFNjaWVuY2UgNiMgdG8gZGV0ZWN0IFJhZGlhdGlvbiBpbiAxeWQuYCxcblx0XSxcblx0c3o6IDIsXG5cdGhyczogMjRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEdlaWdlckNvdW50ZXIiLCJpbXBvcnQgRWxlY3Ryb25pYyBmcm9tICcuL0VsZWN0cm9uaWMnXG5cblxuY29uc3QgSGFuZFJhZGlvID0gbmV3IEVsZWN0cm9uaWMoe1xuXHRpZDogYDZhYTQ3YzYxLWEyZjMtNDcyYS1mOWM2LWQ2ZmVkYzA4YWVmY2AsXG5cdG5hbWU6IGBIYW5kIFJhZGlvYCxcblx0ZGVzYzogW1xuXHRcdGA5LWNoYW5uZWwgMi13YXkgcmFkaW8uYCxcblx0XHRgMyBtaWxlIHJhbmdlLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRocnM6IDlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhhbmRSYWRpbyIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBIZWFkbGFtcCA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGA3Mzc0ZmU2Ni0zMzg5LTQwN2MtMjBjYy0zYjhjNTNmZDhhN2FgLFxuXHRuYW1lOiBgSGVhZGxhbXBgLFxuXHRkZXNjOiBbXG5cdFx0YDN5ZCBsaWdodC4gSGFuZHMgZnJlZS5gLFxuXHRdLFxuXHRzejogMCxcblx0aHJzOiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkbGFtcCIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBMYW50ZXJuID0gbmV3IEVsZWN0cm9uaWMoe1xuXHRpZDogYGMyNWRhZGNlLTE4NzMtNGJkMC00ZGE1LWE1Njc1NTA0ZmU0NmAsXG5cdG5hbWU6IGBMYW50ZXJuYCxcblx0ZGVzYzogW1xuXHRcdGAzeWQgbGlnaHQgcmFkaXVzLmAsXG5cdF0sXG5cdHN6OiAyLFxuXHRocnM6IDZcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExhbnRlcm4iLCJpbXBvcnQgRWxlY3Ryb25pYyBmcm9tICcuL0VsZWN0cm9uaWMnXG5cblxuY29uc3QgTWVnYXBob25lID0gbmV3IEVsZWN0cm9uaWMoe1xuXHRpZDogYDVlMjQyZWZmLTY2YzgtNDFkNi0xMzUwLTI4MDcxNTkwYjk1NmAsXG5cdG5hbWU6IGBNZWdhcGhvbmVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIExlYWRlcnNoaXAgd2hlbiBzcGVha2luZyB0byBhIGNyb3dkLmAsXG5cdF0sXG5cdHN6OiAyLFxuXHRocnM6IDEyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNZWdhcGhvbmUiLCJpbXBvcnQgRWxlY3Ryb25pYyBmcm9tICcuL0VsZWN0cm9uaWMnXG5cblxuY29uc3QgTXVsdGltZXRlciA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGA1M2ZmZWIwZC00MzI0LTQzN2YtZTA2ZS0xOWI4NGNhMmFjYzBgLFxuXHRuYW1lOiBgTXVsdGltZXRlcmAsXG5cdGRlc2M6IFtcblx0XHRgKzMgU2NpZW5jZShUZWNobm9sb2d5KS5gLFxuXHRcdGBEZXRlY3RzIHZvbHRhZ2UsIGJhdHRlcnkgbGlmZSwgYW5kIGNsb3NlZCBjaXJjdWl0cy5gLFxuXHRdLFxuXHRzejogMSxcblx0aHJzOiA0OFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTXVsdGltZXRlciIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBOaWdodHZpc2lvbkdvZ2dsZXMgPSBuZXcgRWxlY3Ryb25pYyh7XG5cdGlkOiBgYzI1MDZhNDctYmJmMS00NWUwLWRhYTktMjk3YWYyMWExMWVhYCxcblx0bmFtZTogYE5pZ2h0dmlzaW9uIEdvZ2dsZXNgLFxuXHRkZXNjOiBbXG5cdFx0YElnbm9yZSBWaXNpYmlsaXR5IHBlbmFsdGllcyBpbiBkYXJrbmVzcy5gLFxuXHRdLFxuXHRzejogMSxcblx0aHJzOiAzNlxufSlcblxuZXhwb3J0IGRlZmF1bHQgTmlnaHR2aXNpb25Hb2dnbGVzIiwiaW1wb3J0IEVsZWN0cm9uaWMgZnJvbSAnLi9FbGVjdHJvbmljJ1xuXG5cbmNvbnN0IFF1YWRjb3B0ZXJEcm9uZSA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGBiOGRlNDliZi04M2Q3LTRkOTktNTU0YS1iZGYzNzhiMDY3MmVgLFxuXHRuYW1lOiBgUXVhZGNvcHRlciBEcm9uZWAsXG5cdGRlc2M6IFtcblx0XHRgU2NpZW5jZSA2IyB0byB1c2UuYCxcblx0XHRgT25ib2FyZCBjYW1lcmEuYCxcblx0XHRgOTB5ZCBTcGVlZC5gLFxuXHRdLFxuXHRzejogMixcblx0aHJzOiAuMjVcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFF1YWRjb3B0ZXJEcm9uZSIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBSQ0NhciA9IG5ldyBFbGVjdHJvbmljKHtcblx0aWQ6IGBkN2NiOGMzOS1lZGJmLTRkYmEtMTgwZi1mNWE5MGM4YTNjMmNgLFxuXHRuYW1lOiBgUkMgQ2FyYCxcblx0ZGVzYzogW1xuXHRcdGBTY2llbmNlIDMjIHRvIHVzZS5gLFxuXHRcdGA0NXlkIFNwZWVkLmAsXG5cdF0sXG5cdHN6OiAzLFxuXHRocnM6IC41XG59KVxuXG5leHBvcnQgZGVmYXVsdCBSQ0NhciIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBTb2xhckxhbXAgPSBuZXcgRWxlY3Ryb25pYyh7XG5cdGlkOiBgYWE0ODBlYzctOWRmOS00MDExLWZmNzgtZDRiMzQ1NjdjMTQ0YCxcblx0bmFtZTogYFNvbGFyIExhbXBgLFxuXHRkZXNjOiBbXG5cdFx0YDF5ZCBsaWdodCByYWRpdXMuYCxcblx0XHRgMSBkYXkgY2hhcmdlLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRocnM6IDlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFNvbGFyTGFtcCIsImltcG9ydCBFbGVjdHJvbmljIGZyb20gJy4vRWxlY3Ryb25pYydcblxuXG5jb25zdCBTdHVuR3VuID0gbmV3IEVsZWN0cm9uaWMoe1xuXHRpZDogYGFkZGY1OWIzLTUxMzQtNGE5Mi03NzBjLTU2NGY4MzFhYzMwYmAsXG5cdG5hbWU6IGBTdHVuIEd1bmAsXG5cdGRlc2M6IFtcblx0XHRgTWVsZWUgQXR0YWNrLmAsXG5cdFx0YEM5IyBvciBTdHVuIG5leHQgcm91bmQuYCxcblx0XSxcblx0c3o6IDEsXG5cdGhyczogLjFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0dW5HdW4iLCJpbXBvcnQgQ2VsbHBob25lIGZyb20gJy4vQ2VsbHBob25lJ1xuaW1wb3J0IEVtZXJnZW5jeVJhZGlvIGZyb20gJy4vRW1lcmdlbmN5UmFkaW8nXG5pbXBvcnQgRmxhc2hsaWdodCBmcm9tICcuL0ZsYXNobGlnaHQnXG5pbXBvcnQgR2VpZ2VyQ291bnRlciBmcm9tICcuL0dlaWdlckNvdW50ZXInXG5pbXBvcnQgSGFuZFJhZGlvIGZyb20gJy4vSGFuZFJhZGlvJ1xuaW1wb3J0IEhlYWRsYW1wIGZyb20gJy4vSGVhZGxhbXAnXG5pbXBvcnQgTGFudGVybiBmcm9tICcuL0xhbnRlcm4nXG5pbXBvcnQgTWVnYXBob25lIGZyb20gJy4vTWVnYXBob25lJ1xuaW1wb3J0IE11bHRpbWV0ZXIgZnJvbSAnLi9NdWx0aW1ldGVyJ1xuaW1wb3J0IE5pZ2h0dmlzaW9uR29nZ2xlcyBmcm9tICcuL05pZ2h0dmlzaW9uR29nZ2xlcydcbmltcG9ydCBRdWFkY29wdGVyRHJvbmUgZnJvbSAnLi9RdWFkY29wdGVyRHJvbmUnXG5pbXBvcnQgUkNDYXIgZnJvbSAnLi9SQ0NhcidcbmltcG9ydCBTb2xhckxhbXAgZnJvbSAnLi9Tb2xhckxhbXAnXG5pbXBvcnQgU3R1bkd1biBmcm9tICcuL1N0dW5HdW4nXG5cblxuY29uc3QgRWxlY3Ryb25pY0xpc3QgPSBbXG5cdENlbGxwaG9uZSxcblx0RW1lcmdlbmN5UmFkaW8sXG5cdEZsYXNobGlnaHQsXG5cdEdlaWdlckNvdW50ZXIsXG5cdEhhbmRSYWRpbyxcblx0SGVhZGxhbXAsXG5cdExhbnRlcm4sXG5cdE1lZ2FwaG9uZSxcblx0TXVsdGltZXRlcixcblx0TmlnaHR2aXNpb25Hb2dnbGVzLFxuXHRRdWFkY29wdGVyRHJvbmUsXG5cdFJDQ2FyLFxuXHRTb2xhckxhbXAsXG5cdFN0dW5HdW4sXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEVsZWN0cm9uaWNMaXN0XG5cblxuLy8gT0xEIEVMRUNUUk9OSUNTXG4vLyAgbmV3IEVsZWN0cm9uaWMoYFJhZGlvIEphbW1lcmAsXHRcdCAgMyxcdCAgYEJsb2NrcyByYWRpbyBzaWduYWwgd2l0aGluIDEwMHlkcy5gLFx0ICAgMSkiLCJpbXBvcnQgR2VhciBmcm9tICdnZWFyL0dlYXIuanMnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXF1aXBtZW50IGV4dGVuZHMgR2VhciB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRpZCxcblx0XHRuYW1lLFxuXHRcdGRlc2MsXG5cdFx0c3osXG5cdFx0cXR5XG5cdH0pIHtcblx0XHRzdXBlcih7XG5cdFx0XHRpZCxcblx0XHRcdG5hbWUsXG5cdFx0XHRkZXNjLFxuXHRcdFx0c3osXG5cdFx0XHRxdHlcblx0XHR9KVxuXHR9XG59IiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQWlySG9ybiA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDMyMjdmNDVkLTYwOTEtNGQzZi1jNmIzLTlhZDY1ODEwYmU4MGAsXG5cdG5hbWU6IGBBaXIgSG9ybmAsXG5cdGRlc2M6IFtcblx0XHRgRW1pdHMgYSBsb3VkIHNocmllayB1cCB0byBhIDEgbWlsZSByYWRpdXMuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFpckhvcm4iLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBCaWN5Y2xlID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgYjM2OGQ4YzUtZTlmNy00YzY1LWVmYmEtNjAxNDZhMzliZTc4YCxcblx0bmFtZTogYEJpY3ljbGVgLFxuXHRkZXNjOiBbXG5cdFx0YEF0aGxldGljcyAzIy5gLFxuXHRcdGBTcGVlZCB4M3lkcyAoeC43bXBoKS5gLFxuXHRcdGAyaC5gLFxuXHRdLFxuXHRzejogOFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmljeWNsZSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEJpbm9jdWxhcnMgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAyMGI4NTQ3OS1kMDc5LTRmYzAtNDRlMS1kZDNmZDk4OTg1MGRgLFxuXHRuYW1lOiBgQmlub2N1bGFyc2AsXG5cdGRlc2M6IFtcblx0XHRgKzMgUGVyY2VwdGlvbihTZWUpIGF0IDUwK3lkcy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmlub2N1bGFycyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IENhZ2VUcmFwID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgODg4MTE2ZjctMzVhZC00ODIyLTdhMDUtMmVjMTYwN2EyN2ExYCxcblx0bmFtZTogYENhZ2UgVHJhcGAsXG5cdGRlc2M6IFtcblx0XHRgKzMgU3Vydml2YWwoRm9yYWdlKS5gLFxuXHRcdGBUYWtlcyAxZGF5LmAsXG5cdF0sXG5cdHN6OiA2XG59KVxuXG5leHBvcnQgZGVmYXVsdCBDYWdlVHJhcCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IENhbmRsZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDNjMWFlNzdkLThiNTItNDUyYS0wMWExLTY4YWE1YTZiZTkzMWAsXG5cdG5hbWU6IGBDYW5kbGVgLFxuXHRkZXNjOiBbXG5cdFx0YDF5ZCBsaWdodCByYWRpdXMgZm9yIDZocnMuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENhbmRsZSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IENhbmR5ID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgNTdkMDFmN2QtYjE2Yy00ZTFhLTI2MjgtOGIwZDYzYjAzMGNkYCxcblx0bmFtZTogYENhbmR5YCxcblx0ZGVzYzogW1xuXHRcdGBSZXN0b3JlcyAxIEx1Y2sgcG9pbnQuYCxcblx0XHRgMS9kYXkuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENhbmR5IiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQ2hhbGsgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBjYjZjYTI0Ni1mNjcyLTQ5OWMtYWMwNi02NGYzNmI3MGQ1NTlgLFxuXHRuYW1lOiBgQ2hhbGtgLFxuXHRkZXNjOiBbXG5cdFx0YFVzZWQgdG8gdGVtcG9yYXJpbHkgd3JpdGUgb24gYW55IHN1cmZhY2UuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENoYWxrIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgQ29tcGFzcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGFmOTRmOGZjLWFmZWQtNDg5Yy1kYWZkLTNlMzQyYzA2YTJhZmAsXG5cdG5hbWU6IGBDb21wYXNzYCxcblx0ZGVzYzogW1xuXHRcdGArMyBTdXJ2aXZhbChOYXZpZ2F0ZSkuYCxcblx0XHRgQWx3YXlzIHBvaW50cyBOb3J0aC5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ29tcGFzcyIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEVnZ1RpbWVyID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgMjg2ODA0ZjAtNmUxNS00NTIyLWY3MDUtMjI4ZDM3YWVmYjJlYCxcblx0bmFtZTogYEVnZyBUaW1lcmAsXG5cdGRlc2M6IFtcblx0XHRgU2V0IHVwIHRvIDYwbWlucy5gLFxuXHRcdGBMb3VkIHJpbmdpbmcgZm9yIDFtaW4uYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVnZ1RpbWVyIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgRmlyZXN0aWNrID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgOTdhYjE4MzctZjZiYS00NDdmLWU1MjctOTM5MGNlYTZiNzgwYCxcblx0bmFtZTogYEZpcmUtc3RpY2tgLFxuXHRkZXNjOiBbXG5cdFx0YCszIFN1cnZpdmFsKENhbXApLmAsXG5cdFx0YE1hZ25lc2l1bSByb2QgYW5kIHN0ZWVsLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGaXJlc3RpY2siLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBGaXNoaW5nUG9sZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGIzZDQ2N2ZjLWZiMjEtNDNmZi04YzI4LTAzNjU5NmRlZTRkY2AsXG5cdG5hbWU6IGBGaXNoaW5nIFBvbGVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIFN1cnZpdmFsKEZvcmFnZSkgYXQgcml2ZXIsIGxha2UsIG9yIG9jZWFuLmAsXG5cdF0sXG5cdHN6OiAyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGaXNoaW5nUG9sZSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IEZsYXJlR3VuID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgNTgyMWEyZGUtMjc5Zi00ODNkLTg3NmMtYjM2MzVlNGQ0ZGYzYCxcblx0bmFtZTogYEZsYXJlIEd1bmAsXG5cdGRlc2M6IFtcblx0XHRgUGlzdG9sLmAsXG5cdFx0YFJhbmdlOjMuYCxcblx0XHRgQW1tbzogMTJnIEZsYXJlcyBvciAxIHVzZSAxMmcuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZsYXJlR3VuIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgR3JhcHBsaW5nSG9vayA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGQxMmMxYzk2LWFjOTgtNDIwOC1mNjAyLTA4NjdlNWUzYmIyM2AsXG5cdG5hbWU6IGBHcmFwcGxpbmcgSG9va2AsXG5cdGRlc2M6IFtcblx0XHRgKzMgQXRobGV0aWNzKENsaW1iIGFuZCBSYXBwZWwpLmAsXG5cdFx0YEhvbGRzIDEwMFN6LmAsXG5cdF0sXG5cdHN6OiAyXG59KVxuXG5leHBvcnQgZGVmYXVsdCBHcmFwcGxpbmdIb29rIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgSGFtbW9jayA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDQ0ODZmODcyLTg0NTYtNGQxOC05NWQ1LTYyOWRjYmZmM2Y0MGAsXG5cdG5hbWU6IGBIYW1tb2NrYCxcblx0ZGVzYzogW1xuXHRcdGBTdXNwZW5kZWQgc2xlZXBpbmcgZGV2aWNlIGZvciAxIHBlcnNvbi5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgSGFtbW9jayIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IExpZ2h0ZXIgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBmNTM5MzIyOC0zNDMzLTRiYTEtNmFlZS00ZTBhMTdiMjc2ZDdgLFxuXHRuYW1lOiBgTGlnaHRlcmAsXG5cdGRlc2M6IFtcblx0XHRgTWFrZXMgYSBzbWFsbCBmaXJlLmAsXG5cdFx0YDF5ZCByYWRpdXMgbGlnaHQuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExpZ2h0ZXIiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBMdXh1cnlJdGVtID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgYzYyYWMyM2QtYjYwZC00YmJjLTdiMWUtY2I3ZGUxZGI1ZjljYCxcblx0bmFtZTogYEx1eHVyeSBJdGVtYCxcblx0ZGVzYzogW1xuXHRcdGBUb2lsZXQgcGFwZXIsIGNpZ2FyZXR0ZSwgZXRjLmAsXG5cdFx0YCsxIFBzeWNoZSAxL3drLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBMdXh1cnlJdGVtIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTWFyYmxlcyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGExOTMzZGEyLTEzNTMtNDFmZi1hMzAzLTY3MjM5ZjI2YzM5ZWAsXG5cdG5hbWU6IGBNYXJibGVzYCxcblx0ZGVzYzogW1xuXHRcdGAzMC9iYWcuYCxcblx0XHRgMnNxeWQgYXJlYS5gLFxuXHRcdGBBMTIjIG9yIGZhbGwgUHJvbmUuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1hcmJsZXMiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBNYXJrZXIgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAyMGJhOGE5MC1hYWUwLTQ4MGQtNTg4Yy1jNDJlNzNhZDA3YzNgLFxuXHRuYW1lOiBgTWFya2VyYCxcblx0ZGVzYzogW1xuXHRcdGBVc2VkIHRvIHBlcm1hbmVudGx5IHdyaXRlIG9uIGFueSBzdXJmYWNlLmAsXG5cdF0sXG5cdHN6OiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNYXJrZXIiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBNYXRjaGJvb2sgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAzYzYxNWRjNy04YzczLTQzODQtNGFkMy0wN2ZhOTkxY2I4OTlgLFxuXHRuYW1lOiBgTWF0Y2hib29rYCxcblx0ZGVzYzogW1xuXHRcdGArMSBTdXJ2aXZhbChDYW1wKS5gLFxuXHRcdGAxeWQgbGlnaHQgcmFkaXVzLCAzIHJvdW5kcy5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2hib29rIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTW9ub2N1bGFyID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgOWExZWQ0ZjMtMzg0NS00M2ExLWUxMTQtYzE5ZmQzN2U3MDg1YCxcblx0bmFtZTogYE1vbm9jdWxhcmAsXG5cdGRlc2M6IFtcblx0XHRgKzEgUGVyY2VwdGlvbihTZWUpIGF0IDI1K3lkcy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTW9ub2N1bGFyIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTXVzaWNhbEluc3RydW1lbnQgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGA5MDFhNWQ3ZS04NzMxLTQ2ZDEtNTU5Ny03NTExYjUyMTE4YWJgLFxuXHRuYW1lOiBgTXVzaWNhbCBJbnN0cnVtZW50YCxcblx0ZGVzYzogW1xuXHRcdGArMSBFbnRlcnRhaW4oRGlzdHJhY3QgYW5kIEluc3BpcmUpLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBNdXNpY2FsSW5zdHJ1bWVudCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IE15bGFyQmxhbmtldCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYGEzZWMwMmQyLWY2MmItNDg1NC03MTIyLWFmODdkMTczMDNhYWAsXG5cdG5hbWU6IGBNeWxhciBCbGFua2V0YCxcblx0ZGVzYzogW1xuXHRcdGBDb2xkIFJlc2lzdGFuY2UuYCxcblx0XHRgMXlkIHggMnlkIHJlZmxlY3RpdmUgZm9pbCBzaGVldC5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgTXlsYXJCbGFua2V0IiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgTm90ZWJvb2sgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBlZGNkMzQ0OS02YjAxLTRlNDctZmVmNS0yZTY1MzU5MTc2ZWNgLFxuXHRuYW1lOiBgTm90ZWJvb2tgLFxuXHRkZXNjOiBbXG5cdFx0YDEwMCBwYWdlcyBvZiBwYXBlciB3aXRoIGEgd2lyZSBiaW5kaW5nLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBOb3RlYm9vayIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFBhZGxvY2sgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAzMDM2YTUxNC0wNzczLTRiYmUtOTlhYi0zN2U3M2FlMzdhZGJgLFxuXHRuYW1lOiBgUGFkbG9ja2AsXG5cdGRlc2M6IFtcblx0XHRgMiBEYW1hZ2UgUmVzaXN0YW5jZS5gLFxuXHRcdGBMYXJjZW55KERpc2FibGUpIDkjLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBQYWRsb2NrIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUGFyYWNvcmQgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBkYjdkYzk1MC0yMjcyLTQ2MTktZDg0Yy0wNzk0ZTRhYjYxODFgLFxuXHRuYW1lOiBgUGFyYWNvcmRgLFxuXHRkZXNjOiBbXG5cdFx0YDYweWQgY29pbC5gLFxuXHRcdGBIb2xkcyA1MFN6LmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBQYXJhY29yZCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFBlcHBlclNwcmF5ID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgYmMwYWY2MTYtZjJiNy00NmZlLTdjNDAtYzI0ODk1MGM0MzZhYCxcblx0bmFtZTogYFBlcHBlciBTcHJheWAsXG5cdGRlc2M6IFtcblx0XHRgKzMgUmFuZ2VkKFNob290KSB3aXRoIHRoaXMgd2VhcG9uLmAsXG5cdFx0YFJhbmdlOjEuYCxcblx0XHRgU3VjY2Vzc2Z1bCBDYWxsZWQgU2hvdDogSGVhZCBjYXVzZXMgNiBQYWluLmAsXG5cdFx0YFRha2VzIDEgcm91bmQgZm9yIFBhaW4gdG8gc3RhcnQuYCxcblx0XHRgUGFpbiBsYXN0cyBmb3IgZDZ4NSBtaW51dGVzLmAsXG5cdFx0YDMgdXNlcy5gLFxuXHRcdGBUb3hpbi5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGVwcGVyU3ByYXkiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBQb2NrZXRNaXJyb3IgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBiNjFkNDJkNC1jY2U4LTRkYTQtNmVhZS05MzBmN2E3ZGE2NzNgLFxuXHRuYW1lOiBgUG9ja2V0IE1pcnJvcmAsXG5cdGRlc2M6IFtcblx0XHRgUGVyY2VwdGlvbihTZWUpIDYjIHRvIHNlZSBmcm9tIGJlaGluZCBDb3Zlci5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgUG9ja2V0TWlycm9yIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUmF0VHJhcCA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDdmMTdmYzk1LTNlNDEtNDcyMC03OGU3LTQzY2FmZjA3ZDc1MWAsXG5cdG5hbWU6IGBSYXQgVHJhcGAsXG5cdGRlc2M6IFtcblx0XHRgKzEgU3Vydml2YWwoRm9yYWdlKS5gLFxuXHRcdGBUYWtlcyAxZGF5LmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBSYXRUcmFwIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUm9hZEZsYXJlID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgMGQxNjE4ZDMtYTc0OS00NTNhLTcxNDItOGFkMGJhYWRhNzg0YCxcblx0bmFtZTogYFJvYWQgRmxhcmVgLFxuXHRkZXNjOiBbXG5cdFx0YDMgRmlyZSBEYW1hZ2UuYCxcblx0XHRgMTB5ZCBsaWdodCByYWRpdXMgZm9yIDIwbWlucy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUm9hZEZsYXJlIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgUm9wZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDQ4YWYyYWQyLTgzMTMtNDU0ZS04NjZlLTIxZGRkNjBlNmM0MmAsXG5cdG5hbWU6IGBSb3BlYCxcblx0ZGVzYzogW1xuXHRcdGAzMHlkIG55bG9uIGNvaWwuYCxcblx0XHRgSG9sZHMgMTAwU3ouYCxcblx0XHRgU3Vydml2YWwgNiMgdG8gdXNlIGFzIEhhbmRjdWZmcy5gLFxuXHRdLFxuXHRzejogMlxufSlcblxuZXhwb3J0IGRlZmF1bHQgUm9wZSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFNrYXRlYm9hcmQgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGBlZGE3NTIwMC1iMTU5LTQyYjYtNDAyOS02ZGJhM2QzOTIxMjdgLFxuXHRuYW1lOiBgU2thdGVib2FyZGAsXG5cdGRlc2M6IFtcblx0XHRgQXRobGV0aWNzIDYjLmAsXG5cdFx0YFNwZWVkIHgzLmAsXG5cdFx0YEZhaWw6UHJvbmUuYCxcblx0XSxcblx0c3o6IDNcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFNrYXRlYm9hcmQiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBTbGVlcGluZ0JhZyA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDFkMzI5OTJjLTAyZDMtNDczOS00YTkyLTA3MTQwMThmZjc0M2AsXG5cdG5hbWU6IGBTbGVlcGluZyBCYWdgLFxuXHRkZXNjOiBbXG5cdFx0YEluc3VsYXRlZCBiYWcgZm9yIHVwIHRvIDIgcGVvcGxlLmAsXG5cdFx0YENvbGQgUmVzaXN0YW5jZSArM2hycy5gLFxuXHRdLFxuXHRzejogM1xufSlcblxuZXhwb3J0IGRlZmF1bHQgU2xlZXBpbmdCYWciLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBTcG90dGluZ1Njb3BlID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgNmY2NWVmZTktZjU0Ny00ZWU0LTJmZWEtMWYxYzViZThhZDY5YCxcblx0bmFtZTogYFNwb3R0aW5nIFNjb3BlYCxcblx0ZGVzYzogW1xuXHRcdGArNiBQZXJjZXB0aW9uKFNlZSkgYXQgMTAwK3lkcy5gLFxuXHRdLFxuXHRzejogMlxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3BvdHRpbmdTY29wZSIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFRhcnAgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAyZDUxNzI1Ni02ZGVhLTQyZWQtMTA0MC00ODI0N2I2ZjRiNGRgLFxuXHRuYW1lOiBgVGFycGAsXG5cdGRlc2M6IFtcblx0XHRgM3lkIHggM3lkIHBsYXN0aWMgc2hlZXQuYCxcblx0XHRgQ29sZCBSZXNpc3RhbmNlLmAsXG5cdFx0YFdhdGVycHJvb2YuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFRhcnAiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBUZW50ID0gbmV3IEVxdWlwbWVudCh7XG5cdGlkOiBgNjgwNzM5MzctOTYxOC00MDVmLWI0YzUtNWI4MGEwOGJkZTZmYCxcblx0bmFtZTogYFRlbnRgLFxuXHRkZXNjOiBbXG5cdFx0YDQgcGVyc29uLmAsXG5cdFx0YDVtaW4gc2V0dXAvdGFrZS1kb3duLmAsXG5cdFx0YENvbGQgUmVzaXN0YW5jZSArM2hycy5gLFxuXHRdLFxuXHRzejogNlxufSlcblxuZXhwb3J0IGRlZmF1bHQgVGVudCIsImltcG9ydCBFcXVpcG1lbnQgZnJvbSAnZ2Vhci9lcXVpcG1lbnQvRXF1aXBtZW50LmpzJ1xuXG5cbmNvbnN0IFdoZXRzdG9uZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDE5MzVlMWE0LTc2ZDYtNGRlMC0wMmJjLTk1ODNjZjk3NGMxYWAsXG5cdG5hbWU6IGBXaGV0c3RvbmVgLFxuXHRkZXNjOiBbXG5cdFx0YEJsYWRlIGdldHMgKzEgRGFtYWdlIGZvciAxZGF5LmAsXG5cdFx0YFRha2VzIDFoci9ibGFkZS5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgV2hldHN0b25lIiwiaW1wb3J0IEVxdWlwbWVudCBmcm9tICdnZWFyL2VxdWlwbWVudC9FcXVpcG1lbnQuanMnXG5cblxuY29uc3QgV2hpc3RsZSA9IG5ldyBFcXVpcG1lbnQoe1xuXHRpZDogYDE4ODg4YzY4LWVmMzktNDYxMy05ZTJkLWY2MDBjYzdkMDAwYmAsXG5cdG5hbWU6IGBXaGlzdGxlYCxcblx0ZGVzYzogW1xuXHRcdGArMSBUYW1lKFRyYWluKS5gLFxuXHRcdGBMb3VkIHNocmllayA1MDB5ZCByYWRpdXMuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFdoaXN0bGUiLCJpbXBvcnQgRXF1aXBtZW50IGZyb20gJ2dlYXIvZXF1aXBtZW50L0VxdWlwbWVudC5qcydcblxuXG5jb25zdCBaaXBUaWUgPSBuZXcgRXF1aXBtZW50KHtcblx0aWQ6IGAzZDlhMDc1MC01ODU4LTQxZGEtYjEwMy05OWY1YTMxMTMwYmJgLFxuXHRuYW1lOiBgWmlwIFRpZWAsXG5cdGRlc2M6IFtcblx0XHRgUGxhY2Ugb24gQXJtcyBiZWhpbmQgdGFyZ2V0J3MgYmFjayB0byBtYWtlIHRoZW0gSGFybWxlc3MuYCxcblx0XHRgUGxhY2Ugb24gTGVncyB0byBtYWtlIHRhcmdldCBJbW1vYmlsaXplZC5gLFxuXHRcdGBDb25zdGl0dXRpb24gb3IgQWNyb2JhdGljcyAxMiMgdG8gZXNjYXBlLmAsXG5cdFx0YFVzZSBmb3IgKzEgQnVpbGQuYCxcblx0XSxcblx0c3o6IDBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFppcFRpZSIsImltcG9ydCBBaXJIb3JuIGZyb20gJy4vQWlySG9ybidcbmltcG9ydCBCaWN5Y2xlIGZyb20gJy4vQmljeWNsZSdcbmltcG9ydCBCaW5vY3VsYXJzIGZyb20gJy4vQmlub2N1bGFycydcbmltcG9ydCBDYWdlVHJhcCBmcm9tICcuL0NhZ2VUcmFwJ1xuaW1wb3J0IENhbmRsZSBmcm9tICcuL0NhbmRsZSdcbmltcG9ydCBDYW5keSBmcm9tICcuL0NhbmR5J1xuaW1wb3J0IENoYWxrIGZyb20gJy4vQ2hhbGsnXG5pbXBvcnQgQ29tcGFzcyBmcm9tICcuL0NvbXBhc3MnXG5pbXBvcnQgRWdnVGltZXIgZnJvbSAnLi9FZ2dUaW1lcidcbmltcG9ydCBGaXJlc3RpY2sgZnJvbSAnLi9GaXJlc3RpY2snXG5pbXBvcnQgRmlzaGluZ1BvbGUgZnJvbSAnLi9GaXNoaW5nUG9sZSdcbmltcG9ydCBGbGFyZUd1biBmcm9tICcuL0ZsYXJlR3VuJ1xuaW1wb3J0IEdyYXBwbGluZ0hvb2sgZnJvbSAnLi9HcmFwcGxpbmdIb29rJ1xuaW1wb3J0IEhhbW1vY2sgZnJvbSAnLi9IYW1tb2NrJ1xuaW1wb3J0IExpZ2h0ZXIgZnJvbSAnLi9MaWdodGVyJ1xuaW1wb3J0IEx1eHVyeUl0ZW0gZnJvbSAnLi9MdXh1cnlJdGVtJ1xuaW1wb3J0IE1hcmJsZXMgZnJvbSAnLi9NYXJibGVzJ1xuaW1wb3J0IE1hcmtlciBmcm9tICcuL01hcmtlcidcbmltcG9ydCBNYXRjaGJvb2sgZnJvbSAnLi9NYXRjaGJvb2snXG5pbXBvcnQgTW9ub2N1bGFyIGZyb20gJy4vTW9ub2N1bGFyJ1xuaW1wb3J0IE11c2ljYWxJbnN0cnVtZW50IGZyb20gJy4vTXVzaWNhbEluc3RydW1lbnQnXG5pbXBvcnQgTXlsYXJCbGFua2V0IGZyb20gJy4vTXlsYXJCbGFua2V0J1xuaW1wb3J0IE5vdGVib29rIGZyb20gJy4vTm90ZWJvb2snXG5pbXBvcnQgUGFkbG9jayBmcm9tICcuL1BhZGxvY2snXG5pbXBvcnQgUGFyYWNvcmQgZnJvbSAnLi9QYXJhY29yZCdcbmltcG9ydCBQZXBwZXJTcHJheSBmcm9tICcuL1BlcHBlclNwcmF5J1xuaW1wb3J0IFBvY2tldE1pcnJvciBmcm9tICcuL1BvY2tldE1pcnJvcidcbmltcG9ydCBSYXRUcmFwIGZyb20gJy4vUmF0VHJhcCdcbmltcG9ydCBSb2FkRmxhcmUgZnJvbSAnLi9Sb2FkRmxhcmUnXG5pbXBvcnQgUm9wZSBmcm9tICcuL1JvcGUnXG5pbXBvcnQgU2thdGVib2FyZCBmcm9tICcuL1NrYXRlYm9hcmQnXG5pbXBvcnQgU2xlZXBpbmdCYWcgZnJvbSAnLi9TbGVlcGluZ0JhZydcbmltcG9ydCBTcG90dGluZ1Njb3BlIGZyb20gJy4vU3BvdHRpbmdTY29wZSdcbmltcG9ydCBUYXJwIGZyb20gJy4vVGFycCdcbmltcG9ydCBUZW50IGZyb20gJy4vVGVudCdcbmltcG9ydCBXaGV0c3RvbmUgZnJvbSAnLi9XaGV0c3RvbmUnXG5pbXBvcnQgV2hpc3RsZSBmcm9tICcuL1doaXN0bGUnXG5pbXBvcnQgWmlwVGllIGZyb20gJy4vWmlwVGllJ1xuXG5cbmNvbnN0IE1pc2NMaXN0ID0gW1xuXHRBaXJIb3JuLFxuXHRCaWN5Y2xlLFxuXHRCaW5vY3VsYXJzLFxuXHRDYWdlVHJhcCxcblx0Q2FuZGxlLFxuXHRDYW5keSxcblx0Q2hhbGssXG5cdENvbXBhc3MsXG5cdEVnZ1RpbWVyLFxuXHRGaXJlc3RpY2ssXG5cdEZpc2hpbmdQb2xlLFxuXHRGbGFyZUd1bixcblx0R3JhcHBsaW5nSG9vayxcblx0SGFtbW9jayxcblx0TGlnaHRlcixcblx0THV4dXJ5SXRlbSxcblx0TWFyYmxlcyxcblx0TWFya2VyLFxuXHRNYXRjaGJvb2ssXG5cdE1vbm9jdWxhcixcblx0TXVzaWNhbEluc3RydW1lbnQsXG5cdE15bGFyQmxhbmtldCxcblx0Tm90ZWJvb2ssXG5cdFBhZGxvY2ssXG5cdFBhcmFjb3JkLFxuXHRQZXBwZXJTcHJheSxcblx0UG9ja2V0TWlycm9yLFxuXHRSYXRUcmFwLFxuXHRSb2FkRmxhcmUsXG5cdFJvcGUsXG5cdFNrYXRlYm9hcmQsXG5cdFNsZWVwaW5nQmFnLFxuXHRTcG90dGluZ1Njb3BlLFxuXHRUYXJwLFxuXHRUZW50LFxuXHRXaGV0c3RvbmUsXG5cdFdoaXN0bGUsXG5cdFppcFRpZSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgTWlzY0xpc3QiLCJpbXBvcnQgR2VhciBmcm9tICdnZWFyL0dlYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGljYWwgZXh0ZW5kcyBHZWFyIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0ZGVzYyxcblx0XHRzeixcblx0XHRxdHlcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2MsXG5cdFx0XHRzeixcblx0XHRcdHF0eVxuXHRcdH0pXG5cdH1cbn0iLCJpbXBvcnQgTWVkaWNhbCBmcm9tICcuL01lZGljYWwnXG5cblxuY29uc3QgQmFuZGFnZSA9IG5ldyBNZWRpY2FsKHtcblx0aWQ6IGBkODg2MzIwZi1hM2I5LTQ1NzYtOWFkOS1hYTg4MmU1NTQ0ZTNgLFxuXHRuYW1lOiBgQmFuZGFnZWAsXG5cdGRlc2M6IFtcblx0XHRgKzEgTWVkaWNpbmUoRmlyc3QtQWlkKS5gLFxuXHRcdGAxIHVzZS5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmFuZGFnZSIsImltcG9ydCBNZWRpY2FsIGZyb20gJy4vTWVkaWNhbCdcblxuXG5jb25zdCBDcnV0Y2ggPSBuZXcgTWVkaWNhbCh7XG5cdGlkOiBgOWQ0YjVkN2YtNTlmZC00YTlmLWE3ZjEtNTljNjBmNGE4ZGMzYCxcblx0bmFtZTogYENydXRjaGAsXG5cdGRlc2M6IFtcblx0XHRgSGFsdmVzIExlZyBEYW1hZ2UgUGFpbiBwZW5hbHR5IHRvIFNwZWVkLmAsXG5cdF0sXG5cdHN6OiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDcnV0Y2giLCJpbXBvcnQgTWVkaWNhbCBmcm9tICcuL01lZGljYWwnXG5cblxuY29uc3QgRU1UQmFnID0gbmV3IE1lZGljYWwoe1xuXHRpZDogYGEyZmEyMzgzLWM2ZmUtNDU2OS05NjFlLTA5ZmM5ZjUzNzQwM2AsXG5cdG5hbWU6IGBFTVQgQmFnYCxcblx0ZGVzYzogW1xuXHRcdGArMyBNZWRpY2luZShGaXJzdC1BaWQpLmAsXG5cdFx0YDMwIHVzZXMuYCxcblx0XSxcblx0c3o6IDVcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVNVEJhZyIsImltcG9ydCBNZWRpY2FsIGZyb20gJy4vTWVkaWNhbCdcblxuXG5jb25zdCBGaXJzdEFpZEtpdCA9IG5ldyBNZWRpY2FsKHtcblx0aWQ6IGBhNmE2NjQ1OS1kOThjLTRkMmEtY2Q1ZC1hNzZhODNiMjI5ZDJgLFxuXHRuYW1lOiBgRmlyc3QtQWlkIEtpdGAsXG5cdGRlc2M6IFtcblx0XHRgKzEgTWVkaWNpbmUoRmlyc3QtQWlkKS5gLFxuXHRcdGA1IHVzZXMuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEZpcnN0QWlkS2l0IiwiaW1wb3J0IE1lZGljYWwgZnJvbSAnLi9NZWRpY2FsJ1xuXG5cbmNvbnN0IFByZXNzdXJlQ3VmZiA9IG5ldyBNZWRpY2FsKHtcblx0aWQ6IGA3YTVlMWQzNi1lODhlLTRjOTMtNGQxYy01MzdiYTgwMTE5YmJgLFxuXHRuYW1lOiBgUHJlc3N1cmUgQ3VmZmAsXG5cdGRlc2M6IFtcblx0XHRgKzEgTWVkaWNpbmUuYCxcblx0XSxcblx0c3o6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFByZXNzdXJlQ3VmZiIsImltcG9ydCBNZWRpY2FsIGZyb20gJy4vTWVkaWNhbCdcblxuXG5jb25zdCBTdGV0aG9zY29wZSA9IG5ldyBNZWRpY2FsKHtcblx0aWQ6IGBhNzZmODgwYy1kYTI3LTQwMWYtNDQ2My01YTE2ZjU4YTA3OTlgLFxuXHRuYW1lOiBgU3RldGhvc2NvcGVgLFxuXHRkZXNjOiBbXG5cdFx0YCsxIE1lZGljaW5lLmAsXG5cdFx0YFBlcmNlcHRpb24oSGVhcikgNiMgdGhyb3VnaCBkb29ycy5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU3RldGhvc2NvcGUiLCJpbXBvcnQgTWVkaWNhbCBmcm9tICcuL01lZGljYWwnXG5cblxuY29uc3QgU3VyZ2VyeUtpdCA9IG5ldyBNZWRpY2FsKHtcblx0aWQ6IGA1YzYzNTM3Yy05YjcwLTQ0Y2ItOTI0NC05MTFkYTczOWIwM2RgLFxuXHRuYW1lOiBgU3VyZ2VyeSBLaXRgLFxuXHRkZXNjOiBbXG5cdFx0YCszIE1lZGljaW5lKFN1cmdlcnkpLmAsXG5cdF0sXG5cdHN6OiAzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdXJnZXJ5S2l0IiwiaW1wb3J0IE1lZGljYWwgZnJvbSAnLi9NZWRpY2FsJ1xuXG5cbmNvbnN0IFRoZXJtb21ldGVyID0gbmV3IE1lZGljYWwoe1xuXHRpZDogYDVjODRjZjgwLWNiNDEtNDBkYS0wZDBkLWYwZWE3MDU2NmVlMGAsXG5cdG5hbWU6IGBUaGVybW9tZXRlcmAsXG5cdGRlc2M6IFtcblx0XHRgKzEgTWVkaWNpbmUuYCxcblx0XHRgQWNjdXJhdGVseSByZWFkcyB0ZW1wZXJhdHVyZS5gLFxuXHRdLFxuXHRzejogMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgVGhlcm1vbWV0ZXIiLCJpbXBvcnQgTWVkaWNhbCBmcm9tICcuL01lZGljYWwnXG5cblxuY29uc3QgVHJhbnNmdXNpb25LaXQgPSBuZXcgTWVkaWNhbCh7XG5cdGlkOiBgNGNjY2VjMGQtNDczMi00NDIxLWRlYzktMTJmZDg0YTU0NjExYCxcblx0bmFtZTogYFRyYW5zZnVzaW9uIEtpdGAsXG5cdGRlc2M6IFtcblx0XHRgTWVkaWNpbmUgOSMuYCxcblx0XHRgSW5mbGljdCAxIEJsZWVkaW5nIERhbWFnZSBvbiB0aGUgZG9ub3IgdG8gaGVhbCAxIEJsZWVkaW5nIERhbWFnZSBvbiB0aGUgcmVjaXBpZW50LmAsXG5cdFx0YFRha2VzIDFoci5gLFxuXHRdLFxuXHRzejogMVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVHJhbnNmdXNpb25LaXQiLCJpbXBvcnQgTWVkaWNhbCBmcm9tICcuL01lZGljYWwnXG5cblxuY29uc3QgV2F0ZXJGaWx0ZXIgPSBuZXcgTWVkaWNhbCh7XG5cdGlkOiBgZDA1NWRiNTYtODFkYi00Y2ZlLWY3MDktODVmOGRlODM1ODZhYCxcblx0bmFtZTogYFdhdGVyIEZpbHRlcmAsXG5cdGRlc2M6IFtcblx0XHRgUHVyaWZpZXMgMSBXYXRlciByYXRpb24gKC41Z2FsKSBwZXIgbWludXRlLmAsXG5cdF0sXG5cdHN6OiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBXYXRlckZpbHRlciIsImltcG9ydCBCYW5kYWdlIGZyb20gJy4vQmFuZGFnZSdcbmltcG9ydCBDcnV0Y2ggZnJvbSAnLi9DcnV0Y2gnXG5pbXBvcnQgRU1UQmFnIGZyb20gJy4vRU1UQmFnJ1xuaW1wb3J0IEZpcnN0QWlkS2l0IGZyb20gJy4vRmlyc3RBaWRLaXQnXG5pbXBvcnQgUHJlc3N1cmVDdWZmIGZyb20gJy4vUHJlc3N1cmVDdWZmJ1xuaW1wb3J0IFN0ZXRob3Njb3BlIGZyb20gJy4vU3RldGhvc2NvcGUnXG5pbXBvcnQgU3VyZ2VyeUtpdCBmcm9tICcuL1N1cmdlcnlLaXQnXG5pbXBvcnQgVGhlcm1vbWV0ZXIgZnJvbSAnLi9UaGVybW9tZXRlcidcbmltcG9ydCBUcmFuc2Z1c2lvbktpdCBmcm9tICcuL1RyYW5zZnVzaW9uS2l0J1xuaW1wb3J0IFdhdGVyRmlsdGVyIGZyb20gJy4vV2F0ZXJGaWx0ZXInXG5cblxuY29uc3QgTWVkaWNhbExpc3QgPSBbXG5cdEJhbmRhZ2UsXG5cdENydXRjaCxcblx0RU1UQmFnLFxuXHRGaXJzdEFpZEtpdCxcblx0UHJlc3N1cmVDdWZmLFxuXHRTdGV0aG9zY29wZSxcblx0U3VyZ2VyeUtpdCxcblx0VGhlcm1vbWV0ZXIsXG5cdFRyYW5zZnVzaW9uS2l0LFxuXHRXYXRlckZpbHRlcixcbl1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWNhbExpc3QiLCJpbXBvcnQgR2VhciBmcm9tICdnZWFyL0dlYXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2UgZXh0ZW5kcyBHZWFyIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdGlkLFxuXHRcdG5hbWUsXG5cdFx0ZGVzYyxcblx0XHRzeixcblx0XHRxdHksXG5cdFx0c2xvdHNcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2MsXG5cdFx0XHRzeixcblx0XHRcdHF0eVxuXHRcdH0pXG5cdFx0dGhpcy5zbG90cyA9IHNsb3RzXG5cdH1cbn0iLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgQmFja3BhY2sgPSBuZXcgU3RvcmFnZSh7XG5cdGlkOiBgN2NhZWE3ZjktMmRkNi00YTk4LThkNmMtODk5ZDY2ZTczNGU3YCxcblx0bmFtZTogYEJhY2twYWNrYCxcblx0ZGVzYzogW1xuXHRcdGAyIHJvdW5kcyB0byBhY2Nlc3MuYCxcblx0XSxcblx0c3o6IDEsXG5cdHNsb3RzOiAzMFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmFja3BhY2siLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgQmFuZG9sZWVyID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYGRkYjQxZjY0LWEwZmEtNDNlOC1hNGNjLTYwZWIyOTMyZTgyYmAsXG5cdG5hbWU6IGBCYW5kb2xlZXJgLFxuXHRkZXNjOiBbXG5cdFx0YEhvbGRzIDUwIGJ1bGxldHMgb2YgYW55IGNhbGliZXIuYCxcblx0XSxcblx0c3o6IDAsXG5cdHNsb3RzOiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBCYW5kb2xlZXIiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgQkRVSmFja2V0ID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYDQyODhlN2E4LTAxYzAtNDlhYS04MDkzLTBiZmFhZDNmOTAxMWAsXG5cdG5hbWU6IGBCRFUgSmFja2V0YCxcblx0ZGVzYzogW1xuXHRcdGBDYW1vLmAsXG5cdF0sXG5cdHN6OiAwLFxuXHRzbG90czogNFxufSlcblxuZXhwb3J0IGRlZmF1bHQgQkRVSmFja2V0IiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJ1xuXG5cbmNvbnN0IENhcmdvUGFudHMgPSBuZXcgU3RvcmFnZSh7XG5cdGlkOiBgNTEyMGQxM2UtZDg1ZC00ZjU4LWE3NGUtZTlhMWQyZDVjNGMyYCxcblx0bmFtZTogYENhcmdvIFBhbnRzYCxcblx0ZGVzYzogW1xuXHRcdGBDYW1vLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRzbG90czogNlxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZ29QYW50cyIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBDYW50ZWVuID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYGE2MWUyMGE0LTg5YzgtNDM4ZS1iNDgzLTlkYTRkZTkzZDExMmAsXG5cdG5hbWU6IGBDYW50ZWVuYCxcblx0ZGVzYzogW1xuXHRcdGBIb2xkcyAxIHVuaXQgKC41Z2FsKSBvZiBsaXF1aWQuYCxcblx0XHRgTWV0YWwuYCxcblx0XSxcblx0c3o6IDEsXG5cdHNsb3RzOiAxXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDYW50ZWVuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJ1xuXG5cbmNvbnN0IENvbmNlYWxlZEhvbHN0ZXIgPSBuZXcgU3RvcmFnZSh7XG5cdGlkOiBgNDc5NmQ3ZDktMTVhZC00ZDRmLTllNWMtZjg1OTQ0YTlkZTQxYCxcblx0bmFtZTogYENvbmNlYWxlZCBIb2xzdGVyYCxcblx0ZGVzYzogW1xuXHRcdGBQZXJjZXB0aW9uIDEyIyB0byBzcG90IGEgU2l6ZSAxIEd1bi5gLFxuXHRdLFxuXHRzejogMCxcblx0c2xvdHM6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvbmNlYWxlZEhvbHN0ZXIiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgQ29vbGVyID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYDMzMDVkNGMwLTEwNDktNDhmZC1hNDc4LTc2ZjQ4NzI4MGY3MWAsXG5cdG5hbWU6IGBDb29sZXJgLFxuXHRkZXNjOiBbXG5cdFx0YEh1bnRlZCBvciBGb3JhZ2VkIEZvb2QgbGFzdHMgNiBkYXlzLmAsXG5cdF0sXG5cdHN6OiA0LFxuXHRzbG90czogMzBcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvb2xlciIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBEdWZmZWxCYWcgPSBuZXcgU3RvcmFnZSh7XG5cdGlkOiBgOGIyZmVlZTUtYjljOS00YTBlLTllOWItYzQ5NzFkZTY2OWMzYCxcblx0bmFtZTogYER1ZmZlbCBCYWdgLFxuXHRkZXNjOiBbXG5cdFx0YDIgcm91bmRzIHRvIGFjY2Vzcy5gLFxuXHRdLFxuXHRzejogMyxcblx0c2xvdHM6IDQwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBEdWZmZWxCYWciLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgRnVlbENhbiA9IG5ldyBTdG9yYWdlKHtcblx0aWQ6IGA0MmRiNjdhMC1lOWExLTQ0ZmUtOTliYS1lNWM2MmE5ODZiZWNgLFxuXHRuYW1lOiBgRnVlbCBDYW5gLFxuXHRkZXNjOiBbXG5cdFx0YDVnYWwgRnVlbC5gLFxuXHRcdGBkNiBGaXJlIERhbWFnZS9nYWwsIDFtaW4sIDF5ZC9nYWwgQmxhc3QuYCxcblx0XSxcblx0c3o6IDIsXG5cdHNsb3RzOiA1XG59KVxuXG5leHBvcnQgZGVmYXVsdCBGdWVsQ2FuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJ1xuXG5cbmNvbnN0IEhvb2R5ID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYGNmNjViMjNiLTcwNmQtNDM4Yi1iODlkLTMxZTRlYjhlNjMyOWAsXG5cdG5hbWU6IGBIb29keWAsXG5cdGRlc2M6IFtcblx0XHRgQ29sZCBSZXNpc3RhbmNlLmAsXG5cdF0sXG5cdHN6OiAwLFxuXHRzbG90czogMlxufSlcblxuZXhwb3J0IGRlZmF1bHQgSG9vZHkiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgSHlkcmF0aW9uUGFjayA9IG5ldyBTdG9yYWdlKHtcblx0aWQ6IGA1Mjg3ZmU2Ny0zODZmLTQzZTEtOWU2NS01YmU1Mjc3Njk5OTBgLFxuXHRuYW1lOiBgSHlkcmF0aW9uIFBhY2tgLFxuXHRkZXNjOiBbXG5cdFx0YEhvbGRzIDQgdW5pdHMgKDJnYWwpIG9mIGxpcXVpZC5gLFxuXHRdLFxuXHRzejogMSxcblx0c2xvdHM6IDRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEh5ZHJhdGlvblBhY2siLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgTG9ja2JveCA9IG5ldyBTdG9yYWdlKHtcblx0aWQ6IGA4NGExNDVlMC01MWI0LTQyM2ItYmIzOS0yZWY5NjcyYTE3NjhgLFxuXHRuYW1lOiBgTG9ja2JveGAsXG5cdGRlc2M6IFtcblx0XHRgMiBEYW1hZ2UgUmVzaXN0YW5jZS5gLFxuXHRcdGBGaXJlIFJlc2lzdGFuY2UuYCxcblx0XHRgTGFyY2VueShEaXNhYmxlKSA5Iy5gLFxuXHRdLFxuXHRzejogMixcblx0c2xvdHM6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExvY2tib3giLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgTWVzc2VuZ2VyQmFnID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYDYwMDJlMTIwLThkM2MtNDQ4YS1hNmNmLWU5NmE1M2U5Y2Q1ZGAsXG5cdG5hbWU6IGBNZXNzZW5nZXIgQmFnYCxcblx0ZGVzYzogW1xuXHRcdGAxIHJvdW5kIHRvIGFjY2Vzcy5gLFxuXHRdLFxuXHRzejogMixcblx0c2xvdHM6IDRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NlbmdlckJhZyIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBQbGFzdGljSnVnID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYDg0OTQzYTU0LTI0OWQtNGE2ZS1iMzc0LWM0ZjRiODUzMDAzY2AsXG5cdG5hbWU6IGBQbGFzdGljIEp1Z2AsXG5cdGRlc2M6IFtcblx0XHRgSG9sZHMgMiB1bml0cyAoMWdhbCkgb2YgbGlxdWlkLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRzbG90czogMlxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGxhc3RpY0p1ZyIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBQdXJzZSA9IG5ldyBTdG9yYWdlKHtcblx0aWQ6IGA3YWJkZjYwMS01ZDM3LTRkMDQtOTE4Ny02YzE0NWY2NGFhNzJgLFxuXHRuYW1lOiBgUHVyc2VgLFxuXHRkZXNjOiBbXG5cdFx0YDEgcm91bmQgdG8gYWNjZXNzLmAsXG5cdF0sXG5cdHN6OiAxLFxuXHRzbG90czogM1xufSlcblxuZXhwb3J0IGRlZmF1bHQgUHVyc2UiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnXG5cblxuY29uc3QgU3BlZWRsb2FkZXIgPSBuZXcgU3RvcmFnZSh7XG5cdGlkOiBgMTEyMjQ5NDItM2IwMi00MTJhLWE4ZjUtMjk0Y2NlZGQ4ZDE1YCxcblx0bmFtZTogYFNwZWVkLWxvYWRlcmAsXG5cdGRlc2M6IFtcblx0XHRgUmVsb2FkIGEgcmV2b2x2ZXIgY3lsaW5kZXIgYXMgMSBhY3Rpb24uYCxcblx0XSxcblx0c3o6IDAsXG5cdHNsb3RzOiAwXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTcGVlZGxvYWRlciIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBUb29sQmVsdCA9IG5ldyBTdG9yYWdlKHtcblx0aWQ6IGBmODJmZWM3NC04MjdhLTRjZTctOTg4ZS1kM2Y3YzRkYTJhZWNgLFxuXHRuYW1lOiBgVG9vbCBCZWx0YCxcblx0ZGVzYzogW1xuXHRcdGA2eCAxIFNsb3RzLmAsXG5cdFx0YCsxIEJ1aWxkLmAsXG5cdFx0YE1pc2NlbGxhbmVvdXMgc21hbGwgdG9vbHMuYCxcblx0XSxcblx0c3o6IDIsXG5cdHNsb3RzOiA2XG59KVxuXG5leHBvcnQgZGVmYXVsdCBUb29sQmVsdCIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSdcblxuXG5jb25zdCBUcmVuY2hDb2F0ID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYGZiY2YwYmViLTAxYzUtNDQzZC1iODZmLTY5ZTBhODkwNzhlNGAsXG5cdG5hbWU6IGBUcmVuY2ggQ29hdGAsXG5cdGRlc2M6IFtcblx0XHRgQ29sZCBSZXNpc3RhbmNlLmAsXG5cdFx0YCsxIFN0ZWFsdGguYCxcblx0XSxcblx0c3o6IDEsXG5cdHNsb3RzOiA0XG59KVxuXG5leHBvcnQgZGVmYXVsdCBUcmVuY2hDb2F0IiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJ1xuXG5cbmNvbnN0IFdhdGVyQm90dGxlID0gbmV3IFN0b3JhZ2Uoe1xuXHRpZDogYGNlMjhmYTI2LTg0OTctNDIzNC1iMmRmLTJiMDU2MGY4ZDc2YmAsXG5cdG5hbWU6IGBXYXRlciBCb3R0bGVgLFxuXHRkZXNjOiBbXG5cdFx0YEhvbGRzIDEgdW5pdCAoLjVnYWwpIG9mIGxpcXVpZC5gLFxuXHRdLFxuXHRzejogMSxcblx0c2xvdHM6IDFcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyQm90dGxlIiwiaW1wb3J0IEJhY2twYWNrIGZyb20gJy4vQmFja3BhY2snXG5pbXBvcnQgQmFuZG9sZWVyIGZyb20gJy4vQmFuZG9sZWVyJ1xuaW1wb3J0IEJEVUphY2tldCBmcm9tICcuL0JEVUphY2tldCdcbmltcG9ydCBDYXJnb1BhbnRzIGZyb20gJy4vQ2FyZ29QYW50cydcbmltcG9ydCBDYW50ZWVuIGZyb20gJy4vQ2FudGVlbidcbmltcG9ydCBDb25jZWFsZWRIb2xzdGVyIGZyb20gJy4vQ29uY2VhbGVkSG9sc3RlcidcbmltcG9ydCBDb29sZXIgZnJvbSAnLi9Db29sZXInXG5pbXBvcnQgRHVmZmVsQmFnIGZyb20gJy4vRHVmZmVsQmFnJ1xuaW1wb3J0IEZ1ZWxDYW4gZnJvbSAnLi9GdWVsQ2FuJ1xuaW1wb3J0IEhvb2R5IGZyb20gJy4vSG9vZHknXG5pbXBvcnQgSHlkcmF0aW9uUGFjayBmcm9tICcuL0h5ZHJhdGlvblBhY2snXG5pbXBvcnQgTG9ja2JveCBmcm9tICcuL0xvY2tib3gnXG5pbXBvcnQgTWVzc2VuZ2VyQmFnIGZyb20gJy4vTWVzc2VuZ2VyQmFnJ1xuaW1wb3J0IFBsYXN0aWNKdWcgZnJvbSAnLi9QbGFzdGljSnVnJ1xuaW1wb3J0IFB1cnNlIGZyb20gJy4vUHVyc2UnXG5pbXBvcnQgU3BlZWRsb2FkZXIgZnJvbSAnLi9TcGVlZGxvYWRlcidcbmltcG9ydCBUb29sQmVsdCBmcm9tICcuL1Rvb2xCZWx0J1xuaW1wb3J0IFRyZW5jaENvYXQgZnJvbSAnLi9UcmVuY2hDb2F0J1xuaW1wb3J0IFdhdGVyQm90dGxlIGZyb20gJy4vV2F0ZXJCb3R0bGUnXG5cblxuY29uc3QgU3RvcmFnZUxpc3QgPSBbXG5cdEJhY2twYWNrLFxuXHRCYW5kb2xlZXIsXG5cdEJEVUphY2tldCxcblx0Q2FyZ29QYW50cyxcblx0Q2FudGVlbixcblx0Q29uY2VhbGVkSG9sc3Rlcixcblx0Q29vbGVyLFxuXHREdWZmZWxCYWcsXG5cdEZ1ZWxDYW4sXG5cdEhvb2R5LFxuXHRIeWRyYXRpb25QYWNrLFxuXHRMb2NrYm94LFxuXHRNZXNzZW5nZXJCYWcsXG5cdFBsYXN0aWNKdWcsXG5cdFB1cnNlLFxuXHRTcGVlZGxvYWRlcixcblx0VG9vbEJlbHQsXG5cdFRyZW5jaENvYXQsXG5cdFdhdGVyQm90dGxlLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlTGlzdCJdLCJuYW1lcyI6WyJCb29rT2ZOaW5qYSJdLCJtYXBwaW5ncyI6Ijs7QUFFZSxNQUFNLElBQUksU0FBUyxVQUFVLENBQUM7QUFDN0MsQ0FBQyxXQUFXLENBQUM7QUFDYixFQUFFLEVBQUU7QUFDSixFQUFFLElBQUk7QUFDTixFQUFFLElBQUk7QUFDTixFQUFFLEVBQUU7QUFDSixFQUFFLEdBQUc7QUFDTCxFQUFFLElBQUk7QUFDTixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDUixFQUFFLEVBQUU7QUFDSixFQUFFLEtBQUssQ0FBQztBQUNSLEdBQUcsRUFBRTtBQUNMLEdBQUcsSUFBSTtBQUNQLEdBQUcsSUFBSTtBQUNQLEdBQUcsRUFBRTtBQUNMLEdBQUcsR0FBRztBQUNOLEdBQUcsSUFBSTtBQUNQLEdBQUcsRUFBQztBQUNKLEVBQUUsSUFBSSxDQUFDLEdBQUcs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
