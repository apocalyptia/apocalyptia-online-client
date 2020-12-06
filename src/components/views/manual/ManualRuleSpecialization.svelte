<script>
    export let rule

    console.log(rule)
</script>


<ul>
    {#each Object.values(rule.specs) as spec}
        <li>
            <div class='sub-name'>{spec.name}</div>
            {#each spec.desc as desc}
                <p class='spec-desc'>{desc}</p>
            {/each}
        </li>
    {/each}
</ul>


<style>
    li {
		margin: var(--s100);
    }
    .spec-desc {
		margin-left: var(--s100);
	}
</style>