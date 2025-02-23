@regression @accessibility
Feature: Accessibility Tests


  Scenario: Run Accessibility Tests
    Given axe is injected and I visit TIMZTOS SOLUTIONS
    When I navigate to the explore-solutions page
    Then page should not have accessibility violations

