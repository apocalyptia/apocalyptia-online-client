<script context='module'>
	export function preload(page) {
		return { slug: page.params.slug }
	}
</script>


<script>
	import * as sapper from '@sapper/app'
	import Capitalize from '../../components/helpers/Capitalize'
	import RefList from '../../components/views/ui/reference/RefList.svelte'
	import { refToC } from '../../stores'

	export let slug
</script>


<div class='ref-page'>
	<div class='ref-header'>{Capitalize(slug)} Rules</div>
	<RefList list={$refToC.modules[$refToC.chapters.indexOf(Capitalize(slug))]} />
</div>