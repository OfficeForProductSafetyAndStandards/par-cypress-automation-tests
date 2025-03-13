@regression @ui
Feature:  Select Partnership

  Scenario: Select Partnership Task
    Given I am on the Start Page
    And I signed in using testUserAccount
    When I navigate to the Select partnership type page
    And I can read all information on the page
      | page                      | content                    |
      | SelectPartnershipTypePage | selectPartnershipType.json |
    Then I can view the details information
    And I click on the Continue button
    Then I should see the following error messages on SelectPartnershipTypePage
      | testId                         | message                 |
      | error-summary                  | There is a problem      |
      | partnership-type-error-message | Select partnership type |
      | partnership-type-error-summary | Select partnership type |
    And I select coordinated as partnership type
    And I click on the Continue button
    And I am navigated to the Partnership Application page
    And the partnership application page should have the following content
      | content          | partnershipApplication.json |
      | numberOfSections | 6                           |
      | completed        | 0                           |
      | taskOneStatus    | Not Yet Started             |
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



