export default class Table {
	constructor({
		name=``,
		headers=[],
		contents=[],
		widths=[]
	}) {
		this.name = name
		this.headers = headers
		this.contents = contents
		this.widths = widths
	}
}