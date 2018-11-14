describe('Index Integration Test', function() {
    beforeEach(function(){
      cy.visit('/src/index.html')
    })
    it('is title "Document"', function() {
      cy.title().should('eq', 'Document')
      
    })
  })