@regression @accessibility
Feature: PAR Accessibility Tests

  Scenario: PAR Accessibility Tests
    Given I am on the Start Page
    And axe is injected
    And page should not have accessibility violations
    And testUserAccount has accepted terms and conditions is set to false
    And I signed in using testUserAccount
    And the page url has terms-conditions
    And page should not have accessibility violations
    When I navigate to the PAR Home Page page
    And page should not have accessibility violations
    And I click on the Apply for a new partnership button
    And I am navigated to the Apply for new partnership page
    Then page should not have accessibility violations
    And I navigate to the Select partnership type page
    And page should not have accessibility violations
    And I click on the Continue button
    And page should not have accessibility violations
    And I select direct as partnership type
    And I click on the Continue button
    And I am navigated to the Partnership application page
    And page should not have accessibility violations
    And I click on the add regulatory function contact link
    And page should not have accessibility violations
