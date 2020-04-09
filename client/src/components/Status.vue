<template>
<div>
    <v-chip v-if='task.complete' color='cyan' small @click='$emit("statusChange", task)' id="status">complete</v-chip>
    <v-chip v-else color='red' small @click='$emit("statusChange", task)' id="status">incomplete</v-chip>
</div>
</template>

<script>
export default {
    props:['task'],
}
</script>

<style>
</style>