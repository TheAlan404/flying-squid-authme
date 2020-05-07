const quickdb = require("quick.db"); //include database
let prefix = "[AuthMe] ";
let useTable = "authMeDB"; //Default database
let noMovement = false;
let callbackLogin = function(){};
let callbackRegister = function(){};
let loginTimeout = -1
let authMe_db;
let notLoggedInList = [];

module.exports.server = (serv) => {
  let settings = serv.plugins.authme.settings;
  require("./thrower").checkConfig(settings, serv);
  
  loginTimeout = settings.loginTimeout;
  noMovement = settings.noMovement;
  if(("tableName" in settings)) useTable = settings.tableName;
  if(("callbackLogin" in settings)) callbackLogin = settings.callbackLogin;
  if(("callbackRegister" in settings)) callbackRegister = settings.callbackRegister;
  
  authMe_db = new quickdb.table(useTable); //use the table
};

module.exports.player = (player, serv) => {
  notLoggedInList.push(player.username);
  
  
  //op commands
  player.commands.add(
    {
      "base": "authmeinfo",
      "aliases": ["authmei", "aminfo", "authinfo"],
      "info": "Shows authme info",
      "usage": "/authmeinfo",
      "op": true,
      action(args) {
        player.chat("--------AuthMe--------");
        player.chat(authMe_db.all().length() + "People registered.");
        player.chat(notLoggedInList.length() + "People are not logged in.");
      }
    }
  );
  
  
  
  
  //add commands
  player.commands.add(
    {
      "base": "login",
      "aliases": ["login"],
      "info": "Logs you in.",
      "usage": "/login <password>",
      "op": false,
      action(args) {
        if(authMe_db.has(player.username)) {
          if(args[0] == authMe_db.get(player.username)) {
            notLoggedInList.splice(notLoggedInList.indexOf(player.username)); //remove the player from not logged in list
            player.chat("Successfully logged in!");
            callbackLogin();
          } else {
            
          };
        } else {
          player.chat("You did not register yet.");
          player.chat("Register: /register <password> <password>");
        };
      }
    }
  );
  
  
  player.commands.add(
    {
      "base": "register",
      "aliases": ["register"],
      "info": "Registers you to the server.",
      "usage": "/register <password> <password>",
      "op": false,
      action(args) {
        if(authMe_db.has(player.username)) {
          player.chat("You already registered.");
        } else {
          if(args[0] !== args[1]) {
            player.chat("Your passwords are not the same!");
            return;
          };
          authMe_db.set(player.username, args[1]);
          player.chat("Successfully registered!");
          player.chat("Login with /login <password>");
          callbackRegister();
        };
      }
    }
  );
  
  player.on('move_cancel', ({position}, cancel) => {
    if(!notLoggedInList.includes(player.username)) return;
    cancel(); // If player tries to move, shoots them back where they came from
  });
  
  
  
  
};