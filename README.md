# Flying Squid Authme
A flying squid local authentication plugin for `online-mode=false` servers.

## Config Settings

### Required

`loginTimeout` - The time in milliseconds before kicking the player if they didnt log in. Leave *-1* for no kicking.

`noMovement` - Boolean value, if true, freezes the player until login.

### Optional

`tableName` - The quick.db database table name used for passwords. (Default: "authMeDB")

`callbackLogin()` - The function that will be called after a successful login.

`callbackRegister()` - The function that will be called after a new player registers to the server.