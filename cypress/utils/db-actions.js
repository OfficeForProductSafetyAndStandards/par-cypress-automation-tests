export function setTermsForFirstUser(acceptedStr) {
    const accepted = acceptedStr === 'true';

    return cy.task('getFirstUserIdentityId').then((userId) => {
        if (!userId) throw new Error('No user found in UserProfile');
        return cy.task('setTermsAccepted', {userId, value: accepted}).then(() => {
            cy.log(`✅ Updated HasAcceptedTermsAndConditions to ${accepted} for user ${userId}`);
        });
    });
}

export function deleteUserById(userId) {
    return cy.task('deleteUserById', userId).then((msg) => {
        cy.log(msg);
    });
}


export function deleteFirstUser() {
    return cy.task('getFirstUserIdentityId').then((userId) => {
        if (!userId) throw new Error('No user found to delete');
        return cy.task('deleteUserById', userId).then((msg) => cy.log(msg));
    });
}

export function setTermsAcceptedForSpecificUser(userId, acceptedStr) {
    const accepted = acceptedStr === 'true';
    return cy.task('setTermsAccepted', {userId, value: accepted}).then(() => {
        cy.log(`✅ Updated HasAcceptedTermsAndConditions to ${accepted} for user ${userId}`);
    });
}

export function setTermsAcceptedForUserByEmail(email, acceptedStr) {
    const accepted = acceptedStr === 'true';
    return cy.task('getUserByEmail', email).then((userRecord) => {
        if (!userRecord) {
            throw new Error(`❌ No user found for ${email}`);
        }
        const userId = userRecord.Id;
        return cy.task('setTermsAccepted', {userId, value: accepted}).then(() => {
            cy.log(`✅ Updated HasAcceptedTermsAndConditions to ${accepted} for user ${userId}`);
        });
    });
}




