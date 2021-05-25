import Rule from './Rule.js' 

export default class Specialty extends Rule {
	constructor({
		desc=[],
		diff=null,
		name=``,
		type=`Specialty`,
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
		this.type = type
		this.visible = visible
	}
}