<template>
  <div>
<v-btn outlined color="white" @click="dialog = !dialog" block>
    Create Project
</v-btn>
    <v-dialog v-model="dialog" width='500'>
        <v-card class="py-3 px-3">
            <v-card-title>
            <span>Create Project</span>
            </v-card-title>
            <v-card-text>
            <v-form ref='form'>
                <v-text-field outlined label='Name' v-model="name">
                </v-text-field>
                <v-textarea
                outlined
                name="input-7-4"
                label="Description"
                v-model="description"
                ></v-textarea>
                <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="due"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker v-model="due" no-title @input="menu = false"></v-date-picker>
            </v-menu>
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
    name:'Create',
    data(){
        return{
            dialog:false,
            menu:false,
            name:"",
            description:"",
            due:"",
        }
    }
}
</script>

<style>

</style>