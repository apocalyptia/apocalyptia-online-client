<script context='module'>
export function preload(page) {
	return { slug: page.params.slug }
}
</script>


<script>
import { beforeUpdate } from 'svelte'
import referenceStore from '../../stores/referenceStore'
import RefPage from '../../components/views/reference/RefPage.svelte'
import ContentMenu from '../../components/views/ui/ContentMenu.svelte'

export let slug

beforeUpdate(() => {
	$referenceStore.translate(slug)
	$referenceStore = $referenceStore
})
</script>


{#if $referenceStore.currentIndex}
	<RefPage chapter={$referenceStore.pages[$referenceStore.currentIndex]}/>
{:else}
	<ContentMenu ToC={referenceStore}/>
{/if}