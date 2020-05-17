<script>
export let character
</script>


<div class='body-locations-section'>
	<div class='left-column'>
		<div class='left-arm-label'>
			<div class='location-name'>
				{$character.health.leftArm.name} Health
			</div>
			<div class='location-numbers'>
				<input type='number'
					bind:value='{$character.health.leftArm.current}'
					min='-{$character.health.leftArm.score}'
					max='{$character.health.leftArm.score}'
				/>/
				{$character.health.leftArm.score}
			</div>
		</div>
		<div class='left-leg-label'>
			<div class='location-name'>
				{$character.health.leftLeg.name} Health
			</div>
			<div class='location-numbers'>
				<input type='number'
					bind:value='{$character.health.leftLeg.current}'
					min='-{$character.health.leftLeg.score}'
					max='{$character.health.leftLeg.score}'
				/>/
				{$character.health.leftLeg.score}
			</div>
		</div>
	</div>
	<div class='center-column'>
		<div class='head-label'>
			<div class='location-name'>
				{$character.health.head.name} Health
			</div>
			<div class='location-numbers'>
				<input type='number'
					bind:value='{$character.health.head.current}'
					min='-{$character.health.head.score}'
					max='{$character.health.head.score}'
				/>/
				{$character.health.head.score}
			</div>
		</div>
		<div class='head-level'>
			<div class='head location' />
		</div>
		<div class='torso-level'>
			<div class='left-arm arm location' />
			<div class='torso location'>
				<div class='torso-label'>
					<div class='location-name'>
						{$character.health.torso.name} Health
					</div>
					<div class='location-numbers'>
						<input type='number'
							bind:value='{$character.health.torso.current}'
							min='-{$character.health.torso.score}'
							max='{$character.health.torso.score}'
						/>/
						{$character.health.torso.score}
					</div>
				</div>
			</div>
			<div class='right-arm arm location' />
		</div>
		<div class='legs-level'>
			<div class='left-leg leg location' />
			<div class='right-leg leg location' />
		</div>
	</div>
	<div class='right-column'>
		<div class='right-arm-label'>
			<div class='location-name'>
				{$character.health.rightArm.name} Health
			</div>
			<div class='location-numbers'>
				<input type='number'
					bind:value='{$character.health.rightArm.current}'
					min='-{$character.health.rightArm.score}'
					max='{$character.health.rightArm.score}'
				/>/
				{$character.health.rightArm.score}
			</div>
		</div>
		<div class='right-leg-label'>
			<div class='location-name'>
				{$character.health.rightLeg.name} Health
			</div>
			<div class='location-numbers'>
				<input type='number'
					bind:value='{$character.health.rightLeg.current}'
					min='-{$character.health.rightLeg.score}'
					max='{$character.health.rightLeg.score}'
				/>/
				{$character.health.rightLeg.score}
			</div>
		</div>
	</div>
</div>


<style>
input[type='number'] {
	width: var(--s200);
}

.body-locations-section {
	display: flex;
	max-width: 100%;
}

div[class*=column] {
	display: block;
	height: 100%;
}
.center-column {
	margin-top: 10px;
	text-align: center;
	width: 100%;
}

div[class*=-label] {
	display: inline-block;
	height: 10px;
	text-align: center;
	width: 100%;
	position: relative;
}
.head-label {
	left: 50%;
	transform: translate(-50%, -50%);
}
.right-arm-label {
	top: 140px;
}
.left-arm-label {
	top: 140px;
}
.torso-label {
	color: rgba(15, 30, 15, 1);
	left: 50%;
	top: 50px;
	transform: translate(-50%, -50%);
}
.left-leg-label {
	top: 250px;
}
.right-leg-label {
	top: 250px;
}

.location {
	background-color: lime;
}
.location-numbers {
	margin: 5px;
}
div[class*=level] {
	display: flex;
	justify-content: center;
}
.head {
	border-radius: 50%;
	border: 1px;
	height: 50px;
	margin-bottom: 5px;
	width: 50px;
}
.arm {
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	height: 140px;
	width: 20px;
}
.left-arm {
	border-top-left-radius: 30px;
}
.right-arm {
	border-top-right-radius: 30px;
}
.torso {
	color: rgba(15, 30, 15, 1);
	height: 150px;
	margin: 0 5px;
	width: 70px;
	text-align: center;
}
.leg {
	border-bottom-right-radius: 15px;
	border-bottom-left-radius: 15px;
	height: 160px;
	width: 28px;
}
.left-leg {
	margin-right: 14px;
}
</style>