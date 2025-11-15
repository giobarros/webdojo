describe('iFrame', ()=> {
    
    it('Deve ser possível clicar no vídeo', ()=> {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('button', 'Video').click()

        cy.wait(3000)

        cy.get('iframe[title="Video Player"]')  //o . significa que vai buscar o elemento por classe
            .should('exist')
            .its('0.contentDocument.body') //obter conteudo da pagina que e exibida dentro do iframe
            // its - função usada para obter propriedade de elementos, objetos ao testar API, propriedade de janela, cookies, iframe
            .then(cy.wrap) //obter valor de um objeto, array, elemento que esta dentro de uma pagina html e transforma em um objeto cypress
            .as('iFramePlayer') //funcao as nomeia algo

        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')

    })
})