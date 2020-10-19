import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, L as validate_each_argument, a as validate_slots, f as element, w as text, j as claim_element, k as children, x as claim_text, l as detach_dev, n as attr_dev, p as add_location, t as insert_dev, r as append_dev, y as set_data_dev, h as space, m as claim_space, X as empty, u as noop, M as destroy_each, g as globals, a3 as set_style } from './client.ad852c9c.js';
import { R as Rule } from './SWBodyguard.54177d3a.js';
import { A as AccessoryList, a as AmmoList, b as ArmorList, B as BombList } from './BombList.4927c2b7.js';
import { D as DocumentList, a as DrugList, E as ElectronicList, M as MiscList, b as MedicalList, S as StorageList } from './StorageList.71288974.js';
import { X as XP3Abilities, a as XP6Abilities, b as XP9Abilities, c as XP12Abilities, d as XP15Abilities, e as XP18Abilities, f as XP24Abilities, g as XP30Abilities, A as AppendToGUUID, h as Ability, M as MeleeWeaponList, R as RangedWeaponList } from './AppendToGUUID.176d1458.js';
import { P as PropSort, D as DemeanorSkills } from './Skills.35c4252b.js';
import { A as AgilitySkills, B as BrainsSkills, C as ConstitutionSkills } from './ConstitutionSkills.56e093ee.js';
import { R as RandomRoll } from './RandomRoll.f18d347c.js';
import { A as Agility, B as Brains, C as Constitution, D as Demeanor } from './Traits.2656d3ca.js';
import { M as Melee, A as Acrobatics, B as Block$1, C as Carry, D as Dodge$1, E as Experience, H as Health, I as Intellect, L as Luck, P as Psyche, S as Speed } from './Speed.66ad8113.js';

const abilityArray = [
	...XP3Abilities,
	...XP6Abilities,
	...XP9Abilities,
	...XP12Abilities,
	...XP15Abilities,
	...XP18Abilities,
	...XP24Abilities,
	...XP30Abilities
];

const completeAbilityListBuilder = (list) => {
	const newList = [];
	for (let i = 0; i < list.length; ++i) {
		if (list[i].opts[0]) {
			for (let o = 0; o < list[i].opts.length; ++o) {
				let newGUUID = AppendToGUUID(list[i].id, list[i].opts[o].name);
				const newAbility = new Ability({
					id: newGUUID,
					name: list[i].name,
					desc: list[i].desc,
					max: list[i].max,
					xp: list[i].xp,
					taken: list[i].taken,
					opts: [
						list[i].opts[o],
					],
					selection: o
				});
				newList.push(newAbility);
			}
		} else {
			const newAbility = new Ability({
				id: list[i].id,
				name: list[i].name,
				desc: list[i].desc,
				max: list[i].max,
				xp: list[i].xp,
				taken: list[i].taken
			});
			newList.push(newAbility);
		}
	}
	return newList
};

const Abilities = {
	name: `Abilities`,
	explanation: [
		`Abilities are Character upgrades purchased with XP.`
	],
	groups: [
		{
			name: 3,
			visible: false,
			list: XP3Abilities
		},
		{
			name: 6,
			visible: false,
			list: XP6Abilities
		},
		{
			name: 9,
			visible: false,
			list: XP9Abilities
		},
		{
			name: 12,
			visible: false,
			list: XP12Abilities
		},
		{
			name: 15,
			visible: false,
			list: XP15Abilities
		},
		{
			name: 18,
			visible: false,
			list: XP18Abilities
		},
		{
			name: 24,
			visible: false,
			list: XP24Abilities
		},
		{
			name: 30,
			visible: false,
			list: XP30Abilities
		},
	],
	list: abilityArray.sort((a, b) => PropSort(a, b, 'name')),
	masterList: completeAbilityListBuilder(abilityArray).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		if (c.abilities.length) {
			c.props.experience.spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0);
		}
		c.props.experience.remaining = c.props.experience.score - c.props.experience.spent;
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(c.props.experience.remaining > 0) {
			const remainingAbilities = this.masterList.filter(m => {
				return m.xp <= c.props.experience.remaining &&
					!c.abilities.includes(m)
			});
			if (remainingAbilities.length) {
				const a = RandomRoll(remainingAbilities);
				a.taken++;
				c.abilities.push(a);
				c.props.experience.remaining -= a.xp;
			}
			else break
		}
		return c
	},
	reset: function(c) {
		for (let a = 0; a < c.abilities.length; ++a) {
			c.abilities[a].taken = 0;
		}
		c.abilities = [];
		return c
	}
};

const AbilitiesList = completeAbilityListBuilder(Abilities);

const Rounds = new Rule({
	id: `43080069-4044-4882-0b54-ca9229f09f23`,
	name: `Rounds`, 
	desc: [
		`Combat time occurs in 3-second “rounds”.`,
		`Players have 30 seconds to decide what their Character's Actions will be for the round.`,
		`Any new Complication or Status modifiers that come into play during a round go into effect at the start of the next round.`,
	]
});

const Actions = new Rule({
	id: `6073380c-7def-4d74-889b-ddbd5865fe69`,
	name: `Actions`, 
	desc: [
		`You get 3 Actions per round starting on your turn.`,
		`Most things cost 1 Action unless otherwise noted.`,
	]
});

const Communication = new Rule({
	id: `2bd8d14c-6965-4319-c64b-1ebe590b93ac`,
	name: `Communication`, 
	desc: [
		`You can speak or shout up to 6 words per round.`,
	]
});

const Chase = new Rule({
	id: `aa44bbe5-d0e1-4bed-0125-19a3c88c587a`,
	name: `Chase`, 
	desc: [
		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Run Speed] each round, depending on the type of mobility in use.`,
		`The chase ends when one side gets 3 Successes over the other.`,
	]
});

const Movement = new Rule({
	id: `66094467-f795-4c02-49e9-0bf193dacaa6`,
	name: `Movement`, 
	desc: [
		`You may make one Movement Action per turn.`,
		`This Movement always costs 1 Action, no matter what type of Movement it is.`,
		`Your Movement Action may be any one of the following:`,
		` 1) Walk Speed = [Agility x 3] yards`,
		` 2) Run Speed = [Agility x 6] yards`,
		` 3) Climb Speed = [Agility] yards`,
		` 4) Swim Speed = [Agility / 2] yards`,
		` 5) Stand up from Prone = 1 yard`,
		`When you take a Movement Action, you may go Prone at any time for free.`,
		`Running imposes the Unstable Status effect until your next turn.`,
		`You may divide up your Movement around other Actions on your turn however you wish.`,
	]
});
Movement.subrules = [
	Chase,
];

const Attack = new Rule({
	id: `d253e0e1-36bf-4434-a78b-032196be0e73`,
	name: `Attack`, 
	desc: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, in addition to the Weapon Damage, you do bonus Damage = [Attack - Defense] up to your attacking Skill score.`,
	]
});

const ReflexiveDefense = new Rule({
	id: `feae7482-800b-47d1-f17c-3a103d83b70b`,
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses = the Skill Specialty they are based on.`,
		`These are your default Defenses when not actively rolling.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
});

const Defense = new Rule({
	id: `69987b3f-518a-4f96-643c-c82cbd1c1a98`,
	name: `Defense`, 
	desc: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks.`,
		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
		`Botching a Defense roll makes you fall Prone.`,
	]
});
Defense.subrules = [
	ReflexiveDefense
];

const DamageResistance = new Rule({
	id: `c5d2503f-cc78-45c6-3b23-02f4f37d54b9`,
	name: `Damage Resistance`, 
	desc: [
		`Armor's Damage Resistance reduces the Damage inflicted by any individual Attack on that Body Part.`,
		`Reduce a piece of Armor's Damage Resistance by 1 after taking Damage that exceeds its Damage Resistance.`,
	]
});

const FireDamage = new Rule({
	id: `0de26712-9508-40af-262e-b368e9550fa1`,
	name: `Fire Damage`, 
	desc: [
		`Each round you take Fire Damage, 1 point is permanent and never heals.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
});

const Pain = new Rule({
	id: `bff6e8fd-de70-4ad6-dd4b-b852400ab3ca`,
	name: `Pain`, 
	desc: [
		`Damage (and a few other effects) cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain fades away as Damage heal.`,
		`You fall Prone if your Speed drops to 0 from Pain.`,
	]
});

const Recovery = new Rule({
	id: `a61981e8-36cb-466e-7b3a-0173b19a4c06`,
	name: `Recovery`,
	desc: [
		`After 3 days of rest, you have a chance to recover a little bit, both physically and mentally.`,
		`Roll [Constitution vs total Damage] to heal 1 Health on a random Damaged Body Part.`,
		`Roll [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Damage or Trauma, depending on what you were rolling to Recover.`,
	]
});

const Damage = new Rule({
	id: `8fbad46e-af91-424a-28c5-2e8b7ff802bd`,
	name: `Damage`, 
	desc: [
		`Damage temporarily reduces Health.`,
		`When Head or Torso Health drops to 0, you fall unconscious`,
		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
		`Consciousness and limb functionality are restored once you have healed to at least 1 Health on that Body Part.`,
		`You die when Head or Torso Health drops to the negative of their scores.`,
		`You lose the limb when Arm or Leg Health drops to the negative of their scores.`,
		`Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage].`,
		`Each point of Damage cause a -1 Pain penalty until healed.`,
	]
});
Damage.subrules = [
	DamageResistance,
	FireDamage,
	Pain,
	Recovery,
];

var Combat = {
	name: `Combat`,
	list: [
		Rounds,
		Actions,
		Communication,
		Movement,
		Attack,
		Defense,
		Damage,
		// Vehicles,
	]
};

class Table {
	constructor({
		name=``,
		headers=[],
		contents=[],
		widths=[]
	}) {
		this.name = name;
		this.headers = headers;
		this.contents = contents;
		this.widths = widths;
	}
}

const Cover = new Rule({
	id: `9fd0a556-f4c0-4aba-6814-c371f0a8ead0`,
	name: `Cover`, 
	desc: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Damage Resistance.`,
		`If the weapon's base Damage is greater than the Material's Damage Resistance, then the Material Damage Resistance acts as Damage Reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`Doing so opens you up to a Called Shot against an exposed Body Part if an opponent is waiting for you to lean out of Cover.`,
	]
});

class CoverType {
	constructor({
		material,
		dr
	}) {
		this.material = material;
		this.dr = dr;
	}
}

Cover.table = new Table({
	name: `Cover Table`,
	headers: [`Material`, `Damage Resistance`],
	contents: [
		new CoverType({ material: 'Drywall', dr: 1 }),
		new CoverType({ material: 'Glass', dr: 1 }),
		new CoverType({ material: 'Plywood', dr: 1 }),
		new CoverType({ material: 'Hardwood', dr: 2 }),
		new CoverType({ material: 'Sheet Metal', dr: 2 }),
		new CoverType({ material: 'Brick', dr: 3 }),
		new CoverType({ material: 'Concrete', dr: 4 }),
		new CoverType({ material: 'Steel', dr: 5 }),
	],
	widths: [50, 50]
});

const FriendlyFire = new Rule({
	id: `63808ef6-3fc3-411c-54c9-edcc41ba8a7b`,
	name: `Friendly Fire`, 
	desc: [
		`-3 Ranged against targets within 1yd of your ally.`,
		`If the Ranged Attack Fails, re-roll the Ranged Attack vs the ally’s Reflexive Dodge.`,
	]
});

const Range = new Rule({
	id: `3bca9734-b437-424e-a1e0-16b4a012af50`,
	name: `Range`, 
	desc: [
		`Ranged Attacks take a -1 penalty per additional Range increment.`,
		`Maximum Range is 10 Range increments.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	]
});

const Visibility = new Rule({
	id: `1ce64fb7-256c-4f7c-1750-81ded2f514e4`,
	name: `Visibility`, 
	desc: [
		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`,
	]
});

var Complications = {
	name: `Complications`,
	list: [
		Cover,
		FriendlyFire,
		Range,
		Visibility,
	]
};

const Difficulty = new Rule({
	id: `cacf928a-d180-4428-c809-233b8776473e`,
	name: `Difficulty`,
	desc: [
		`The Result of your roll must be greater than or equal to the Difficulty number to be a Success.`,
		`If the roll is opposed, re-roll ties.`,
		`Difficulties are indicated by the # symbol.`,
		`The Narrator or an opposing roll sets the # for your rolls.`,
		`3# = Trivial`,
		`6# = Routine`,
		`9# = Challenging`,
		`12# = Really Hard`,
		`15# = Very Unlikely`,
		`18# = Nearly Impossible`,
	]
});

const Cooperation = new Rule({
	id: `d54e8b0e-8f14-4426-a34e-8c889fe15413`,
	name: `Cooperation`,
	desc: [
		`If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result.`,
		`The Narrator should use their judgement to determine the time to completion.`,
	]
});

const RoteActions = new Rule({
	id: `b1362980-b2b2-4c4f-870d-d7b2aeda8b47`,
	name: `Rote Actions`,
	desc: [
		`If the roll is unopposed and your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.`,
	]
});

const Success = new Rule({
	id: `2fdf085b-6ec7-4b82-7442-9ecf516664aa`,
	name: `Success`,
	desc: [
		`Your roll is a Success when if the Result is greater than or equal to the Difficulty.`,
		`Re-roll ties on opposed rolls.`,
		`The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks.`,
	]
});
Success.subrules = [
	RoteActions,
	Cooperation,
];

const Fail = new Rule({
	id: `4e7f6142-a2d0-43ac-cdd9-c1d3147dac69`,
	name: `Fail`,
	desc: [
		`Your roll is a Fail when the Result is less than the Difficulty.`,
	]
});

const Explode = new Rule({
	id: `6da8a818-56c8-417a-2c98-c2f9bbde7aa5`,
	name: `Explode`,
	desc: [
		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll.`,
		`If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6.`,
		`When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`,
	]
});

const Botch = new Rule({
	id: `9d933f25-f236-4674-7c40-d34764f96f72`,
	name: `Botch`,
	desc: [
		`A Botch is when you have failed very very badly at a Trait, Skill, or Property roll.`,
		`If you roll 1 on a die and that die is not Exploding, re-roll to check for a Botch.`,
		`If a 1 is rolled again, you Botch.`,
		`If any other number is rolled, your d6 roll is counted as a normal 1.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`,
	]
});

var Core = {
	name: `Core`,
	explanation: [
		`To attempt a difficult action, roll one six-sided die (“d6”) to see how well your efforts worked out for you.`,
		`Your Character’s score in a relevant Trait or Skill is added to the d6 roll to improve your chances of succeeding.`,
		`There are many other modifiers that may add or subtract from your result.`,
		`Modifiers are applied by the Narrator.`,
		`The formula for a roll is shown in [brackets].`,
		`Calculate the Result of a d6 roll as follows:`,
		`[d6 Roll + Score ± Modifiers] = Result`,
	],
	list: [
		Difficulty,
		Success,
		Fail,
		Explode,
		Botch,
	]
};

const GearList = {
	name: `Gear`,
	list: [
		...AccessoryList,
		...AmmoList,
		...ArmorList,
		...BombList,
		...DocumentList,
		...DrugList,
		...ElectronicList,
		...MiscList,
		...MedicalList,
		...MeleeWeaponList,
		...RangedWeaponList,
		...StorageList,
		// ...VehicleList,
	].sort((a, b) => PropSort(a, b, `name`)),
	categories: [
		'melee',
		'ranged',
		'ammo',
		'armor',
		'equipment'
	]
};

class Maneuver extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		cat
	}) {
		super({
			id,
			name,
			desc,
			formula
		});
		this.cat = cat;
	}
}

const Block = new Maneuver({
	id: `af99f6bc-7db2-41ec-b35e-e709bd29d8a1`,
	cat: `Defensive`,
	name: Melee.specs.block.name, 
	desc: Melee.specs.block.desc
});

const Dodge = new Maneuver({
	id: `dcc3220d-72cd-46b2-991d-a6568f5ccdf9`,
	cat: `Defensive`,
	name: Acrobatics.specs.dodge.name, 
	desc: Acrobatics.specs.dodge.desc
});

const Duck = new Maneuver({
	id: `cac81a46-c688-4b29-a680-502f827987ed`,
	cat: `Defensive`,
	name: `Duck`, 
	desc: [
		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
		`This is the only way to Dodge a Ranged(Shoot) Attack.`,
		`As part of this Dodge, you may elect to go Prone.`,
		`If the Attack still hits, the Cover Material’s Damage Resistance reduces the Damage.`,
		`You will keep the benefits of Cover as long as it remains between you and the opponent.`,
	]
});

const Hide = new Maneuver({
	id: `f334f2c5-cc52-4296-b22d-d978f07944d4`,
	cat: `Defensive`,
	name: `Hide`, 
	desc: [
		`Roll [Stealth vs Perception] to be Concealed.`,
		`Your Speed is 0.`,
		`+3 Stealth if Prone.`,
	]
});

const Protect = new Maneuver({
	id: `a484d274-5d64-46a8-99be-08dda62e541a`,
	cat: `Defensive`,
	name: `Protect`, 
	desc: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`,
	]
});

const Sneak = new Maneuver({
	id: `30425d94-d8b5-452f-a884-b145f4f4533b`,
	cat: `Defensive`,
	name: `Sneak`, 
	desc: [
		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
	]
});

const DefensiveManeuvers = [
	Block,
	Dodge,
	Duck,
	Hide,
	Protect,
	Sneak
];

const Aim = new Maneuver({
	id: `b203ca75-1dd4-4700-ac94-b2a02bf2988b`,
	cat: `Offensive`,
	name: `Aim`, 
	desc: [
		`Spend an Action to get +3 to your next Attack against a specific target.`,
	],
});

const CalledShot = new Maneuver({
	id: `7b5ac4ec-c58a-48bd-aaed-c0fbf6716874`,
	cat: `Offensive`,
	name: `Called Shot`, 
	desc: [
		`Attacks target the Torso by default.`,
		`A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects depending on the Body Part.`,
	]
});

class CalledShotTarget {
	constructor({
		roll,
		name,
		penalty,
		effect
	}) {
		this.roll = roll;
		this.name = name;
		this.penalty = penalty;
		this.effect = effect;
	}
}

CalledShot.table = new Table({
	name: `Called Shot Table`,
	headers: [
		`d6`,
		`Part`,
		`Penalty`,
		`Effect`,
	],
	contents: [
		new CalledShotTarget({
			roll: 6,
			name: `Head`,
			penalty: -3,
			health: `Constitution`,
			effect: `Stun 1 round`
		}),
		new CalledShotTarget({
			roll: 5,
			name: `R Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 4,
			name: `L Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 3,
			name: `Torso`,
			penalty: 0,
			effect: `None`
		}),
		new CalledShotTarget({
			roll: 2,
			name: `L Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
		new CalledShotTarget({
			roll: 1,
			name: `R Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
	],
	widths: [5, 15, 20, 50]
});

const Disarm = new Maneuver({
	id: `b4812d24-3b7e-43aa-a2d6-7b734520c5e7`,
	cat: `Offensive`,
	name: `Disarm`, 
	desc: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
		`The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
});

const Grab = new Maneuver({
	id: `3b68967f-c8c2-42b1-929f-3796cf7d1cf7`,
	cat: `Offensive`,
	name: `Grab`,
	desc: [
		`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`,
	]
});

const Hostage = new Maneuver({
	id: `43e2df6c-320a-404a-9381-52b6a441df44`,
	cat: `Offensive`,
	name: `Hostage`,
	desc: [
		`Use a Grabbed or Restrained enemy as Cover.`,
		`The Grappled enemy's Damage Resistance acts as the Material Damage Resistance and any excess Damage is applied to the Grappled enemy instead of you.`,
		`If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you.`,
		`This does not make you Concealed.`,
	]
});

const Tackle = new Maneuver({
	id: `cbc7ab2c-3122-4ab9-b990-c7296e7c66ef`,
	cat: `Offensive`,
	name: `Tackle`,
	desc: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
		`If you Fail, you go Prone in front of them.`,
	]
});

const Throw = new Maneuver({
	id: `cd4abf3b-f40f-401e-8824-9a10cce729c9`,
	cat: `Offensive`,
	name: `Throw`,
	desc: [
		`Throw a Grabbed or Restrained enemy up to [Constitution] yds.`,
		`The target takes 1 point of Blunt Damage to a random Body Part and land Prone.`,
	]
});

const Grapple = new Maneuver({
	id: `974d2b5c-67e0-4e5d-8dd8-883d98a5926e`,
	cat: `Offensive`,
	name: `Grapple`,
	desc: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no Damage.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each round the Attacker must choose to either spend 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	]
});

Grapple.subrules = [
	Grab,
	Hostage, 
	Tackle, 
	Throw
];

const NonLethalForce = new Maneuver({
	id: `76fb1603-4c1d-4b07-a128-c73927f2f036`,
	cat: `Offensive`,
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	]
});

const Push = new Maneuver({
	id: `d12992e8-2616-45ad-b909-e8315de8d0a9`,
	cat: `Offensive`,
	name: `Push`,
	desc: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	]
});

const Reload = new Maneuver({
	id: `a5e75193-65f5-45ac-92a2-3efac4ab264e`,
	cat: `Offensive`,
	name: `Reload`,
	desc: [
		`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`,
	]
});

const Shove = new Maneuver({
	id: `0c791227-b8d2-42a6-b5c1-b2aedcab0aad`,
	cat: `Offensive`,
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
	]
});

const Trip = new Maneuver({
	id: `0f4236ef-ce76-4942-bbb0-f0f6ca5e840e`,
	cat: `Offensive`,
	name: `Trip`,
	desc: [
		`Roll [Melee vs Agility] to knock an enemy Prone. 1 Damage.`,
	]
});

const OffensiveManeuvers = [
	Aim,
	CalledShot,
	Disarm,
	Grapple,
	NonLethalForce,
	Push,
	Reload,
	Shove,
	Trip
];

const Distract = new Maneuver({
	id: `6fe1552c-4cb6-416f-8691-0cfc0ac39af5`,
	cat: `Social`,
	name: `Distract`,
	desc: [
		`Roll [Perform vs Perception].`,
		`Stun target for 1 round.`,
	]
});

const Encourage = new Maneuver({
	id: `46b57ab5-e31d-4d60-902b-b9f56d95168d`,
	cat: `Social`,
	name: `Encourage`,
	desc: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`,
	]
});

const Interrogate = new Maneuver({
	id: `28849e94-5c31-4b49-a84b-63a1b8cec363`,
	cat: `Social`,
	name: `Interrogate`,
	desc: [
		`Roll [Leadership vs Demeanor] to get information out of a subject who does not want to help, but without resorting to violence.`,
		`Each roll takes d6 mins of conversation.`,
		`If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly).`,
		`If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts.`,
		`After Fails = [Demeanor], the interrogator gives up or the subject cracks and tells everything they know.`,
	]
});

const Negotiate = new Maneuver({
	id: `5d88546a-77df-402d-a9b5-bcab8a62fa6c`,
	cat: `Social`,
	name: `Negotiate`,
	desc: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands.`,
		`Roll [Socialize vs Socialize] once per demand.`,
		`Attitude and situational modifiers should be applied by the Narrator.`,
		`Success means you get your demand and the opposed negotiator concedes.`,
		`Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`,
	]
});

const Recruit = new Maneuver({
	id: `9599dc01-9940-44d8-ae36-e4623810fe5d`,
	cat: `Social`,
	name: `Recruit`,
	desc: [
		`Roll [Socialize vs Demeanor] to convince someone to join your side.`,
		`If they are someone’s follower, roll [Leadership vs Leadership].`,
		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	]
});

const Taunt = new Maneuver({
	id: `a00cbcf0-3593-493b-9fd8-575846d182bb`,
	cat: `Social`,
	name: `Taunt`,
	desc: [
		`Roll [Leadership vs Demeanor].`,
		`Provoke the enemy into exclusively attacking you.`,
		`The degree of Success is a penalty to the loser’s next roll.`,
		`The enemy is Stunned for 1 round if [penalty > enemy’s Demeanor].`,
	]
});

