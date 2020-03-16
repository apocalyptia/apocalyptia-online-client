import Rule from '../classes/Rule'
import CoverTable from '../views/tables/CoverTable.svelte'


const Cover = new Rule({
	name: `Cover`, 
	description: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Damage Resistance, in which case the Material Damage Resistance acts as an Armor bonus for Damage reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`If an opponent Attacks simultaneously when you Attack from Cover, they must make a Called Shot to hit an exposed Location.`,
	]
})
Cover.table = CoverTable
export { Cover }

export const FriendlyFire = new Rule({
	name: `Friendly Fire`, 
	description: [
		`-3 Ranged against targets within 1yd of your ally.`,
		`If the Ranged Attack Fails, re-roll the Ranged Attack vs the ally’s Reflexive Dodge.`,
	]
})

export const Range = new Rule({
	name: `Range`, 
	description: [
		`Ranged Attacks take a -1 penalty per additional Range increment.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	]
})

export const Visibility = new Rule({
	name: `Visibility`, 
	description: [
		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`,
	]
})


export default {
	name: `Complications`,
	list: [
		Cover,
		FriendlyFire,
		Range,
		Visibility,
	]
}