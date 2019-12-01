import Rule from './rule.js'

const DefensiveManeuvers = [
    new Rule(`Block`,           `Roll [Melee vs MATK or RATK when using a Shield] for DEF.`),
    new Rule(`Dodge`,           `Roll [Acrobatics vs MATK or RATK (Throw)] for DEF.`),
    new Rule(`Duck`,            `Roll [Dodge vs ATK] to move up to your Speed to get behind Cover. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`),
    new Rule(`Full Defense`,    `Declare Full Defense on your turn and forego all ATKs to get a bonus = [Reflex] to all Block and Dodge rolls until your next turn.`),
    new Rule(`Hide`,            `Roll [Stealth vs Perception] to be Concealed. 0 Speed. +3 if Prone.`),
    new Rule(`Protect`,         `Become the new target of an ATK targeting someone within 1yd of you. You may still Block as normal, but you cannot Dodge the ATK.`),
    new Rule(`Sneak`,           `Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`)
]

const OffensiveManeuvers = [
    new Rule(`Aim`,             `Spend AP to get an equal bonus to one ATK.`),
    new Rule(`Called Shot`,     `ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`),
    new Rule(`Disarm`,          `Roll [MATK vs Melee (+ C if the weapon is used two-handed)]. The weapon flies d6 yds away. Attacker gets the weapon if Unarmed.`),
    new Rule(`Grab`,            `0DMG MATK to render an enemy Defenseless. Spend 1AP per rnd to retain Grab. Roll [(Acrobatics or Melee) vs Grab] to escape.`)
]

const Maneuvers = DefensiveManeuvers.concat(OffensiveManeuvers)

export default Maneuvers