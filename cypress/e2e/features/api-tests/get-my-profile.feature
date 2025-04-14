@regression @api
Feature: Get My Profile API

  As an authenticated user
  I want to retrieve my user profile
  So that I can verify my account attributes are returned correctly

  Scenario: Successfully retrieve user profile after authentication
    Given I authenticate via the get-auth-token endpoint with the following credentials:
      | IdToken             |                                    |
      | AccessToken         |                                    |
      | Email               | testUserAccount                    |
      | ProviderKey         | onelogin                           |
      | ImpersonationApiKey | testUserAccountImpersonationApiKey |
    When I call the getMyProfile endpoint with the stored bearer token
    Then the response should contain a valid profile with all expected attributes
