describe('Kanban Board', ()=> {

    it('Deve mover uma tarefa de To Do para Done e atualizar o board', ()=> {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('button', 'Kanban').click()

        const dataTransfer = new DataTransfer()  //objeto nativo do JS, serve pra transferir um elemento html para outra sessão/elemento do html

        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', {dataTransfer}) //vai simular o click e o arrastar, tudo oq esta dentro do () são coisas de JS

        cy.get('.column-done')
            .trigger('drop', {dataTransfer})
            .find('h3')
            .should('have.text', 'Done (4)') //Verifica se o elemento tem exatamente aquele texto.
            
        cy.get('.column-done') 
            .should('include.text', 'Documentar API') //Verifica se o texto do elemento contém o valor informado (não precisa ser exato)
            .and('include.text', 'Criar documentação da API com Swagger')
    })

})