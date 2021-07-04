describe("Form - testing", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3001/");
    });
    it("add text to text box", ()=>{
        cy.get('[data-cy="button"]').click();
        cy.get('[data-cy="special_instructions"]').type("pizza");
        cy.get('[data-cy="toppings"]').check().should("be.checked");
        cy.get("[data-cy=submit]").click();
    });
    
})