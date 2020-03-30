<template>
<div>
    <div v-if="type == 'task'">
        <v-btn color='deep-purple accent-4' dark @click="dialog = !dialog">
            Create Task
        </v-btn>
         <v-dialog v-model="dialog" width='500'>
        <v-card class="py-3 px-3">
            <v-card-title>
                <span>Create Task</span>
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
                <v-btn outlined color='red' @click="dialog = !dialog">
                    Cancel
                </v-btn>
            <v-btn outlined color='cyan' @click="dialog = !dialog">
                Create Task
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
    <div v-else-if="type == 'project'">
        <v-btn color='white' outlined block @click="dialog = !dialog">
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
                <v-btn outlined color='red' @click="dialog = !dialog">
                    Cancel
                </v-btn>
            <v-btn outlined color='cyan' @click="dialog = !dialog">
                Create Project
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
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
    }
}
</script>

<style>

</style>