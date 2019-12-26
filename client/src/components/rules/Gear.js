import Rule from './rule'


export default class Gear extends Rule {
	constructor(name, description, sz) {
		super(name, description)
		this.sz = sz
	}
}


class Accessory extends Gear {
	constructor(name, description, sz) {
		super(name, description, sz)
	}
}

export const Bayonet = new Accessory(`Bayonet`, `Knife. +1 DMG and Pierce for MATKs.`, 1)
export const Bipod = new Accessory(`Bipod`, `Ignore Size requirement. 1rnd setup.`, 1)
export const DrumMagazine = new Accessory(`Drum Magazine`, `Gun specific. 3x Ammo magazine capacity.`, 1)
export const Foregrip = new Accessory(`Foregrip`, `-1 Size requirement for 2h Gun.`, 0)
export const Holosight = new Accessory(`Holosight`, `+1 RATK.`, 0)
export const Laser = new Accessory(`Laser`, `+1 RATK. -6 RATK to Blind for d6rnds.`, 0)
export const Scope = new Accessory(`Scope`, `+3 Aimed RATKs and Perception(See).`, 1)
export const SinglePointSling = new Accessory(`Single-Point Sling`, `Draw or stow a 2h Gun without using an Action.`, 0)
export const Suppressor = new Accessory(`Suppressor`, `Firing a Gun does not break Concealment.`, 0)

export const AccessoryList = [
	Bayonet,
	Bipod,
	DrumMagazine,
	Foregrip,
	Holosight,
	Laser,
	Scope,
	SinglePointSling,
	Suppressor
]


class Ammo extends Gear {
	constructor(description, sz, cal, type) {
		super(name, description, sz)
		this.cal = cal
		this.type = type
		this.name = `${cal} ${type}`
	}
}

export const ArrowBroadhead = new Ammo(`+1 DMG. Pierce.`, .1, `Arrow`, `Broadhead`)
export const ArrowStandard = new Ammo(`Basic ammo.`, .1, `Arrow`, `Standard`)
export const Standard22 = new Ammo(`Basic ammo.`, .005, `.22`, `Standard`)
export const HollowPoint22 = new Ammo(`+1 DMG.`, .005, `.22`, `Hollow Point`)
export const Match22 = new Ammo(`+1 RATK.`, .005, `.22`, `Match`)
export const Standard9mm = new Ammo(`Basic ammo.`, .01, `9mm`, `Standard`)
export const HollowPoint9mm = new Ammo(`+1 DMG.`, .01, `9mm`, `Hollow Point`)
export const Match9mm = new Ammo(`+1 RATK.`, .01, `9mm`, `Match`)
export const Standard357 = new Ammo(`Basic ammo.`, .01, `.357`, `Standard`)
export const HollowPoint357 = new Ammo(`+1 DMG.`, .01, `.357`, `Hollow Point`)
export const ArmorPiercing556 = new Ammo(`Pierce.`, .02, `5.56`, `Armor Piercing`)
export const Standard556 = new Ammo(`Basic ammo.`, .02, `5.56`, `Standard`)
export const HollowPoint556 = new Ammo(`+1 DMG.`, .02, `5.56`, `Hollow Point`)
export const Match556 = new Ammo(`+1 RATK.`, .02, `5.56`, `Match`)
export const ArmorPiercing308 = new Ammo(`Pierce.`, .02, `.308`, `Armor Piercing`)
export const Standard308 = new Ammo(`Basic ammo.`, .02, `.308`, `Standard`)
export const HollowPoint308 = new Ammo(`+1 DMG.`, .02, `.308`, `Hollow Point`)
export const Match308 = new Ammo(`+1 RATK.`, .02, `.308`, `Match`)
export const Buckshot12g = new Ammo(`Scatter.`, .05, `12g`, `Buckshot`)
export const Slug12g = new Ammo(`RNG x2.`, .05, `12g`, `Slug`)

export const AmmoList = [
	ArrowBroadhead,
	ArrowStandard,
	Standard22,
	HollowPoint22,
	Match22,
	Standard9mm,
	HollowPoint9mm,
	Match9mm,
	Standard357,
	HollowPoint357,
	ArmorPiercing556,
	Standard556,
	HollowPoint556,
	Match556,
	ArmorPiercing308,
	Standard308,
	HollowPoint308,
	Match308,
	Match308,
	Buckshot12g,
	Slug12g
]

// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RATK.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3FDMG/rnd for 3rnds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),


class Armor extends Gear {
	constructor(name, description, sz, dr, loc) {
		super(name, description, sz)
		this.dr = dr
		this.loc = loc
	}
}

export const AthleticHelmet = new Armor(`Athletic Helmet`, [], 2, 1, `Head`)
export const AthleticPads = new Armor(`Athletic Pads`, [], 2, 1, `Torso`)
export const CombatHelmet = new Armor(`Combat Helmet`, [`Camo`], 2, 3, `Head`)
export const Coveralls = new Armor(`Coveralls`, [`Camo`, `CR`], 3, 1, `Arms, Torso, Legs`)
export const FirefighterSuit = new Armor(`Firefighter Suit`, 2, `Full Body`, [`CR`, `FR`, `Mask`], 5)
export const FlakJacket = new Armor(`Flak Jacket`, [`Camo`], 4, 2, `Torso`)
export const GhillieSuit = new Armor(`Ghillie Suit`, [`Camo`, `CR`], 4, 1, `Full Body`)
export const HikingBoots = new Armor(`Hiking Boots`, [`CR`, `FR`], 2, 1, `Legs`)
export const KevlarVest = new Armor(`Kevlar Vest`, [`CR`, `FR`], 4, 3, `Torso`)
export const LeatherJacket = new Armor(`Leather Jacket`, [], 2, 1, `Arms, Torso`)
export const MotorcycleHelmet = new Armor(`Motorcycle Helmet`, [`FR`, `Mask`], 2, 1, `Head`)
export const HazmatSuit = new Armor(`Hazmat Suit`, [`Mask`, `Impermeable`], 2, 0, `Full Body`)
export const PlateCarrier = new Armor(`Plate Carrier`, [`Camo`, `CR`, `FR`], 4, 4, `Torso`)
export const WinterCoat = new Armor(`Winter Coat`, [`CR`], 2, 1, `Arms, Torso`)
export const WorkGloves = new Armor(`Work Gloves`, [`FR`], 1, 1, `Arms`)

