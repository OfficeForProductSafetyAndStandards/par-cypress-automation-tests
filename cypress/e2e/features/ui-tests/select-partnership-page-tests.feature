@regression @ui
Feature:  Select Partnership

  Scenario: Select Partnership Task
    Given I am on the Start Page
    And testUserAccount has accepted terms and conditions is set to false
    And I signed in using testUserAccount
    And the page url has terms-conditions
    And I have confirmed the acceptance of T&Cs and save and continue
    And Primary Authority Register page is displayed
    And I click on the Apply for a new partnership button
    And I am navigated to the Apply for new partnership page
    And I click on the Start button
    And I confirm that I meet the all criteria before continuing
    And I click on the Continue button
    And I navigate to the Select partnership type page
    And I can read all information on the page
      | page                      | content                    |
      | SelectPartnershipTypePage | selectPartnershipType.json |
    And I can view the details information
    And I click on the Continue button
    And I should see the following error messages on SelectPartnershipTypePage
      | testId                         | message                 |
      | error-summary                  | There is a problem      |
      | partnership-type-error-message | Select partnership type |
      | partnership-type-error-summary | Select partnership type |
    And I select coordinated as partnership type
    And I click on the Continue button
    And I am navigated to the Partnership application page
    And the partnership application page should have the following content
      | content          | partnershipApplication.json |
      | numberOfSections | 6                           |
      | completed        | 1                           |
      | taskOneStatus    | Completed                   |
      | taskTwoStatus    | Not Yet Started             |
    And I click on the add regulatory function contact link
    And I can read all information on the page
      | page                              | content                            |
      | AddRegulatoryFunctionContactsPage | addRegulatoryFunctionContacts.json |
    And I navigate back using browser
    And I click on the select partnership type link
    And I can read all information on the page
      | page                      | content                    |
      | SelectPartnershipTypePage | selectPartnershipType.json |
    And the page main header is Select partnership type
    When I click on back link on select partnership type page
    And I save and exit the application
    Then Primary Authority Register page is displayed



