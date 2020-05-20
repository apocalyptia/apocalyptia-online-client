export default class Table {
	constructor({
		name=``,
		headers=[],
		contents=[]
	}) {
		this.name = name
		this.headers = headers
		this.contents = contents
	}
}