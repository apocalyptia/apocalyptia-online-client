import Rule from './Rule.js' 

export default class Skill extends Rule {
	constructor({
		desc=[],
		diff=null,
		name=``,
		parent=``,
		specs={},
		type=`Skill`,
		visible=false
	}) {
		super({
			desc,
			name,
			type,
			visible,
		})
		this.desc = desc
		this.diff = diff
		this.name = name
		this.parent = parent
		this.specs = specs
		this.type = type
		this.visible = visible
	}
}