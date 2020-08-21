<script>
	import { metatags, Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";

	metatags.title = 'Apocalyptia Online'
	metatags.description = 'Apocalyptia Online is a virtual tabletop role-playing game about surviving together after the world as we know it has come to an end.'
</script>


<Router {routes} />


<style  global>
	@import "../static/global.css";
</style>