export async function load({ params }) {

	return {
		chapter: params.chapter,
		section: params.section,
		item: params.item
	}

}