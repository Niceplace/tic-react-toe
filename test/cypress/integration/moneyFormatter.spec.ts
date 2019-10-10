describe('Money formatting', () => {
  it('Should successfully format money', () => {
    cy.visit('/')
      .get('[data-automation-id="input-to-format"]')
      .type('-123')
      .get('[data-automation-id="submit-format"]')
      .click()
      .get('[data-automation-id="formatted-amount"]')
      .should('contain', '-123.00$');
  });

  it('Should successfully format money', () => {
    cy.visit('/')
      .get('[data-automation-id="input-to-format"]')
      .type('mymilkshakes')
      .get('[data-automation-id="submit-format"]')
      .click()
      .get('[data-automation-id="error-section"]')
      .should(
        'contain',
        ' Invalid input specified, expecting integer or floating point number',
      );
  });
});
