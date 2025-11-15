describe('CEP', ()=> {

    beforeEach(()=> {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar a consulta de CEP', ()=> {
        cy.intercept('GET', 'https://viacep.com.br/ws/04534011/json/', { //Intercepta a requisição GET para o ViaCEP (não deixa ir para a internet)
            statusCode: 200, //Retorna sucesso (HTTP 200)
            body: { //Corpo da resposta falsa (dados simulados do CEP)
                cep: "04534011",
                logradouro: "Rua Joaquim Floriano",
                bairro: "Itaim Bibi",
                localidade: "São Paulo",
                uf: "SP"
            }
        }).as('getCep') //Dá o nome "getCep" para essa interceptação

        cy.get('#cep').type('04534011')
        cy.contains('button', 'Buscar').click()

        cy.wait('@getCep') //Espera a requisição simulada acontecer antes de continuar o teste

        cy.get('#street')
            .should('have.value', 'Rua Joaquim Floriano')
        
        cy.get('#neighborhood')
            .should('have.value', 'Itaim Bibi')

        cy.get('#city')
            .should('have.value', 'São Paulo')

        cy.get('#state')
            .should('have.value', 'SP')
    })
})