const Torture = new Maneuver({
	id: `9da029d0-9c58-4407-812c-396fb59c764b`,
	cat: `Social`,
	name: `Torture`,
	desc: [
		`Roll [Medicine vs prisoner’s Constitution] once per hour to cause a captive d6 Pain to soften their resolve without killing them.`,
		`Failure does d6 Damage to the captive.`,
		`Roll [Demeanor vs Demeanor] at the end of each hour (Pain penalty applies).`,
		`Failure causes -1 Psyche loss.`,
		`At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`,
	]
});

const SocialManeuvers = [
	Distract,
	Encourage,
	Interrogate,
	Negotiate,
	Recruit,
	Taunt,
	Torture
];

var Maneuvers = {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers,
	]
};

const Asphyxiation = new Rule({
	id: `b3c3fa84-e24d-4112-82ff-7c346a207e47`,
	name: `Asphyxiation`,
	desc: [
		`Constant air supply is required.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
});

const Dehydration = new Rule({
	id: `34974574-6455-4c07-8456-8f7bdc78ec9b`,
	name: `Dehydration`,
	desc: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
	]
});

const Exhaustion = new Rule({
	id: `0494a41e-f8f8-45f5-a1ef-5660900e37db`,
	name: `Exhaustion`,
	desc: [
		`8 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
});

const Hypothermia = new Rule({
	id: `1625c80c-5630-4f20-b909-ed91dbce371b`,
	name: `Hypothermia`,
	desc: [
		`Warmth is required.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
});

const Starvation = new Rule({
	id: `93f70ef3-b00f-4e52-9e11-5225262b27e4`,
	name: `Starvation`,
	desc: [
		`1 Food per day is required.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
});

var Needs = {
	name: `Needs`,
	explanation: [
		`Take 1 Pain for each unmet requirement over a given period of time.`,
	],
	list: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
	]
};

var Properties = {
	name: `Properties`,
	explanation: [
		`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
	],
	list: [
		Block$1,
		Carry,
		Dodge$1,
		Experience,
		Health,
		Intellect,
		Luck,
		Psyche,
		Speed,
	],
	setScores: function(c) {
		this.list.forEach(p => p.formula(c));
		return c
	}
};

const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills,
];

var Skills = {
	name: `Skills`,
	explanation: [
		`You get Brains x 6 Skill points to assign.`,
		`Skills range from 0 to 6.`,
		`Skill rolls are [d6 + Skill].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: SkillList,
	groups: [
		{
			name: `Agility`,
			list: AgilitySkills
		},
		{
			name: `Brains`,
			list: BrainsSkills
		},
		{
			name: `Constitution`,
			list: ConstitutionSkills
		},
		{
			name: `Demeanor`,
			list: DemeanorSkills
		},
	],
	specs: Object.values(SkillList)
				.map((s) => Object.values(s.specs))
				.reduce((a, b) => a.concat(b), [])
				.sort((a, b) => PropSort(a, b, `name`)),
	startingPoints: (c) => c.traits.brains.score * 6,
	assign: function(c, target) {
		c.skills[target.name].score = parseInt(target.value);
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		const max = c.traits[c.skills[targetName].parent.toLowerCase()].score;
		while(this.remaining(c) < 0 || c.skills[targetName].score > max) {
			c.skills[targetName].score--;
		}
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.skills));
			const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score;
			if (c.skills[t].score < parentScore) c.skills[t].score++;
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { score }) => t += score, 0);
		return this.startingPoints(c) - spent
	},
	reset: function(c) {
		Object.keys(c.skills).forEach(t => c.skills[t].score = 0);
		return c
	},
};

const Bleeding = new Rule({
	id: `1a2a047c-128c-4136-ad65-0afd81c9362d`,
	name: `Bleeding`,
	desc: [
		`You begin Bleeding whenever you take Damage that isn't Blunt.`,
		`Bleeding Damage is dealt to the Torso, regardless of which Body Part took the initial Damage.`,
		`If your Torso has positive Health, the rate of Bleeding is 1 Damage per minute.`,
		`If any Body Part drops to 0 or negative Health, the rate of Bleeding is 1 Damage per round.`,
		`A Bleeding person with positive Torso Health can roll Constitution vs total Damage once per minute to stop Bleeding on their own, otherwise the Medicine Skill is required.`,
	]
});

const Blind = new Rule({
	id: `5fb3123f-b7f0-4e09-acfb-10ed93b675a8`,
	name: `Blind`,
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
});

const Burning = new Rule({
	id: `fdd9257e-9937-4786-a6b0-eb77c39ba7f4`,
	name: `Burning`,
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
});

const Concealed = new Rule({
	id: `56037ac2-9ad0-4097-9cef-621ea8d171e7`,
	name: `Concealed`,
	desc: [
		`If an opponent cannot see you, they are considered to be Blind to you.`,
		`Any Attack they make targeting you is at a -6 penalty.`,
		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
		`Targets are Defenseless against Attacks from Concealed opponents.`,
	]
});

const Deaf = new Rule({
	id: `0a8842eb-6a28-4216-853b-11d6930a9edc`,
	name: `Deaf`,
	desc: [
		`You automatically Fail any roll that involves hearing.`
	]
});

const Defenseless = new Rule({
	id: `62f3017d-c64a-4647-aed4-da944bf52449`,
	name: `Defenseless`,
	desc: [
		`You must use a Reflexive Defense.`,
		`Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
	]
});

const Falling = new Rule({
	id: `064cb25d-caff-4c33-944a-849604861561`,
	name: `Falling`,
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Body Part.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
});

const Grabbed = new Rule({
	id: `fcf2148a-1825-4962-8e88-866e9fbdced4`,
	name: `Grabbed`,
	desc: [
		`A Grabbed opponent is considered to be Immobilized.`,
	]
});

const Harmless = new Rule({
	id: `25b1eaa6-4cfb-46c1-9d69-142209a7a3b0`,
	name: `Harmless`,
	desc: [
		`You cannot Attack.`,
	]
});

const Immobilized = new Rule({
	id: `2e7634cc-4b65-483d-8011-b12d6bee9bd5`,
	name: `Immobilized`,
	desc: [
		`Your Speed is temporarily considered to be 0.`
	]
});

const OffHand = new Rule({
	id: `c3aba659-dd96-4f42-8281-0d13b9c6de2e`,
	name: `Off-Hand`,
	desc: [
		`-3 penalty to Attack with your Off-Hand.`,
	]
});

const Pinned = new Rule({
	id: `d2e8c636-d853-4fa2-a0dd-2dad409ba5fc`,
	name: `Pinned`,
	desc: [
		`Pinned is the third and final step of Grappling.`,
		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
		`The Attacker is also considered to be Immobilized and Prone.`,
	]
});

const Prone = new Rule({
	id: `687fbf28-8198-4363-bea5-61d56f878c23`,
	name: `Prone`,
	desc: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
		`Standing up takes 1 Action.`,
		`The benefits of being Prone are that you get +3 Ranged and +3 Stealth, and attackers take a -3 Ranged penalty to hit you.`,
		`The drawbacks of being Prone are that your Speed drops to 1yrd and attackers get a +3 Melee bonus to hit you.`,
	]
});

const Restrained = new Rule({
	id: `a836f410-b9ef-4b32-a753-8b732b8e4b11`,
	name: `Restrained`,
	desc: [
		`Restrained is the second step of Grappling.`,
		`While Restrained, you are considered to be Harmless and Immobilized.`,
	]
});

const Stun = new Rule({
	id: `ba6cf397-b434-442f-a725-73ee00cf23ca`,
	name: `Stun`,
	desc: [
		`Defenseless, Harmless, and Immobilized.`,
		`You fall Prone if Stunned for longer than 1 round.`,
	]
});

const Unarmed = new Rule({
	id: `f37ac524-e26b-49b0-a3e7-5d01a50c5693`,
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	]
});

const Unconscious = new Rule({
	id: `0f336152-640e-40b9-bd40-5a717ba9b61c`,
	name: `Unconscious`,
	desc: [
		`Unaware and unable to do anything.`,
		`You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`,
	]
});

const Unstable = new Rule({
	id: `c1da7d28-31a8-468c-a454-157fe3addb62`,
	name: `Unstable`,
	desc: [
		`-3 penalty to Agility or Constitution Skill rolls.`,
		`Ranged Attacks targeting you take a -3 penalty.`,
	]
});

var Status = {
	name: `Status`,
	list: [
		Bleeding,
		Blind,
		Burning,
		Concealed,
		Deaf,
		Defenseless,
		Falling,
		Grabbed,
		Harmless,
		Immobilized,
		OffHand,
		Pinned,
		Prone,
		Restrained,
		Stun,
		Unarmed,
		Unconscious,
		Unstable,
	]
};

const traitMax = 6;

const traitPoints = 14;

var Traits = {
	name: `Traits`,
	explanation: [
		`You get ${traitPoints} Trait points to assign.`,
		`Traits range from 1 to ${traitMax}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: [
		Agility,
		Brains,
		Constitution,
		Demeanor,
	],
	max: traitMax,
	startingPoints: () => traitPoints,
	assign: function(c, target) {
		c.traits[target.name].score = parseInt(target.value);
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		while(this.remaining(c) < 0) c.traits[targetName].score--;
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.traits));
			if (c.traits[t].score < this.max) c.traits[t].score++;
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0);
		return this.startingPoints() - spent
	},
	reset: function(c) {
		Object.keys(c.traits).forEach(t => c.traits[t].score = 1);
		return c
	}
};

const Manual = [
    Abilities,
    Combat,
    Complications,
    Core,
    GearList,
    Maneuvers,
    Needs,
    Properties,
    Skills,
    Status,
    Traits
];

/* src/components/views/manual/ManRuleDesc.svelte generated by Svelte v3.29.0 */
const file = "src/components/views/manual/ManRuleDesc.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (9:4) {#each rule.desc as desc}
function create_each_block(ctx) {
	let p;
	let t_value = /*desc*/ ctx[1] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(p, "class", "rule-desc svelte-19eaj49");
			add_location(p, file, 9, 8, 160);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*desc*/ ctx[1] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(9:4) {#each rule.desc as desc}",
		ctx
	});

	return block;
}

