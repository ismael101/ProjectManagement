import Delete from '../../src/components/Delete.vue'
import Error from '../../src/components/Error.vue'
import Progress  from '../../src/components/Progress.vue'
import Project from '../../src/components/Project.vue'
import Status from '../../src/components/Status.vue'
import Task from '../../src/components/Task.vue'
import Create from '../../src/components/Create.vue'
import {shallowMount,mount} from '@vue/test-utils'
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router'
import sinon from 'sinon'

Vue.use(Vuetify);
Vue.use(VueRouter)

describe('Delete.vue', () => {
  const wrapper = mount(Delete,{propsData:{name:"object"}})
  it('opens overlay', async() => {
    expect(wrapper.vm.overlay).toBeFalsy()
    await wrapper.find('#open').trigger('click')
    expect(wrapper.vm.overlay).toBeTruthy()
    expect(wrapper.html()).toContain('h2')
  })
  it('closes overlay', async() => {
    await wrapper.find('#no').trigger('click')
    expect(wrapper.vm.overlay).toBeFalsy()
  })
  it('deleteObject methods', async() => {
    const deleteObject = sinon.stub()
    wrapper.setMethods({deleteObject:deleteObject})
    await wrapper.find('#open').trigger('click')
    await wrapper.find('#delete').trigger('click')
    expect(deleteObject.called).toBeTruthy()
  })
})

describe('Error.vue', () => {
  const wrapper = mount(Error, {propsData:{error:'404', message:'Not Found'}})
  it('renders text', () => {
    expect(wrapper.find('h1').text()).toEqual('404')
    expect(wrapper.find('h2').text()).toEqual('Not Found')
  })
})

describe('Progress.vue', () => {
  const wrapper = mount(Progress, {propsData:{project:{tasks:[{complete:true},{complete:false}]}}})
  it('renders progress', () => {
    expect(wrapper.vm.progress).toEqual(50)
  })
})

describe('Project.vue', () => {
  let project = {name:"aaaa", description:"bbbb",createdAt:'2020-04-04T17:32:06.315Z',due:'2020-04-04T17:32:06.315Z',complete:true,tasks:[{name:'task1'}]}
  const wrapper = shallowMount(Project, {propsData:{project:project}})
  it('renders text', () => {
    expect(wrapper.find('#name').text()).toEqual(project.name)
    expect(wrapper.find('#status').text()).toEqual('complete')
    expect(wrapper.find('#description').text()).toEqual(project.description),
    expect(wrapper.find('#created').text()).toEqual(project.createdAt.substring(0,10))
    expect(wrapper.find('#due').text()).toEqual(project.due.substring(0,10))
    expect(wrapper.find('#task').text()).toEqual('1')
  })
})

describe('Status.vue', () => {
  const wrapper = mount(Status,{propsData:{task:{complete:true}}})
  it('renders text', () => {
      expect(wrapper.find('#status').text()).toEqual('complete')  
  })
  it('emits event', () => {
    wrapper.find('#status').trigger('click')
    expect(wrapper.emitted().statusChange).toBeTruthy()
  })
})

describe('Task.vue', () => {
  let task = {name:'aaaa', description:'aaaasde', due:'asaxasxasxasxasxaxasx'}
  const wrapper = mount(Task,{propsData:{task:task}})
  it('renders text', () => {
    expect(wrapper.find('#name').text()).toEqual(task.name)
    expect(wrapper.find('#description').text()).toEqual(task.description)
    expect(wrapper.find('#due').text()).toEqual(task.due.substring(0,10))
  })
})

describe('Create.vue', () => {
  const wrapper = mount(Create, {propsData:{type:'project'}})
  it('renders text', async() => {
    expect(wrapper.html()).toContain('Create Project')
  })
})