<template>
<div>
    <v-chip v-if='task.complete' outlined color='cyan' small @click='$emit("statusChange", task)'>complete</v-chip>
    <v-chip v-else outlined color='red' small @click='$emit("statusChange", task)'>incomplete</v-chip>
</div>
</template>

<script>
export default {
    props:['task'],
}
</script>

<style>

</style>