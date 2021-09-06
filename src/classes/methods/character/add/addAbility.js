export default function(ability) {
	if (ability) {
		this.abilities.push(ability)
		this.updateProperties()
	}
	return this
	// TODO: Ability formulas need work...
	// for (const a in this.abilities) {
	// 	if (a.formula) a.formula()
	// }
}