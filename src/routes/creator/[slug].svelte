<script context='module'>
export function preload(page) {
	return { slug: page.params.slug }
}
</script>

<script>
import { beforeUpdate } from 'svelte'
import creatorStore from '../../stores/creatorStore'
import Wizard from '../../components/views/ui/Wizard.svelte'

export let slug

beforeUpdate(() => {
	$creatorStore.translate(slug)
	$creatorStore = $creatorStore
})
</script>

<h1>{slug}</h1>
<Wizard/>