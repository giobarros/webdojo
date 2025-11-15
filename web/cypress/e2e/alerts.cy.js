describe('Validações de alertas em JS', ()=> {
    beforeEach(()=> {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem do alerta', ()=> { //cy.on é um listener, vai ficar ouvindo a ação de alerta
        cy.on('window:alert', (msg) => { //O parâmetro msg representa o texto exibido no alerta
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        }) 
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', ()=> {
        cy.on('window:confirm', (msg)=> {
            expect(msg).to.equal('Aperte um botão!')
            return true; //True simula o click no botão OK
        })

        cy.on('window:alert', (msg)=> {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', ()=> {
        cy.on('window:confirm', (msg)=> {
            expect(msg).to.equal('Aperte um botão!')
            return false; //False simula o click no botão Cancelar
        })

        cy.on('window:alert', (msg)=> {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com um prompt', ()=> {
        cy.window().then((win)=> {
            cy.stub(win, 'prompt').returns('Giovanna')
        }) 

        cy.on('window:alert', (msg)=> {
            expect(msg).to.equal('Olá Giovanna! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
        
    })

})