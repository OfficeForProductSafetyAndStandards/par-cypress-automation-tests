@regression @accessibility
Feature: PAR Accessibility Tests

  Scenario: PAR Accessibility Tests
    Given I am on the Start Page
    And axe is injected
    And page should not have accessibility violations
    And I signed in using testUserAccount
    When I navigate to the PAR Home Page page
    And page should not have accessibility violations
    And I click on the Apply for a partnership button
    And I am navigated to the Apply for new partnership page
    And page should not have accessibility violations
