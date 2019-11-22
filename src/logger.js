const appLogger = document.createElement('div'); //document.getElementById('app-logger');
appLogger.id = 'app-logger';
document.body.append(appLogger);

const loggerApi = {
  addLog: (log) => {
      appLogger.innerHTML = `<p>${appLogger.childNodes.length + 1}. ${log}</p>` + appLogger.innerHTML;
  }
};

export default loggerApi;
