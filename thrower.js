exports.checkConfig = (config, serv) => {
  
  if (typeof config !== "object") {
    return serv.emit("error", new Error("[AuthMe] Config must be an object"));
  }
  
  if (!config.noMovement || !config.loginTimeout) {
    return serv.emit(
      "error",
      new Error("[AuthMe] Please fix your plugin config!")
    );
  }
  
};