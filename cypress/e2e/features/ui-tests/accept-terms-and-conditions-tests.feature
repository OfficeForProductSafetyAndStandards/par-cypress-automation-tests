@regression @ui
Feature: PAR Terms and Conditions

  Scenario: As a User I want to be able to read PAR T&Cs Contents
    Given I am on the Start Page
    And testUserAccount has accepted terms and conditions is set to false
    And I can read all information on the page
      | page      | content        |
      | StartPage | startPage.json |
    And the page main header is Primary Authority Register
    And I signed in using testUserAccount
    And the page url has terms-conditions
    And I can read all information on the page
      | page                         | content                       |
      | AcceptTermsAndConditionsPage | acceptTermsAndConditions.json |
    When I click on the Terms and conditions hyperlink
    Then I am navigated to the PAR Terms and conditions new tab


  Scenario: Error message display when T&Cs not accepted
    Given I am on the Start Page
    And testUserAccount has accepted terms and conditions is set to false
    And I can read all information on the page
      | page      | content        |
      | StartPage | startPage.json |
    And the page main header is Primary Authority Register
    And I signed in using testUserAccount
    And the page url has terms-conditions
    When I click on the Save and continue button
    And I should see the following error messages on AcceptTermsAndConditionsPage
      | testId                                | message                                                         |
      | error-summary                         | There is a problem                                              |
      | accept-terms-conditions-error-message | Confirm that you have read and accept the terms and conditions. |
      | error-summary                         | Confirm that you have read and accept the terms and conditions. |

