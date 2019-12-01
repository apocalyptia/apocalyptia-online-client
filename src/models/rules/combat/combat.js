class Rule {
    constructor(name, notes) {
        this.name = name
        this.notes = notes
    }
}

export const RuleList = [
    new Rule(`Combat Introduction`, `Combat time occurs in 3-second “rounds” (rnds),. Each Player gets a turn each rnd. Either the GN decides or rolls [A vs A] to determine who goes first. At the end of each turn, the Player chooses who will go next among those who have not had a turn yet this rnd. At the end of the rnd the last Player to act decides who will start the next round.`),
    new Rule(`Communication`,       `You can speak or shout up to 6 words per round.`),
    new Rule(`Actions`,             `Perform Actions by spending Action Points. Your maximum AP is your [(A + B), / 2]. AP refills at the start of your turn. Unless otherwise noted, all Actions cost 1AP. The only way to take an Action on another turn is to make a Defense roll or Ready an Action.`),
    new Rule(`Prepare`,             `You may spend AP on your turn to declare and hold a specific Action to occur on a later turn to preempt a triggering event that you describe. Prepared Actions resolve before other Actions in the order that they are triggered. You may choose to abandon a Prepared Action at any time. If you are still waiting with a Prepared Action on your next turn, the AP you already spent on the Prepared Action does not refresh, but you can continue holding that Prepared Action.`),
    new Rule(`Movement`,            `Move once per rnd up to your Speed [A + C], or spend 2AP to Run at [Speed x 2]. Spend 1AP to drop Prone or stand up.`),
    new Rule(`Attack`,              `There are MATKs (Melee), and RATKs (Ranged),. Roll [d6 + MATK or RATK] vs Defense (DEF),. Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`),
    new Rule(`Defense`,             `1AP to defend against an ATK with Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`),
    new Rule(`Reflex`,              `[Perception / 2] Default DEF. No roll or AP required.`),
    new Rule(`Health`,              `[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding when you take Wounds = [Health / 2] and you die when you take Wounds = Health.`),
    new Rule(`Bleeding`,            `When you take Wounds = [Health / 2] or more, you begin taking an additional 1DMG per minute. Roll Medicine(First-Aid), vs Wounds to stop Bleeding with a bandage.`),
    new Rule(`Recovery`,            `After a day of rest, roll [C vs total Wounds] to heal 1HP. On a Fail, take 1 DMG from infection.`),
    new Rule(`Damage`,              `Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF), + Weapon DMG]. All Wounds cause Pain penalties.`),
    new Rule(`Damage Reduction`,    `DR reduces DMG. Armor is reduced by -1 DR after taking DMG that exceeds its DR.`),
    new Rule(`Fire`,                `Whenever you take FDMG, 1 Wound is permanent. Only Fire-Resistant (FR), Armor reduces FDMG.`),
    new Rule(`Pain`,                `Wounds (and a few other effects), cause Pain which is a -1 penalty to all rolls and Speed. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if Pain = [C + D].`),
    new Rule(`Vehicles`,            `Roll [Drive(Ram), vs Drive(Stunt),] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`),
    new Rule(`Condition`,           `-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`),
    new Rule(`Occupants`,           `Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`),
    new Rule(`Pedestrians`,         `Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`),
    new Rule(`Tires`,               `Roll [-3 ATK vs Drive(Stunt),] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`),
    new Rule(`Wreck`,               `The vehicle comes to a violent stop suddenly this rnd. Occupants take [d6 DMG per 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the DMG is halved and they remain in their seats.`),
    new Rule(`Burning`,             `If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`)
]