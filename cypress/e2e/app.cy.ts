describe('App component test', () => {
  const treatmentsUrl = `https://my-json-server.typicode.com/team-carepay/carepay-front-end-assignment-SamNjubi/treatments`;

  it('should create the app', () => {
    cy.visit('/');
    cy.contains('Carepay assignment');
  });
  it('should route to treatment page', () => {
    cy.visit('/treatments');
    cy.url().should('contain', 'treatments');
  });
  it('should fetch treatments from api', () => {
    cy.request(treatmentsUrl).then(treatments => {
      expect(treatments.status).to.eq(200);
      assert.isArray(treatments.body, 'Treatments Response is an array');
    });
  });
  it('should search for an illegitimate value and a response should be viewed below the search input', () => {
    const searchValue = 'AA131';
    cy.get('input[name=search]').type(searchValue);
    cy.get('.search-error').should(
      'have.text',
      ' A proper code is required containing atleast 3 similar characters '
    );
  });
  it('should search for an legitimate value and a new api call is to be implemented to filter the results', () => {
    const searchValue = 'AAA131';
    cy.get('input[name=search]').clear();
    cy.get('input[name=search]').type(searchValue);
    cy.url().should('contain', '?treatmentCode=AAA131');
    cy.request(treatmentsUrl).then(treatments => {
      expect(treatments.status).to.eq(200);
      assert.isArray(treatments.body, 'Treatments Response is an array');
    });
  });
  it('should load all treatments on clearing of search value or empty search value', () => {
    cy.get('input[name=search]').clear();
    cy.url().should('not.contain', '?treatmentCode=AAA131');
    cy.request(treatmentsUrl).then(treatments => {
      expect(treatments.status).to.eq(200);
      assert.isArray(treatments.body, 'Treatments Response is an array');
    });
  });
});
