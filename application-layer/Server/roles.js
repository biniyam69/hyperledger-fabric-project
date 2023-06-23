AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("system admin")
    .readOwn("profile")
    .updateOwn("profile")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile");

  ac.grant("law enforcement")
    .readOwn("profile")
    .updateOwn("profile");

  ac.grant("prison")
    .readOwn("profile")
    .updateOwn("profile");

  ac.grant("court")
    .readOwn("profile")
    .updateOwn("profile");

  ac.grant("investigation agency")
    .readOwn("profile")
    .updateOwn("profile");

  return ac;
})();
