import Rule from '../Rule'
import CoverTable from './CoverTable.svelte'

export const Cover = new Rule(
    `Cover`, 
    `You can lean in and out of Cover to ATK as part of your action. All Cover except Glass makes you Concealed. If an opponent Waits until you lean out of Cover, they must make a Called Shot to hit an exposed Location. All DMG is negated against targets that are behind Cover if the Material DR is >= the weapon’s base DMG. If weapon DMG exceeds the Material DR, the Material DR acts as an Armor bonus for DMG reduction.`,
    [],
    CoverTable
)