export const ArmorList = [
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


class Attribute extends Rule {
	constructor(name, description) {
		super(name, description)
	}
}

class AmmoAttribute extends Attribute {
	constructor(name, description, calibers) {
		super(name, description)
		this.calibers = calibers
	}
}

export const ArmorPiercing = new AmmoAttribute('Armor Piercing', ['Pierce.'], ['5.56', '.308'])
export const Broadhead = new AmmoAttribute('Broadhead', ['+1 DMG. Pierce'], ['Arrow'])
export const Buckshot = new AmmoAttribute('Buckshot', ['Scatter.'], ['12g'])
export const HollowPoint = new AmmoAttribute('Hollow Point', ['+1 DMG.'], ['.22', '9mm', '.357', '5.56', '.308', '12g'])
export const Match = new AmmoAttribute('Match', ['+1 RATK.'], ['.22', '9mm', '.357', '5.56', '.308'])
export const Slug = new AmmoAttribute('Slug', ['RNG x2.'], ['12g'])

export const AmmoAttributesList = [
	ArmorPiercing,
	Broadhead,
	Buckshot,
	HollowPoint,
	Match,
	Slug
]

class ArmorAttribute extends Attribute {
	constructor(name, description) {
		super(name, description)
	}
}

export const Camo = new ArmorAttribute('Camo', ['+1 Stealth per Location when in a given Biome.'])
export const CR = new ArmorAttribute('CR', ['Delay Hypothermia for 1hr per Location.'])
export const FR = new ArmorAttribute('FR', ['Armor DR reduces FDMG.'])
export const Impermeable = new ArmorAttribute('Impermeable', ['Automatic Success to resist exposure to Diseases and Toxins.'])
export const Mask = new ArmorAttribute('Mask', ['Obscures identity and protects face. -1 Perception.'])

export const ArmorAttributesList = [
	Camo,
	CR,
	FR,
	Impermeable,
	Mask
]

class WeaponAttribute extends Attribute {
	constructor(name, description) {
		super(name, description)
	}
}

export const OneHanded = new WeaponAttribute('1h', ['Used one-handed. +1 RATK if used with both hands.'])
export const TwoHanded = new WeaponAttribute('2h', ['Used two-handed. Penalty = [Sz] if used one-handed.'])
export const Auto = new WeaponAttribute('Auto', ['[+3 RATK vs one target] or 3yd Blast. Uses 10 bullets.'])
export const Blast = new WeaponAttribute('Blast', ['[d6 vs Reflex] in radius. [DMG / 2] on a miss (mininum 1).'])
export const Blunt = new WeaponAttribute('Blunt', ['Does not cause Bleeding.'])
export const Chop = new WeaponAttribute('Chop', ['+1 DMG to Locations with no Armor.'])
export const FDMG = new WeaponAttribute('FDMG', ['Fire DMG. FDMG can only be prevented with FR Armor.'])
export const Pierce = new WeaponAttribute('Pierce', ['+1 DMG to Locations with Armor.'])
export const Rapid = new WeaponAttribute('Rapid', ['2 ATKS for 1 Action.'])
export const Sawnoff = new WeaponAttribute('Sawn-off', ['[RNG / 2] and -1 Size.'])
export const Scatter = new WeaponAttribute('Scatter', ['Ignore RNG penalties. -1 DMG per extended RNG.'])
export const Slow = new WeaponAttribute('Slow', ['Penalty to Initiative = Size.'])

export const WeaponAttributesList = [
	OneHanded,
	TwoHanded,
	Auto,
	Blast,
	Blunt,
	Chop,
	FDMG,
	Pierce,
	Rapid,
	Sawnoff,
	Scatter,
	Slow
]


class Bomb extends Gear {
	constructor(name, description, sz, mix, dmg, blast, duration) {
		super(name, description, sz)
		this.mix = mix
		this.dmg = dmg
		this.blast = blast
		this.duration = duration
	}
}

export const Flashbang = new Bomb(`Flashbang`, [`1rnd fuse. Blind. Stun.`], 1, 9, `0`, `6yd`, `d6rnds`)
export const Frag = new Bomb(`Frag`, [`1rnd fuse. Pierce.`], 1, 9, `d6x3`, `15yd`, `instant`)
export const Molotov = new Bomb(`Molotov`, [`1FDMG/rnd.`], 2, 1, `d6`, `3yd`, `1min`)
export const Smoke = new Bomb(`Smoke`, [`Blind.`], 1, 3, `0`, `1yd/rnd`, `d6mins`)
export const Teargas = new Bomb(`Teargas`, [`Blind. Suffocation`], 1, 15, `1`, `1yd/rnd`, `d6mins`)
export const Thermite = new Bomb(`Thermite`, [`1rnd fuse. FDMG.`], 1, 6, `d6x6`, `1yd`, `6rnds`)

export const BombList = [
	Flashbang,
	Frag,
	Molotov,
	Smoke,
	Teargas,
	Thermite
]

// OLD BOMBS
// new Bomb(`Chlorine`,	18, `toxin`,	`1yd/rnd`,  `d6+3mins`, `Blind. Suffocation x2. Stun.`, 1)
// new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10rnd fuse.`,				  1)
// new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3rnds`, `Mimics sound of gunfire.`,	 0)
// new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. RNG:50. Blind.`,	  1)


class Document extends Gear {
	constructor(name, description, sz) {
		super(name, description, sz)
	}
}

export const BodyInBalance = new Document(`Body in Balance`, [`+1 Athletics`], 1)
export const BookOfNinja = new Document(`Book of Ninja`, [`+1 Stealth`], 1)
export const DefensiveDriving = new Document(`Defensive Driving`, [`+1 Drive`], 1)
export const DogTricks = new Document(`Dog Tricks`, [`+1 Tame`], 1)
export const EffectiveHabits = new Document(`Effective Habits`, [`+1 to any one Skill`], 1)
export const EngineeringConcepts = new Document(`Engineering Concepts`, [`+1 Build`], 1)
export const GeneralScienceKnowledge = new Document(`General Science Knowledge`, [`+1 Science`], 1)
export const GraysAnatomy = new Document(`Gray\`s Anatomy`, [`+1 Medicine`], 1)
export const HomeSecurity = new Document(`Home Security`, [`+1 Larceny`], 1)
export const HowToWinFriends = new Document(`How to Win Friends`, [`+1 Socialize`], 1)
export const HowYogaWorks = new Document(`How Yoga Works`, [`+1 Acrobatics`], 1)
export const LeadershipBasics = new Document(`Leadership Basics`, [`+1 Leadership`], 1)
export const PersonalDefense = new Document(`Personal Defense`, [`+1 Ranged`], 1)
export const SASSurvivalGuide = new Document(`SAS Survival Guide`, [`+1 Survival`], 1)
export const StandupComedy = new Document(`Stand-up Comedy`, [`+1 Entertain`], 1)
export const TaoOfJeetKuneDo = new Document(`Tao of Jeet Kune Do`, [`+1 Melee`], 1)
export const YellowPags = new Document(`Yellow Pages`, [`+1 Scavenging. Regional.`], 1)
export const ZenMind = new Document(`Zen Mind`, [`+1 Perception`], 1)
export const BilingualDictionary = new Document(`Bilingual Dictionary`, [`Multilingual Ability`], 1)
export const ClassicNovel = new Document(`Classic Novel`, [`+1 Psyche`], 1)
export const HolyBook = new Document(`Holy Book`, [`-1 Psyche`], 1)
export const MapAtlas = new Document(`Map (Atlas)`, [`+1 Survival(Navigate)`], 1)
export const MapLocal = new Document(`Map (Local)`, [`+1 Survival(Navigate). Regional.`], 0)
export const MapTopographic = new Document(`Map (Topographic)`, [`+3 Survival(Navigate). Regional.`], 0)

export const DocumentList = [
	BodyInBalance,
	BookOfNinja,
	DefensiveDriving,
	DogTricks,
	EffectiveHabits,
	EngineeringConcepts,
	GeneralScienceKnowledge,
	GraysAnatomy,
	HomeSecurity,
	HowToWinFriends,
	HowYogaWorks,
	LeadershipBasics,
	PersonalDefense,
	SASSurvivalGuide,
	StandupComedy,
	TaoOfJeetKuneDo,
	YellowPags,
	ZenMind,
	BilingualDictionary,
	ClassicNovel,
	HolyBook,
	MapAtlas,
	MapLocal,
	MapTopographic
]


class Drug extends Gear {
	constructor (name, description, sz, mix, overdose) {
		super(name, description, sz)
		this.mix = mix
		this.overdose = overdose
	}
}

export const Alcohol = new Drug(`Alcohol`, [`Antibiotic or Fuel. C9# or Unstable.`], 1, 9, true)
export const Antibiotic = new Drug(`Antibiotic`, [`Prevents infection in Recovery for 1 day.`], 0, 12, false)
export const Hallucinogen = new Drug(`Hallucinogen`, [`+1 Perform and Tame. -3 all other rolls. -1 Psyche.`], 0, 15, false)
export const Painkiller = new Drug(`Painkiller`, [`Ignore 1 Pain penalty.`], 0, 9, true)
export const Sedative = new Drug(`Sedative`, [`D#6/rnd to take any action.`], 0, 12, true)
export const Stimulant = new Drug(`Stimulant`, [`Ignore Exhaustion penalties for 6hrs.`], 0, 9, true)

export const DrugsList = [
	Alcohol,
	Antibiotic,
	Hallucinogen,
	Painkiller,
	Sedative,
	Stimulant
]

// OLD DRUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6rnds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/rnd for 5rnds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Rescuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)


class Electronic extends Gear {
	constructor (name, hours, description, sz) {
		super(name, description, sz)
		this.hours = hours
	}
}

export const Cellphone = new Electronic(`Cellphone`, [`1yd light, camera, remote control.`], 1, 3)
export const EmergencyRadio = new Electronic(`Emergency Radio`, [`AM/FM/Shortwave. 1yd light.`], 1, 6)
export const Flashlight = new Electronic(`Flashlight`, [`10yd light. -3 RATK to Blind 1rnd.`], 1, 3)
export const GeigerCounter = new Electronic(`Geiger Counter`, [`Science 6# to detect Radiation in 1yd.`], 2, 24)
export const HandRadio = new Electronic(`Hand Radio`, [`9-channel 2-way radio. 3 mile range.`], 1, 9)
export const Headlamp = new Electronic(`Headlamp`, [`3yd light. Hands free.`], 0, 3)
export const Lantern = new Electronic(`Lantern`, [`3yd light radius.`], 2, 6)
export const Megaphone = new Electronic(`Megaphone`, [`+1 Leadership when speaking to a crowd.`], 2, 12)
export const Multimeter = new Electronic(`Multimeter`, [`+3 Science(Technology). Detect voltage.`], 1, 48)
export const NightvisionGoggles = new Electronic(`Nightvision Goggles`, [`Ignore Visibility penalties in darkness.`], 1, 36)
export const QuadcopterDrone = new Electronic(`Quadcopter Drone`, [`Science 6# to use. Camera. 90yd Speed.`], 2, .25)
export const RCCar = new Electronic(`RC Car`, [`Science 3# to use. 45yd Speed.`], 3, .5)
export const SolarLamp = new Electronic(`Solar Lamp`, [`1yd light radius. 1day charge.`], 1, 9)
export const StunGun = new Electronic(`Stun Gun`, [`MATK. C9# or Stun for 1rnd.`], 1, .25)

export const ElectronicsList = [
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
	StunGun
]

// OLD ELECTRONICS
//  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)


class Equipment extends Gear {
	constructor(name, description, sz) {
		super(name, description, sz)
	}
}

export const AirHorn = new Equipment(`Air Horn`, [`Emits a loud shriek up to a 1 mile radius.`], 1)
export const Balaclava = new Equipment(`Balaclava`, [`+1 Stealth. Mask. CR.`], 0)
export const Bandanna = new Equipment(`Bandanna`, [`+1 C vs airborne toxins. Can use as Bandage.`], 0)
export const BaseballCap = new Equipment(`Baseball Cap`, `Reduce Visibility(Rain and Sun) penalty by 1.`,	0)
export const Bicycle = new Equipment(`Bicycle`, [`Athletics 3#. Speed x3yds (x.7mph). 2h.`], 8)
export const Binoculars = new Equipment(`Binoculars`, [`+3 Perception(See) at 50+yds.`], 1)
export const BobbyPin = new Equipment(`Bobby Pin`, [`Allows Larceny(Disable) roll on key locks.`], 0)
export const BoltCutters = new Equipment(`Bolt Cutters`, [`C9# to cut metal (Handcuffs, Padlocks, etc).`], 3)
export const CageTrap = new Equipment(`Cage Trap`, [`+3 Survival(Forage). Takes 1day.`], 6)
export const Candle = new Equipment(`Candle`, [`1yd light radius for 6hrs.`], 0)
export const Candy = new Equipment(`Candy`, [`Restores 1 Luck point. 1/day.`], 0)
export const Carabiner = new Equipment(`Carabiner`, [`+1 Athletics(Climb and Rappel). Holds 50Sz.`], 0)
export const Compass = new Equipment(`Compass`, [`+3 Survival(Navigate). Always points North.`], 0)
export const CowboyHat = new Equipment(`Cowboy Hat`, [`Reduce Visibility(Rain and Sun) penalty by 3.`], 0)
export const Chalk = new Equipment(`Chalk`, [`Used to temporarily write on any surface.`], 0)
export const Chemical = new Equipment(`Chemical`, [`Substances used for Science(Chemistry).`], 1)
export const ChokerLeash = new Equipment(`Choker Leash`, [`+3 Tame. Grabbed. C +3 vs C to control.`], 1)
export const DuctTape = new Equipment(`Duct Tape`, [`+1 Build/1yd or use 2yds as Handcuffs. 60yds.`], 1)
export const DustMask = new Equipment(`Dust Mask`, [`+3 C vs airborne toxins. Mask.`], 1)
export const EarPlugs = new Equipment(`Ear Plugs`, [`No Deafness from noise. -3 Perception(Hear).`], 9)
export const EggTimer = new Equipment(`Egg Timer`, [`Set up to 60mins. Loud ringing for 1min.`], 1)
export const Firestick = new Equipment(`Fire-stick`, [`+3 Survival(Camp). Magnesium rod and steel.`], 0)
export const FishingPole = new Equipment(`Fishing Pole`, [`+1 Survival(Forage) at river, lake, or ocean.`], 2)
export const FlareGun = new Equipment(`Flare Gun`, [`Pistol. RNG:3. Ammo: 12g Flares or 1 use 12g.`], 1)
export const Flippers = new Equipment(`Flippers`, [`+3 Athletics(Swim). -6 walking Speed.`], 2)
export const Food = new Equipment(`Food`, [`Contains 1 Food to feed a person for a day.`], 1)
export const GasMask = new Equipment(`Gas Mask`, [`+6 C vs airborne toxins. Mask. -1 Perception.`], 1)
export const GlassCutter = new Equipment(`Glass Cutter`, [`Cuts glass quietly.`], 0)
export const Goggles = new Equipment(`Goggles`, [`+3 C to resist toxins in eyes.`], 1)
export const GrapplingHook = new Equipment(`Grappling Hook`, [`+3 Athletics(Climb and Rappel). Holds 100Sz.`], 2)
export const GunCleaningKit = new Equipment(`Gun Cleaning Kit`, [`Gun gets +1 RATK for 1day. Takes 1hr/gun.`], 1)
export const Hacksaw = new Equipment(`Hacksaw`, [`1DMG/rnd of sawing to almost any material.`], 2)
export const Hammock = new Equipment(`Hammock`, [`Suspended sleeping device for 1 person.`], 1)
export const Handcuffs = new Equipment(`Handcuffs`, [`Grabbed. A15# to escape. Larceny(Disable) 12#.`], 1)
export const LeatherBelt = new Equipment(`Leather Belt`, [`1yd strap. Stops Limb Bleeding. Holds 50Sz.`], 1)
export const Lifejacket = new Equipment(`Lifejacket`, [`+6 Athletics(Swim). Prevents drowning.`], 2)
export const Lighter = new Equipment(`Lighter`, [`Makes a small fire. 1yd radius light.`], 0)
export const Lockpicks = new Equipment(`Lockpicks`, [`+3 Larceny(Disable) key locks. 6 picks.`], 1)
export const LuxuryItem = new Equipment(`Luxury Item`, [`Toilet paper, cigarette, etc. +1 Psyche 1/wk.`], 0)
export const MagnifyingGlass = new Equipment(`Magnifying Glass`, [`+6 Perception(See) to inspect tiny details.`], 1)
export const Makeup = new Equipment(`Makeup`, [`+1 Socialize and Entertain for 6hrs. 30 uses.`], 0)
export const Marbles = new Equipment(`Marbles`, [`30/bag. 2sqyd area. A12# or fall Prone.`], 1)
export const Marker = new Equipment(`Marker`, [`Used to permanently write on any surface.`], 0)
export const Matchbook = new Equipment(`Matchbook`, [`+1 Survival(Camp). 1yd light radius, 3rnds.`], 0)
export const MeasuringCup = new Equipment(`Measuring Cup`, [`+3 Science(Chemistry). Marked glass cup.`], 1)
export const Monocular = new Equipment(`Monocular`, [`+1 Perception(See) at 25+yds.`], 1)
export const Multitool = new Equipment(`Multi-tool`, [`+1 Larceny(Disable), Build, Science(Tech).`], 1)
export const MusicalInstrument = new Equipment(`Musical Instrument`, [`+1 Entertain(Distract and Inspire).`], 1)
export const MylarBlanket = new Equipment(`Mylar Blanket`, [`CR. 1yd x 2yd reflective foil sheet.`], 0)
export const Notebook = new Equipment(`Notebook`, [`100 pages of paper with a wire binding.`], 1)
export const Padlock = new Equipment(`Padlock`, [`10HP. 6DR. Larceny(Disable) 9#.`], 1)
export const Paracord = new Equipment(`Paracord`, [`60yd coil. Holds 50Sz.`], 1)
export const Part = new Equipment(`Part`, [`Scrap used for Build and Science(Tech).`], 1)
export const PepperSpray = new Equipment(`Pepper Spray`, [`+1 Ranged(Gun). RNG:1. 3 Pain. 3 uses. Toxin.`], 0)
export const PocketMirror = new Equipment(`Pocket Mirror`, [`Perception(See) 6# to see from behind Cover.`], 0)
export const Poncho = new Equipment(`Poncho`, [`CR. Waterproof.`], 0)
export const RatTrap = new Equipment(`Rat Trap`, [`+1 Survival(Forage). Takes 1day.`], 1)
export const RoadFlare = new Equipment(`Road Flare`, [`3FDMG. 10yd light radius for 20mins.`], 1)
export const Rollerblades = new Equipment(`Rollerblades`, [`Athletics 6#. Speed x3. 1rnd equip. Fail:Prone.`], 2)
export const Rope = new Equipment(`Rope`, [`30yd nylon coil. Holds 100Sz.`], 2)
export const RunningShoes = new Equipment(`Running Shoes`, [`+1 mile of Jogging distance.`], 2)
export const Skateboard = new Equipment(`Skateboard`, [`Athletics 6#. Speed x3. Fail:Prone.`], 3)
export const SleepingBag = new Equipment(`Sleeping Bag`, [`Insulated bag for up to 2 people. CR +3hrs.`], 3)
export const Snorkel = new Equipment(`Snorkel`, [`Breathe while just beneath water's surface.`], 1)
export const SpottingScope = new Equipment(`Spotting Scope`, [`+6 Perception(See) at 100+yds.`], 2)
export const SprayPaint = new Equipment(`Spray Paint`, [`RATK Called Shot:Head. Blind d6rnds. 10 uses.`], 1)
export const Sunglasses = new Equipment(`Sunglasses`, [`No Visibility(Sun) penalty. +1 C vs light.`], 0)
export const SwissArmyKnife = new Equipment(`Swiss Army Knife`, [`+1 Build and Survival.`], 1)
export const TapeMeasure = new Equipment(`Tape Measure`, [`+1 Build. 10yd long wind-up metal tape.`], 2)
export const Tarp = new Equipment(`Tarp`, [`3yd x 3yd plastic sheet. CR. Waterproof.`], 1)
export const Tent = new Equipment(`Tent`, [`4 person. 5min setup/take-down. CR +3hrs.`], 6)
export const ThermalUnderwear = new Equipment(`Thermal Underwear`, [`CR. Can use as 6 Bandages.`], 1)
export const ToolBag = new Equipment(`Tool Bag`, [`+3 Build. Pliers, wrenches, level, etc.`], 3)
export const WaterFilter = new Equipment(`Water Filter`, [`Purifies 1 Water ration (.5gal) per minute.`], 1)
export const Whetstone = new Equipment(`Whetstone`, [`Blade gets +1 DMG for 1day. Takes 1hr/blade.`], 1)
export const Whistle = new Equipment(`Whistle`, [`+1 Tame(Train). Loud shriek 500yd radius.`], 0)
export const WireSaw = new Equipment(`Wire Saw`, [`1DMG/rnd of sawing to wood or bone.`], 1)
export const Wristwatch = new Equipment(`Wristwatch`, [`Tells time and +1 Survival(Navigate).`], 0)
export const ZipTie = new Equipment(`Zip Tie`, [`Grabbed. C9# to escape. Use for +1 Build.`], 0)

export const EquipmentList = [
	AirHorn,
	Balaclava,
	Bandanna,
	BaseballCap,
	Bicycle,
	Binoculars,
	BobbyPin,
	BoltCutters,
	CageTrap,
	Candle,
	Candy,
	Carabiner,
	Compass,
	CowboyHat,
	Chalk,
	Chemical,
	ChokerLeash,
	DuctTape,
	DustMask,
	EarPlugs,
	EggTimer,
	Firestick,
	FishingPole,
	FlareGun,
	Flippers,
	Food,
	GasMask,
	GlassCutter,
	Goggles,
	GrapplingHook,
	GunCleaningKit,
	Hacksaw,
	Hammock,
	Handcuffs,
	LeatherBelt,
	Lifejacket,
	Lighter,
	Lockpicks,
	LuxuryItem,
	MagnifyingGlass,
	Makeup,
	Marbles,
	Marker,
	Matchbook,
	MeasuringCup,
	Monocular,
	Multitool,
	MusicalInstrument,
	MylarBlanket,
	Notebook,
	Padlock,
	Paracord,
	Part,
	PepperSpray,
	PocketMirror,
	Poncho,
	RatTrap,
	RoadFlare,
	Rollerblades,
	Rope,
	RunningShoes,
	Skateboard,
	SleepingBag,
	Snorkel,
	SpottingScope,
	SprayPaint,
	Sunglasses,
	SwissArmyKnife,
	TapeMeasure,
	Tarp,
	Tent,
	ThermalUnderwear,
	ToolBag,
	WaterFilter,
	Whetstone,
	Whistle,
	WireSaw,
	Wristwatch,
	ZipTie
]


class Medical extends Gear {
	constructor(name, description, sz) {
		super(name, description, sz)
	}
}

export const Bandage = new Medical(`Bandage`, [`+1 Medicine(First-Aid). 1 use.`], 0)
export const Crutch = new Medical(`Crutch`, [`Halves Leg DMG Pain penalty to Speed.`], 3)
export const EMTBag = new Medical(`EMT Bag`, [`+3 Medicine(First-Aid). 30 uses.`], 5)
export const FirstAidKit = new Medical(`First-Aid Kit`, [`+1 Medicine(First-Aid). 5 uses.`], 1)
export const PressureCuff = new Medical(`Pressure Cuff`, [`+1 Medicine.`], 1)
export const Stethoscope = new Medical(`Stethoscope`, [`+1 Medicine. Perception(Hear) 6# through doors.`], 1)
export const SurgeryKit = new Medical(`Surgery Kit`, [`+3 Medicine(Surgery).`], 3)
export const Thermometer = new Medical(`Thermometer`, [`+1 Medicine. Accurately reads temperature.`], 0)
export const TransfusionKit = new Medical(`Transfusion Kit`, [`Medicine 9#. Heal 1 Wound. Takes 1hr.`], 1)

export const MedicalList = [
	Bandage,
	Crutch,
	EMTBag,
	FirstAidKit,
	PressureCuff,
	Stethoscope,
	SurgeryKit,
	Thermometer,
	TransfusionKit
]


class MeleeWeapon extends Gear {
	constructor(name, description, sz, dmg, hands, rng) {
		super(name, description, sz)
		this.dmg = dmg
		this.hands = hands
		this.rng = rng
	}
}

export const Ax = new MeleeWeapon(`Ax`, [`Slow`, `Chop`], 4, 5, 2, 2)
export const BaseballBat = new MeleeWeapon(`Baseball Bat`, [], 3, 3, 2, 2)
export const BrassKnuckles = new MeleeWeapon(`Brass Knuckles`, [`Unarmed`], 1, 2, 1, 1)
export const Crowbar = new MeleeWeapon(`Crowbar`, [], 3, 3, 1, 2)
export const Hammer = new MeleeWeapon(`Hammer`, [], 2, 2, 1, 1)
export const Hatchet = new MeleeWeapon(`Hatchet`, [`Chop`], 2, 2, 1, 1)
export const Knife = new MeleeWeapon(`Knife`, [`Pierce`, `Rapid`], 1, 2, 1, 1)
export const Machete = new MeleeWeapon(`Machete`, [`Chop`], 2, 3, 1, 2)
export const Shield = new MeleeWeapon(`Shield`, [`Cover 3DR`, `+3 Block`], 4, 1, 1, 1)
export const Sledgehammer = new MeleeWeapon(`Sledgehammer`, [`Slow`], 5, 5, 2, 2)
export const Spear = new MeleeWeapon(`Spear`, [`Pierce`], 3, 4, 2, 3)
export const Staff = new MeleeWeapon(`Staff`, [], 3, 2, 2, 3)

export const MeleeList = [
	Ax,
	BaseballBat,
	BrassKnuckles,
	Crowbar,
	Hammer,
	Hatchet,
	Knife,
	Machete,
	Shield,
	Sledgehammer,
	Spear,
	Staff
]

// RARE MELEE
// new MeleeWeapon(`Barbwire Club`, 3, 1, ``, 2),
// new MeleeWeapon(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
// new MeleeWeapon(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
// new MeleeWeapon(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
// new MeleeWeapon(`Chainsaw`, 6, 2, `.5gal Fuel. d6rnd start. 1: Empty. Loud.`, 4),
// new MeleeWeapon(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
// new MeleeWeapon(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
// new MeleeWeapon(`Kukri`, 3, 1, `Chop`, 2),
// new MeleeWeapon(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (RNG:3)`, 2),
// new MeleeWeapon(`Net`, 0, 2, `+6 Grab.`, 3),
// new MeleeWeapon(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
// new MeleeWeapon(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
// new MeleeWeapon(`Sign Shield`, 2, 1, `+3 Block. Cover 6DR.`, 4),
// new MeleeWeapon(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
// new MeleeWeapon(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. RNG:3.`, 1),

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
// new MeleeWeapon(`Torch`, 1, 1, `Blunt. +1 FDMG. 5yd light radius 1hr.`, 2),


class RangedWeapon extends Gear {
	constructor(name, dmg, hands, rng, cal, mag, reg, description, sz) {
		super(name, description, sz)
		this.dmg = dmg
		this.hands = hands
		this.rng = rng
		this.cal = cal
		this.mag = mag
		this.reg = reg
	}
}

export const BoltActionRifle = new RangedWeapon(`Bolt-Action Rifle`, [], 4, 3, 2, 200, 5, `.308`, `C`)
export const CompoundBow = new RangedWeapon(`Compound Bow`, [], 4, 1, 2, 10, 1, `Arrow`, `C`)
export const Crossbow = new RangedWeapon(`Crossbow`, [], 4, 2, 2, 20, 1, `Arrow`, `C`)
export const DoubleBarrelShotgun = new RangedWeapon(`Double-Barrel Shotgun`, [`Rapid`, `Scatter`], 4, 4, 2, 20, 2, `12g`, `C`)
export const LeverActionRifle = new RangedWeapon(`Lever-Action Rifle`, [], 3, 2, 2, 50, 10, `.357`, `C`)
export const PumpShotgun = new RangedWeapon(`Pump Shotgun`, [`Scatter`], 4, 4, 2, 20, 6, `12g`, `C`)
export const Revolver = new RangedWeapon(`Revolver`, [], 2, 2, 1, 10, 6, `.357`, `C`)
export const SemiAutoCarbine = new RangedWeapon(`Semi-Auto Carbine`, [`Rapid`], 3, 1, 2, 30, 30, `9mm`, `C`)
export const SemiAutoPistol = new RangedWeapon(`Semi-Auto Pistol`, [`Rapid`], 1, 1, 1, 10, 15, `9mm`, `C`)
export const SemiAutoRifle = new RangedWeapon(`Semi-Auto Rifle`, [`Rapid`], 3, 2, 2, 100, 30, `5.56`, `C`)
export const SemiAutoShotgun = new RangedWeapon(`Semi-Auto Shotgun`, [`Rapid`, `Scatter`], 4, 4, 2, 20, 6, `12g`, `C`)
export const TargetPistol = new RangedWeapon(`Target Pistol`, [`Rapid`], 1, 1, 2, 30, 10, `.22`, `C`)
export const TargetRifle = new RangedWeapon(`Target Rifle`, [`Rapid`], 3, 1, 2, 50, 10, `.22`, `C`)

export const RangedList = [
	BoltActionRifle,
	CompoundBow,
	Crossbow,
	DoubleBarrelShotgun,
	LeverActionRifle,
	PumpShotgun,
	Revolver,
	SemiAutoCarbine,
	SemiAutoPistol,
	SemiAutoRifle,
	SemiAutoShotgun,
	TargetPistol,
	TargetRifle
]

// RARE RANGED
// new RangedWeapon(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
// new RangedWeapon(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
// new RangedWeapon(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
// new RangedWeapon(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. FDMG.`, 6),
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
// new RangedWeapon(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2rnd Reload.`, 4),
// new RangedWeapon(`Uzi`, 2, 10, `9mm`, `30mag`, 2, `Auto. Rapid. -1 RATK.`, 3),
// new RangedWeapon(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6rnds.`, 1),

// OLD RANGED
// new RangedWeapon(`AK-47`, 4, 50, `7.62`, `30mag`, 2, `Auto. Rapid.`, 4),
// new RangedWeapon(`AR-15`, 4, 100, `5.56`, `30mag`, 2, `Rapid.`, 3),
// new RangedWeapon(`Benelli M4`, 6, 15, `12g`, 7, 2, `Rapid. Scatter.`, 4),
// new RangedWeapon(`Browning A-Bolt`, 4, 100, `5.56`, `5mag`, 2, `+1 RATK. Scope.`, 3),
// new RangedWeapon(`Colt Python`, 3, 25, `.357`, `6cyl`, 1, `Revolver.`, 2),
// new RangedWeapon(`Compound Bow`, 1, 25, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 4),
// new RangedWeapon(`Crossbow`, 6, 50, `Arrow`, 1, 2, `1rnd Reload.`, 4),
// new RangedWeapon(`Glock 17`, 2, 25, `9mm`, `17mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`H&ampK MP5`, 2, 50, `9mm`, `30mag`, 2, `Auto. Rapid.`, 2),
// new RangedWeapon(`Henry Golden Boy`, 1, 50, `.22`, 16, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
// new RangedWeapon(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),
// new RangedWeapon(`Marlin 1894C`, 3, 50, `.357`, 9, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Mossberg 500`, 6, 10, `12g`, 5, 2, `Scatter.`, 2),
// new RangedWeapon(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
// new RangedWeapon(`Remington 700`, 5, 100, `.308`, 6, 2, `+1 RATK. Scope.`, 4),
// new RangedWeapon(`Remington 870`, `var`, 15, `12g`, 7, 2, `Scatter.`, 4),
// new RangedWeapon(`Ruger 10/22`, 1, 50, `.22`, `10mag`, 2, `Rapid.`, 3),
// new RangedWeapon(`Ruger Mk.III`, 1, 25, `.22`, `10mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`SIG Sauer P290`, 2, 10, `9mm`, `6mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`Savage Mk.II`, 1, 50, `.22`, `10mag`, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Springfield M1A`, 5, 100, `.308`, `20mag`, 2, `Rapid.`, 4),
// new RangedWeapon(`S&ampW Snubnose`, 3, 5, `.357`, `5cyl`, 1, `Revolver.`, 1),
// new RangedWeapon(`Winchester Sawn-off`, 6, 5, `12g`, 2, 2, `Rapid. Scatter.`, 2)


export const WeaponList = [
	...MeleeList,
	...RangedList
]


class Storage extends Gear {
	constructor(name, description, sz, slots) {
		super(name, description, sz)
		this.slots = slots
	}
}

export const Backpack = new Storage(`Backpack`, `2rnds to access.`, 1, 30)
export const Bandoleer = new Storage(`Bandoleer`, `Holds 50 bullets of any caliber.`, 0, 1)
export const BDUJacket = new Storage(`BDU Jacket`, `Camo.`, 0, 4)
export const CargoPants = new Storage(`Cargo Pants`, `Camo.`, 1, 6)
export const Canteen = new Storage(`Canteen`, `Holds 1 unit (.5gal) of liquid. Metal.`, 1, 1)
export const ConcealedHolster = new Storage(`Concealed Holster`, `Perception 12# to spot a Size 1 Gun.`, 0, 1)
export const Cooler = new Storage(`Cooler`, `Hunted or Foraged Food lasts 6 days.`, 4, 30)
export const DuffelBag = new Storage(`Duffel Bag`, `2rnds to access.`, 3, 40)
export const FuelCan = new Storage(`Fuel Can`, `5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.`, 2, 5)
export const Hoody = new Storage(`Hoody`, `CR.`, 0, 2)
export const HydrationPack = new Storage(`Hydration Pack`, `Holds 4 units (2gal) of liquid.`, 1, 4)
export const Lockbox = new Storage(`Lockbox`, `10HP. 6DR. FR. Larceny(Disable) 9#.`, 2, 1)
export const MessengerBag = new Storage(`Messenger Bag`, `1rnd to access.`, 2, 4)
export const PlasticJug = new Storage(`Plastic Jug`, `Holds 2 units (1gal) of liquid.`, 1, 2)
export const Purse = new Storage(`Purse`, `1rnd to access.`, 1, 3)
export const Speedloader = new Storage(`Speed-loader`, `Reload a revolver cylinder as 1 action.`, 0, 0)
export const ToolBelt = new Storage(`Tool Belt`, `6x 1 Slots. +1 Build. Miscellaneous small tools.`, 2, 6)
export const TrenchCoat = new Storage(`Trench Coat`, `CR. +1 Stealth.`, 1, 4)
export const WaterBottle = new Storage(`Water Bottle`, `Holds 1 unit (.5gal) of liquid.`, 1, 1)

export const StorageList = [
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
	WaterBottle
]


// class Vehicle extends Gear {
// 	constructor(name, speed, dr, handling, mpg, fuel, seats, cargo, description='', sz='') {
// 		super(name, description, sz)
// 		this.speed = speed
// 		this.dr = dr
// 		this.handling = handling
// 		this.mpg = mpg
// 		this.fuel = fuel
// 		this.seats = seats
// 		this.cargo = cargo
// 	}
// }

//VEHICLES
	// function Vehicle(name,hp,dr,dmg,spd,mph,han,mpg,fuel,occ,car,area,sz){
	//	 this.name = name;
	//	 this.hp = hp;
	//	 this.dr = dr;
	//	 this.dmg = dmg;
	//	 this.spd = spd;
	//	 this.mph = mph;
	//	 this.han = han;
	//	 this.mpg = mpg;
	//	 this.fuel = fuel;
	//	 this.occ = occ;
	//	 this.car = car;
	//	 this.area = area;
	//	 this.sz = sz;
	// }

	// const iAmbulance = new Vehicle(`Ambulance`,40,1,10,120,80,`-3`,10,35,4,200,`7x3`);
	// const iBoxTruck = new Vehicle(`Box Truck`,40,1,10,90,60,`-3`,10,40,2,1600,`10x3`);
	// const iBus = new Vehicle(`Bus`,50,3,12,90,60,`-6`,15,100,60,1200,`12x4`);
	// const iMotorcycle = new Vehicle(`Motorcycle`,20,0,4,150,100,`+1`,40,5,2,30,`3x1`);
	// const iMuscleCar = new Vehicle(`Muscle Car`,40,1,6,180,120,`+1`,10,20,4,80,`5x2`);
	// const iPickupTruck = new Vehicle(`Pickup Truck`,40,1,8,150,100,`-1`,20,20,2,400,`6x2`);
	// const iPoliceCruiser = new Vehicle(`Police Cruiser`,40,1,6,180,120,`+1`,10,20,4,100,`5x2`);
	// const iSedan = new Vehicle(`Sedan`,30,1,6,150,100,`+0`,30,12,4,100,`5x2`);
	// const iSemitruck = new Vehicle(`Semi-truck`,50,3,12,90,60,`-6`,5,120,2,16000,`25x4`);
	// const iStreetBike = new Vehicle(`Street Bike`,20,0,4,180,120,`+3`,50,5,2,10,`3x1`);
	// const iSUV = new Vehicle(`SUV`,40,1,8,150,100,`-1`,15,25,6,200,`6x2`);
	// const iVan = new Vehicle(`Van`,40,1,10,120,80,`-3`,10,35,12,1200,`7x3`);
	// const iLandVehiclesList = [iAmbulance,iBoxTruck,iBus,iMotorcycle,iMuscleCar,iPickupTruck,iPoliceCruiser,iSedan,iSemitruck,iStreetBike,iSUV,iVan];

	// const iAirliner = new Vehicle(`Airliner`,150,3,``,900,600,`-6`,.5,5300,150,6000,`34x32`,14000);
	// const iAirplane = new Vehicle(`Airplane`,40,0,``,240,160,`-3`,15,55,4,200,`9x13`,340);
	// const iChinook = new Vehicle(`Chinook`,120,9,``,240,160,`-6`,.1,9000,40,1000,`33x22`);
	// const iFighterJet = new Vehicle(`Fighter Jet`,80,6,``,1800,1200,`-6`,1,2200,1,5,`19x13`,4600);
	// const iGyrocopter = new Vehicle(`Gyrocopter`,10,0,``,180,120,`+0`,16,20,1,30,`9x9`);
	// const iHelicopter = new Vehicle(`Helicopter`,50,0,``,210,140,`+3`,5,30,8,500,`13x11`);
	// const iAircraftList = [iAirliner,iAirplane,iChinook,iFighterJet,iGyrocopter,iHelicopter];

	// const iAirboat = new Vehicle(`Airboat`,20,0,``,90,60,`+1`,5,50,6,500,`3x2`);
	// const iCanoe = new Vehicle(`Canoe*`,10,0,``,`C x3`,`C x2`,`-6`,0,0,4,50,`3x1`);
	// const iCatamaran = new Vehicle(`Catamaran`,40,1,``,90,60,`-3`,15,200,4,500,`6x4`);
	// const iInflatableRaft = new Vehicle(`Inflatable Raft*`,4,0,``,`C x1.5`,`C `,`+0`,0,0,6,50,`4x2`);
	// const iJetSki = new Vehicle(`Jet Ski`,20,0,``,90,60,`+3`,5,15,3,0,`3x1`);
	// const iKayak = new Vehicle(`Kayak*`,6,0,``,`C x1.5`,`C `,`+1`,0,0,1,20,`1x2`);
	// const iMotorboat = new Vehicle(`Motorboat`,20,0,``,60,40,`+1`,10,10,6,100,`6x2`);
	// const iRowboat = new Vehicle(`Rowboat*`,12,0,``,`C x1.5`,`C `,`-1`,0,0,4,100,`3x1`);
	// const iSloop = new Vehicle(`Sloop`,50,3,``,60,40,`-6`,0,0,10,1000,`20x4`);
	// const iSpeedboat = new Vehicle(`Speedboat`,30,1,``,90,60,`+1`,5,100,4,200,`8x3`);
	// const iTrawler = new Vehicle(`Trawler`,60,6,``,30,20,`-6`,1.5,1000,8,10000,`12x6`);
	// const iYacht = new Vehicle(`Yacht`,100,3,``,60,40,`-6`,1,1500,25,5000,`30x8`);
	// const iWatercraftList = [iAirboat,iCanoe,iCatamaran,iInflatableRaft,iJetSki,iKayak,iMotorboat,iRowboat,iSloop,iSpeedboat,iTrawler,iYacht];
/*
	const iArmyTruck = new Vehicle(``,,,,,,``,``,,,,);
	const iAPC = new Vehicle(``,,,,,,``,``,,,,);
	const iATV = new Vehicle(``,,,,,,``,``,,,,);
	const iBankTruck = new Vehicle(``,,,,,,``,``,,,,);
	const iBulldozer = new Vehicle(``,,,,,,``,``,,,,);
	const iDirtBike = new Vehicle(``,,,,,,``,``,,,,);
	const iDuneBuggy = new Vehicle(``,,,,,,``,``,,,,);
	const iFireEngine = new Vehicle(``,,,,,,``,``,,,,);
	const iHumvee = new Vehicle(``,,,,,,``,``,,,,);
	const iRV = new Vehicle(``,,,,,,``,``,,,,);
	const iTank = new Vehicle(``,,,,,,``,``,,,,);
	const iWagon = new Vehicle(``,,,,,,``,``,,,,);
	const iRareLandVehicleList = [iArmyTruck,iAPC,iATV,iBankTruck,iBulldozer,iDirtBike,iDuneBuggy,iFireEngine,iHumvee,iRV,iTank,iWagon];
*/

	//VEHICLE CUSTOMIZATIONS
	// const cAirBag = new Gear(`Air Bag**`,`Build 12#. -3 Wreck BDMG to the Head for 1 occupant.`,6);
	// const cAirFilter = new Gear(`Air Filter`,`Build 9#. +6C vs airborne toxins for occupants.`,3);
	// const cBackupFuelTank = new Gear(`Backup Fuel Tank`,`Build # varies. +1 Fuel per 2 Size, 1 Part and 1#.`,`varies`);
	// const cBallisticGlass = new Gear(`Ballistic Glass`,`Build 9#. 3 DR for windows.`,6);
	// const cBodySpines = new Gear(`Body Spines`,`Build 3#. Dodge 9# to jump on or take 6DMG (Pierce).`,9);
	// const cBrushGuard = new Gear(`Brush Guard`,`Build 9#. +1 DR vs front collisions.`,12);
	// const cCargoRack = new Gear(`Cargo Rack**`,`Build 9#. +25% Carry capacity (round down).`,6);
	// const cCBRadio = new Gear(`CB Radio`,`Build 12#. 40-channel 2-way radio. 6 mile range.`,3);
	// const cEjectorSeat = new Gear(`Ejector Seat**`,`Build 12#. Throw occupant out of vehicle. See Wreck.`,12);
	// const cEnhancedBrakes = new Gear(`Enhanced Brakes`,`Build 6#. Brake at -20mph/rnd.`,3);
	// const cExoCage = new Gear(`Exo-Cage`,`Build 15#. Get one extra Prestine Condition level.`,18);
	// const cFireSuppression = new Gear(`Fire Suppression`,`Build 9#. Puts out any fires on/in vehicle.`,6);
	// const cFixedGun = new Gear(`Fixed Gun**`,`Build 3#*. Driver uses Drive(Combat) for RATK rolls.`,3);
	// const cFloodLights = new Gear(`Flood Lights`,`Build 9#. No Visibility penalty in darkness. 10yds.`,3);
	// const cFrameJack = new Gear(`Frame Jack**`,`Build 9#. Tire change time is halved on one side.`,6);
	// const cFuelCapLock = new Gear(`Fuel Cap Lock`,`Build 3#. 10HP. Larceny(Disable) 9# takes d6mins.`,0);
	// const cHiddenCompartment = new Gear(`Hidden Compartment`,`Build 9#. Perception 12# to find. Holds 2Sz.`,0);
	// const cHighFlowExhaust = new Gear(`High-Flow Exhaust`,`Build 6#. Accelerate at +20mph/rnd.`,3);
	// const cHubcapBlades = new Gear(`Hubcap Blades`,`Build 6#. +1 DR for side collisions.`,9);
	// const cIntakeSnorkel = new Gear(`Intake Snorkel`,`Build 6#. Drive through water up to the windows.`,3);
	// const cKeypadIgnition = new Gear(`Keypad Ignition`,`Build 12#. Coded starter. Science(Tech) 12# to break.`,0);
	// const cLuxurySuspension = new Gear(`Luxury Suspension`,`Build 18#. Reduces Unstable penalty to -1.`,12);
	// const cNitrousBooster = new Gear(`Nitrous Booster**`,`Build 15#. +20mph Speed and -3 Han for 1rnd. 3 uses.`,3);
	// const cParachute = new Gear(`Parachute`,`Build 12#. Stops vehicle in 1rnd. 10rnds to repack.`,6);
	// const cPayloadDropper = new Gear(`Payload Dropper**`,`Build 6#. Bomb or Jacks (Drive 12# or d6 flats).`,3);
	// const cRackAndPinion = new Gear(`Rack and Pinion`,`Build 12#. +1 Han. Requires driver Constitution 3+.`,6);
	// const cRamPlow = new Gear(`Ram Plow`,`Build 12#. +3 DR for front collisions. -25% MPG.`,15);
	// const cRunFlatTires = new Gear(`Run-Flat Tires`,`Build 6#. +3 HP for Tires. Sz = 1 per Tire.`,`varies`);
	// const cSafetyHarness = new Gear(`Safety Harness**`,`Build 6#. -1 Wreck BDMG for 1 occupant. Takes 3rnds.`,1);
	// const cSlickDispenser = new Gear(`Slick Dispenser**`,`Build 3#. 1 Fuel, Drive vs Drive to Wreck pursuer.`,6);
	// const cSteelPlates = new Gear(`Steel Plates`,`Build 15#. +3 DR for entire Vehicle. Sz = [Carry /2].`,`varies`);
	// const cStrutBraces = new Gear(`Strut Braces`,`Build 6#. +1 Drive(Stunt).`,6);
	// const cSupercharger = new Gear(`Supercharger`,`Build 18#. +20mph (+30yd) maximum Speed.`,9);
	// const cTireChains = new Gear(`Tire Chains`,`Build 3#. Ignore Terrain penalties. -25% Speed.`,9);
	// const cTurretGun = new Gear(`Turret Gun**`,`Build 6#*. Passenger uses Ranged for RATK rolls.`,9);
	// const cWinch = new Gear(`Winch**`,`Build 9#. 30yd cable. 1yd/min. Hauls 2000Sz.`,15);
	// const iVehicleCustomizationsList = [cAirBag,cAirFilter,cBackupFuelTank,cBallisticGlass,cBodySpines,cBrushGuard,cCargoRack,cCBRadio,cEjectorSeat,cEnhancedBrakes,cExoCage,cFireSuppression,cFixedGun,cFloodLights,cFrameJack,cFuelCapLock,cHiddenCompartment,cHighFlowExhaust,cHubcapBlades,cIntakeSnorkel,cKeypadIgnition,cLuxurySuspension,cNitrousBooster,cParachute,cPayloadDropper,cRackAndPinion,cRamPlow,cRunFlatTires,cSafetyHarness,cSlickDispenser,cSteelPlates,cStrutBraces,cSupercharger,cTireChains,cTurretGun,cWinch];


export const MasterGearList = [
	...AccessoryList,
	...AmmoList,
	...ArmorList,
	...BombList,
	...DocumentList,
	...DrugsList,
	...ElectronicsList,
	...EquipmentList,
	...MedicalList,
	...WeaponList,
	...StorageList
]