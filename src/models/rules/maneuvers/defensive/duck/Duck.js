import Rule from '../../../rule.js'

export const Duck = new Rule(
    `Duck`, 
    `Roll [Dodge vs ATK] to move up to your Speed to get behind Cover. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`
)