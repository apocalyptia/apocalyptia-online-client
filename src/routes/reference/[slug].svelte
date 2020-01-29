<script type='module'>
	import * as sapper from '@sapper/app'
	import { capitalize } from '../../helpers/Capitalize'
	import RefList from '../../components/ui/reference/RefList.svelte'
	import { refToC } from '../../stores'

	const { page } = sapper.stores()

	const { slug } = $page.params

	const chapterName = capitalize(slug)

	const chapterList = `${chapterName}`
</script>

<div class='ref-page'>
	<div class='ref-header'>{chapterName} Rules</div>
	<RefList list={$refToC.modules[$refToC.current]} />
</div>