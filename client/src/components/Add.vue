<template>
<div>
    <v-btn color='deep-purple accent-4' dark @click="dialog = !dialog">
    Add Task
    </v-btn>
    <v-dialog v-model="dialog" width='500'>
        <v-card class="py-3 px-3">
            <v-card-title>
                <span>Create Task</span>
            </v-card-title>
            <v-card-text>
                <v-form ref='form'>
                    <v-text-field outlined label='Name'>
                    </v-text-field>
                    <v-textarea
                    outlined
                    name="input-7-4"
                    label="Description"
                    ></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions class="text-right">
                <v-btn outlined color='red'>
                    Cancel
                </v-btn>
            <v-btn outlined color='cyan'>
                Create Task
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false
        }
    }
}
</script>

<style>

</style>