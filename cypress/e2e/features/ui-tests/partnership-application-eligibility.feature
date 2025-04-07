@regression @ui
Feature: Partnership Application Eligibility and T&C Compliance

  Scenario: Verify user acceptance of T&Cs an eligibility before partnership application
    Given I am on the Start Page
    And has accepted terms and conditions is set to false
    And I can read all information on the page
      | page      | content        |
      | StartPage | startPage.json |
    And the page main header is Primary Authority Register
    And I signed in using testUserAccount
    And the page url has terms-conditions
    And I have confirmed the acceptance of T&Cs and save and continue
    And Primary Authority Register page is displayed
    And I can read all information on the page
      | page     | content       |
      | HomePage | homePage.json |
    And I click on the Apply for a new partnership button
    And I am navigated to the Apply for new partnership page
    Then I can read all information on the page
      | page                    | content                  |
      | ApplyForPartnershipPage | applyForPartnership.json |
    And I click on the Start button
    And the page main header is Confirm agreement to apply for partnership
    And I can read all information on the page
      | page                 | content               |
      | ConfirmAgreementPage | confirmAgreement.json |
    And I click on the Continue button
    And I should see the following error messages on ConfirmAgreementPage
      | testId                         | message              |
      | error-summary                  | There is a problem   |
      | confirm-criteria-error-message | Confirm all criteria |
      | confirm-criteria-error-summary | Confirm all criteria |
    And I confirm that I meet the below criteria before continuing
      | My local authority is suitable for nomination as the Primary authority |
      | The organisation is eligible to enter into a partnership               |
    And I click on the Continue button
    And I should see the following error messages on ConfirmAgreementPage
      | testId                         | message              |
      | error-summary                  | There is a problem   |
      | confirm-criteria-error-message | Confirm all criteria |
      | confirm-criteria-error-summary | Confirm all criteria |
    When I confirm that I meet the all criteria before continuing
    And I click on the Continue button
    Then I am navigated to the Partnership application page


