export default function() {
	for (const d in this.description) {
		if (this.description[d].name !== `Player`) {
			this.description[d].value = ``
		}
	}
}