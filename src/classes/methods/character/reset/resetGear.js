export default function() {
	for (const g in this.gear) {
		this.gear[g].inventory = []
	}
}