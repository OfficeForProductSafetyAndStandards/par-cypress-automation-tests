@regression @ui
Feature: Apply For Partnership

  Scenario: Validate Apply For Partnership Page Content
    Given I am on Start Page
    And the page main header is Primary Authority Register
    When I navigate to the PAR Home Page page
    And I click on the Apply for a partnership button
    And I am navigated to the Apply for new partnership page
    Then I can read all information on the page
      | content                  |
      | applyForPartnership.json |
