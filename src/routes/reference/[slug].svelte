<script context='module'>
export function preload(page) {
	return { slug: page.params.slug }
}
</script>


<script>
import * as sapper from '@sapper/app'
import Capitalize from '../../components/functions/Capitalize'
import RefList from '../../components/views/reference/RefList.svelte'
import { refToC } from '../../stores'

export let slug
</script>


<h1>{Capitalize(slug)}</h1>
<RefList list={$refToC.modules[$refToC.chapters.indexOf(Capitalize(slug))]} />