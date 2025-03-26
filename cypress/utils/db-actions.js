
export function setTermsForFirstUser(acceptedStr) {
    const accepted = acceptedStr === 'true';

    return cy.task('getFirstUserIdentityId').then((userId) => {
        if (!userId) {
            throw new Error('No user found in UserProfile');
        }

        return cy.task('setTermsAccepted', { userId, value: accepted }).then(() => {
            cy.log(`✅ Updated HasAcceptedTermsAndConditions to ${accepted} for user ${userId}`);
        });
    });
}
 