# Flying Squid Authme

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

| GitHub                                                                              | NPM                                               | Docs                                                               |
| ----------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| [TheAlan404/flying-squid-authme](https://github.com/TheAlan404/flying-squid-authme) | https://www.npmjs.com/package/flying-squid-authme | [Readme](https://github.com/TheAlan404/flying-squid-authme#readme) |

A [flying squid](https://github.com/PrismarineJS/flying-squid) authentication plugin for `online-mode=false` servers.

### Install

```bash
npm install flying-squid-authme
```

Then edit your flying-squid config:

```json
"plugins": {
    "flying-squid-authme": true
}
```

### Configuration

The plugin will create it's configuration file automatically in `./authme/config.yml`.  
The config contains comments so it should be pretty easy to set up.  
Flying-squid-authme is mostly a drop-in, only edit config if you need to!

### Storage

Currently only supports a `quick.db` database, but we might add more in the future.  
If you need this please create an issue!

### Security

Flying-squid-authme uses [BCrypt](https://www.npmjs.com/package/bcrypt) to hash and salt the passwords.  
We might add more hashing methods in the future.

### Contributing

Before commiting please run `npm run lint` and `npm run fix` to keep standard code style and check for errors.

### TODO

[Here](TODO.md)

### LICENSE

[MIT](LICENSE.md)

### Screenshots

![login screen](https://i.imgur.com/Vx6saUv.png)
