/// <reference path="../pb_data/types.d.ts" />
routerAdd(
  "GET",
  "/api/meta-data",
  (c) => {
    const members = arrayOf(new Record());
    $app.dao().recordQuery("members").all(members);

    const messages = arrayOf(new Record());
    $app.dao().recordQuery("messages").all(messages);

    return c.json(200, {
      members_count: members.length,
      messages_count: messages.length,
    });
  },
  $apis.requireAdminOrRecordAuth()
);
