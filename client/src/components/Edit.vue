<template>
<div id='edit'>
     <v-tooltip right>
      <template v-slot:activator="{ on }">
          <v-icon @click='dialog = !dialog' v-on="on" color="teal accent-3">
            mdi-pencil-outline
        </v-icon>
      </template>
      <span>Edit</span>
    </v-tooltip>
    <v-dialog v-model="dialog" width='500' color="blue-grey darken-4">
        <v-card class="py-3 px-3" color="blue-grey darken-4" dark>
            <v-card-title>
            <span>Edit Project</span>
            </v-card-title>
            <v-card-text>
            <v-form   
            ref="form"
            v-model="valid"
            :lazy-validation="lazy">
                <v-text-field outlined label='Name' v-model="name" required :counter="10" :rules="nameRules" data-test='name'/>
                <v-textarea outlined label="Description" v-model="description" :counter='30' :rules="descriptionRules" data-test='description'/>
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
            <v-btn color='red' @click='cancel'>
                Cancel
            </v-btn>
            <v-btn color='cyan' @click='save' :disabled="!valid" id="save">
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
props:['object'],
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
        description:'',
        descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 30) || 'Description must be at least 30 characters',
        ],
        lazy: false,
        due:''
    }
},
methods:{
    save(){
        this.$emit('editObject', {_id:this.object._id,name:this.name,description:this.description,due:this.due})
        this.dialog = false
        this.name = this.object.name
        this.description = this.object.description
        this.due = this.object.due.substring(0,10)
    },
    cancel(){
        this.$refs.form.resetValidation()
        this.dialog = false
        this.name = this.object.name
        this.description = this.object.description
        this.due = this.object.due.substring(0,10)
    }
},
mounted(){
    this.name = this.object.name
    this.description = this.object.description
    this.due = this.object.due.substring(0,10)
}
}
</script>

<style>
</style>