<template>
    <div>
        <v-btn type="button" v-if="type == 'task'" color='teal accent-3' outlined @click="dialog = !dialog" id="dialog">
            Create Task
        </v-btn>
        <v-btn type="button" v-else-if="type == 'project'" color="teal accent-3" outlined @click="dialog = !dialog" id="dialog">
            Create Project
        </v-btn>
         <v-dialog v-model="dialog" width='500' color="blue-grey darken-4">
        <v-card class="py-3 px-3" color="blue-grey darken-4" dark>
            <v-card-title>
                <span v-if="type == 'task'">Create Task</span>
                <span v-if="type == 'project'">Create Project</span>
            </v-card-title>
            <v-card-text>
                <v-form 
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                >
                    <v-text-field type="input" outlined label='Name' v-model="name" :counter="10" :rules="nameRules" required data-test="name"/>
                    <v-textarea type="input" outlined label="Description" v-model="description" :counter='30' :rules="descriptionRules" required data-test="description"/>
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
                <v-btn color='red' @click="cancel" id="cancel">
                    Cancel
                </v-btn>
            <v-btn v-if="type == 'task'" color='cyan' @click="submit" :disabled="!valid" id='submit'>
                Create Task
            </v-btn>
            <v-btn v-else-if="type == 'project'" color='cyan' @click="submit" :disabled="!valid" id='submit'>
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
            valid:true,
            dialog:false,
            menu:false,
            name:'',
            nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            description:"",
            descriptionRules: [
            v => !!v || 'Description is required',
            v => (v && v.length >= 30) || 'Description must be at least 30 characters',
            ],
            due: new Date().toISOString().substr(0, 10),
            lazy:false
        }
    },
    methods:{
        cancel(){
            this.$refs.form.resetValidation()
            this.name = ''
            this.description = ''
            this.due = new Date().toISOString().substr(0, 10),
            this.dialog = false
        },
        submit(){
            this.$refs.form.resetValidation()
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