// (13:0) {#if rule instanceof Ability}
function create_if_block(ctx) {
	let p0;
	let span0;
	let t0;
	let t1;
	let t2_value = /*rule*/ ctx[0].max + "";
	let t2;
	let t3;
	let p1;
	let span1;
	let t4;
	let t5;
	let t6_value = /*rule*/ ctx[0].xp + "";
	let t6;

	const block = {
		c: function create() {
			p0 = element("p");
			span0 = element("span");
			t0 = text("Max:");
			t1 = space();
			t2 = text(t2_value);
			t3 = space();
			p1 = element("p");
			span1 = element("span");
			t4 = text("XP:");
			t5 = space();
			t6 = text(t6_value);
			this.h();
		},
		l: function claim(nodes) {
			p0 = claim_element(nodes, "P", {});
			var p0_nodes = children(p0);
			span0 = claim_element(p0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, "Max:");
			span0_nodes.forEach(detach_dev);
			t1 = claim_space(p0_nodes);
			t2 = claim_text(p0_nodes, t2_value);
			p0_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			p1 = claim_element(nodes, "P", {});
			var p1_nodes = children(p1);
			span1 = claim_element(p1_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t4 = claim_text(span1_nodes, "XP:");
			span1_nodes.forEach(detach_dev);
			t5 = claim_space(p1_nodes);
			t6 = claim_text(p1_nodes, t6_value);
			p1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "bold svelte-19eaj49");
			add_location(span0, file, 13, 7, 248);
			add_location(p0, file, 13, 4, 245);
			attr_dev(span1, "class", "bold svelte-19eaj49");
			add_location(span1, file, 14, 7, 301);
			add_location(p1, file, 14, 4, 298);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p0, anchor);
			append_dev(p0, span0);
			append_dev(span0, t0);
			append_dev(p0, t1);
			append_dev(p0, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, p1, anchor);
			append_dev(p1, span1);
			append_dev(span1, t4);
			append_dev(p1, t5);
			append_dev(p1, t6);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t2_value !== (t2_value = /*rule*/ ctx[0].max + "")) set_data_dev(t2, t2_value);
			if (dirty & /*rule*/ 1 && t6_value !== (t6_value = /*rule*/ ctx[0].xp + "")) set_data_dev(t6, t6_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p0);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(p1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(13:0) {#if rule instanceof Ability}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let t;
	let if_block_anchor;
	let each_value = /*rule*/ ctx[0].desc;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block = /*rule*/ ctx[0] instanceof Ability && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "desc-section");
			add_location(div, file, 7, 0, 95);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			insert_dev(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*rule*/ 1) {
				each_value = /*rule*/ ctx[0].desc;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*rule*/ ctx[0] instanceof Ability) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ManRuleDesc", slots, []);
	let { rule } = $$props;
	const writable_props = ["rule"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManRuleDesc> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	$$self.$capture_state = () => ({ Ability, rule });

	$$self.$inject_state = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [rule];
}

class ManRuleDesc extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { rule: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ManRuleDesc",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
			console.warn("<ManRuleDesc> was created without expected prop 'rule'");
		}
	}

	get rule() {
		throw new Error("<ManRuleDesc>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rule(value) {
		throw new Error("<ManRuleDesc>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/views/manual/ManRuleSpecs.svelte generated by Svelte v3.29.0 */

const { Object: Object_1 } = globals;
const file$1 = "src/components/views/manual/ManRuleSpecs.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (10:12) {#each spec.desc as spec_desc}
function create_each_block_1(ctx) {
	let p;
	let t_value = /*spec_desc*/ ctx[4] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(p, "class", "spec-desc svelte-14xk3cs");
			add_location(p, file$1, 10, 16, 216);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*spec_desc*/ ctx[4] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(10:12) {#each spec.desc as spec_desc}",
		ctx
	});

	return block;
}

// (7:4) {#each Object.values(rule.specs) as spec}
function create_each_block$1(ctx) {
	let li;
	let div;
	let t0_value = /*spec*/ ctx[1].name + "";
	let t0;
	let t1;
	let t2;
	let each_value_1 = /*spec*/ ctx[1].desc;
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			li = element("li");
			div = element("div");
			t0 = text(t0_value);
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			div = claim_element(li_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			div_nodes.forEach(detach_dev);
			t1 = claim_space(li_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(li_nodes);
			}

			t2 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "sub-name");
			add_location(div, file$1, 8, 12, 117);
			add_location(li, file$1, 7, 8, 100);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, div);
			append_dev(div, t0);
			append_dev(li, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(li, null);
			}

			append_dev(li, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t0_value !== (t0_value = /*spec*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*Object, rule*/ 1) {
				each_value_1 = /*spec*/ ctx[1].desc;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(li, t2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(7:4) {#each Object.values(rule.specs) as spec}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let ul;
	let each_value = Object.values(/*rule*/ ctx[0].specs);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			ul = claim_element(nodes, "UL", {});
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(ul, file$1, 5, 0, 41);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*Object, rule*/ 1) {
				each_value = Object.values(/*rule*/ ctx[0].specs);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ManRuleSpecs", slots, []);
	let { rule } = $$props;
	const writable_props = ["rule"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManRuleSpecs> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	$$self.$capture_state = () => ({ rule });

	$$self.$inject_state = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [rule];
}

class ManRuleSpecs extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { rule: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ManRuleSpecs",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
			console.warn("<ManRuleSpecs> was created without expected prop 'rule'");
		}
	}

	get rule() {
		throw new Error("<ManRuleSpecs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rule(value) {
		throw new Error("<ManRuleSpecs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/views/manual/ManRuleTable.svelte generated by Svelte v3.29.0 */

const { Object: Object_1$1 } = globals;
const file$2 = "src/components/views/manual/ManRuleTable.svelte";

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

// (9:12) {#each rule.table.headers as h, i}
function create_each_block_2(ctx) {
	let td;
	let t_value = /*h*/ ctx[5] + "";
	let t;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			td = claim_element(nodes, "TD", { style: true });
			var td_nodes = children(td);
			t = claim_text(td_nodes, t_value);
			td_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			add_location(td, file$2, 9, 16, 175);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*h*/ ctx[5] + "")) set_data_dev(t, t_value);

			if (dirty & /*rule*/ 1) {
				set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			}

			if (dirty & /*rule*/ 1) {
				set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(9:12) {#each rule.table.headers as h, i}",
		ctx
	});

	return block;
}

// (15:12) {#each Object.values(c) as c, i}
function create_each_block_1$1(ctx) {
	let td;
	let t_value = /*c*/ ctx[1] + "";
	let t;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			td = claim_element(nodes, "TD", { style: true });
			var td_nodes = children(td);
			t = claim_text(td_nodes, t_value);
			td_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			add_location(td, file$2, 15, 16, 420);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*c*/ ctx[1] + "")) set_data_dev(t, t_value);

			if (dirty & /*rule*/ 1) {
				set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			}

			if (dirty & /*rule*/ 1) {
				set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(15:12) {#each Object.values(c) as c, i}",
		ctx
	});

	return block;
}

// (13:8) {#each rule.table.contents as c, i}
function create_each_block$2(ctx) {
	let tr;
	let t;
	let each_value_1 = Object.values(/*c*/ ctx[1]);
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			tr = element("tr");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			this.h();
		},
		l: function claim(nodes) {
			tr = claim_element(nodes, "TR", { class: true });
			var tr_nodes = children(tr);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(tr_nodes);
			}

			t = claim_space(tr_nodes);
			tr_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(tr, "class", "svelte-1vpg0vt");
			add_location(tr, file$2, 13, 12, 354);
		},
		m: function mount(target, anchor) {
			insert_dev(target, tr, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}

			append_dev(tr, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*rule, Object*/ 1) {
				each_value_1 = Object.values(/*c*/ ctx[1]);
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, t);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(13:8) {#each rule.table.contents as c, i}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div;
	let table;
	let tr;
	let t;
	let each_value_2 = /*rule*/ ctx[0].table.headers;
	validate_each_argument(each_value_2);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value = /*rule*/ ctx[0].table.contents;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div = element("div");
			table = element("table");
			tr = element("tr");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			table = claim_element(div_nodes, "TABLE", { class: true });
			var table_nodes = children(table);
			tr = claim_element(table_nodes, "TR", { class: true });
			var tr_nodes = children(tr);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].l(tr_nodes);
			}

			tr_nodes.forEach(detach_dev);
			t = claim_space(table_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(table_nodes);
			}

			table_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(tr, "class", "table-header svelte-1vpg0vt");
			add_location(tr, file$2, 7, 8, 86);
			attr_dev(table, "class", "svelte-1vpg0vt");
			add_location(table, file$2, 6, 4, 70);
			attr_dev(div, "class", "rule-table svelte-1vpg0vt");
			add_location(div, file$2, 5, 0, 41);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, table);
			append_dev(table, tr);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(tr, null);
			}

			append_dev(table, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(table, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*rule*/ 1) {
				each_value_2 = /*rule*/ ctx[0].table.headers;
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty & /*Object, rule*/ 1) {
				each_value = /*rule*/ ctx[0].table.contents;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(table, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ManRuleTable", slots, []);
	let { rule } = $$props;
	const writable_props = ["rule"];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManRuleTable> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	$$self.$capture_state = () => ({ rule });

	$$self.$inject_state = $$props => {
		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [rule];
}

class ManRuleTable extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { rule: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ManRuleTable",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
			console.warn("<ManRuleTable> was created without expected prop 'rule'");
		}
	}

	get rule() {
		throw new Error("<ManRuleTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rule(value) {
		throw new Error("<ManRuleTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/views/manual/ManSubRule.svelte generated by Svelte v3.29.0 */

const file$3 = "src/components/views/manual/ManSubRule.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (8:4) {#each subrule.desc as sub_desc}
function create_each_block$3(ctx) {
	let p;
	let t_value = /*sub_desc*/ ctx[1] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(p, "class", "sub-desc svelte-1g7stbd");
			add_location(p, file$3, 8, 8, 178);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*subrule*/ 1 && t_value !== (t_value = /*sub_desc*/ ctx[1] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(8:4) {#each subrule.desc as sub_desc}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let details;
	let summary;
	let t0_value = /*subrule*/ ctx[0].name + "";
	let t0;
	let t1;
	let each_value = /*subrule*/ ctx[0].desc;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			details = element("details");
			summary = element("summary");
			t0 = text(t0_value);
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			details = claim_element(nodes, "DETAILS", { class: true });
			var details_nodes = children(details);
			summary = claim_element(details_nodes, "SUMMARY", { class: true });
			var summary_nodes = children(summary);
			t0 = claim_text(summary_nodes, t0_value);
			summary_nodes.forEach(detach_dev);
			t1 = claim_space(details_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(details_nodes);
			}

			details_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(summary, "class", "sub-name svelte-1g7stbd");
			add_location(summary, file$3, 6, 4, 82);
			attr_dev(details, "class", "subrule-details svelte-1g7stbd");
			add_location(details, file$3, 5, 0, 44);
		},
		m: function mount(target, anchor) {
			insert_dev(target, details, anchor);
			append_dev(details, summary);
			append_dev(summary, t0);
			append_dev(details, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(details, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*subrule*/ 1 && t0_value !== (t0_value = /*subrule*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*subrule*/ 1) {
				each_value = /*subrule*/ ctx[0].desc;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(details, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(details);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ManSubRule", slots, []);
	let { subrule } = $$props;
	const writable_props = ["subrule"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManSubRule> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("subrule" in $$props) $$invalidate(0, subrule = $$props.subrule);
	};

	$$self.$capture_state = () => ({ subrule });

	$$self.$inject_state = $$props => {
		if ("subrule" in $$props) $$invalidate(0, subrule = $$props.subrule);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [subrule];
}

class ManSubRule extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { subrule: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ManSubRule",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*subrule*/ ctx[0] === undefined && !("subrule" in props)) {
			console.warn("<ManSubRule> was created without expected prop 'subrule'");
		}
	}

	get subrule() {
		throw new Error("<ManSubRule>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subrule(value) {
		throw new Error("<ManSubRule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { ManRuleDesc as M, ManRuleSpecs as a, ManRuleTable as b, ManSubRule as c, Manual as d };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuU3ViUnVsZS5jNGQ3OGY5Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvYWJpbGl0aWVzL0FiaWxpdGllcy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbWJhdC9Sb3VuZHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9jb21iYXQvQWN0aW9ucy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbWJhdC9Db21tdW5pY2F0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L0NoYXNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L01vdmVtZW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L0F0dGFjay5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbWJhdC9SZWZsZXhpdmVEZWZlbnNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L0RlZmVuc2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9jb21iYXQvRGFtYWdlUmVzaXN0YW5jZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbWJhdC9GaXJlRGFtYWdlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L1BhaW4uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9jb21iYXQvUmVjb3ZlcnkuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9jb21iYXQvRGFtYWdlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tYmF0L0NvbWJhdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL1RhYmxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tcGxpY2F0aW9ucy9Db3Zlci5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbXBsaWNhdGlvbnMvRnJpZW5kbHlGaXJlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29tcGxpY2F0aW9ucy9SYW5nZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbXBsaWNhdGlvbnMvVmlzaWJpbGl0eS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvbXBsaWNhdGlvbnMvQ29tcGxpY2F0aW9ucy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvcmUvRGlmZmljdWx0eS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvcmUvQ29vcGVyYXRpb24uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9jb3JlL1JvdGVBY3Rpb25zLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29yZS9TdWNjZXNzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29yZS9GYWlsLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29yZS9FeHBsb2RlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvY29yZS9Cb3RjaC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2NvcmUvQ29yZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvR2Vhckxpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvZGVmZW5zaXZlL0Jsb2NrLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL2RlZmVuc2l2ZS9Eb2RnZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9kZWZlbnNpdmUvRHVjay5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9kZWZlbnNpdmUvSGlkZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9kZWZlbnNpdmUvUHJvdGVjdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9kZWZlbnNpdmUvU25lYWsuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvZGVmZW5zaXZlL0RlZmVuc2l2ZU1hbmV1dmVycy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9vZmZlbnNpdmUvQWltLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9DYWxsZWRTaG90LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9EaXNhcm0uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL0dyYWIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL0hvc3RhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL1RhY2tsZS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL21hbmV1dmVycy9vZmZlbnNpdmUvVGhyb3cuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL0dyYXBwbGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL05vbkxldGhhbEZvcmNlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9QdXNoLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9SZWxvYWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL1Nob3ZlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9UcmlwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9PZmZlbnNpdmVNYW5ldXZlcnMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvc29jaWFsL0Rpc3RyYWN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL3NvY2lhbC9FbmNvdXJhZ2UuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvc29jaWFsL0ludGVycm9nYXRlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL3NvY2lhbC9OZWdvdGlhdGUuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvc29jaWFsL1JlY3J1aXQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvc29jaWFsL1RhdW50LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL3NvY2lhbC9Ub3J0dXJlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbWFuZXV2ZXJzL3NvY2lhbC9Tb2NpYWxNYW5ldXZlcnMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXJzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbmVlZHMvQXNwaHl4aWF0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbmVlZHMvRGVoeWRyYXRpb24uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9uZWVkcy9FeGhhdXN0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbmVlZHMvSHlwb3RoZXJtaWEuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9uZWVkcy9TdGFydmF0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvbmVlZHMvTmVlZHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9wcm9wZXJ0aWVzL1Byb3BlcnRpZXMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9za2lsbHMvU2tpbGxzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0JsZWVkaW5nLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0JsaW5kLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0J1cm5pbmcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9zdGF0dXMvQ29uY2VhbGVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0RlYWYuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9zdGF0dXMvRGVmZW5zZWxlc3MuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9zdGF0dXMvRmFsbGluZy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3N0YXR1cy9HcmFiYmVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0hhcm1sZXNzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL0ltbW9iaWxpemVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL09mZkhhbmQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9zdGF0dXMvUGlubmVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL1Byb25lLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL1Jlc3RyYWluZWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9zdGF0dXMvU3R1bi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3N0YXR1cy9VbmFybWVkLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL1VuY29uc2Npb3VzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL1Vuc3RhYmxlLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvc3RhdHVzL1N0YXR1cy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL3RyYWl0cy9UcmFpdHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9NYW51YWwuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy92aWV3cy9tYW51YWwvTWFuUnVsZURlc2Muc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdmlld3MvbWFudWFsL01hblJ1bGVTcGVjcy5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy92aWV3cy9tYW51YWwvTWFuUnVsZVRhYmxlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXdzL21hbnVhbC9NYW5TdWJSdWxlLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJpbGl0eSBmcm9tICdydWxlcy9hYmlsaXRpZXMvQWJpbGl0eS5qcydcbmltcG9ydCBQcm9wU29ydCBmcm9tICd1dGlscy9Qcm9wU29ydC5qcydcbmltcG9ydCBYUDNBYmlsaXRpZXMgZnJvbSAncnVsZXMvYWJpbGl0aWVzL1hQM0FiaWxpdGllcy5qcydcbmltcG9ydCBYUDZBYmlsaXRpZXMgZnJvbSAncnVsZXMvYWJpbGl0aWVzL1hQNkFiaWxpdGllcy5qcydcbmltcG9ydCBYUDlBYmlsaXRpZXMgZnJvbSAncnVsZXMvYWJpbGl0aWVzL1hQOUFiaWxpdGllcy5qcydcbmltcG9ydCBYUDEyQWJpbGl0aWVzIGZyb20gJ3J1bGVzL2FiaWxpdGllcy9YUDEyQWJpbGl0aWVzLmpzJ1xuaW1wb3J0IFhQMTVBYmlsaXRpZXMgZnJvbSAncnVsZXMvYWJpbGl0aWVzL1hQMTVBYmlsaXRpZXMuanMnXG5pbXBvcnQgWFAxOEFiaWxpdGllcyBmcm9tICdydWxlcy9hYmlsaXRpZXMvWFAxOEFiaWxpdGllcy5qcydcbmltcG9ydCBYUDI0QWJpbGl0aWVzIGZyb20gJ3J1bGVzL2FiaWxpdGllcy9YUDI0QWJpbGl0aWVzLmpzJ1xuaW1wb3J0IFhQMzBBYmlsaXRpZXMgZnJvbSAncnVsZXMvYWJpbGl0aWVzL1hQMzBBYmlsaXRpZXMuanMnXG5pbXBvcnQgQXBwZW5kVG9HVVVJRCBmcm9tICd1dGlscy9BcHBlbmRUb0dVVUlELmpzJ1xuaW1wb3J0IFJhbmRvbVJvbGwgZnJvbSAncmFuZG9tL1JhbmRvbVJvbGwuanMnXG5cblxuY29uc3QgYWJpbGl0eUFycmF5ID0gW1xuXHQuLi5YUDNBYmlsaXRpZXMsXG5cdC4uLlhQNkFiaWxpdGllcyxcblx0Li4uWFA5QWJpbGl0aWVzLFxuXHQuLi5YUDEyQWJpbGl0aWVzLFxuXHQuLi5YUDE1QWJpbGl0aWVzLFxuXHQuLi5YUDE4QWJpbGl0aWVzLFxuXHQuLi5YUDI0QWJpbGl0aWVzLFxuXHQuLi5YUDMwQWJpbGl0aWVzXG5dXG5cbmNvbnN0IGNvbXBsZXRlQWJpbGl0eUxpc3RCdWlsZGVyID0gKGxpc3QpID0+IHtcblx0Y29uc3QgbmV3TGlzdCA9IFtdXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuXHRcdGlmIChsaXN0W2ldLm9wdHNbMF0pIHtcblx0XHRcdGZvciAobGV0IG8gPSAwOyBvIDwgbGlzdFtpXS5vcHRzLmxlbmd0aDsgKytvKSB7XG5cdFx0XHRcdGxldCBuZXdHVVVJRCA9IEFwcGVuZFRvR1VVSUQobGlzdFtpXS5pZCwgbGlzdFtpXS5vcHRzW29dLm5hbWUpXG5cdFx0XHRcdGNvbnN0IG5ld0FiaWxpdHkgPSBuZXcgQWJpbGl0eSh7XG5cdFx0XHRcdFx0aWQ6IG5ld0dVVUlELFxuXHRcdFx0XHRcdG5hbWU6IGxpc3RbaV0ubmFtZSxcblx0XHRcdFx0XHRkZXNjOiBsaXN0W2ldLmRlc2MsXG5cdFx0XHRcdFx0bWF4OiBsaXN0W2ldLm1heCxcblx0XHRcdFx0XHR4cDogbGlzdFtpXS54cCxcblx0XHRcdFx0XHR0YWtlbjogbGlzdFtpXS50YWtlbixcblx0XHRcdFx0XHRvcHRzOiBbXG5cdFx0XHRcdFx0XHRsaXN0W2ldLm9wdHNbb10sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRzZWxlY3Rpb246IG9cblx0XHRcdFx0fSlcblx0XHRcdFx0bmV3TGlzdC5wdXNoKG5ld0FiaWxpdHkpXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IG5ld0FiaWxpdHkgPSBuZXcgQWJpbGl0eSh7XG5cdFx0XHRcdGlkOiBsaXN0W2ldLmlkLFxuXHRcdFx0XHRuYW1lOiBsaXN0W2ldLm5hbWUsXG5cdFx0XHRcdGRlc2M6IGxpc3RbaV0uZGVzYyxcblx0XHRcdFx0bWF4OiBsaXN0W2ldLm1heCxcblx0XHRcdFx0eHA6IGxpc3RbaV0ueHAsXG5cdFx0XHRcdHRha2VuOiBsaXN0W2ldLnRha2VuXG5cdFx0XHR9KVxuXHRcdFx0bmV3TGlzdC5wdXNoKG5ld0FiaWxpdHkpXG5cdFx0fVxuXHR9XG5cdHJldHVybiBuZXdMaXN0XG59XG5cbmV4cG9ydCBjb25zdCBBYmlsaXRpZXMgPSB7XG5cdG5hbWU6IGBBYmlsaXRpZXNgLFxuXHRleHBsYW5hdGlvbjogW1xuXHRcdGBBYmlsaXRpZXMgYXJlIENoYXJhY3RlciB1cGdyYWRlcyBwdXJjaGFzZWQgd2l0aCBYUC5gXG5cdF0sXG5cdGdyb3VwczogW1xuXHRcdHtcblx0XHRcdG5hbWU6IDMsXG5cdFx0XHR2aXNpYmxlOiBmYWxzZSxcblx0XHRcdGxpc3Q6IFhQM0FiaWxpdGllc1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogNixcblx0XHRcdHZpc2libGU6IGZhbHNlLFxuXHRcdFx0bGlzdDogWFA2QWJpbGl0aWVzXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiA5LFxuXHRcdFx0dmlzaWJsZTogZmFsc2UsXG5cdFx0XHRsaXN0OiBYUDlBYmlsaXRpZXNcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6IDEyLFxuXHRcdFx0dmlzaWJsZTogZmFsc2UsXG5cdFx0XHRsaXN0OiBYUDEyQWJpbGl0aWVzXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAxNSxcblx0XHRcdHZpc2libGU6IGZhbHNlLFxuXHRcdFx0bGlzdDogWFAxNUFiaWxpdGllc1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogMTgsXG5cdFx0XHR2aXNpYmxlOiBmYWxzZSxcblx0XHRcdGxpc3Q6IFhQMThBYmlsaXRpZXNcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6IDI0LFxuXHRcdFx0dmlzaWJsZTogZmFsc2UsXG5cdFx0XHRsaXN0OiBYUDI0QWJpbGl0aWVzXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAzMCxcblx0XHRcdHZpc2libGU6IGZhbHNlLFxuXHRcdFx0bGlzdDogWFAzMEFiaWxpdGllc1xuXHRcdH0sXG5cdF0sXG5cdGxpc3Q6IGFiaWxpdHlBcnJheS5zb3J0KChhLCBiKSA9PiBQcm9wU29ydChhLCBiLCAnbmFtZScpKSxcblx0bWFzdGVyTGlzdDogY29tcGxldGVBYmlsaXR5TGlzdEJ1aWxkZXIoYWJpbGl0eUFycmF5KS5zb3J0KChhLCBiKSA9PiBQcm9wU29ydChhLCBiLCAnbmFtZScpKSxcblx0cmVtYWluaW5nWFA6IChjKSA9PiB7XG5cdFx0aWYgKGMuYWJpbGl0aWVzLmxlbmd0aCkge1xuXHRcdFx0Yy5wcm9wcy5leHBlcmllbmNlLnNwZW50ID0gYy5hYmlsaXRpZXMucmVkdWNlKCh0LCBuKSA9PiB0ICs9IChuLnRha2VuICogbi54cCksIDApXG5cdFx0fVxuXHRcdGMucHJvcHMuZXhwZXJpZW5jZS5yZW1haW5pbmcgPSBjLnByb3BzLmV4cGVyaWVuY2Uuc2NvcmUgLSBjLnByb3BzLmV4cGVyaWVuY2Uuc3BlbnRcblx0XHRyZXR1cm4gY1xuXHR9LFxuXHRyYW5kb206IGZ1bmN0aW9uKGMpIHtcblx0XHRjID0gdGhpcy5yZXNldChjKVxuXHRcdHdoaWxlKGMucHJvcHMuZXhwZXJpZW5jZS5yZW1haW5pbmcgPiAwKSB7XG5cdFx0XHRjb25zdCByZW1haW5pbmdBYmlsaXRpZXMgPSB0aGlzLm1hc3Rlckxpc3QuZmlsdGVyKG0gPT4ge1xuXHRcdFx0XHRyZXR1cm4gbS54cCA8PSBjLnByb3BzLmV4cGVyaWVuY2UucmVtYWluaW5nICYmXG5cdFx0XHRcdFx0IWMuYWJpbGl0aWVzLmluY2x1ZGVzKG0pXG5cdFx0XHR9KVxuXHRcdFx0aWYgKHJlbWFpbmluZ0FiaWxpdGllcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgYSA9IFJhbmRvbVJvbGwocmVtYWluaW5nQWJpbGl0aWVzKVxuXHRcdFx0XHRhLnRha2VuKytcblx0XHRcdFx0Yy5hYmlsaXRpZXMucHVzaChhKVxuXHRcdFx0XHRjLnByb3BzLmV4cGVyaWVuY2UucmVtYWluaW5nIC09IGEueHBcblx0XHRcdH1cblx0XHRcdGVsc2UgYnJlYWtcblx0XHR9XG5cdFx0cmV0dXJuIGNcblx0fSxcblx0cmVzZXQ6IGZ1bmN0aW9uKGMpIHtcblx0XHRmb3IgKGxldCBhID0gMDsgYSA8IGMuYWJpbGl0aWVzLmxlbmd0aDsgKythKSB7XG5cdFx0XHRjLmFiaWxpdGllc1thXS50YWtlbiA9IDBcblx0XHR9XG5cdFx0Yy5hYmlsaXRpZXMgPSBbXVxuXHRcdHJldHVybiBjXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFiaWxpdGllc0xpc3QgPSBjb21wbGV0ZUFiaWxpdHlMaXN0QnVpbGRlcihBYmlsaXRpZXMpXG5cbmV4cG9ydCBkZWZhdWx0IEFiaWxpdGllcyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgUm91bmRzID0gbmV3IFJ1bGUoe1xuXHRpZDogYDQzMDgwMDY5LTQwNDQtNDg4Mi0wYjU0LWNhOTIyOWYwOWYyM2AsXG5cdG5hbWU6IGBSb3VuZHNgLCBcblx0ZGVzYzogW1xuXHRcdGBDb21iYXQgdGltZSBvY2N1cnMgaW4gMy1zZWNvbmQg4oCccm91bmRz4oCdLmAsXG5cdFx0YFBsYXllcnMgaGF2ZSAzMCBzZWNvbmRzIHRvIGRlY2lkZSB3aGF0IHRoZWlyIENoYXJhY3RlcidzIEFjdGlvbnMgd2lsbCBiZSBmb3IgdGhlIHJvdW5kLmAsXG5cdFx0YEFueSBuZXcgQ29tcGxpY2F0aW9uIG9yIFN0YXR1cyBtb2RpZmllcnMgdGhhdCBjb21lIGludG8gcGxheSBkdXJpbmcgYSByb3VuZCBnbyBpbnRvIGVmZmVjdCBhdCB0aGUgc3RhcnQgb2YgdGhlIG5leHQgcm91bmQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUm91bmRzIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBBY3Rpb25zID0gbmV3IFJ1bGUoe1xuXHRpZDogYDYwNzMzODBjLTdkZWYtNGQ3NC04ODliLWRkYmQ1ODY1ZmU2OWAsXG5cdG5hbWU6IGBBY3Rpb25zYCwgXG5cdGRlc2M6IFtcblx0XHRgWW91IGdldCAzIEFjdGlvbnMgcGVyIHJvdW5kIHN0YXJ0aW5nIG9uIHlvdXIgdHVybi5gLFxuXHRcdGBNb3N0IHRoaW5ncyBjb3N0IDEgQWN0aW9uIHVubGVzcyBvdGhlcndpc2Ugbm90ZWQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9ucyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgQ29tbXVuaWNhdGlvbiA9IG5ldyBSdWxlKHtcblx0aWQ6IGAyYmQ4ZDE0Yy02OTY1LTQzMTktYzY0Yi0xZWJlNTkwYjkzYWNgLFxuXHRuYW1lOiBgQ29tbXVuaWNhdGlvbmAsIFxuXHRkZXNjOiBbXG5cdFx0YFlvdSBjYW4gc3BlYWsgb3Igc2hvdXQgdXAgdG8gNiB3b3JkcyBwZXIgcm91bmQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ29tbXVuaWNhdGlvbiIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgQ2hhc2UgPSBuZXcgUnVsZSh7XG5cdGlkOiBgYWE0NGJiZTUtZDBlMS00YmVkLTAxMjUtMTlhM2M4OGM1ODdhYCxcblx0bmFtZTogYENoYXNlYCwgXG5cdGRlc2M6IFtcblx0XHRgV2hlbiBhIGNvbWJhdGFudCBhdHRlbXB0cyB0byBmbGVlIGFuZCBhbm90aGVyIGNob29zZXMgdG8gcHVyc3VlLCB0aGV5IHJvbGwgb3Bwb3NlZCBbKEFjcm9iYXRpY3MsIEF0aGxldGljcywgRHJpdmUsIG9yIFRhbWUpICsgUnVuIFNwZWVkXSBlYWNoIHJvdW5kLCBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgbW9iaWxpdHkgaW4gdXNlLmAsXG5cdFx0YFRoZSBjaGFzZSBlbmRzIHdoZW4gb25lIHNpZGUgZ2V0cyAzIFN1Y2Nlc3NlcyBvdmVyIHRoZSBvdGhlci5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBDaGFzZSIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5pbXBvcnQgQ2hhc2UgZnJvbSAnLi9DaGFzZSdcblxuXG5jb25zdCBNb3ZlbWVudCA9IG5ldyBSdWxlKHtcblx0aWQ6IGA2NjA5NDQ2Ny1mNzk1LTRjMDItNDllOS0wYmYxOTNkYWNhYTZgLFxuXHRuYW1lOiBgTW92ZW1lbnRgLCBcblx0ZGVzYzogW1xuXHRcdGBZb3UgbWF5IG1ha2Ugb25lIE1vdmVtZW50IEFjdGlvbiBwZXIgdHVybi5gLFxuXHRcdGBUaGlzIE1vdmVtZW50IGFsd2F5cyBjb3N0cyAxIEFjdGlvbiwgbm8gbWF0dGVyIHdoYXQgdHlwZSBvZiBNb3ZlbWVudCBpdCBpcy5gLFxuXHRcdGBZb3VyIE1vdmVtZW50IEFjdGlvbiBtYXkgYmUgYW55IG9uZSBvZiB0aGUgZm9sbG93aW5nOmAsXG5cdFx0YCAxKSBXYWxrIFNwZWVkID0gW0FnaWxpdHkgeCAzXSB5YXJkc2AsXG5cdFx0YCAyKSBSdW4gU3BlZWQgPSBbQWdpbGl0eSB4IDZdIHlhcmRzYCxcblx0XHRgIDMpIENsaW1iIFNwZWVkID0gW0FnaWxpdHldIHlhcmRzYCxcblx0XHRgIDQpIFN3aW0gU3BlZWQgPSBbQWdpbGl0eSAvIDJdIHlhcmRzYCxcblx0XHRgIDUpIFN0YW5kIHVwIGZyb20gUHJvbmUgPSAxIHlhcmRgLFxuXHRcdGBXaGVuIHlvdSB0YWtlIGEgTW92ZW1lbnQgQWN0aW9uLCB5b3UgbWF5IGdvIFByb25lIGF0IGFueSB0aW1lIGZvciBmcmVlLmAsXG5cdFx0YFJ1bm5pbmcgaW1wb3NlcyB0aGUgVW5zdGFibGUgU3RhdHVzIGVmZmVjdCB1bnRpbCB5b3VyIG5leHQgdHVybi5gLFxuXHRcdGBZb3UgbWF5IGRpdmlkZSB1cCB5b3VyIE1vdmVtZW50IGFyb3VuZCBvdGhlciBBY3Rpb25zIG9uIHlvdXIgdHVybiBob3dldmVyIHlvdSB3aXNoLmAsXG5cdF1cbn0pXG5Nb3ZlbWVudC5zdWJydWxlcyA9IFtcblx0Q2hhc2UsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IE1vdmVtZW50IiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBBdHRhY2sgPSBuZXcgUnVsZSh7XG5cdGlkOiBgZDI1M2UwZTEtMzZiZi00NDM0LWE3OGItMDMyMTk2YmUwZTczYCxcblx0bmFtZTogYEF0dGFja2AsIFxuXHRkZXNjOiBbXG5cdFx0YFRoZXJlIGFyZSB0d28gdHlwZXMgb2YgQXR0YWNrczogTWVsZWUgYW5kIFJhbmdlZC5gLFxuXHRcdGBTcGVuZCBhbiBBY3Rpb24gb24geW91ciB0dXJuIHRvIHJvbGwgW2Q2ICsgTWVsZWUgb3IgUmFuZ2VkXSB2cyBEZWZlbnNlLmAsXG5cdFx0YFJvbGxpbmcgYSA2IG9uIHRoZSBkaWUgaXMgYW4gRXhwbG9zaW9uLCB3aGljaCBpcyByZS1yb2xsZWQgYW5kIGFkZGVkIGN1bXVsYXRpdmVseSB0byB0aGUgQXR0YWNrIHRvdGFsLmAsXG5cdFx0YE9uIGEgU3VjY2Vzc2Z1bCBBdHRhY2ssIGluIGFkZGl0aW9uIHRvIHRoZSBXZWFwb24gRGFtYWdlLCB5b3UgZG8gYm9udXMgRGFtYWdlID0gW0F0dGFjayAtIERlZmVuc2VdIHVwIHRvIHlvdXIgYXR0YWNraW5nIFNraWxsIHNjb3JlLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEF0dGFjayIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgUmVmbGV4aXZlRGVmZW5zZSA9IG5ldyBSdWxlKHtcblx0aWQ6IGBmZWFlNzQ4Mi04MDBiLTQ3ZDEtZjE3Yy0zYTEwM2Q4M2I3MGJgLFxuXHRuYW1lOiBgUmVmbGV4aXZlIERlZmVuc2VgLFxuXHRkZXNjOiBbXG5cdFx0YFJlZmxleGl2ZSBEZWZlbnNlcyA9IHRoZSBTa2lsbCBTcGVjaWFsdHkgdGhleSBhcmUgYmFzZWQgb24uYCxcblx0XHRgVGhlc2UgYXJlIHlvdXIgZGVmYXVsdCBEZWZlbnNlcyB3aGVuIG5vdCBhY3RpdmVseSByb2xsaW5nLmAsXG5cdFx0YFVzZSBSZWZsZXhpdmUgQmxvY2sgYWdhaW5zdCBNZWxlZSBBdHRhY2tzLmAsXG5cdFx0YFVzZSBSZWZsZXhpdmUgRG9kZ2UgYWdhaW5zdCBlaXRoZXIgTWVsZWUgb3IgUmFuZ2VkIEF0dGFja3MuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUmVmbGV4aXZlRGVmZW5zZSIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5pbXBvcnQgUmVmbGV4aXZlRGVmZW5zZSBmcm9tICcuL1JlZmxleGl2ZURlZmVuc2UnXG5cblxuY29uc3QgRGVmZW5zZSA9IG5ldyBSdWxlKHtcblx0aWQ6IGA2OTk4N2IzZi01MThhLTRmOTYtNjQzYy1jODJjYmQxYzFhOThgLFxuXHRuYW1lOiBgRGVmZW5zZWAsIFxuXHRkZXNjOiBbXG5cdFx0YFNwZW5kIGFuIEFjdGlvbiBvbiB5b3VyIGVuZW15J3MgdHVybiB0byB1c2UgZWl0aGVyIHR5cGUgb2YgRGVmZW5zZTogQmxvY2sgb3IgRG9kZ2UuYCxcblx0XHRgVG8gQmxvY2ssIHJvbGwgW2Q2ICsgTWVsZWVdIHZzIE1lbGVlIEF0dGFja3MuYCxcblx0XHRgVG8gRG9kZ2UsIHJvbGwgW2Q2ICsgQWNyb2JhdGljc10gdnMgZWl0aGVyIE1lbGVlIG9yIFJhbmdlZCBBdHRhY2tzLmAsXG5cdFx0YEJvdGNoaW5nIGEgRGVmZW5zZSByb2xsIG1ha2VzIHlvdSBmYWxsIFByb25lLmAsXG5cdF1cbn0pXG5EZWZlbnNlLnN1YnJ1bGVzID0gW1xuXHRSZWZsZXhpdmVEZWZlbnNlXG5dXG5cbmV4cG9ydCBkZWZhdWx0IERlZmVuc2UiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IERhbWFnZVJlc2lzdGFuY2UgPSBuZXcgUnVsZSh7XG5cdGlkOiBgYzVkMjUwM2YtY2M3OC00NWM2LTNiMjMtMDJmNGYzN2Q1NGI5YCxcblx0bmFtZTogYERhbWFnZSBSZXNpc3RhbmNlYCwgXG5cdGRlc2M6IFtcblx0XHRgQXJtb3IncyBEYW1hZ2UgUmVzaXN0YW5jZSByZWR1Y2VzIHRoZSBEYW1hZ2UgaW5mbGljdGVkIGJ5IGFueSBpbmRpdmlkdWFsIEF0dGFjayBvbiB0aGF0IEJvZHkgUGFydC5gLFxuXHRcdGBSZWR1Y2UgYSBwaWVjZSBvZiBBcm1vcidzIERhbWFnZSBSZXNpc3RhbmNlIGJ5IDEgYWZ0ZXIgdGFraW5nIERhbWFnZSB0aGF0IGV4Y2VlZHMgaXRzIERhbWFnZSBSZXNpc3RhbmNlLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERhbWFnZVJlc2lzdGFuY2UiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEZpcmVEYW1hZ2UgPSBuZXcgUnVsZSh7XG5cdGlkOiBgMGRlMjY3MTItOTUwOC00MGFmLTI2MmUtYjM2OGU5NTUwZmExYCxcblx0bmFtZTogYEZpcmUgRGFtYWdlYCwgXG5cdGRlc2M6IFtcblx0XHRgRWFjaCByb3VuZCB5b3UgdGFrZSBGaXJlIERhbWFnZSwgMSBwb2ludCBpcyBwZXJtYW5lbnQgYW5kIG5ldmVyIGhlYWxzLmAsXG5cdFx0YE9ubHkgRmlyZS1SZXNpc3RhbnQgQXJtb3IgcmVkdWNlcyBGaXJlIERhbWFnZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGaXJlRGFtYWdlIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBQYWluID0gbmV3IFJ1bGUoe1xuXHRpZDogYGJmZjZlOGZkLWRlNzAtNGFkNi1kZDRiLWI4NTI0MDBhYjNjYWAsXG5cdG5hbWU6IGBQYWluYCwgXG5cdGRlc2M6IFtcblx0XHRgRGFtYWdlIChhbmQgYSBmZXcgb3RoZXIgZWZmZWN0cykgY2F1c2UgUGFpbiBwZW5hbHRpZXMuYCxcblx0XHRgRWFjaCBwb2ludCBvZiBQYWluIGlzIGEgLTEgcGVuYWx0eSB0byBhbGwgcm9sbHMgYW5kIFNwZWVkLmAsXG5cdFx0YFBhaW4gZmFkZXMgYXdheSBhcyBEYW1hZ2UgaGVhbC5gLFxuXHRcdGBZb3UgZmFsbCBQcm9uZSBpZiB5b3VyIFNwZWVkIGRyb3BzIHRvIDAgZnJvbSBQYWluLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFBhaW4iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IFJlY292ZXJ5ID0gbmV3IFJ1bGUoe1xuXHRpZDogYGE2MTk4MWU4LTM2Y2ItNDY2ZS03YjNhLTAxNzNiMTlhNGMwNmAsXG5cdG5hbWU6IGBSZWNvdmVyeWAsXG5cdGRlc2M6IFtcblx0XHRgQWZ0ZXIgMyBkYXlzIG9mIHJlc3QsIHlvdSBoYXZlIGEgY2hhbmNlIHRvIHJlY292ZXIgYSBsaXR0bGUgYml0LCBib3RoIHBoeXNpY2FsbHkgYW5kIG1lbnRhbGx5LmAsXG5cdFx0YFJvbGwgW0NvbnN0aXR1dGlvbiB2cyB0b3RhbCBEYW1hZ2VdIHRvIGhlYWwgMSBIZWFsdGggb24gYSByYW5kb20gRGFtYWdlZCBCb2R5IFBhcnQuYCxcblx0XHRgUm9sbCBbRGVtZWFub3IgdnMgdG90YWwgVHJhdW1hXSB0byBoZWFsIDEgVHJhdW1hLmAsXG5cdFx0YE9uIGEgRmFpbCwgeW91IHRha2UgMSBhZGRpdGlvbmFsIERhbWFnZSBvciBUcmF1bWEsIGRlcGVuZGluZyBvbiB3aGF0IHlvdSB3ZXJlIHJvbGxpbmcgdG8gUmVjb3Zlci5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvdmVyeSIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5pbXBvcnQgRGFtYWdlUmVzaXN0YW5jZSBmcm9tICcuL0RhbWFnZVJlc2lzdGFuY2UnXG5pbXBvcnQgRmlyZURhbWFnZSBmcm9tICcuL0ZpcmVEYW1hZ2UnXG5pbXBvcnQgUGFpbiBmcm9tICcuL1BhaW4nXG5pbXBvcnQgUmVjb3ZlcnkgZnJvbSAnLi9SZWNvdmVyeSdcblxuXG5jb25zdCBEYW1hZ2UgPSBuZXcgUnVsZSh7XG5cdGlkOiBgOGZiYWQ0NmUtYWY5MS00MjRhLTI4YzUtMmU4YjdmZjgwMmJkYCxcblx0bmFtZTogYERhbWFnZWAsIFxuXHRkZXNjOiBbXG5cdFx0YERhbWFnZSB0ZW1wb3JhcmlseSByZWR1Y2VzIEhlYWx0aC5gLFxuXHRcdGBXaGVuIEhlYWQgb3IgVG9yc28gSGVhbHRoIGRyb3BzIHRvIDAsIHlvdSBmYWxsIHVuY29uc2Npb3VzYCxcblx0XHRgV2hlbiBhbiBBcm0gb3IgYSBMZWcncyBIZWFsdGggZHJvcHMgdG8gMCwgeW91IGxvc2UgdGhlIHVzZSBvZiB0aGF0IGxpbWIuYCxcblx0XHRgQ29uc2Npb3VzbmVzcyBhbmQgbGltYiBmdW5jdGlvbmFsaXR5IGFyZSByZXN0b3JlZCBvbmNlIHlvdSBoYXZlIGhlYWxlZCB0byBhdCBsZWFzdCAxIEhlYWx0aCBvbiB0aGF0IEJvZHkgUGFydC5gLFxuXHRcdGBZb3UgZGllIHdoZW4gSGVhZCBvciBUb3JzbyBIZWFsdGggZHJvcHMgdG8gdGhlIG5lZ2F0aXZlIG9mIHRoZWlyIHNjb3Jlcy5gLFxuXHRcdGBZb3UgbG9zZSB0aGUgbGltYiB3aGVuIEFybSBvciBMZWcgSGVhbHRoIGRyb3BzIHRvIHRoZSBuZWdhdGl2ZSBvZiB0aGVpciBzY29yZXMuYCxcblx0XHRgU3VjY2Vzc2Z1bCBBdHRhY2tzIGRvIERhbWFnZSA9IFsoQXR0YWNrIC0gRGVmZW5zZSkgKyBXZWFwb24gRGFtYWdlXS5gLFxuXHRcdGBFYWNoIHBvaW50IG9mIERhbWFnZSBjYXVzZSBhIC0xIFBhaW4gcGVuYWx0eSB1bnRpbCBoZWFsZWQuYCxcblx0XVxufSlcbkRhbWFnZS5zdWJydWxlcyA9IFtcblx0RGFtYWdlUmVzaXN0YW5jZSxcblx0RmlyZURhbWFnZSxcblx0UGFpbixcblx0UmVjb3ZlcnksXG5dXG5cbmV4cG9ydCBkZWZhdWx0IERhbWFnZSIsImltcG9ydCBSb3VuZHMgZnJvbSAnLi9Sb3VuZHMnXG5pbXBvcnQgQWN0aW9ucyBmcm9tICcuL0FjdGlvbnMnXG5pbXBvcnQgQ29tbXVuaWNhdGlvbiBmcm9tICcuL0NvbW11bmljYXRpb24nXG5pbXBvcnQgTW92ZW1lbnQgZnJvbSAnLi9Nb3ZlbWVudCdcbmltcG9ydCBBdHRhY2sgZnJvbSAnLi9BdHRhY2snXG5pbXBvcnQgRGVmZW5zZSBmcm9tICcuL0RlZmVuc2UnXG5pbXBvcnQgRGFtYWdlIGZyb20gJy4vRGFtYWdlJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogYENvbWJhdGAsXG5cdGxpc3Q6IFtcblx0XHRSb3VuZHMsXG5cdFx0QWN0aW9ucyxcblx0XHRDb21tdW5pY2F0aW9uLFxuXHRcdE1vdmVtZW50LFxuXHRcdEF0dGFjayxcblx0XHREZWZlbnNlLFxuXHRcdERhbWFnZSxcblx0XHQvLyBWZWhpY2xlcyxcblx0XVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdG5hbWU9YGAsXG5cdFx0aGVhZGVycz1bXSxcblx0XHRjb250ZW50cz1bXSxcblx0XHR3aWR0aHM9W11cblx0fSkge1xuXHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR0aGlzLmhlYWRlcnMgPSBoZWFkZXJzXG5cdFx0dGhpcy5jb250ZW50cyA9IGNvbnRlbnRzXG5cdFx0dGhpcy53aWR0aHMgPSB3aWR0aHNcblx0fVxufSIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5pbXBvcnQgVGFibGUgZnJvbSAncnVsZXMvVGFibGUuanMnXG5cblxuY29uc3QgQ292ZXIgPSBuZXcgUnVsZSh7XG5cdGlkOiBgOWZkMGE1NTYtZjRjMC00YWJhLTY4MTQtYzM3MWYwYThlYWQwYCxcblx0bmFtZTogYENvdmVyYCwgXG5cdGRlc2M6IFtcblx0XHRgQWxsIERhbWFnZSBpcyBuZWdhdGVkIGFnYWluc3QgdGFyZ2V0cyB0aGF0IGFyZSBiZWhpbmQgQ292ZXIgdW5sZXNzIHRoZSB3ZWFwb24ncyBiYXNlIERhbWFnZSBleGNlZWRzIHRoZSBNYXRlcmlhbCBEYW1hZ2UgUmVzaXN0YW5jZS5gLFxuXHRcdGBJZiB0aGUgd2VhcG9uJ3MgYmFzZSBEYW1hZ2UgaXMgZ3JlYXRlciB0aGFuIHRoZSBNYXRlcmlhbCdzIERhbWFnZSBSZXNpc3RhbmNlLCB0aGVuIHRoZSBNYXRlcmlhbCBEYW1hZ2UgUmVzaXN0YW5jZSBhY3RzIGFzIERhbWFnZSBSZWR1Y3Rpb24uYCxcblx0XHRgQWxsIHN0YW5kYXJkIHR5cGVzIG9mIENvdmVyIGV4Y2VwdCBHbGFzcyBtYWtlIHlvdSBDb25jZWFsZWQgd2hpbGUgYmVoaW5kIENvdmVyLmAsXG5cdFx0YFlvdSBjYW4gbGVhbiBpbiBhbmQgb3V0IG9mIENvdmVyIHRvIEF0dGFjayBhcyBwYXJ0IG9mIGFuIEFjdGlvbi5gLFxuXHRcdGBEb2luZyBzbyBvcGVucyB5b3UgdXAgdG8gYSBDYWxsZWQgU2hvdCBhZ2FpbnN0IGFuIGV4cG9zZWQgQm9keSBQYXJ0IGlmIGFuIG9wcG9uZW50IGlzIHdhaXRpbmcgZm9yIHlvdSB0byBsZWFuIG91dCBvZiBDb3Zlci5gLFxuXHRdXG59KVxuXG5jbGFzcyBDb3ZlclR5cGUge1xuXHRjb25zdHJ1Y3Rvcih7XG5cdFx0bWF0ZXJpYWwsXG5cdFx0ZHJcblx0fSkge1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbFxuXHRcdHRoaXMuZHIgPSBkclxuXHR9XG59XG5cbkNvdmVyLnRhYmxlID0gbmV3IFRhYmxlKHtcblx0bmFtZTogYENvdmVyIFRhYmxlYCxcblx0aGVhZGVyczogW2BNYXRlcmlhbGAsIGBEYW1hZ2UgUmVzaXN0YW5jZWBdLFxuXHRjb250ZW50czogW1xuXHRcdG5ldyBDb3ZlclR5cGUoeyBtYXRlcmlhbDogJ0RyeXdhbGwnLCBkcjogMSB9KSxcblx0XHRuZXcgQ292ZXJUeXBlKHsgbWF0ZXJpYWw6ICdHbGFzcycsIGRyOiAxIH0pLFxuXHRcdG5ldyBDb3ZlclR5cGUoeyBtYXRlcmlhbDogJ1BseXdvb2QnLCBkcjogMSB9KSxcblx0XHRuZXcgQ292ZXJUeXBlKHsgbWF0ZXJpYWw6ICdIYXJkd29vZCcsIGRyOiAyIH0pLFxuXHRcdG5ldyBDb3ZlclR5cGUoeyBtYXRlcmlhbDogJ1NoZWV0IE1ldGFsJywgZHI6IDIgfSksXG5cdFx0bmV3IENvdmVyVHlwZSh7IG1hdGVyaWFsOiAnQnJpY2snLCBkcjogMyB9KSxcblx0XHRuZXcgQ292ZXJUeXBlKHsgbWF0ZXJpYWw6ICdDb25jcmV0ZScsIGRyOiA0IH0pLFxuXHRcdG5ldyBDb3ZlclR5cGUoeyBtYXRlcmlhbDogJ1N0ZWVsJywgZHI6IDUgfSksXG5cdF0sXG5cdHdpZHRoczogWzUwLCA1MF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvdmVyIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBGcmllbmRseUZpcmUgPSBuZXcgUnVsZSh7XG5cdGlkOiBgNjM4MDhlZjYtM2ZjMy00MTFjLTU0YzktZWRjYzQxYmE4YTdiYCxcblx0bmFtZTogYEZyaWVuZGx5IEZpcmVgLCBcblx0ZGVzYzogW1xuXHRcdGAtMyBSYW5nZWQgYWdhaW5zdCB0YXJnZXRzIHdpdGhpbiAxeWQgb2YgeW91ciBhbGx5LmAsXG5cdFx0YElmIHRoZSBSYW5nZWQgQXR0YWNrIEZhaWxzLCByZS1yb2xsIHRoZSBSYW5nZWQgQXR0YWNrIHZzIHRoZSBhbGx54oCZcyBSZWZsZXhpdmUgRG9kZ2UuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRnJpZW5kbHlGaXJlIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBSYW5nZSA9IG5ldyBSdWxlKHtcblx0aWQ6IGAzYmNhOTczNC1iNDM3LTQyNGUtYTFlMC0xNmI0YTAxMmFmNTBgLFxuXHRuYW1lOiBgUmFuZ2VgLCBcblx0ZGVzYzogW1xuXHRcdGBSYW5nZWQgQXR0YWNrcyB0YWtlIGEgLTEgcGVuYWx0eSBwZXIgYWRkaXRpb25hbCBSYW5nZSBpbmNyZW1lbnQuYCxcblx0XHRgTWF4aW11bSBSYW5nZSBpcyAxMCBSYW5nZSBpbmNyZW1lbnRzLmAsXG5cdFx0YE1lbGVlIEF0dGFja3MgdGFrZSBhIG1vZGlmaWVyIGFnYWluc3QgTWVsZWUgd2VhcG9ucyB0aGF0IGhhdmUgYSBkaWZmZXJlbnQgUmFuZ2UgPSBbeW91ciB3ZWFwb27igJlzIFJhbmdlIC0gZW5lbXkgd2VhcG9u4oCZcyBSYW5nZV0uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2UiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IFZpc2liaWxpdHkgPSBuZXcgUnVsZSh7XG5cdGlkOiBgMWNlNjRmYjctMjU2Yy00ZjdjLTE3NTAtODFkZWQyZjUxNGU0YCxcblx0bmFtZTogYFZpc2liaWxpdHlgLCBcblx0ZGVzYzogW1xuXHRcdGAtMSB0byAtNiB0byBhbGwgcm9sbHMgaW52b2x2aW5nIHNlZWluZywgaW5jbHVkaW5nIEF0dGFjayBhbmQgRGVmZW5zZS5gLFxuXHRcdGBBIFZpc2liaWxpdHkgcGVuYWx0eSBvZiAtNiBpbXBvc2VzIHRoZSBlZmZlY3Qgb2YgYmVpbmcgdGVtcG9yYXJpbHkgQmxpbmQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVmlzaWJpbGl0eSIsImltcG9ydCBDb3ZlciBmcm9tICcuL0NvdmVyJ1xuaW1wb3J0IEZyaWVuZGx5RmlyZSBmcm9tICcuL0ZyaWVuZGx5RmlyZSdcbmltcG9ydCBSYW5nZSBmcm9tICcuL1JhbmdlJ1xuaW1wb3J0IFZpc2liaWxpdHkgZnJvbSAnLi9WaXNpYmlsaXR5J1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogYENvbXBsaWNhdGlvbnNgLFxuXHRsaXN0OiBbXG5cdFx0Q292ZXIsXG5cdFx0RnJpZW5kbHlGaXJlLFxuXHRcdFJhbmdlLFxuXHRcdFZpc2liaWxpdHksXG5cdF1cbn0iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IERpZmZpY3VsdHkgPSBuZXcgUnVsZSh7XG5cdGlkOiBgY2FjZjkyOGEtZDE4MC00NDI4LWM4MDktMjMzYjg3NzY0NzNlYCxcblx0bmFtZTogYERpZmZpY3VsdHlgLFxuXHRkZXNjOiBbXG5cdFx0YFRoZSBSZXN1bHQgb2YgeW91ciByb2xsIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBEaWZmaWN1bHR5IG51bWJlciB0byBiZSBhIFN1Y2Nlc3MuYCxcblx0XHRgSWYgdGhlIHJvbGwgaXMgb3Bwb3NlZCwgcmUtcm9sbCB0aWVzLmAsXG5cdFx0YERpZmZpY3VsdGllcyBhcmUgaW5kaWNhdGVkIGJ5IHRoZSAjIHN5bWJvbC5gLFxuXHRcdGBUaGUgTmFycmF0b3Igb3IgYW4gb3Bwb3Npbmcgcm9sbCBzZXRzIHRoZSAjIGZvciB5b3VyIHJvbGxzLmAsXG5cdFx0YDMjID0gVHJpdmlhbGAsXG5cdFx0YDYjID0gUm91dGluZWAsXG5cdFx0YDkjID0gQ2hhbGxlbmdpbmdgLFxuXHRcdGAxMiMgPSBSZWFsbHkgSGFyZGAsXG5cdFx0YDE1IyA9IFZlcnkgVW5saWtlbHlgLFxuXHRcdGAxOCMgPSBOZWFybHkgSW1wb3NzaWJsZWAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERpZmZpY3VsdHkiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IENvb3BlcmF0aW9uID0gbmV3IFJ1bGUoe1xuXHRpZDogYGQ1NGU4YjBlLThmMTQtNDQyNi1hMzRlLThjODg5ZmUxNTQxM2AsXG5cdG5hbWU6IGBDb29wZXJhdGlvbmAsXG5cdGRlc2M6IFtcblx0XHRgSWYgQ2hhcmFjdGVycyB3YW50IHRvIGhlbHAgZWFjaCBvdGhlciBwZXJmb3JtIGEgdGFzaywgb25lIG9mIHRoZW0gbWFrZXMgdGhlIHJvbGwgYW5kIHRoZSByZXN0IGFkZCB0aGVpciBTY29yZXMgdG9nZXRoZXIgYXMgYSBNb2RpZmllciB0byB0aGUgbWFpbiBDaGFyYWN0ZXLigJlzIFJlc3VsdC5gLFxuXHRcdGBUaGUgTmFycmF0b3Igc2hvdWxkIHVzZSB0aGVpciBqdWRnZW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB0aW1lIHRvIGNvbXBsZXRpb24uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQ29vcGVyYXRpb24iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IFJvdGVBY3Rpb25zID0gbmV3IFJ1bGUoe1xuXHRpZDogYGIxMzYyOTgwLWIyYjItNGM0Zi04NzBkLWQ3YjJhZWRhOGI0N2AsXG5cdG5hbWU6IGBSb3RlIEFjdGlvbnNgLFxuXHRkZXNjOiBbXG5cdFx0YElmIHRoZSByb2xsIGlzIHVub3Bwb3NlZCBhbmQgeW91ciBbKFNjb3JlICsgTW9kaWZpZXJzKSA+PSAjXSBiZWZvcmUgdGhlIHJvbGwgYW5kIHlvdSBjYW4gdGFrZSB5b3VyIHRpbWUsIHlvdSBTdWNjZWVkIGF1dG9tYXRpY2FsbHkuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUm90ZUFjdGlvbnMiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuaW1wb3J0IENvb3BlcmF0aW9uIGZyb20gJy4vQ29vcGVyYXRpb24nXG5pbXBvcnQgUm90ZUFjdGlvbnMgZnJvbSAnLi9Sb3RlQWN0aW9ucydcblxuXG5jb25zdCBTdWNjZXNzID0gbmV3IFJ1bGUoe1xuXHRpZDogYDJmZGYwODViLTZlYzctNGI4Mi03NDQyLTllY2Y1MTY2NjRhYWAsXG5cdG5hbWU6IGBTdWNjZXNzYCxcblx0ZGVzYzogW1xuXHRcdGBZb3VyIHJvbGwgaXMgYSBTdWNjZXNzIHdoZW4gaWYgdGhlIFJlc3VsdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIERpZmZpY3VsdHkuYCxcblx0XHRgUmUtcm9sbCB0aWVzIG9uIG9wcG9zZWQgcm9sbHMuYCxcblx0XHRgVGhlIGRlZ3JlZSBvZiBTdWNjZXNzICh0aGUgYW1vdW50IGJ5IHdoaWNoIHRoZSBSZXN1bHQgZXhjZWVkZWQgdGhlIERpZmZpY3VsdHkpIGlzIGltcG9ydGFudCBmb3Igc29tZSByb2xscywgc3VjaCBhcyBBdHRhY2tzLmAsXG5cdF1cbn0pXG5TdWNjZXNzLnN1YnJ1bGVzID0gW1xuXHRSb3RlQWN0aW9ucyxcblx0Q29vcGVyYXRpb24sXG5dXG5cbmV4cG9ydCBkZWZhdWx0IFN1Y2Nlc3MiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEZhaWwgPSBuZXcgUnVsZSh7XG5cdGlkOiBgNGU3ZjYxNDItYTJkMC00M2FjLWNkZDktYzFkMzE0N2RhYzY5YCxcblx0bmFtZTogYEZhaWxgLFxuXHRkZXNjOiBbXG5cdFx0YFlvdXIgcm9sbCBpcyBhIEZhaWwgd2hlbiB0aGUgUmVzdWx0IGlzIGxlc3MgdGhhbiB0aGUgRGlmZmljdWx0eS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBGYWlsIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBFeHBsb2RlID0gbmV3IFJ1bGUoe1xuXHRpZDogYDZkYThhODE4LTU2YzgtNDE3YS0yYzk4LWMyZjliYmRlN2FhNWAsXG5cdG5hbWU6IGBFeHBsb2RlYCxcblx0ZGVzYzogW1xuXHRcdGBBbiBFeHBsb2RpbmcgZGllIG9mZmVycyB0aGUgcG9zc2liaWxpdHkgb2YgZG9pbmcgZXh0cmFvcmRpbmFyaWx5IHdlbGwgYXQgYSBUcmFpdCwgU2tpbGwsIG9yIFByb3BlcnR5IHJvbGwuYCxcblx0XHRgSWYgYSA2IGlzIHJvbGxlZCwgcm9sbCBpdCBhZ2FpbiBhbmQga2VlcCByb2xsaW5nIGFzIGxvbmcgYXMgdGhlIGRpZSBjb250aW51ZXMgdG8gcm9sbCBhIDYuYCxcblx0XHRgV2hlbiB0aGUgZGllIGZpbmFsbHkgc3RvcHMgRXhwbG9kaW5nLCBhZGQgYWxsIG9mIHRoZXNlIHJvbGxzIHRvZ2V0aGVyLCB0aGVuIGFkZCBzY29yZXMgYW5kIG1vZGlmaWVycyBhcyB1c3VhbCB0byBnZXQgeW91ciBSZXN1bHQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRXhwbG9kZSIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgQm90Y2ggPSBuZXcgUnVsZSh7XG5cdGlkOiBgOWQ5MzNmMjUtZjIzNi00Njc0LTdjNDAtZDM0NzY0Zjk2ZjcyYCxcblx0bmFtZTogYEJvdGNoYCxcblx0ZGVzYzogW1xuXHRcdGBBIEJvdGNoIGlzIHdoZW4geW91IGhhdmUgZmFpbGVkIHZlcnkgdmVyeSBiYWRseSBhdCBhIFRyYWl0LCBTa2lsbCwgb3IgUHJvcGVydHkgcm9sbC5gLFxuXHRcdGBJZiB5b3Ugcm9sbCAxIG9uIGEgZGllIGFuZCB0aGF0IGRpZSBpcyBub3QgRXhwbG9kaW5nLCByZS1yb2xsIHRvIGNoZWNrIGZvciBhIEJvdGNoLmAsXG5cdFx0YElmIGEgMSBpcyByb2xsZWQgYWdhaW4sIHlvdSBCb3RjaC5gLFxuXHRcdGBJZiBhbnkgb3RoZXIgbnVtYmVyIGlzIHJvbGxlZCwgeW91ciBkNiByb2xsIGlzIGNvdW50ZWQgYXMgYSBub3JtYWwgMS5gLFxuXHRcdGBUaGUgTmFycmF0b3IgaGFzIGEgZ3JlYXQgZGVhbCBvZiBsYXRpdHVkZSB0byBiZSBjcmVhdGl2ZSB3aGVuIGRldGVybWluaW5nIHRoZSBlZmZlY3RzIG9mIEJvdGNoaW5nIHVuZGVyIHZhcmlvdXMgY2lyY3Vtc3RhbmNlcywgYnV0IHRoZXkgc2hvdWxkIGFsd2F5cyBiZSBmYWlyLmAsXG5cdFx0YFdoZW5ldmVyIGEgQ2hhcmFjdGVyIEJvdGNoZXMsIHRoZXkgZ2V0ICsxIFhQIGJlY2F1c2Ugd2UgbGVhcm4gdGhlIG1vc3QgZnJvbSBvdXIgZ3JlYXRlc3QgZmFpbHVyZXMuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQm90Y2giLCJpbXBvcnQgRGlmZmljdWx0eSBmcm9tICcuL0RpZmZpY3VsdHknXG5pbXBvcnQgU3VjY2VzcyBmcm9tICcuL1N1Y2Nlc3MnXG5pbXBvcnQgRmFpbCBmcm9tICcuL0ZhaWwnXG5pbXBvcnQgRXhwbG9kZSBmcm9tICcuL0V4cGxvZGUnXG5pbXBvcnQgQm90Y2ggZnJvbSAnLi9Cb3RjaCdcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6IGBDb3JlYCxcblx0ZXhwbGFuYXRpb246IFtcblx0XHRgVG8gYXR0ZW1wdCBhIGRpZmZpY3VsdCBhY3Rpb24sIHJvbGwgb25lIHNpeC1zaWRlZCBkaWUgKOKAnGQ24oCdKSB0byBzZWUgaG93IHdlbGwgeW91ciBlZmZvcnRzIHdvcmtlZCBvdXQgZm9yIHlvdS5gLFxuXHRcdGBZb3VyIENoYXJhY3RlcuKAmXMgc2NvcmUgaW4gYSByZWxldmFudCBUcmFpdCBvciBTa2lsbCBpcyBhZGRlZCB0byB0aGUgZDYgcm9sbCB0byBpbXByb3ZlIHlvdXIgY2hhbmNlcyBvZiBzdWNjZWVkaW5nLmAsXG5cdFx0YFRoZXJlIGFyZSBtYW55IG90aGVyIG1vZGlmaWVycyB0aGF0IG1heSBhZGQgb3Igc3VidHJhY3QgZnJvbSB5b3VyIHJlc3VsdC5gLFxuXHRcdGBNb2RpZmllcnMgYXJlIGFwcGxpZWQgYnkgdGhlIE5hcnJhdG9yLmAsXG5cdFx0YFRoZSBmb3JtdWxhIGZvciBhIHJvbGwgaXMgc2hvd24gaW4gW2JyYWNrZXRzXS5gLFxuXHRcdGBDYWxjdWxhdGUgdGhlIFJlc3VsdCBvZiBhIGQ2IHJvbGwgYXMgZm9sbG93czpgLFxuXHRcdGBbZDYgUm9sbCArIFNjb3JlIMKxIE1vZGlmaWVyc10gPSBSZXN1bHRgLFxuXHRdLFxuXHRsaXN0OiBbXG5cdFx0RGlmZmljdWx0eSxcblx0XHRTdWNjZXNzLFxuXHRcdEZhaWwsXG5cdFx0RXhwbG9kZSxcblx0XHRCb3RjaCxcblx0XVxufSIsImltcG9ydCBBY2Nlc3NvcnlMaXN0IGZyb20gJy4vd2VhcG9ucy9hY2Nlc3Nvcmllcy9BY2Nlc3NvcnlMaXN0J1xuaW1wb3J0IEFtbW9MaXN0IGZyb20gJy4vd2VhcG9ucy9hbW1vL0FtbW9MaXN0J1xuaW1wb3J0IEFybW9yTGlzdCBmcm9tICcuL2FybW9yL0FybW9yTGlzdCdcbmltcG9ydCBCb21iTGlzdCBmcm9tICcuL3dlYXBvbnMvYm9tYnMvQm9tYkxpc3QnXG5pbXBvcnQgRG9jdW1lbnRMaXN0IGZyb20gJy4vZXF1aXBtZW50L2RvY3VtZW50cy9Eb2N1bWVudExpc3QnXG5pbXBvcnQgRHJ1Z3NMaXN0IGZyb20gJy4vZXF1aXBtZW50L2RydWdzL0RydWdzTGlzdCdcbmltcG9ydCBFbGVjdHJvbmljc0xpc3QgZnJvbSAnLi9lcXVpcG1lbnQvZWxlY3Ryb25pY3MvRWxlY3Ryb25pY3NMaXN0J1xuaW1wb3J0IEVxdWlwbWVudExpc3QgZnJvbSAnLi9lcXVpcG1lbnQvbWlzYy9NaXNjTGlzdCdcbmltcG9ydCBNZWRpY2FsTGlzdCBmcm9tICcuL2VxdWlwbWVudC9tZWRpY2FsL01lZGljYWxMaXN0J1xuaW1wb3J0IE1lbGVlV2VhcG9uTGlzdCBmcm9tICcuL3dlYXBvbnMvbWVsZWUvTWVsZWVXZWFwb25MaXN0J1xuaW1wb3J0IFJhbmdlZFdlYXBvbkxpc3QgZnJvbSAnLi93ZWFwb25zL3JhbmdlZC9SYW5nZWRXZWFwb25MaXN0J1xuaW1wb3J0IFN0b3JhZ2VMaXN0IGZyb20gJy4vZXF1aXBtZW50L3N0b3JhZ2UvU3RvcmFnZUxpc3QnXG4vLyBpbXBvcnQgVmVoaWNsZUxpc3QgZnJvbSAnLi9nZWFyL1ZlaGljbGVzTGlzdCdcbmltcG9ydCBQcm9wU29ydCBmcm9tICd1dGlscy9Qcm9wU29ydC5qcydcblxuXG5jb25zdCBHZWFyTGlzdCA9IHtcblx0bmFtZTogYEdlYXJgLFxuXHRsaXN0OiBbXG5cdFx0Li4uQWNjZXNzb3J5TGlzdCxcblx0XHQuLi5BbW1vTGlzdCxcblx0XHQuLi5Bcm1vckxpc3QsXG5cdFx0Li4uQm9tYkxpc3QsXG5cdFx0Li4uRG9jdW1lbnRMaXN0LFxuXHRcdC4uLkRydWdzTGlzdCxcblx0XHQuLi5FbGVjdHJvbmljc0xpc3QsXG5cdFx0Li4uRXF1aXBtZW50TGlzdCxcblx0XHQuLi5NZWRpY2FsTGlzdCxcblx0XHQuLi5NZWxlZVdlYXBvbkxpc3QsXG5cdFx0Li4uUmFuZ2VkV2VhcG9uTGlzdCxcblx0XHQuLi5TdG9yYWdlTGlzdCxcblx0XHQvLyAuLi5WZWhpY2xlTGlzdCxcblx0XS5zb3J0KChhLCBiKSA9PiBQcm9wU29ydChhLCBiLCBgbmFtZWApKSxcblx0Y2F0ZWdvcmllczogW1xuXHRcdCdtZWxlZScsXG5cdFx0J3JhbmdlZCcsXG5cdFx0J2FtbW8nLFxuXHRcdCdhcm1vcicsXG5cdFx0J2VxdWlwbWVudCdcblx0XVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZWFyTGlzdCIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmV1dmVyIGV4dGVuZHMgUnVsZSB7XG5cdGNvbnN0cnVjdG9yKHtcblx0XHRpZCxcblx0XHRuYW1lLFxuXHRcdGRlc2MsXG5cdFx0Zm9ybXVsYSxcblx0XHRjYXRcblx0fSkge1xuXHRcdHN1cGVyKHtcblx0XHRcdGlkLFxuXHRcdFx0bmFtZSxcblx0XHRcdGRlc2MsXG5cdFx0XHRmb3JtdWxhXG5cdFx0fSlcblx0XHR0aGlzLmNhdCA9IGNhdFxuXHR9XG59IiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcbmltcG9ydCBtZWxlZSBmcm9tICdydWxlcy9za2lsbHMvTWVsZWUuanMnXG5cbmNvbnN0IEJsb2NrID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGBhZjk5ZjZiYy03ZGIyLTQxZWMtYjM1ZS1lNzA5YmQyOWQ4YTFgLFxuXHRjYXQ6IGBEZWZlbnNpdmVgLFxuXHRuYW1lOiBtZWxlZS5zcGVjcy5ibG9jay5uYW1lLCBcblx0ZGVzYzogbWVsZWUuc3BlY3MuYmxvY2suZGVzY1xufSlcblxuZXhwb3J0IGRlZmF1bHQgQmxvY2siLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuaW1wb3J0IGFjcm9iYXRpY3MgZnJvbSAncnVsZXMvc2tpbGxzL0Fjcm9iYXRpY3MuanMnXG5cblxuY29uc3QgRG9kZ2UgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYGRjYzMyMjBkLTcyY2QtNDZiMi05OTFkLWE2NTY4ZjVjY2RmOWAsXG5cdGNhdDogYERlZmVuc2l2ZWAsXG5cdG5hbWU6IGFjcm9iYXRpY3Muc3BlY3MuZG9kZ2UubmFtZSwgXG5cdGRlc2M6IGFjcm9iYXRpY3Muc3BlY3MuZG9kZ2UuZGVzY1xufSlcblxuZXhwb3J0IGRlZmF1bHQgRG9kZ2UiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IER1Y2sgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYGNhYzgxYTQ2LWM2ODgtNGIyOS1hNjgwLTUwMmY4Mjc5ODdlZGAsXG5cdGNhdDogYERlZmVuc2l2ZWAsXG5cdG5hbWU6IGBEdWNrYCwgXG5cdGRlc2M6IFtcblx0XHRgWW91IG1heSByb2xsIFtEb2RnZSB2cyBBdHRhY2tdIHRvIG1vdmUgdXAgdG8geW91ciBTcGVlZCB0byBnZXQgYmVoaW5kIENvdmVyLmAsXG5cdFx0YFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIERvZGdlIGEgUmFuZ2VkKFNob290KSBBdHRhY2suYCxcblx0XHRgQXMgcGFydCBvZiB0aGlzIERvZGdlLCB5b3UgbWF5IGVsZWN0IHRvIGdvIFByb25lLmAsXG5cdFx0YElmIHRoZSBBdHRhY2sgc3RpbGwgaGl0cywgdGhlIENvdmVyIE1hdGVyaWFs4oCZcyBEYW1hZ2UgUmVzaXN0YW5jZSByZWR1Y2VzIHRoZSBEYW1hZ2UuYCxcblx0XHRgWW91IHdpbGwga2VlcCB0aGUgYmVuZWZpdHMgb2YgQ292ZXIgYXMgbG9uZyBhcyBpdCByZW1haW5zIGJldHdlZW4geW91IGFuZCB0aGUgb3Bwb25lbnQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRHVjayIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgSGlkZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgZjMzNGYyYzUtY2M1Mi00Mjk2LWIyMmQtZDk3OGYwNzk0NGQ0YCxcblx0Y2F0OiBgRGVmZW5zaXZlYCxcblx0bmFtZTogYEhpZGVgLCBcblx0ZGVzYzogW1xuXHRcdGBSb2xsIFtTdGVhbHRoIHZzIFBlcmNlcHRpb25dIHRvIGJlIENvbmNlYWxlZC5gLFxuXHRcdGBZb3VyIFNwZWVkIGlzIDAuYCxcblx0XHRgKzMgU3RlYWx0aCBpZiBQcm9uZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIaWRlIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBQcm90ZWN0ID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGBhNDg0ZDI3NC01ZDY0LTQ2YTgtOTliZS0wOGRkYTYyZTU0MWFgLFxuXHRjYXQ6IGBEZWZlbnNpdmVgLFxuXHRuYW1lOiBgUHJvdGVjdGAsIFxuXHRkZXNjOiBbXG5cdFx0YFlvdSBiZWNvbWUgdGhlIG5ldyB0YXJnZXQgb2YgYWxsIEF0dGFja3MgdGFyZ2V0aW5nIHNvbWVvbmUgeW91IGNob29zZSB3aXRoaW4gMXlkIG9mIHlvdSBmb3IgMSByb3VuZC5gLFxuXHRcdGBUaGlzIGRvZXMgbm90IHRha2UgYW4gQWN0aW9uIHRvIGRlY2xhcmUsIGJ1dCBhbnkgRGVmZW5zZSByb2xscyB5b3UgbWFrZSB0YWtlIEFjdGlvbnMgYXMgdXN1YWwuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUHJvdGVjdCIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgU25lYWsgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYDMwNDI1ZDk0LWQ4YjUtNDUyZi1hODg0LWIxNDVmNGY0NTMzYmAsXG5cdGNhdDogYERlZmVuc2l2ZWAsXG5cdG5hbWU6IGBTbmVha2AsIFxuXHRkZXNjOiBbXG5cdFx0YFJvbGwgW1N0ZWFsdGggdnMgUGVyY2VwdGlvbl0gdG8gbW92ZSBDb25jZWFsZWQgYXQgW1NwZWVkIC8gMl0uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgU25lYWsiLCJpbXBvcnQgQmxvY2sgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL2RlZmVuc2l2ZS9CbG9jay5qcydcbmltcG9ydCBEb2RnZSBmcm9tICdydWxlcy9tYW5ldXZlcnMvZGVmZW5zaXZlL0RvZGdlLmpzJ1xuaW1wb3J0IER1Y2sgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL2RlZmVuc2l2ZS9EdWNrLmpzJ1xuaW1wb3J0IEhpZGUgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL2RlZmVuc2l2ZS9IaWRlLmpzJ1xuaW1wb3J0IFByb3RlY3QgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL2RlZmVuc2l2ZS9Qcm90ZWN0LmpzJ1xuaW1wb3J0IFNuZWFrIGZyb20gJ3J1bGVzL21hbmV1dmVycy9kZWZlbnNpdmUvU25lYWsuanMnXG5cblxuY29uc3QgRGVmZW5zaXZlTWFuZXV2ZXJzID0gW1xuXHRCbG9jayxcblx0RG9kZ2UsXG5cdER1Y2ssXG5cdEhpZGUsXG5cdFByb3RlY3QsXG5cdFNuZWFrXG5dXG5cbmV4cG9ydCBkZWZhdWx0IERlZmVuc2l2ZU1hbmV1dmVycyIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgQWltID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGBiMjAzY2E3NS0xZGQ0LTQ3MDAtYWM5NC1iMmEwMmJmMjk4OGJgLFxuXHRjYXQ6IGBPZmZlbnNpdmVgLFxuXHRuYW1lOiBgQWltYCwgXG5cdGRlc2M6IFtcblx0XHRgU3BlbmQgYW4gQWN0aW9uIHRvIGdldCArMyB0byB5b3VyIG5leHQgQXR0YWNrIGFnYWluc3QgYSBzcGVjaWZpYyB0YXJnZXQuYCxcblx0XSxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFpbSIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5pbXBvcnQgVGFibGUgZnJvbSAncnVsZXMvVGFibGUuanMnXG5cblxuY29uc3QgQ2FsbGVkU2hvdCA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgN2I1YWM0ZWMtYzU4YS00OGJkLWFhZWQtYzBmYmY2NzE2ODc0YCxcblx0Y2F0OiBgT2ZmZW5zaXZlYCxcblx0bmFtZTogYENhbGxlZCBTaG90YCwgXG5cdGRlc2M6IFtcblx0XHRgQXR0YWNrcyB0YXJnZXQgdGhlIFRvcnNvIGJ5IGRlZmF1bHQuYCxcblx0XHRgQSBDYWxsZWQgU2hvdCBpcyBhbiBBdHRhY2sgdGFyZ2V0aW5nIHRoZSBIZWFkLCBBcm1zLCBvciBMZWdzIHdpdGggYWRkZWQgZWZmZWN0cyBkZXBlbmRpbmcgb24gdGhlIEJvZHkgUGFydC5gLFxuXHRdXG59KVxuXG5jbGFzcyBDYWxsZWRTaG90VGFyZ2V0IHtcblx0Y29uc3RydWN0b3Ioe1xuXHRcdHJvbGwsXG5cdFx0bmFtZSxcblx0XHRwZW5hbHR5LFxuXHRcdGVmZmVjdFxuXHR9KSB7XG5cdFx0dGhpcy5yb2xsID0gcm9sbFxuXHRcdHRoaXMubmFtZSA9IG5hbWVcblx0XHR0aGlzLnBlbmFsdHkgPSBwZW5hbHR5XG5cdFx0dGhpcy5lZmZlY3QgPSBlZmZlY3Rcblx0fVxufVxuXG5DYWxsZWRTaG90LnRhYmxlID0gbmV3IFRhYmxlKHtcblx0bmFtZTogYENhbGxlZCBTaG90IFRhYmxlYCxcblx0aGVhZGVyczogW1xuXHRcdGBkNmAsXG5cdFx0YFBhcnRgLFxuXHRcdGBQZW5hbHR5YCxcblx0XHRgRWZmZWN0YCxcblx0XSxcblx0Y29udGVudHM6IFtcblx0XHRuZXcgQ2FsbGVkU2hvdFRhcmdldCh7XG5cdFx0XHRyb2xsOiA2LFxuXHRcdFx0bmFtZTogYEhlYWRgLFxuXHRcdFx0cGVuYWx0eTogLTMsXG5cdFx0XHRoZWFsdGg6IGBDb25zdGl0dXRpb25gLFxuXHRcdFx0ZWZmZWN0OiBgU3R1biAxIHJvdW5kYFxuXHRcdH0pLFxuXHRcdG5ldyBDYWxsZWRTaG90VGFyZ2V0KHtcblx0XHRcdHJvbGw6IDUsXG5cdFx0XHRuYW1lOiBgUiBBcm1gLFxuXHRcdFx0cGVuYWx0eTogLTEsXG5cdFx0XHRlZmZlY3Q6IGBEcm9wIGl0ZW1gXG5cdFx0fSksXG5cdFx0bmV3IENhbGxlZFNob3RUYXJnZXQoe1xuXHRcdFx0cm9sbDogNCxcblx0XHRcdG5hbWU6IGBMIEFybWAsXG5cdFx0XHRwZW5hbHR5OiAtMSxcblx0XHRcdGVmZmVjdDogYERyb3AgaXRlbWBcblx0XHR9KSxcblx0XHRuZXcgQ2FsbGVkU2hvdFRhcmdldCh7XG5cdFx0XHRyb2xsOiAzLFxuXHRcdFx0bmFtZTogYFRvcnNvYCxcblx0XHRcdHBlbmFsdHk6IDAsXG5cdFx0XHRlZmZlY3Q6IGBOb25lYFxuXHRcdH0pLFxuXHRcdG5ldyBDYWxsZWRTaG90VGFyZ2V0KHtcblx0XHRcdHJvbGw6IDIsXG5cdFx0XHRuYW1lOiBgTCBMZWdgLFxuXHRcdFx0cGVuYWx0eTogLTEsXG5cdFx0XHRlZmZlY3Q6IGBGYWxsIFByb25lYFxuXHRcdH0pLFxuXHRcdG5ldyBDYWxsZWRTaG90VGFyZ2V0KHtcblx0XHRcdHJvbGw6IDEsXG5cdFx0XHRuYW1lOiBgUiBMZWdgLFxuXHRcdFx0cGVuYWx0eTogLTEsXG5cdFx0XHRlZmZlY3Q6IGBGYWxsIFByb25lYFxuXHRcdH0pLFxuXHRdLFxuXHR3aWR0aHM6IFs1LCAxNSwgMjAsIDUwXVxufSlcblxuXG5leHBvcnQgZGVmYXVsdCBDYWxsZWRTaG90IiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBEaXNhcm0gPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYGI0ODEyZDI0LTNiN2UtNDNhYS1hMmQ2LTdiNzM0NTIwYzVlN2AsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBEaXNhcm1gLCBcblx0ZGVzYzogW1xuXHRcdGBSb2xsIFtNZWxlZSB2cyBNZWxlZSAoKyBDb25zdGl0dXRpb24gaWYgdGhlIHdlYXBvbiBpcyB1c2VkIHR3by1oYW5kZWQpXS5gLFxuXHRcdGBUaGUgd2VhcG9uIGZsaWVzIGQ2IHlkcyBhd2F5IGluIGEgcmFuZG9tIGRpcmVjdGlvbiBvciB0aGUgQXR0YWNrZXIgbWF5IGNob29zZSB0byBncmFiIHRoZSB3ZWFwb24gaWYgdGhleSBhcmUgVW5hcm1lZC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBEaXNhcm0iLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IEdyYWIgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYDNiNjg5NjdmLWM4YzItNDJiMS05MjlmLTM3OTZjZjdkMWNmN2AsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBHcmFiYCxcblx0ZGVzYzogW1xuXHRcdGBSb2xsIFtNZWxlZShVbmFybWVkKSB2cyBERUZdIHRvIGltcG9zZSB0aGUgJ0dyYWJiZWQnIFN0YXR1cy5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBHcmFiIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBIb3N0YWdlID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGA0M2UyZGY2Yy0zMjBhLTQwNGEtOTM4MS01MmI2YTQ0MWRmNDRgLFxuXHRjYXQ6IGBPZmZlbnNpdmVgLFxuXHRuYW1lOiBgSG9zdGFnZWAsXG5cdGRlc2M6IFtcblx0XHRgVXNlIGEgR3JhYmJlZCBvciBSZXN0cmFpbmVkIGVuZW15IGFzIENvdmVyLmAsXG5cdFx0YFRoZSBHcmFwcGxlZCBlbmVteSdzIERhbWFnZSBSZXNpc3RhbmNlIGFjdHMgYXMgdGhlIE1hdGVyaWFsIERhbWFnZSBSZXNpc3RhbmNlIGFuZCBhbnkgZXhjZXNzIERhbWFnZSBpcyBhcHBsaWVkIHRvIHRoZSBHcmFwcGxlZCBlbmVteSBpbnN0ZWFkIG9mIHlvdS5gLFxuXHRcdGBJZiB0aGUgRGFtYWdlIGlzIGVub3VnaCB0byBraWxsIHRoZSBHcmFwcGxlZCBlbmVteSwgYW55IGV4Y2VzcyBEYW1hZ2UgcGFzc2VzIHRocm91Z2ggdG8geW91LmAsXG5cdFx0YFRoaXMgZG9lcyBub3QgbWFrZSB5b3UgQ29uY2VhbGVkLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvc3RhZ2UiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IFRhY2tsZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgY2JjN2FiMmMtMzEyMi00YWI5LWI5OTAtYzcyOTZlN2M2NmVmYCxcblx0Y2F0OiBgT2ZmZW5zaXZlYCxcblx0bmFtZTogYFRhY2tsZWAsXG5cdGRlc2M6IFtcblx0XHRgU3BlbmQgMiBBY3Rpb25zIGFuZCBtYWtlIGEgR3JhcHBsZSBBdHRhY2sgcm9sbCB0byBtb3ZlIHVwIHRvIHlvdXIgU3BlZWQgYW5kIFBpbiBhbiBlbmVteS5gLFxuXHRcdGBJZiB5b3UgRmFpbCwgeW91IGdvIFByb25lIGluIGZyb250IG9mIHRoZW0uYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVGFja2xlIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBUaHJvdyA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgY2Q0YWJmM2ItZjQwZi00MDFlLTg4MjQtOWExMGNjZTcyOWM5YCxcblx0Y2F0OiBgT2ZmZW5zaXZlYCxcblx0bmFtZTogYFRocm93YCxcblx0ZGVzYzogW1xuXHRcdGBUaHJvdyBhIEdyYWJiZWQgb3IgUmVzdHJhaW5lZCBlbmVteSB1cCB0byBbQ29uc3RpdHV0aW9uXSB5ZHMuYCxcblx0XHRgVGhlIHRhcmdldCB0YWtlcyAxIHBvaW50IG9mIEJsdW50IERhbWFnZSB0byBhIHJhbmRvbSBCb2R5IFBhcnQgYW5kIGxhbmQgUHJvbmUuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVGhyb3ciLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuaW1wb3J0IEdyYWIgZnJvbSAnLi9HcmFiJ1xuaW1wb3J0IEhvc3RhZ2UgZnJvbSAnLi9Ib3N0YWdlJ1xuaW1wb3J0IFRhY2tsZSBmcm9tICcuL1RhY2tsZSdcbmltcG9ydCBUaHJvdyBmcm9tICcuL1Rocm93J1xuXG5cbmNvbnN0IEdyYXBwbGUgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYDk3NGQyYjVjLTY3ZTAtNGU1ZC04ZGQ4LTg4M2Q5OGE1OTI2ZWAsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBHcmFwcGxlYCxcblx0ZGVzYzogW1xuXHRcdGBUaGVyZSBhcmUgdGhyZWUgc3RlcHMgdG8gR3JhcHBsaW5nOmAsXG5cdFx0YDEpIEdyYWJgLFxuXHRcdGAyKSBSZXN0cmFpbmAsXG5cdFx0YDMpIFBpbmAsXG5cdFx0YFRvIEdyYXBwbGUgYW4gb3Bwb25lbnQsIHlvdSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGZyZWUgaGFuZCBhbmQgbWFrZSBhIE1lbGVlKFVuYXJtZWQpIEF0dGFjayByb2xsLCB3aGljaCBkb2VzIG5vIERhbWFnZS5gLFxuXHRcdGBXaXRoIGEgU3VjY2Vzc2Z1bCBHcmFwcGxlIHJvbGwsIHRoYXQgY29tYmF0YW50IG1heSBhbHRlciB0aGUgY3VycmVudCBHcmFwcGxlIHN0ZXAgYnkgMS5gLFxuXHRcdGBXaXRoIGVhY2ggbmV3IEdyYXBwbGUgcm9sbCwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgY29tYmF0YW50cycgcmVzdWx0cyBpcyBhIG1vZGlmaWVyIHRvIHRoZSBBdHRhY2tlcidzIG5leHQgR3JhcHBsZSByb2xsLmAsXG5cdFx0YEVhY2ggcm91bmQgdGhlIEF0dGFja2VyIG11c3QgY2hvb3NlIHRvIGVpdGhlciBzcGVuZCAxIEFjdGlvbiBqdXN0IHRvIHJldGFpbiB0aGUgR3JhcHBsZSwgbWFrZSBhbm90aGVyIEdyYXBwbGUgcm9sbCwgb3IgbGV0IGdvLmAsXG5cdFx0YFdoZW4gdGhlIERlZmVuZGVyIHJlZHVjZXMgdGhlIEdyYXBwbGUgc3RlcCB0byAwIHRoZXkgZXNjYXBlLmAsXG5cdF1cbn0pXG5cbkdyYXBwbGUuc3VicnVsZXMgPSBbXG5cdEdyYWIsXG5cdEhvc3RhZ2UsIFxuXHRUYWNrbGUsIFxuXHRUaHJvd1xuXVxuXG5leHBvcnQgZGVmYXVsdCBHcmFwcGxlIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBOb25MZXRoYWxGb3JjZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgNzZmYjE2MDMtNGMxZC00YjA3LWExMjgtYzczOTI3ZjJmMDM2YCxcblx0Y2F0OiBgT2ZmZW5zaXZlYCxcblx0bmFtZTogYE5vbi1MZXRoYWwgRm9yY2VgLFxuXHRkZXNjOiBbXG5cdFx0YERlY2xhcmUgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgTWFuZXV2ZXIgYmVmb3JlIHJvbGxpbmcgYSBNZWxlZSBBdHRhY2suYCxcblx0XHRgT24gYSBTdWNjZXNzLCB5b3UgZG8gaGFsZiBEYW1hZ2UuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTm9uTGV0aGFsRm9yY2UiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IFB1c2ggPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYGQxMjk5MmU4LTI2MTYtNDVhZC1iOTA5LWU4MzE1ZGU4ZDBhOWAsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBQdXNoYCxcblx0ZGVzYzogW1xuXHRcdGBSb2xsIFtDb25zdGl0dXRpb24gdnMgQ29uc3RpdHV0aW9uXSB0byBwdXNoIGFuIGVuZW15IGluIGZyb250IG9mIHlvdS5gLFxuXHRcdGBXaGlsZSBQdXNoaW5nLCB5b3VyIFNwZWVkIGlzIGVxdWFsIHRvIHRoZSBsZXNzZXIgb2YgeW91ciBub3JtYWwgU3BlZWQgb3IgeW91ciBDb25zdGl0dXRpb24uIE5vIERhbWFnZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBQdXNoIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBSZWxvYWQgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYGE1ZTc1MTkzLTY1ZjUtNDVhYy05MmEyLTNlZmFjNGFiMjY0ZWAsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBSZWxvYWRgLFxuXHRkZXNjOiBbXG5cdFx0YFJlcGxhY2UgYSBtYWdhemluZSBvciBhIHNpbmdsZSBwaWVjZSBvZiBhbW11bml0aW9uIChkZXBlbmRpbmcgb24gdGhlIHdlYXBvbikgaW4gYSBSYW5nZWQgd2VhcG9uLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJlbG9hZCIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgU2hvdmUgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYDBjNzkxMjI3LWI4ZDItNDJhNi1iNWMxLWIyYWVkY2FiMGFhZGAsXG5cdGNhdDogYE9mZmVuc2l2ZWAsXG5cdG5hbWU6IGBTaG92ZWAsXG5cdGRlc2M6IFtcblx0XHRgUm9sbCBbTWVsZWUgdnMgQ29uc3RpdHV0aW9uXSB0byBzaG92ZSBhbiBlbmVteSB1cCB0byBbQ29uc3RpdHV0aW9uIC8gMl0geWRzIGF3YXkgZnJvbSB5b3UsIGtub2NraW5nIHRoZW0gUHJvbmUuIE5vIERhbWFnZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTaG92ZSIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgVHJpcCA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgMGY0MjM2ZWYtY2U3Ni00OTQyLWJiYjAtZjBmNmNhNWU4NDBlYCxcblx0Y2F0OiBgT2ZmZW5zaXZlYCxcblx0bmFtZTogYFRyaXBgLFxuXHRkZXNjOiBbXG5cdFx0YFJvbGwgW01lbGVlIHZzIEFnaWxpdHldIHRvIGtub2NrIGFuIGVuZW15IFByb25lLiAxIERhbWFnZS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBUcmlwIiwiaW1wb3J0IEFpbSBmcm9tICdydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL0FpbS5qcydcbmltcG9ydCBDYWxsZWRTaG90IGZyb20gJ3J1bGVzL21hbmV1dmVycy9vZmZlbnNpdmUvQ2FsbGVkU2hvdC5qcydcbmltcG9ydCBEaXNhcm0gZnJvbSAncnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9EaXNhcm0uanMnXG5pbXBvcnQgR3JhcHBsZSBmcm9tICdydWxlcy9tYW5ldXZlcnMvb2ZmZW5zaXZlL0dyYXBwbGUuanMnXG5pbXBvcnQgTm9uTGV0aGFsRm9yY2UgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9Ob25MZXRoYWxGb3JjZS5qcydcbmltcG9ydCBQdXNoIGZyb20gJ3J1bGVzL21hbmV1dmVycy9vZmZlbnNpdmUvUHVzaC5qcydcbmltcG9ydCBSZWxvYWQgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9SZWxvYWQuanMnXG5pbXBvcnQgU2hvdmUgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL29mZmVuc2l2ZS9TaG92ZS5qcydcbmltcG9ydCBUcmlwIGZyb20gJ3J1bGVzL21hbmV1dmVycy9vZmZlbnNpdmUvVHJpcC5qcydcblxuXG5jb25zdCBPZmZlbnNpdmVNYW5ldXZlcnMgPSBbXG5cdEFpbSxcblx0Q2FsbGVkU2hvdCxcblx0RGlzYXJtLFxuXHRHcmFwcGxlLFxuXHROb25MZXRoYWxGb3JjZSxcblx0UHVzaCxcblx0UmVsb2FkLFxuXHRTaG92ZSxcblx0VHJpcFxuXVxuXG5leHBvcnQgZGVmYXVsdCBPZmZlbnNpdmVNYW5ldXZlcnMiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IERpc3RyYWN0ID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGA2ZmUxNTUyYy00Y2I2LTQxNmYtODY5MS0wY2ZjMGFjMzlhZjVgLFxuXHRjYXQ6IGBTb2NpYWxgLFxuXHRuYW1lOiBgRGlzdHJhY3RgLFxuXHRkZXNjOiBbXG5cdFx0YFJvbGwgW1BlcmZvcm0gdnMgUGVyY2VwdGlvbl0uYCxcblx0XHRgU3R1biB0YXJnZXQgZm9yIDEgcm91bmQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRGlzdHJhY3QiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IEVuY291cmFnZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgNDZiNTdhYjUtZTMxZC00ZDYwLTkwMmItYjlmNTZkOTUxNjhkYCxcblx0Y2F0OiBgU29jaWFsYCxcblx0bmFtZTogYEVuY291cmFnZWAsXG5cdGRlc2M6IFtcblx0XHRgUm9sbCBbTGVhZGVyc2hpcCB2cyBncm91cHPigJkgdG90YWwgRGVtZWFub3Igc2NvcmVzXS5gLFxuXHRcdGBUaGUgZ3JvdXAgZ2V0cyBhIGJvbnVzID0gW3lvdXIgRGVtZWFub3JdIGZvciBvbmUgc3BlY2lmaWMgcm9sbCBlYWNoLmAsXG5cdFx0YEEgQm90Y2ggaXMgLTEgdG8gYWxsIHJvbGxzLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEVuY291cmFnZSIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgSW50ZXJyb2dhdGUgPSBuZXcgTWFuZXV2ZXIoe1xuXHRpZDogYDI4ODQ5ZTk0LTVjMzEtNGI0OS1hODRiLTYzYTFiOGNlYzM2M2AsXG5cdGNhdDogYFNvY2lhbGAsXG5cdG5hbWU6IGBJbnRlcnJvZ2F0ZWAsXG5cdGRlc2M6IFtcblx0XHRgUm9sbCBbTGVhZGVyc2hpcCB2cyBEZW1lYW5vcl0gdG8gZ2V0IGluZm9ybWF0aW9uIG91dCBvZiBhIHN1YmplY3Qgd2hvIGRvZXMgbm90IHdhbnQgdG8gaGVscCwgYnV0IHdpdGhvdXQgcmVzb3J0aW5nIHRvIHZpb2xlbmNlLmAsXG5cdFx0YEVhY2ggcm9sbCB0YWtlcyBkNiBtaW5zIG9mIGNvbnZlcnNhdGlvbi5gLFxuXHRcdGBJZiB0aGUgaW50ZXJyb2dhdG9yIFN1Y2NlZWRzLCB0aGUgc3ViamVjdCBnaXZlcyB1cCBhIGZhY3QgKHdpdHRpbmdseSBvciB1bndpdHRpbmdseSkuYCxcblx0XHRgSWYgdGhlIHN1YmplY3QgU3VjY2VlZHMsIHRoZXkgYmVjb21lIGhhcmRlbmVkIGFnYWluc3QgZnVydGhlciBxdWVzdGlvbmluZywgaW1wb3NpbmcgYSAtMSBwZW5hbHR5IG9uIHN1YnNlcXVlbnQgYXR0ZW1wdHMuYCxcblx0XHRgQWZ0ZXIgRmFpbHMgPSBbRGVtZWFub3JdLCB0aGUgaW50ZXJyb2dhdG9yIGdpdmVzIHVwIG9yIHRoZSBzdWJqZWN0IGNyYWNrcyBhbmQgdGVsbHMgZXZlcnl0aGluZyB0aGV5IGtub3cuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJyb2dhdGUiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IE5lZ290aWF0ZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgNWQ4ODU0NmEtNzdkZi00MDJkLWE5YjUtYmNhYjhhNjJmYTZjYCxcblx0Y2F0OiBgU29jaWFsYCxcblx0bmFtZTogYE5lZ290aWF0ZWAsXG5cdGRlc2M6IFtcblx0XHRgSWYgb3Bwb3NlZCBwYXJ0aWVzIGFyZSB3aWxsaW5nIHRvIHRhbGsgb3V0IHRoZWlyIGRpZmZlcmVuY2VzLCBlYWNoIHNpZGUgc3RhcnQgd2l0aCBhIGxpc3Qgb2YgZGVtYW5kcy5gLFxuXHRcdGBSb2xsIFtTb2NpYWxpemUgdnMgU29jaWFsaXplXSBvbmNlIHBlciBkZW1hbmQuYCxcblx0XHRgQXR0aXR1ZGUgYW5kIHNpdHVhdGlvbmFsIG1vZGlmaWVycyBzaG91bGQgYmUgYXBwbGllZCBieSB0aGUgTmFycmF0b3IuYCxcblx0XHRgU3VjY2VzcyBtZWFucyB5b3UgZ2V0IHlvdXIgZGVtYW5kIGFuZCB0aGUgb3Bwb3NlZCBuZWdvdGlhdG9yIGNvbmNlZGVzLmAsXG5cdFx0YEVpdGhlciBzaWRlIGNhbiBjaG9vc2UgdG8gY29uY2VkZSBhIGRlbWFuZCB3aXRob3V0IHJvbGxpbmcuIFNvbWUgZGVzaXJlcyBtYXkgYmUgbm9uLW5lZ290aWFibGUuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgTmVnb3RpYXRlIiwiaW1wb3J0IE1hbmV1dmVyIGZyb20gJ3J1bGVzL21hbmV1dmVycy9NYW5ldXZlci5qcydcblxuXG5jb25zdCBSZWNydWl0ID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGA5NTk5ZGMwMS05OTQwLTQ0ZDgtYWUzNi1lNDYyMzgxMGZlNWRgLFxuXHRjYXQ6IGBTb2NpYWxgLFxuXHRuYW1lOiBgUmVjcnVpdGAsXG5cdGRlc2M6IFtcblx0XHRgUm9sbCBbU29jaWFsaXplIHZzIERlbWVhbm9yXSB0byBjb252aW5jZSBzb21lb25lIHRvIGpvaW4geW91ciBzaWRlLmAsXG5cdFx0YElmIHRoZXkgYXJlIHNvbWVvbmXigJlzIGZvbGxvd2VyLCByb2xsIFtMZWFkZXJzaGlwIHZzIExlYWRlcnNoaXBdLmAsXG5cdFx0YEF0dGl0dWRlIGFuZCBvdGhlciBjb250ZXh0dWFsIG1vZGlmaWVycyBzaG91bGQgYmUgYXBwbGllZCBhdCB0aGUgTmFycmF0b3IncyBkaXNjcmV0aW9uLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFJlY3J1aXQiLCJpbXBvcnQgTWFuZXV2ZXIgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL01hbmV1dmVyLmpzJ1xuXG5cbmNvbnN0IFRhdW50ID0gbmV3IE1hbmV1dmVyKHtcblx0aWQ6IGBhMDBjYmNmMC0zNTkzLTQ5M2ItOWZkOC01NzU4NDZkMTgyYmJgLFxuXHRjYXQ6IGBTb2NpYWxgLFxuXHRuYW1lOiBgVGF1bnRgLFxuXHRkZXNjOiBbXG5cdFx0YFJvbGwgW0xlYWRlcnNoaXAgdnMgRGVtZWFub3JdLmAsXG5cdFx0YFByb3Zva2UgdGhlIGVuZW15IGludG8gZXhjbHVzaXZlbHkgYXR0YWNraW5nIHlvdS5gLFxuXHRcdGBUaGUgZGVncmVlIG9mIFN1Y2Nlc3MgaXMgYSBwZW5hbHR5IHRvIHRoZSBsb3NlcuKAmXMgbmV4dCByb2xsLmAsXG5cdFx0YFRoZSBlbmVteSBpcyBTdHVubmVkIGZvciAxIHJvdW5kIGlmIFtwZW5hbHR5ID4gZW5lbXnigJlzIERlbWVhbm9yXS5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBUYXVudCIsImltcG9ydCBNYW5ldXZlciBmcm9tICdydWxlcy9tYW5ldXZlcnMvTWFuZXV2ZXIuanMnXG5cblxuY29uc3QgVG9ydHVyZSA9IG5ldyBNYW5ldXZlcih7XG5cdGlkOiBgOWRhMDI5ZDAtOWM1OC00NDA3LTgxMmMtMzk2ZmI1OWM3NjRiYCxcblx0Y2F0OiBgU29jaWFsYCxcblx0bmFtZTogYFRvcnR1cmVgLFxuXHRkZXNjOiBbXG5cdFx0YFJvbGwgW01lZGljaW5lIHZzIHByaXNvbmVy4oCZcyBDb25zdGl0dXRpb25dIG9uY2UgcGVyIGhvdXIgdG8gY2F1c2UgYSBjYXB0aXZlIGQ2IFBhaW4gdG8gc29mdGVuIHRoZWlyIHJlc29sdmUgd2l0aG91dCBraWxsaW5nIHRoZW0uYCxcblx0XHRgRmFpbHVyZSBkb2VzIGQ2IERhbWFnZSB0byB0aGUgY2FwdGl2ZS5gLFxuXHRcdGBSb2xsIFtEZW1lYW5vciB2cyBEZW1lYW5vcl0gYXQgdGhlIGVuZCBvZiBlYWNoIGhvdXIgKFBhaW4gcGVuYWx0eSBhcHBsaWVzKS5gLFxuXHRcdGBGYWlsdXJlIGNhdXNlcyAtMSBQc3ljaGUgbG9zcy5gLFxuXHRcdGBBdCAwIFBzeWNoZSwgZWl0aGVyIHRoZSB0b3J0dXJlciBjYW5ub3QgZG8gaXQgYW55bW9yZSBhbmQgZ2l2ZXMgdXAsIG9yIHRoZSBjYXB0aXZlIGlzIGJyb2tlbiBhbmQgY2FuIGJlIGNvbnRyb2xsZWQgd2l0aCBEZW1lYW5vciBTa2lsbHMgYXV0b21hdGljYWxseSB1bnRpbCBmcmVlZC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBUb3J0dXJlIiwiaW1wb3J0IERpc3RyYWN0IGZyb20gJ3J1bGVzL21hbmV1dmVycy9zb2NpYWwvRGlzdHJhY3QuanMnXG5pbXBvcnQgRW5jb3VyYWdlIGZyb20gJ3J1bGVzL21hbmV1dmVycy9zb2NpYWwvRW5jb3VyYWdlLmpzJ1xuaW1wb3J0IEludGVycm9nYXRlIGZyb20gJ3J1bGVzL21hbmV1dmVycy9zb2NpYWwvSW50ZXJyb2dhdGUuanMnXG5pbXBvcnQgTmVnb3RpYXRlIGZyb20gJ3J1bGVzL21hbmV1dmVycy9zb2NpYWwvTmVnb3RpYXRlLmpzJ1xuaW1wb3J0IFJlY3J1aXQgZnJvbSAncnVsZXMvbWFuZXV2ZXJzL3NvY2lhbC9SZWNydWl0LmpzJ1xuaW1wb3J0IFRhdW50IGZyb20gJ3J1bGVzL21hbmV1dmVycy9zb2NpYWwvVGF1bnQuanMnXG5pbXBvcnQgVG9ydHVyZSBmcm9tICdydWxlcy9tYW5ldXZlcnMvc29jaWFsL1RvcnR1cmUuanMnXG5cblxuY29uc3QgU29jaWFsTWFuZXV2ZXJzID0gW1xuXHREaXN0cmFjdCxcblx0RW5jb3VyYWdlLFxuXHRJbnRlcnJvZ2F0ZSxcblx0TmVnb3RpYXRlLFxuXHRSZWNydWl0LFxuXHRUYXVudCxcblx0VG9ydHVyZVxuXVxuXG5leHBvcnQgZGVmYXVsdCBTb2NpYWxNYW5ldXZlcnMiLCJpbXBvcnQgRGVmZW5zaXZlTWFuZXV2ZXJzIGZyb20gJy4vZGVmZW5zaXZlL0RlZmVuc2l2ZU1hbmV1dmVycydcbmltcG9ydCBPZmZlbnNpdmVNYW5ldXZlcnMgZnJvbSAnLi9vZmZlbnNpdmUvT2ZmZW5zaXZlTWFuZXV2ZXJzJ1xuaW1wb3J0IFNvY2lhbE1hbmV1dmVycyBmcm9tICcuL3NvY2lhbC9Tb2NpYWxNYW5ldXZlcnMnXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiBgTWFuZXV2ZXJzYCxcblx0bGlzdDogW1xuXHRcdC4uLkRlZmVuc2l2ZU1hbmV1dmVycyxcblx0XHQuLi5PZmZlbnNpdmVNYW5ldXZlcnMsXG5cdFx0Li4uU29jaWFsTWFuZXV2ZXJzLFxuXHRdXG59IiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBBc3BoeXhpYXRpb24gPSBuZXcgUnVsZSh7XG5cdGlkOiBgYjNjM2ZhODQtZTI0ZC00MTEyLTgyZmYtN2MzNDZhMjA3ZTQ3YCxcblx0bmFtZTogYEFzcGh5eGlhdGlvbmAsXG5cdGRlc2M6IFtcblx0XHRgQ29uc3RhbnQgYWlyIHN1cHBseSBpcyByZXF1aXJlZC5gLFxuXHRcdGAxIFBhaW4gcGVyIG1pbnV0ZSB3aXRob3V0IGFpci5gLFxuXHRcdGBUaGlzIHBlbmFsdHkgaXMgcmVkdWNlZCBieSAxIHBlciBtaW51dGUgd2l0aCBhaXIuYCxcblx0XHRgR29pbmcgd2l0aG91dCBhaXIgZm9yIGEgbnVtYmVyIG9mIG1pbnV0ZXMgPSBbQ29uc3RpdHV0aW9uXSBpcyBsZXRoYWwuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXNwaHl4aWF0aW9uIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBEZWh5ZHJhdGlvbiA9IG5ldyBSdWxlKHtcblx0aWQ6IGAzNDk3NDU3NC02NDU1LTRjMDctODQ1Ni04ZjdiZGM3OGVjOWJgLFxuXHRuYW1lOiBgRGVoeWRyYXRpb25gLFxuXHRkZXNjOiBbXG5cdFx0YDEgV2F0ZXIgcGVyIGRheSBpcyByZXF1aXJlZC5gLFxuXHRcdGAxIFBhaW4gcGVyIGRheSB3aXRob3V0IFdhdGVyLmAsXG5cdFx0YFRoaXMgcGVuYWx0eSBpcyByZWR1Y2VkIGJ5IDEgcGVyIGRheSB3aXRoIFdhdGVyLmAsXG5cdFx0YEdvaW5nIHdpdGhvdXQgV2F0ZXIgZm9yIGEgbnVtYmVyIG9mIGRheXMgPSBbQ29uc3RpdHV0aW9uXSBpcyBsZXRoYWwuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRGVoeWRyYXRpb24iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEV4aGF1c3Rpb24gPSBuZXcgUnVsZSh7XG5cdGlkOiBgMDQ5NGE0MWUtZjhmOC00NWY1LWExZWYtNTY2MDkwMGUzN2RiYCxcblx0bmFtZTogYEV4aGF1c3Rpb25gLFxuXHRkZXNjOiBbXG5cdFx0YDggaG91cnMgb2Ygc2xlZXAgcGVyIGRheSBpcyByZXF1aXJlZC5gLFxuXHRcdGAxIFBhaW4gcGVyIGRheSB3aXRob3V0IHN1ZmZpY2llbnQgc2xlZXAuYCxcblx0XHRgR28gdW5jb25zY2lvdXMgZm9yIDggaG91cnMgYWZ0ZXIgZGF5cyA9IFtDb25zdGl0dXRpb25dIHdpdGhvdXQgc2xlZXAuYCxcblx0XHRgUGVuYWx0aWVzIGdvIGF3YXkgYWZ0ZXIgOCBob3VycyBvZiBzbGVlcC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBFeGhhdXN0aW9uIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBIeXBvdGhlcm1pYSA9IG5ldyBSdWxlKHtcblx0aWQ6IGAxNjI1YzgwYy01NjMwLTRmMjAtYjkwOS1lZDkxZGJjZTM3MWJgLFxuXHRuYW1lOiBgSHlwb3RoZXJtaWFgLFxuXHRkZXNjOiBbXG5cdFx0YFdhcm10aCBpcyByZXF1aXJlZC5gLFxuXHRcdGAxIFBhaW4gcGVyIGhvdXIgb2YgSHlwb3RoZXJtaWEuYCxcblx0XHRgUmVkdWNlIHBlbmFsdHkgYnkgMSBwZXIgaG91ciBvZiB3YXJtdGguYCxcblx0XHRgSHlwb3RoZXJtaWEgZm9yIGhvdXJzID0gW0NvbnN0aXR1dGlvbl0gaXMgbGV0aGFsLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEh5cG90aGVybWlhIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBTdGFydmF0aW9uID0gbmV3IFJ1bGUoe1xuXHRpZDogYDkzZjcwZWYzLWIwMGYtNGU1Mi05ZTExLTUyMjUyNjJiMjdlNGAsXG5cdG5hbWU6IGBTdGFydmF0aW9uYCxcblx0ZGVzYzogW1xuXHRcdGAxIEZvb2QgcGVyIGRheSBpcyByZXF1aXJlZC5gLFxuXHRcdGAxIFBhaW4gcGVyIHdlZWsgd2l0aG91dCBGb29kLmAsXG5cdFx0YFRoaXMgcGVuYWx0eSBpcyByZWR1Y2VkIGJ5IDEgcGVyIGRheSB3aXRoIEZvb2QuYCxcblx0XHRgR29pbmcgd2l0aG91dCBGb29kIGZvciBhIG51bWJlciBvZiB3ZWVrcyA9IFtDb25zdGl0dXRpb25dIGlzIGxldGhhbC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydmF0aW9uIiwiaW1wb3J0IEFzcGh5eGlhdGlvbiBmcm9tICcuL0FzcGh5eGlhdGlvbidcbmltcG9ydCBEZWh5ZHJhdGlvbiBmcm9tICcuL0RlaHlkcmF0aW9uJ1xuaW1wb3J0IEV4aGF1c3Rpb24gZnJvbSAnLi9FeGhhdXN0aW9uJ1xuaW1wb3J0IEh5cG90aGVybWlhIGZyb20gJy4vSHlwb3RoZXJtaWEnXG5pbXBvcnQgU3RhcnZhdGlvbiBmcm9tICcuL1N0YXJ2YXRpb24nXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiBgTmVlZHNgLFxuXHRleHBsYW5hdGlvbjogW1xuXHRcdGBUYWtlIDEgUGFpbiBmb3IgZWFjaCB1bm1ldCByZXF1aXJlbWVudCBvdmVyIGEgZ2l2ZW4gcGVyaW9kIG9mIHRpbWUuYCxcblx0XSxcblx0bGlzdDogW1xuXHRcdEFzcGh5eGlhdGlvbixcblx0XHREZWh5ZHJhdGlvbixcblx0XHRFeGhhdXN0aW9uLFxuXHRcdEh5cG90aGVybWlhLFxuXHRcdFN0YXJ2YXRpb24sXG5cdF1cbn0iLCJpbXBvcnQgQmxvY2sgZnJvbSAnLi9CbG9jaydcbmltcG9ydCBDYXJyeSBmcm9tICcuL0NhcnJ5J1xuaW1wb3J0IERvZGdlIGZyb20gJy4vRG9kZ2UnXG5pbXBvcnQgRXhwZXJpZW5jZSBmcm9tICcuL0V4cGVyaWVuY2UnXG5pbXBvcnQgSGVhbHRoIGZyb20gJy4vSGVhbHRoJ1xuaW1wb3J0IEludGVsbGVjdCBmcm9tICcuL0ludGVsbGVjdCdcbmltcG9ydCBMdWNrIGZyb20gJy4vTHVjaydcbmltcG9ydCBQc3ljaGUgZnJvbSAnLi9Qc3ljaGUnXG5pbXBvcnQgU3BlZWQgZnJvbSAnLi9TcGVlZCdcblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5hbWU6IGBQcm9wZXJ0aWVzYCxcblx0ZXhwbGFuYXRpb246IFtcblx0XHRgUHJvcGVydGllcyByZXByZXNlbnQgYSB2YXJpZXR5IG9mIGF0dHJpYnV0ZXMgdGhhdCBhcmUgZGVyaXZlZCBmcm9tIGEgQ2hhcmFjdGVyJ3MgVHJhaXRzIGFuZCBTa2lsbHMuYFxuXHRdLFxuXHRsaXN0OiBbXG5cdFx0QmxvY2ssXG5cdFx0Q2FycnksXG5cdFx0RG9kZ2UsXG5cdFx0RXhwZXJpZW5jZSxcblx0XHRIZWFsdGgsXG5cdFx0SW50ZWxsZWN0LFxuXHRcdEx1Y2ssXG5cdFx0UHN5Y2hlLFxuXHRcdFNwZWVkLFxuXHRdLFxuXHRzZXRTY29yZXM6IGZ1bmN0aW9uKGMpIHtcblx0XHR0aGlzLmxpc3QuZm9yRWFjaChwID0+IHAuZm9ybXVsYShjKSlcblx0XHRyZXR1cm4gY1xuXHR9XG59IiwiaW1wb3J0IEFnaWxpdHlTa2lsbHMgZnJvbSAncnVsZXMvc2tpbGxzL0FnaWxpdHlTa2lsbHMuanMnXG5pbXBvcnQgQnJhaW5zU2tpbGxzIGZyb20gJ3J1bGVzL3NraWxscy9CcmFpbnNTa2lsbHMuanMnXG5pbXBvcnQgQ29uc3RpdHV0aW9uU2tpbGxzIGZyb20gJ3J1bGVzL3NraWxscy9Db25zdGl0dXRpb25Ta2lsbHMuanMnXG5pbXBvcnQgRGVtZWFub3JTa2lsbHMgZnJvbSAncnVsZXMvc2tpbGxzL0RlbWVhbm9yU2tpbGxzLmpzJ1xuaW1wb3J0IFByb3BTb3J0IGZyb20gJ3V0aWxzL1Byb3BTb3J0LmpzJ1xuaW1wb3J0IFJhbmRvbVJvbGwgZnJvbSAncmFuZG9tL1JhbmRvbVJvbGwuanMnXG5cblxuZXhwb3J0IGNvbnN0IFNwZWNpYWx0eUV4cGxhbmF0aW9uID0gYFNwZWNpYWx0aWVzIChsaXN0ZWQgYmVsb3cgdGhlaXIgU2tpbGxzKSBlcXVhbCB0aGVpciBwYXJlbnQgU2tpbGwgYnkgZGVmYXVsdC4gU3BlY2lhbHRpZXMgY2FuIGV4Y2VlZCB0aGUgcGFyZW50IFNraWxsIGJ5IHRha2luZyB0aGUgU3BlY2lhbGl6ZSBBYmlsaXR5LiBVbmxlc3Mgb3RoZXJ3aXNlIG5vdGVkLCBhIFNraWxsIHRha2VzIG9uZSBBY3Rpb24uYFxuXG5leHBvcnQgY29uc3QgU2tpbGxGbG93RXhwbGFuYXRpb24gPSBgU2tpbGwgRmxvdzogT25jZSBwZXIgbW9udGggKGluLWdhbWUpLCB0cmFuc2ZlciAxIHBvaW50IGZyb20gYSBTa2lsbCB5b3UgaGF2ZSBub3QgdXNlZCB0byBvbmUgdGhhdCB5b3UgaGF2ZSB1c2VkLmBcblxuY29uc3QgU2tpbGxMaXN0ID0gW1xuXHQuLi5BZ2lsaXR5U2tpbGxzLFxuXHQuLi5CcmFpbnNTa2lsbHMsXG5cdC4uLkNvbnN0aXR1dGlvblNraWxscyxcblx0Li4uRGVtZWFub3JTa2lsbHMsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogYFNraWxsc2AsXG5cdGV4cGxhbmF0aW9uOiBbXG5cdFx0YFlvdSBnZXQgQnJhaW5zIHggNiBTa2lsbCBwb2ludHMgdG8gYXNzaWduLmAsXG5cdFx0YFNraWxscyByYW5nZSBmcm9tIDAgdG8gNi5gLFxuXHRcdGBTa2lsbCByb2xscyBhcmUgW2Q2ICsgU2tpbGxdLmAsXG5cdFx0YFRyYWl0IHNjb3JlcyBzZXQgdGhlIGxpbWl0IGZvciB0aGVpciBTa2lsbHMuYCxcblx0XSxcblx0bGlzdDogU2tpbGxMaXN0LFxuXHRncm91cHM6IFtcblx0XHR7XG5cdFx0XHRuYW1lOiBgQWdpbGl0eWAsXG5cdFx0XHRsaXN0OiBBZ2lsaXR5U2tpbGxzXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiBgQnJhaW5zYCxcblx0XHRcdGxpc3Q6IEJyYWluc1NraWxsc1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogYENvbnN0aXR1dGlvbmAsXG5cdFx0XHRsaXN0OiBDb25zdGl0dXRpb25Ta2lsbHNcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6IGBEZW1lYW5vcmAsXG5cdFx0XHRsaXN0OiBEZW1lYW5vclNraWxsc1xuXHRcdH0sXG5cdF0sXG5cdHNwZWNzOiBPYmplY3QudmFsdWVzKFNraWxsTGlzdClcblx0XHRcdFx0Lm1hcCgocykgPT4gT2JqZWN0LnZhbHVlcyhzLnNwZWNzKSlcblx0XHRcdFx0LnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYiksIFtdKVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gUHJvcFNvcnQoYSwgYiwgYG5hbWVgKSksXG5cdHN0YXJ0aW5nUG9pbnRzOiAoYykgPT4gYy50cmFpdHMuYnJhaW5zLnNjb3JlICogNixcblx0YXNzaWduOiBmdW5jdGlvbihjLCB0YXJnZXQpIHtcblx0XHRjLnNraWxsc1t0YXJnZXQubmFtZV0uc2NvcmUgPSBwYXJzZUludCh0YXJnZXQudmFsdWUpXG5cdFx0cmV0dXJuIHRoaXMubGltaXQoYywgdGFyZ2V0Lm5hbWUpXG5cdH0sXG5cdGxpbWl0OiBmdW5jdGlvbihjLCB0YXJnZXROYW1lKSB7XG5cdFx0Y29uc3QgbWF4ID0gYy50cmFpdHNbYy5za2lsbHNbdGFyZ2V0TmFtZV0ucGFyZW50LnRvTG93ZXJDYXNlKCldLnNjb3JlXG5cdFx0d2hpbGUodGhpcy5yZW1haW5pbmcoYykgPCAwIHx8IGMuc2tpbGxzW3RhcmdldE5hbWVdLnNjb3JlID4gbWF4KSB7XG5cdFx0XHRjLnNraWxsc1t0YXJnZXROYW1lXS5zY29yZS0tXG5cdFx0fVxuXHRcdHJldHVybiBjXG5cdH0sXG5cdHJhbmRvbTogZnVuY3Rpb24oYykge1xuXHRcdGMgPSB0aGlzLnJlc2V0KGMpXG5cdFx0d2hpbGUodGhpcy5yZW1haW5pbmcoYykgPiAwKSB7XG5cdFx0XHRjb25zdCB0ID0gUmFuZG9tUm9sbChPYmplY3Qua2V5cyhjLnNraWxscykpXG5cdFx0XHRjb25zdCBwYXJlbnRTY29yZSA9IGMudHJhaXRzW2Muc2tpbGxzW3RdLnBhcmVudC50b0xvd2VyQ2FzZSgpXS5zY29yZVxuXHRcdFx0aWYgKGMuc2tpbGxzW3RdLnNjb3JlIDwgcGFyZW50U2NvcmUpIGMuc2tpbGxzW3RdLnNjb3JlKytcblx0XHR9XG5cdFx0cmV0dXJuIGNcblx0fSxcblx0cmVtYWluaW5nOiBmdW5jdGlvbihjKSB7XG5cdFx0Y29uc3Qgc3BlbnQgPSBPYmplY3QudmFsdWVzKGMuc2tpbGxzKS5yZWR1Y2UoKHQsIHsgc2NvcmUgfSkgPT4gdCArPSBzY29yZSwgMClcblx0XHRyZXR1cm4gdGhpcy5zdGFydGluZ1BvaW50cyhjKSAtIHNwZW50XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbihjKSB7XG5cdFx0T2JqZWN0LmtleXMoYy5za2lsbHMpLmZvckVhY2godCA9PiBjLnNraWxsc1t0XS5zY29yZSA9IDApXG5cdFx0cmV0dXJuIGNcblx0fSxcbn0iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEJsZWVkaW5nID0gbmV3IFJ1bGUoe1xuXHRpZDogYDFhMmEwNDdjLTEyOGMtNDEzNi1hZDY1LTBhZmQ4MWM5MzYyZGAsXG5cdG5hbWU6IGBCbGVlZGluZ2AsXG5cdGRlc2M6IFtcblx0XHRgWW91IGJlZ2luIEJsZWVkaW5nIHdoZW5ldmVyIHlvdSB0YWtlIERhbWFnZSB0aGF0IGlzbid0IEJsdW50LmAsXG5cdFx0YEJsZWVkaW5nIERhbWFnZSBpcyBkZWFsdCB0byB0aGUgVG9yc28sIHJlZ2FyZGxlc3Mgb2Ygd2hpY2ggQm9keSBQYXJ0IHRvb2sgdGhlIGluaXRpYWwgRGFtYWdlLmAsXG5cdFx0YElmIHlvdXIgVG9yc28gaGFzIHBvc2l0aXZlIEhlYWx0aCwgdGhlIHJhdGUgb2YgQmxlZWRpbmcgaXMgMSBEYW1hZ2UgcGVyIG1pbnV0ZS5gLFxuXHRcdGBJZiBhbnkgQm9keSBQYXJ0IGRyb3BzIHRvIDAgb3IgbmVnYXRpdmUgSGVhbHRoLCB0aGUgcmF0ZSBvZiBCbGVlZGluZyBpcyAxIERhbWFnZSBwZXIgcm91bmQuYCxcblx0XHRgQSBCbGVlZGluZyBwZXJzb24gd2l0aCBwb3NpdGl2ZSBUb3JzbyBIZWFsdGggY2FuIHJvbGwgQ29uc3RpdHV0aW9uIHZzIHRvdGFsIERhbWFnZSBvbmNlIHBlciBtaW51dGUgdG8gc3RvcCBCbGVlZGluZyBvbiB0aGVpciBvd24sIG90aGVyd2lzZSB0aGUgTWVkaWNpbmUgU2tpbGwgaXMgcmVxdWlyZWQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQmxlZWRpbmciLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEJsaW5kID0gbmV3IFJ1bGUoe1xuXHRpZDogYDVmYjMxMjNmLWI3ZjAtNGUwOS1hY2ZiLTEwZWQ5M2I2NzVhOGAsXG5cdG5hbWU6IGBCbGluZGAsXG5cdGRlc2M6IFtcblx0XHRgWW91IGFyZSBjb25zaWRlcmVkIHRvIGJlIERlZmVuc2VsZXNzLmAsXG5cdFx0YFlvdSBhdXRvbWF0aWNhbGx5IEZhaWwgYW55IFBlcmNlcHRpb24gcm9sbCB0aGF0IGludm9sdmVzIHNlZWluZy5gLFxuXHRcdGBZb3UgaGF2ZSBhIC02IHBlbmFsdHkgdG8gYWxsIG90aGVyIHJvbGxzIHRoYXQgaW52b2x2ZSBzZWVpbmcuYCxcblx0XHRgVGhpcyBpbmNsdWRlcyBBdHRhY2tzLCBpbiB3aGljaCBjYXNlIGFsbCBvcHBvbmVudHMgYXJlIGNvbnNpZGVyZWQgdG8gYmUgQ29uY2VhbGVkIGZyb20geW91LmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEJsaW5kIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBCdXJuaW5nID0gbmV3IFJ1bGUoe1xuXHRpZDogYGZkZDkyNTdlLTk5MzctNDc4Ni1hNmIwLWViNzdjMzliYTdmNGAsXG5cdG5hbWU6IGBCdXJuaW5nYCxcblx0ZGVzYzogW1xuXHRcdGAxIEZpcmUgRGFtYWdlIHBlciByb3VuZC5gLFxuXHRcdGBJdCB0YWtlcyBhIGQ2IHJvdW5kcyB0byBzdG9wLCBkcm9wIFByb25lLCBhbmQgcm9sbCBTdXJ2aXZhbCA2IyB0byBwdXQgb3V0IHRoZSBmbGFtZXMuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgQnVybmluZyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgQ29uY2VhbGVkID0gbmV3IFJ1bGUoe1xuXHRpZDogYDU2MDM3YWMyLTlhZDAtNDA5Ny05Y2VmLTYyMWVhOGQxNzFlN2AsXG5cdG5hbWU6IGBDb25jZWFsZWRgLFxuXHRkZXNjOiBbXG5cdFx0YElmIGFuIG9wcG9uZW50IGNhbm5vdCBzZWUgeW91LCB0aGV5IGFyZSBjb25zaWRlcmVkIHRvIGJlIEJsaW5kIHRvIHlvdS5gLFxuXHRcdGBBbnkgQXR0YWNrIHRoZXkgbWFrZSB0YXJnZXRpbmcgeW91IGlzIGF0IGEgLTYgcGVuYWx0eS5gLFxuXHRcdGBCbGFzdHMgYXJlIHVuYWZmZWN0ZWQgYnkgdGhpcyBwZW5hbHR5LCB0aG91Z2ggQmxhc3QgRGFtYWdlIG1heSBiZSBuZWdhdGVkIG9yIHJlZHVjZWQgaWYgdGhlIENvbmNlYWxtZW50IGlzIGR1ZSB0byBDb3Zlci5gLFxuXHRcdGBUYXJnZXRzIGFyZSBEZWZlbnNlbGVzcyBhZ2FpbnN0IEF0dGFja3MgZnJvbSBDb25jZWFsZWQgb3Bwb25lbnRzLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IENvbmNlYWxlZCIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgRGVhZiA9IG5ldyBSdWxlKHtcblx0aWQ6IGAwYTg4NDJlYi02YTI4LTQyMTYtODUzYi0xMWQ2OTMwYTllZGNgLFxuXHRuYW1lOiBgRGVhZmAsXG5cdGRlc2M6IFtcblx0XHRgWW91IGF1dG9tYXRpY2FsbHkgRmFpbCBhbnkgcm9sbCB0aGF0IGludm9sdmVzIGhlYXJpbmcuYFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBEZWFmIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBEZWZlbnNlbGVzcyA9IG5ldyBSdWxlKHtcblx0aWQ6IGA2MmYzMDE3ZC1jNjRhLTQ2NDctYWVkNC1kYTk0NGJmNTI0NDlgLFxuXHRuYW1lOiBgRGVmZW5zZWxlc3NgLFxuXHRkZXNjOiBbXG5cdFx0YFlvdSBtdXN0IHVzZSBhIFJlZmxleGl2ZSBEZWZlbnNlLmAsXG5cdFx0YFVzZSB5b3VyIEJsb2NrIHNjb3JlIGFnYWluc3QgTWVsZWUgQXR0YWNrcyBhbmQgeW91IERvZGdlIHNjb3JlIGFnYWluc3QgUmFuZ2VkIEF0dGFja3MuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRGVmZW5zZWxlc3MiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IEZhbGxpbmcgPSBuZXcgUnVsZSh7XG5cdGlkOiBgMDY0Y2IyNWQtY2FmZi00YzMzLTk0NGEtODQ5NjA0ODYxNTYxYCxcblx0bmFtZTogYEZhbGxpbmdgLFxuXHRkZXNjOiBbXG5cdFx0YDEgQmx1bnQgRGFtYWdlIHBlciAyeWRzLmAsXG5cdFx0YEVhY2ggcG9pbnQgb2YgRmFsbGluZyBEYW1hZ2UgaXMgaW5mbGljdGVkIG9uIGEgcmFuZG9tIEJvZHkgUGFydC5gLFxuXHRcdGBSb2xsIFtBY3JvYmF0aWNzICMgPSB5ZHNdIGFzIGEgRGVmZW5zZSBBY3Rpb24gdG8gaGFsdmUgRmFsbGluZyBEYW1hZ2UuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgRmFsbGluZyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgR3JhYmJlZCA9IG5ldyBSdWxlKHtcblx0aWQ6IGBmY2YyMTQ4YS0xODI1LTQ5NjItOGU4OC04NjZlOWZiZGNlZDRgLFxuXHRuYW1lOiBgR3JhYmJlZGAsXG5cdGRlc2M6IFtcblx0XHRgQSBHcmFiYmVkIG9wcG9uZW50IGlzIGNvbnNpZGVyZWQgdG8gYmUgSW1tb2JpbGl6ZWQuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgR3JhYmJlZCIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgSGFybWxlc3MgPSBuZXcgUnVsZSh7XG5cdGlkOiBgMjViMWVhYTYtNGNmYi00NmMxLTlkNjktMTQyMjA5YTdhM2IwYCxcblx0bmFtZTogYEhhcm1sZXNzYCxcblx0ZGVzYzogW1xuXHRcdGBZb3UgY2Fubm90IEF0dGFjay5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIYXJtbGVzcyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgSW1tb2JpbGl6ZWQgPSBuZXcgUnVsZSh7XG5cdGlkOiBgMmU3NjM0Y2MtNGI2NS00ODNkLTgwMTEtYjEyZDZiZWU5YmQ1YCxcblx0bmFtZTogYEltbW9iaWxpemVkYCxcblx0ZGVzYzogW1xuXHRcdGBZb3VyIFNwZWVkIGlzIHRlbXBvcmFyaWx5IGNvbnNpZGVyZWQgdG8gYmUgMC5gXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEltbW9iaWxpemVkIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBPZmZIYW5kID0gbmV3IFJ1bGUoe1xuXHRpZDogYGMzYWJhNjU5LWRkOTYtNGY0Mi04MjgxLTBkMTNiOWM2ZGUyZWAsXG5cdG5hbWU6IGBPZmYtSGFuZGAsXG5cdGRlc2M6IFtcblx0XHRgLTMgcGVuYWx0eSB0byBBdHRhY2sgd2l0aCB5b3VyIE9mZi1IYW5kLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE9mZkhhbmQiLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IFBpbm5lZCA9IG5ldyBSdWxlKHtcblx0aWQ6IGBkMmU4YzYzNi1kODUzLTRmYTItYTBkZC0yZGFkNDA5YmE1ZmNgLFxuXHRuYW1lOiBgUGlubmVkYCxcblx0ZGVzYzogW1xuXHRcdGBQaW5uZWQgaXMgdGhlIHRoaXJkIGFuZCBmaW5hbCBzdGVwIG9mIEdyYXBwbGluZy5gLFxuXHRcdGBXaGlsZSBQaW5uZWQsIHlvdSBhcmUgY29uc2lkZXJlZCB0byBiZSBEZWZlbnNlbGVzcywgSGFybWxlc3MsIEltbW9iaWxpemVkLCBhbmQgUHJvbmUuYCxcblx0XHRgVGhlIEF0dGFja2VyIGlzIGFsc28gY29uc2lkZXJlZCB0byBiZSBJbW1vYmlsaXplZCBhbmQgUHJvbmUuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgUGlubmVkIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBQcm9uZSA9IG5ldyBSdWxlKHtcblx0aWQ6IGA2ODdmYmYyOC04MTk4LTQzNjMtYmVhNS02MWQ1NmY4NzhjMjNgLFxuXHRuYW1lOiBgUHJvbmVgLFxuXHRkZXNjOiBbXG5cdFx0YFlvdSBtYXkgZHJvcCBQcm9uZSBhdCBhbnkgdGltZSBmb3IgZnJlZSBvbiB5b3VyIHR1cm4gb3IgYXMgcGFydCBvZiBhIERvZGdlIGFjdGlvbi5gLFxuXHRcdGBTdGFuZGluZyB1cCB0YWtlcyAxIEFjdGlvbi5gLFxuXHRcdGBUaGUgYmVuZWZpdHMgb2YgYmVpbmcgUHJvbmUgYXJlIHRoYXQgeW91IGdldCArMyBSYW5nZWQgYW5kICszIFN0ZWFsdGgsIGFuZCBhdHRhY2tlcnMgdGFrZSBhIC0zIFJhbmdlZCBwZW5hbHR5IHRvIGhpdCB5b3UuYCxcblx0XHRgVGhlIGRyYXdiYWNrcyBvZiBiZWluZyBQcm9uZSBhcmUgdGhhdCB5b3VyIFNwZWVkIGRyb3BzIHRvIDF5cmQgYW5kIGF0dGFja2VycyBnZXQgYSArMyBNZWxlZSBib251cyB0byBoaXQgeW91LmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFByb25lIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBSZXN0cmFpbmVkID0gbmV3IFJ1bGUoe1xuXHRpZDogYGE4MzZmNDEwLWI5ZWYtNGIzMi1hNzUzLThiNzMyYjhlNGIxMWAsXG5cdG5hbWU6IGBSZXN0cmFpbmVkYCxcblx0ZGVzYzogW1xuXHRcdGBSZXN0cmFpbmVkIGlzIHRoZSBzZWNvbmQgc3RlcCBvZiBHcmFwcGxpbmcuYCxcblx0XHRgV2hpbGUgUmVzdHJhaW5lZCwgeW91IGFyZSBjb25zaWRlcmVkIHRvIGJlIEhhcm1sZXNzIGFuZCBJbW1vYmlsaXplZC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBSZXN0cmFpbmVkIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBTdHVuID0gbmV3IFJ1bGUoe1xuXHRpZDogYGJhNmNmMzk3LWI0MzQtNDQyZi1hNzI1LTczZWUwMGNmMjNjYWAsXG5cdG5hbWU6IGBTdHVuYCxcblx0ZGVzYzogW1xuXHRcdGBEZWZlbnNlbGVzcywgSGFybWxlc3MsIGFuZCBJbW1vYmlsaXplZC5gLFxuXHRcdGBZb3UgZmFsbCBQcm9uZSBpZiBTdHVubmVkIGZvciBsb25nZXIgdGhhbiAxIHJvdW5kLmAsXG5cdF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IFN0dW4iLCJpbXBvcnQgUnVsZSBmcm9tICdydWxlcy9SdWxlLmpzJ1xuXG5cbmNvbnN0IFVuYXJtZWQgPSBuZXcgUnVsZSh7XG5cdGlkOiBgZjM3YWM1MjQtZTI2Yi00OWIwLWEzZTctNWQwMWE1MGM1NjkzYCxcblx0bmFtZTogYFVuYXJtZWRgLFxuXHRkZXNjOiBbXG5cdFx0YFN1Y2Nlc3NmdWwgVW5hcm1lZCBBdHRhY2tzIGRvIERhbWFnZSA9IFsoQXR0YWNrIC0gRGVmZW5zZSkgLyAyXSAoYWx3YXlzIHJvdW5kIGRvd24pLmAsXG5cdFx0YERhbWFnZSBSZXNpc3RhbmNlIGlzIG5vdCBkZXBsZXRlZC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBVbmFybWVkIiwiaW1wb3J0IFJ1bGUgZnJvbSAncnVsZXMvUnVsZS5qcydcblxuXG5jb25zdCBVbmNvbnNjaW91cyA9IG5ldyBSdWxlKHtcblx0aWQ6IGAwZjMzNjE1Mi02NDBlLTQwYjktYmQ0MC01YTcxN2JhOWI2MWNgLFxuXHRuYW1lOiBgVW5jb25zY2lvdXNgLFxuXHRkZXNjOiBbXG5cdFx0YFVuYXdhcmUgYW5kIHVuYWJsZSB0byBkbyBhbnl0aGluZy5gLFxuXHRcdGBZb3UgYXJlIGNvbnNpZGVyZWQgdG8gYmUgQmxpbmQsIEhhcm1sZXNzLCBJbW1vYmlsaXplZCwgUHJvbmUsIGFuZCBoYXZlIGEgUmVmbGV4aXZlIERlZmVuc2Ugb2YgMC5gLFxuXHRdXG59KVxuXG5leHBvcnQgZGVmYXVsdCBVbmNvbnNjaW91cyIsImltcG9ydCBSdWxlIGZyb20gJ3J1bGVzL1J1bGUuanMnXG5cblxuY29uc3QgVW5zdGFibGUgPSBuZXcgUnVsZSh7XG5cdGlkOiBgYzFkYTdkMjgtMzFhOC00NjhjLWE0NTQtMTU3ZmUzYWRkYjYyYCxcblx0bmFtZTogYFVuc3RhYmxlYCxcblx0ZGVzYzogW1xuXHRcdGAtMyBwZW5hbHR5IHRvIEFnaWxpdHkgb3IgQ29uc3RpdHV0aW9uIFNraWxsIHJvbGxzLmAsXG5cdFx0YFJhbmdlZCBBdHRhY2tzIHRhcmdldGluZyB5b3UgdGFrZSBhIC0zIHBlbmFsdHkuYCxcblx0XVxufSlcblxuZXhwb3J0IGRlZmF1bHQgVW5zdGFibGUiLCJpbXBvcnQgQmxlZWRpbmcgZnJvbSAnLi9CbGVlZGluZydcbmltcG9ydCBCbGluZCBmcm9tICcuL0JsaW5kJ1xuaW1wb3J0IEJ1cm5pbmcgZnJvbSAnLi9CdXJuaW5nJ1xuaW1wb3J0IENvbmNlYWxlZCBmcm9tICcuL0NvbmNlYWxlZCdcbmltcG9ydCBEZWFmIGZyb20gJy4vRGVhZidcbmltcG9ydCBEZWZlbnNlbGVzcyBmcm9tICcuL0RlZmVuc2VsZXNzJ1xuaW1wb3J0IEZhbGxpbmcgZnJvbSAnLi9GYWxsaW5nJ1xuaW1wb3J0IEdyYWJiZWQgZnJvbSAnLi9HcmFiYmVkJ1xuaW1wb3J0IEhhcm1sZXNzIGZyb20gJy4vSGFybWxlc3MnXG5pbXBvcnQgSW1tb2JpbGl6ZWQgZnJvbSAnLi9JbW1vYmlsaXplZCdcbmltcG9ydCBPZmZIYW5kIGZyb20gJy4vT2ZmSGFuZCdcbmltcG9ydCBQaW5uZWQgZnJvbSAnLi9QaW5uZWQnXG5pbXBvcnQgUHJvbmUgZnJvbSAnLi9Qcm9uZSdcbmltcG9ydCBSZXN0cmFpbmVkIGZyb20gJy4vUmVzdHJhaW5lZCdcbmltcG9ydCBTdHVuIGZyb20gJy4vU3R1bidcbmltcG9ydCBVbmFybWVkIGZyb20gJy4vVW5hcm1lZCdcbmltcG9ydCBVbmNvbnNjaW91cyBmcm9tICcuL1VuY29uc2Npb3VzJ1xuaW1wb3J0IFVuc3RhYmxlIGZyb20gJy4vVW5zdGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogYFN0YXR1c2AsXG5cdGxpc3Q6IFtcblx0XHRCbGVlZGluZyxcblx0XHRCbGluZCxcblx0XHRCdXJuaW5nLFxuXHRcdENvbmNlYWxlZCxcblx0XHREZWFmLFxuXHRcdERlZmVuc2VsZXNzLFxuXHRcdEZhbGxpbmcsXG5cdFx0R3JhYmJlZCxcblx0XHRIYXJtbGVzcyxcblx0XHRJbW1vYmlsaXplZCxcblx0XHRPZmZIYW5kLFxuXHRcdFBpbm5lZCxcblx0XHRQcm9uZSxcblx0XHRSZXN0cmFpbmVkLFxuXHRcdFN0dW4sXG5cdFx0VW5hcm1lZCxcblx0XHRVbmNvbnNjaW91cyxcblx0XHRVbnN0YWJsZSxcblx0XVxufSIsImltcG9ydCBBZ2lsaXR5IGZyb20gJ3J1bGVzL3RyYWl0cy9BZ2lsaXR5LmpzJ1xuaW1wb3J0IEJyYWlucyBmcm9tICdydWxlcy90cmFpdHMvQnJhaW5zLmpzJ1xuaW1wb3J0IENvbnN0aXR1dGlvbiBmcm9tICdydWxlcy90cmFpdHMvQ29uc3RpdHV0aW9uLmpzJ1xuaW1wb3J0IERlbWVhbm9yIGZyb20gJ3J1bGVzL3RyYWl0cy9EZW1lYW5vci5qcydcbmltcG9ydCBSYW5kb21Sb2xsIGZyb20gJ3JhbmRvbS9SYW5kb21Sb2xsLmpzJ1xuXG5cbmV4cG9ydCBjb25zdCB0cmFpdE1heCA9IDZcblxuZXhwb3J0IGNvbnN0IHRyYWl0UG9pbnRzID0gMTRcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRuYW1lOiBgVHJhaXRzYCxcblx0ZXhwbGFuYXRpb246IFtcblx0XHRgWW91IGdldCAke3RyYWl0UG9pbnRzfSBUcmFpdCBwb2ludHMgdG8gYXNzaWduLmAsXG5cdFx0YFRyYWl0cyByYW5nZSBmcm9tIDEgdG8gJHt0cmFpdE1heH0uYCxcblx0XHRgVHJhaXQgcm9sbHMgYXJlIFtkNiArIFRyYWl0XS5gLFxuXHRcdGBUcmFpdCBzY29yZXMgc2V0IHRoZSBsaW1pdCBmb3IgdGhlaXIgU2tpbGxzLmAsXG5cdF0sXG5cdGxpc3Q6IFtcblx0XHRBZ2lsaXR5LFxuXHRcdEJyYWlucyxcblx0XHRDb25zdGl0dXRpb24sXG5cdFx0RGVtZWFub3IsXG5cdF0sXG5cdG1heDogdHJhaXRNYXgsXG5cdHN0YXJ0aW5nUG9pbnRzOiAoKSA9PiB0cmFpdFBvaW50cyxcblx0YXNzaWduOiBmdW5jdGlvbihjLCB0YXJnZXQpIHtcblx0XHRjLnRyYWl0c1t0YXJnZXQubmFtZV0uc2NvcmUgPSBwYXJzZUludCh0YXJnZXQudmFsdWUpXG5cdFx0cmV0dXJuIHRoaXMubGltaXQoYywgdGFyZ2V0Lm5hbWUpXG5cdH0sXG5cdGxpbWl0OiBmdW5jdGlvbihjLCB0YXJnZXROYW1lKSB7XG5cdFx0d2hpbGUodGhpcy5yZW1haW5pbmcoYykgPCAwKSBjLnRyYWl0c1t0YXJnZXROYW1lXS5zY29yZS0tXG5cdFx0cmV0dXJuIGNcblx0fSxcblx0cmFuZG9tOiBmdW5jdGlvbihjKSB7XG5cdFx0YyA9IHRoaXMucmVzZXQoYylcblx0XHR3aGlsZSh0aGlzLnJlbWFpbmluZyhjKSA+IDApIHtcblx0XHRcdGNvbnN0IHQgPSBSYW5kb21Sb2xsKE9iamVjdC5rZXlzKGMudHJhaXRzKSlcblx0XHRcdGlmIChjLnRyYWl0c1t0XS5zY29yZSA8IHRoaXMubWF4KSBjLnRyYWl0c1t0XS5zY29yZSsrXG5cdFx0fVxuXHRcdHJldHVybiBjXG5cdH0sXG5cdHJlbWFpbmluZzogZnVuY3Rpb24oYykge1xuXHRcdGNvbnN0IHNwZW50ID0gT2JqZWN0LnZhbHVlcyhjLnRyYWl0cykucmVkdWNlKCh0LCB7IHNjb3JlIH0pID0+IHQgKz0gc2NvcmUsIDApXG5cdFx0cmV0dXJuIHRoaXMuc3RhcnRpbmdQb2ludHMoKSAtIHNwZW50XG5cdH0sXG5cdHJlc2V0OiBmdW5jdGlvbihjKSB7XG5cdFx0T2JqZWN0LmtleXMoYy50cmFpdHMpLmZvckVhY2godCA9PiBjLnRyYWl0c1t0XS5zY29yZSA9IDEpXG5cdFx0cmV0dXJuIGNcblx0fVxufSIsImltcG9ydCBBYmlsaXRpZXMgZnJvbSAnLi9hYmlsaXRpZXMvQWJpbGl0aWVzJ1xuaW1wb3J0IENvbWJhdCBmcm9tICcuL2NvbWJhdC9Db21iYXQnXG5pbXBvcnQgQ29tcGxpY2F0aW9ucyBmcm9tICcuL2NvbXBsaWNhdGlvbnMvQ29tcGxpY2F0aW9ucydcbmltcG9ydCBDb3JlIGZyb20gJy4vY29yZS9Db3JlJ1xuaW1wb3J0IEdlYXJMaXN0IGZyb20gJy4vZ2Vhci9HZWFyTGlzdCdcbmltcG9ydCBNYW5ldXZlcnMgZnJvbSAnLi9tYW5ldXZlcnMvTWFuZXV2ZXJzJ1xuaW1wb3J0IE5lZWRzIGZyb20gJy4vbmVlZHMvTmVlZHMnXG5pbXBvcnQgUHJvcGVydGllcyBmcm9tICcuL3Byb3BlcnRpZXMvUHJvcGVydGllcydcbmltcG9ydCBTa2lsbHMgZnJvbSAnLi9za2lsbHMvU2tpbGxzJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuL3N0YXR1cy9TdGF0dXMnXG5pbXBvcnQgVHJhaXRzIGZyb20gJy4vdHJhaXRzL1RyYWl0cydcblxuY29uc3QgTWFudWFsID0gW1xuICAgIEFiaWxpdGllcyxcbiAgICBDb21iYXQsXG4gICAgQ29tcGxpY2F0aW9ucyxcbiAgICBDb3JlLFxuICAgIEdlYXJMaXN0LFxuICAgIE1hbmV1dmVycyxcbiAgICBOZWVkcyxcbiAgICBQcm9wZXJ0aWVzLFxuICAgIFNraWxscyxcbiAgICBTdGF0dXMsXG4gICAgVHJhaXRzXG5dXG5cbmV4cG9ydCBkZWZhdWx0IE1hbnVhbCIsIjxzY3JpcHQ+XG4gICAgaW1wb3J0IEFiaWxpdHkgZnJvbSAncnVsZXMvYWJpbGl0aWVzL0FiaWxpdHkuanMnXG5cbiAgICBleHBvcnQgbGV0IHJ1bGVcbjwvc2NyaXB0PlxuXG5cbjxkaXYgY2xhc3M9J2Rlc2Mtc2VjdGlvbic+XG4gICAgeyNlYWNoIHJ1bGUuZGVzYyBhcyBkZXNjfVxuICAgICAgICA8cCBjbGFzcz0ncnVsZS1kZXNjJz57ZGVzY308L3A+XG4gICAgey9lYWNofVxuPC9kaXY+XG57I2lmIHJ1bGUgaW5zdGFuY2VvZiBBYmlsaXR5fVxuICAgIDxwPjxzcGFuIGNsYXNzPSdib2xkJz5NYXg6PC9zcGFuPiB7cnVsZS5tYXh9PC9wPlxuICAgIDxwPjxzcGFuIGNsYXNzPSdib2xkJz5YUDo8L3NwYW4+IHtydWxlLnhwfTwvcD5cbnsvaWZ9XG5cblxuPHN0eWxlPlxuICAgIC5ydWxlLWRlc2Mge1xuXHRcdG1hcmdpbi1ib3R0b206IHZhcigtLXMxMDApO1xuXHR9XG4gICAgLmJvbGQge1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHR9XG48L3N0eWxlPiIsIjxzY3JpcHQ+XG4gICAgZXhwb3J0IGxldCBydWxlXG48L3NjcmlwdD5cblxuXG48dWw+XG4gICAgeyNlYWNoIE9iamVjdC52YWx1ZXMocnVsZS5zcGVjcykgYXMgc3BlY31cbiAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nc3ViLW5hbWUnPntzcGVjLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICB7I2VhY2ggc3BlYy5kZXNjIGFzIHNwZWNfZGVzY31cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz0nc3BlYy1kZXNjJz57c3BlY19kZXNjfTwvcD5cbiAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgPC9saT5cbiAgICB7L2VhY2h9XG48L3VsPlxuXG5cbjxzdHlsZT5cbiAgICAuc3BlYy1kZXNjIHtcblx0XHRtYXJnaW4tYm90dG9tOiB2YXIoLS1zMTAwKTtcblx0fVxuPC9zdHlsZT4iLCI8c2NyaXB0PlxuICAgIGV4cG9ydCBsZXQgcnVsZVxuPC9zY3JpcHQ+XG5cblxuPGRpdiBjbGFzcz0ncnVsZS10YWJsZSc+XG4gICAgPHRhYmxlPlxuICAgICAgICA8dHIgY2xhc3M9J3RhYmxlLWhlYWRlcic+XG4gICAgICAgICAgICB7I2VhY2ggcnVsZS50YWJsZS5oZWFkZXJzIGFzIGgsIGl9XG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPSdtYXgtd2lkdGg6IHtydWxlLnRhYmxlLndpZHRoc1tpXX0lOyB3aWR0aDoge3J1bGUudGFibGUud2lkdGhzW2ldfSU7Jz57aH08L3RkPlxuICAgICAgICAgICAgey9lYWNofVxuICAgICAgICA8L3RyPlxuICAgICAgICB7I2VhY2ggcnVsZS50YWJsZS5jb250ZW50cyBhcyBjLCBpfVxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgeyNlYWNoIE9iamVjdC52YWx1ZXMoYykgYXMgYywgaX1cbiAgICAgICAgICAgICAgICA8dGQgc3R5bGU9J21heC13aWR0aDoge3J1bGUudGFibGUud2lkdGhzW2ldfSU7IHdpZHRoOiB7cnVsZS50YWJsZS53aWR0aHNbaV19JTsnPntjfTwvdGQ+XG4gICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICB7L2VhY2h9XG4gICAgPC90YWJsZT5cbjwvZGl2PlxuXG5cbjxzdHlsZT5cbiAgICAucnVsZS10YWJsZSB7XG5cdFx0bWFyZ2luOiB2YXIoLS1zMTAwKTtcblx0fVxuXHQudGFibGUtaGVhZGVyIHtcblx0XHRmb250LXdlaWdodDogYm9sZDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblx0dHIge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdH1cblx0dGFibGUge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG48L3N0eWxlPiIsIjxzY3JpcHQ+XG4gICAgZXhwb3J0IGxldCBzdWJydWxlXG48L3NjcmlwdD5cblxuXG48ZGV0YWlscyBjbGFzcz0nc3VicnVsZS1kZXRhaWxzJz5cbiAgICA8c3VtbWFyeSBjbGFzcz0nc3ViLW5hbWUnPntzdWJydWxlLm5hbWV9PC9zdW1tYXJ5PlxuICAgIHsjZWFjaCBzdWJydWxlLmRlc2MgYXMgc3ViX2Rlc2N9XG4gICAgICAgIDxwIGNsYXNzPSdzdWItZGVzYyc+e3N1Yl9kZXNjfTwvcD5cbiAgICB7L2VhY2h9XG48L2RldGFpbHM+XG5cblxuPHN0eWxlPlxuICAgIC5zdWJydWxlLWRldGFpbHMge1xuXHRcdG1hcmdpbjogdmFyKC0tczEwMCk7XG5cdH1cblx0LnN1Yi1uYW1lIHtcblx0XHRmb250LXdlaWdodDogYm9sZDtcblx0fVxuXHQuc3ViLWRlc2Mge1xuXHRcdG1hcmdpbi1ib3R0b206IHZhcigtLXMxMDApO1xuXHR9XG48L3N0eWxlPiJdLCJuYW1lcyI6WyJEcnVnc0xpc3QiLCJFbGVjdHJvbmljc0xpc3QiLCJFcXVpcG1lbnRMaXN0IiwibWVsZWUiLCJhY3JvYmF0aWNzIiwiQmxvY2siLCJEb2RnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFjQSxNQUFNLFlBQVksR0FBRztBQUNyQixDQUFDLEdBQUcsWUFBWTtBQUNoQixDQUFDLEdBQUcsWUFBWTtBQUNoQixDQUFDLEdBQUcsWUFBWTtBQUNoQixDQUFDLEdBQUcsYUFBYTtBQUNqQixDQUFDLEdBQUcsYUFBYTtBQUNqQixDQUFDLEdBQUcsYUFBYTtBQUNqQixDQUFDLEdBQUcsYUFBYTtBQUNqQixDQUFDLEdBQUcsYUFBYTtBQUNqQixFQUFDO0FBQ0Q7QUFDQSxNQUFNLDBCQUEwQixHQUFHLENBQUMsSUFBSSxLQUFLO0FBQzdDLENBQUMsTUFBTSxPQUFPLEdBQUcsR0FBRTtBQUNu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QUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ3RDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDakQsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDO0FBQ3RELEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ25DLEVBQUU7QUFDRixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUU7QUFDaEMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBSztBQUN2RSxFQUFFLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFO0FBQ25FLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUU7QUFDL0IsR0FBRztBQUNILEVBQUUsT0FBTyxDQUFDO0FBQ1YsRUFBRTtBQUNGLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQ3JCLEVBQUUsQ0FBQyxHQUFHLElBQUks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Q0FBNEMsQ0FBQztBQUNoRCxFQUFFO0FBQ0YsQ0FBQyxJQUFJLEVBQUU7QUFDUCxFQUFFLE9BQU87QUFDVCxFQUFFLE1BQU07QUFDUixFQUFFLFlBQVk7QUFDZCxFQUFFLFFBQVE7QUFDVixFQUFFO0FBQ0YsQ0FBQyxHQUFHLEVBQUUsUUFBUTtBQUNkLENBQUMsY0FBYyxFQUFFLE1BQU0sV0FBVztBQUNsQyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUU7QUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUM7QUFDdEQsRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDbkMsRUFBRTtBQUNGLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFLFVBQVUsRUFBRTtBQUNoQyxFQUFFLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUU7QUFDM0QsRUFBRSxPQUFPLENBQUM7QUFDVixFQUFFO0FBQ0YsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDckIsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUM7QUFDbkIsRUFBRSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLEdBQUcsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDO0FBQzlDLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FB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
