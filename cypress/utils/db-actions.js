import { query } from './db.js';

export async function setTermsAccepted(userIdentityId, value) {
    await query(`
    UPDATE "UserProfile"
    SET "HasAcceptedTermsAndConditions" = $1
    WHERE "UserIdentityId" = $2
  `, [value, userIdentityId]);
}

export async function getFirstUserIdentityId() {
    const result = await query(`SELECT "UserIdentityId" FROM "UserProfile" LIMIT 1`);
    return result[0]?.UserIdentityId;
}
