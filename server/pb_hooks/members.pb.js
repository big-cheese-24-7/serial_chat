/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeAuthWithOAuth2Request((e) => {
  /*
            This effects already authenticated members
            to prevent using a different provider other than
            the one used on profile creation
        */
  if (e.isNewRecord || e.record === null) {
    return;
  }

  const requestProvider = e.providerName;
  const userRecordProvider = e.record.get("oauth2_provider");

  if (requestProvider !== userRecordProvider) {
    throw new ForbiddenError(
      `Account already authenticated with ${userRecordProvider}`
    );
  }

  // console.log(JSON.stringify({ requestProvider, userRecordProvider }));
}, "members");

onRecordAfterAuthWithOAuth2Request((e) => {
  /* 
            This effects new authenticated members 
            to add info to their record from the oauth2 response
        */

  if (!e.isNewRecord) {
    return;
  }

  const oauth2_provider = e.providerName;
  const username =
    e.oAuth2User.username !== "" ? e.oAuth2User.username : e.oAuth2User.name;
  const avatar_url = e.oAuth2User.avatarUrl;

  const userForm = new RecordUpsertForm($app, e.record);

  userForm.loadData({
    oauth2_provider,
    username,
    avatar_url,
  });

  userForm.submit();

  // console.log(JSON.stringify({ username, oauth2_provider, avatar_url }, null, 4));
}, "members");
