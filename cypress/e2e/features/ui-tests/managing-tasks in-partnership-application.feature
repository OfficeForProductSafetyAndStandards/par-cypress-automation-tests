@regression @ui
Feature: Partnership Application

  Background:
    Given I have started a new partnership application as testUserAccount

  Scenario: Display initial state of Partnership Application after starting a new application
    Given I am navigated to the Partnership application page
    And the url should have applicationId
    Then the partnership application page should display initial state using fixture "partnershipApplication.json"


  Scenario: Start and complete the 'Select Partnership Type' task with validations
    Given I navigate to the Select partnership type page
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


  Scenario: Navigate to and validate 'Add Regulatory Function Contacts' task
    Given I click on the add regulatory function contact link
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



