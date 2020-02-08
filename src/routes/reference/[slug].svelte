<script type='module'>
	import * as sapper from '@sapper/app'
	import Capitalize from '../../components/helpers/Capitalize'
	import RefList from '../../components/views/ui/reference/RefList.svelte'
	import { refToC } from '../../stores'

	const { page } = sapper.stores()

	const { slug } = $page.params
</script>

<div class='ref-page'>
	<div class='ref-header'>{Capitalize(slug)} Rules</div>
	<RefList list={$refToC.modules[$refToC.current]} />
</div>