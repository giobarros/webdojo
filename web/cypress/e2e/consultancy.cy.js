describe('Formulario de Consultoria', ()=> {

    beforeEach(()=> {   //repete um conjunto de steps para todos os testes que estao dentro do describe
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.fixture('consultancy').as('consultancyData')
    })
    
    it('Deve solicitar consultoria individual', function() { //precisa usar o function pq logo abaixo usamos o this e ele so funciona assim

       const consultancyForm = this.consultancyData.personal //this vai fazer o acesso da função externa (fixture)

        cy.get('#name').type(consultancyForm.name)
        cy.get('#email').type(consultancyForm.email) //pode usar o placeholder tbm,ex: cy.get('input[placeholder="Digite seu email"]').type('xxx')
        //placeholder pode ser utilizado quando ha mais de um id com o mesmo nome
        cy.get('input[placeholder="(00) 00000-0000"]') //se tiver id, pode usar tambem
            .type(consultancyForm.phone)
            //.should('have.value', '(11) 99999-1234')
        
        cy.get('#consultancyType').select(consultancyForm.consultancyType) //se nao tivesse, usaria: cy.contains('label', 'Tipo de Consultoria').parent().find('select').select('Individual')
       
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click() //ao invés de click poder usar check()
            .should('be.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(consultancyForm.document)
            //.should('have.value', '698.720.433-20') // ou pode usar cy.get('input[placeholder="000.000.000-00"]').type(69872043320).should('have.value', '698.720.433-20')

        consultancyForm.channels.forEach((c)=> {
            cy.contains('label', c)
                .find('input')
                .check() //ao invés de check poder usar click()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, {force: true})

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        consultancyForm.tec.forEach((t)=> {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(t)
                .type('{enter}') //para clicar na tecla enter
            
            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', t)
                .should('be.visible')
        })

        if (consultancyForm.terms === true){
             cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
       
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', {timeout: 7000})
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')        
    })

    it('Deve solicitar consultoria In company', function() {

        const consultancyForm = this.consultancyData.company

        cy.get('#name').type(consultancyForm.name)
        cy.get('#email').type(consultancyForm.email) //pode usar o placeholder tbm,ex: cy.get('input[placeholder="Digite seu email"]').type('xxx')
        //placeholder pode ser utilizado quando ha mais de um id com o mesmo nome
        cy.get('input[placeholder="(00) 00000-0000"]') //se tiver id, pode usar tambem
            .type(consultancyForm.phone)
            //.should('have.value', '(11) 99999-1234')
        
        cy.get('#consultancyType').select(consultancyForm.consultancyType) //se nao tivesse, usaria: cy.contains('label', 'Tipo de Consultoria').parent().find('select').select('Individual')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(consultancyForm.document)
            //.should('have.value', '698.720.433-20') // ou pode usar cy.get('input[placeholder="000.000.000-00"]').type(69872043320).should('have.value', '698.720.433-20')

        consultancyForm.channels.forEach((c)=> {
            cy.contains('label', c)
                .find('input')
                .check() //ao invés de check poder usar click()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, {force: true})

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        consultancyForm.tec.forEach((t)=> {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(t)
                .type('{enter}') //para clicar na tecla enter
            
            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', t)
                .should('be.visible')
        })

        if (consultancyForm.terms === true){
             cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
       
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', {timeout: 7000})
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')        
    })

    it.only('Deve verificar os campos obrigatórios', ()=> {
        cy.contains('button', 'Enviar formulário')
            .click()

        const requiredFields = [
            {label: 'Nome Completo', message: 'Campo obrigatório'},
            {label: 'Email', message: 'Campo obrigatório'},
            {label: 'termos de uso', message: 'Você precisa aceitar os termos de uso'},
        ]

        requiredFields.forEach(({label, message})=> {
            cy.contains('label', label)
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', message)
            .and('have.class','text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })
})