<script>

	export default {
		name: 'DebugInfo',
		props: {
			message: {
				type: String,
				required: true,
			},
		},
	}

</script>



<template>
	<div class="debug-info">
		{{ message }}
	</div>
</template>



<style scoped>

	.debug-info {
	z-index: 1000;
	position: fixed;
	bottom: 20px;
	right: 20px;
	background-color: orange;
	color: black;
	font-weight: bold;
	padding: 10px;
	border-radius: 10px;
	}

</style>
