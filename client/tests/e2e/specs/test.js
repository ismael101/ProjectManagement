// https://docs.cypress.io/api/introduction/api.html

describe('Text', () => {
  it('visit home page', () => {
    cy.visit('/')
    cy.contains('Projects')
    cy.contains('Create Project')
  })
  it('visit project page', () => {
    cy.visit('/5e73d3debc10a736df5d0f7a')
    cy.contains('Project Info')
    cy.contains('Name')
    cy.contains('Description')
    cy.contains('Created')
    cy.contains('Due')
    cy.contains('Tasks')
  })
  it('visit project not found', () => {
    cy.visit('/asdas')
    cy.contains('Project Not Found')
  })
  it('visit 404 page', () => {
    cy.visit('/as/da')
    cy.contains('404')
    cy.contains('Page Not Found')
  })
})

describe('Project', () => {
  it('create Project', () => {
    cy.visit('/')
    cy.get('#dialog').click()
    cy.get("[data-test='name']").type("test1");
    cy.get("[data-test='description']").type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    cy.get('#submit').click()
    cy.contains('test1')
    cy.contains('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  })
  it('edit project', () =>  {
    cy.visit('/')
    cy.get('#test1').children('.v-card__actions').children('#edit').children('button').click()
    cy.get("[data-test='name']").clear()
    cy.get("[data-test='name']").type("test2");
    cy.get("[data-test='description']").clear()
    cy.get("[data-test='description']").type("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    cy.get('#save').click()
    cy.contains('test2')
    cy.contains('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
  })
  it('delete project', () => {
    cy.get('#test2').children('.v-card__actions').children('#delete').children('button').click()
    cy.get('#no').click()
    cy.contains('test2')
    cy.contains('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
    cy.get('#test2').children('.v-card__actions').children('#delete').children('button').click()
    cy.get('#yes').click()
    cy.contains('test2').should('not.exist')
    cy.contains('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz').should('not.exist')
  })
})
describe('Task', () => {
  it('go to tasks', () => {
    cy.get('#dialog').click()
    cy.get("[data-test='name']").type("test1");
    cy.get("[data-test='description']").type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    cy.get('#submit').click()
    cy.get('#test1').children('.v-card__actions').children('#link').click()
  })
  it('create task', () => {
    cy.get('#dialog').click()
    cy.get("[data-test='name']").type("task1");
    cy.get("[data-test='description']").type("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    cy.get('#submit').click()
    cy.contains('task1')
    cy.contains('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
  })
  it('delete task', () => {
    cy.get('#task1').children().children('.col').get('#delete').click()
    cy.get('#no').click()
    cy.contains('task1')
    cy.contains('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    cy.get('#task1').children().children('.col').get('#delete').click()
    cy.get('#yes').click()
    cy.contains('task1').should('not.exist')
    cy.contains('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb').should('not.exist')
    cy.visit('/')
    cy.get('#test1').children('.v-card__actions').children('#delete').children('button').click()
    cy.get('#yes').click()
  })
})
