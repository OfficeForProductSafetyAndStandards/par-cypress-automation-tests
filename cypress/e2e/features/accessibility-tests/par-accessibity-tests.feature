@regression @accessibility
Feature: PAR Accessibility Tests

  Scenario: PAR Accessibility Tests

    Given I am on the Start Page
    And axe is injected
    And page should not have accessibility violations
    When I navigate to the PAR Home Page page
    And page should not have accessibility violations
    When I click on the Apply for a partnership button
    Then page should not have accessibility violations
    And I click on the Start button
    And page should not have accessibility violations

