import Rule from '../Rule'
import CalledShotTable from './CalledShotTable.svelte'

export const CalledShot = new Rule(
    `Called Shot`, 
    `ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`,
    [],
    CalledShotTable
)