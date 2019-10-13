import { getGreeting } from '../support/app.po';

describe('senstate', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to senstate!');
  });
});
