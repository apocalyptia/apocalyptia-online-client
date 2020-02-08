<script type='module'>
	import * as sapper from '@sapper/app'
	import Capitalize from '../../components/helpers/Capitalize'
	import RefList from '../../components/views/ui/reference/RefList.svelte'
	// import { narToC } from '../../stores'

	export let slug
</script>


<div class='ref-page'>
	<div class='ref-header'>{Capitalize(slug)}</div>
	<!-- <RefList list={$refToC.modules[$refToC.chapters.indexOf(Capitalize(slug))]} /> -->
</div>