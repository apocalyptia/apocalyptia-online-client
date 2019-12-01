import Rule from '../../rule.js'

export const Tires = new Rule(
    `Tires`, 
    `Roll [-3 ATK vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`
)