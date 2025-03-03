@regression @ui
Feature: Apply For Partnership

  Scenario: Validate Apply For Partnership Page Content
    Given I am on the Start Page
    And I can read all information on the page
      | page       | content          |
      | StartPage  | startPage.json   |
    And the page main header is Primary Authority Register
    When I navigate to the PAR Home Page page
    And I click on the Apply for a partnership button
    And I am navigated to the Apply for new partnership page
    Then I can read all information on the page
      | page                    | content                  |
      | ApplyForPartnershipPage | applyForPartnership.json |
    And I click on the Start button
    And the page main header is Confirm agreement to apply for partnership
    And I can read all information on the page
      | page                 | content               |
      | ConfirmAgreementPage | confirmAgreement.json |
