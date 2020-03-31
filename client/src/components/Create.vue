<template>
    <div>
        <v-btn v-if="type == 'task'" color='deep-purple accent-4' dark @click="dialog = !dialog">
            Create Task
        </v-btn>
        <v-btn v-else-if="type == 'project'" outlined color='white' block @click="dialog = !dialog">
            Create Project
        </v-btn>
         <v-dialog v-model="dialog" width='500'>
        <v-card class="py-3 px-3">
            <v-card-title>
                <span v-if="type == 'task'">Create Task</span>
                <span v-if="type == 'project'">Create Project</span>
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
                    :return-value.sync="due"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="due"
                        label="Picker in menu"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="due" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(due)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-form>
            </v-card-text>
            <v-card-actions class="text-right">
                <v-btn outlined color='red' @click="cancel">
                    Cancel
                </v-btn>
            <v-btn v-if="type == 'task'" outlined color='cyan' @click="submit">
                Create Task
            </v-btn>
            <v-btn v-else-if="type == 'project'" outlined color='cyan' @click="submit">
                Create Project
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>   
</template>

<script>
export default {
    name:'Create',
    props:['type'],
    data(){
        return{
            dialog:false,
            menu:false,
            name:'',
            description:"",
            due: new Date().toISOString().substr(0, 10),
        }
    },
    methods:{
        cancel(){
            this.name = ''
            this.description = ''
            this.due = new Date().toISOString().substr(0, 10),
            this.dialog = false
        },
        submit(){
            this.$emit('createObject',{name:this.name,description:this.description,due:this.due})
            this.name = ''
            this.description = ''
            this.due = new Date().toISOString().substr(0, 10),
            this.dialog = false
        }
    }
}
</script>

<style>

</style>