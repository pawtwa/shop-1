const appLogger = document.createElement('div');
const appLoggerSeeMore = document.createElement('div');
const appLoggerMinMax = document.createElement('div');

window['appLoggerSeeMoreToggle'] = (element) => {
    if (element.innerText === 'more') {
        element.innerText = 'less';
        element.parentNode.style.bottom = '188px';
        const showHide = appLogger.querySelector('.show-hide');
        showHide.style.bottom = '188px';
        appLogger.style.height = '200px';
    } else {
        element.innerText = 'more';
        element.parentNode.style.bottom = '';
        const showHide = appLogger.querySelector('.show-hide');
        showHide.style.bottom = '';
        appLogger.style.height = '';
    }
    return false;
};
window['appLoggerMinMaxToggle'] = (element) => {
    if (element.innerText === 'hide') {
        element.innerText = 'show';
        element.parentNode.style.bottom = '0px';
        const seeMore = appLogger.querySelector('.see-more');
        seeMore.style.opacity = '0';
        seeMore.style.bottom = '-30px';
        appLogger.style.height = '0px';
    } else {
        element.innerText = 'hide';
        element.parentNode.style.bottom = '';
        const seeMore = appLogger.querySelector('.see-more');
        seeMore.style.opacity = '';
        seeMore.style.bottom = '';
        seeMore.querySelector('a').innerText = 'more';
        appLogger.style.height = '';
    }
    return false;
};
appLogger.id = 'app-logger';
appLoggerSeeMore.classList.add('see-more');
appLoggerSeeMore.classList.add('unselectable');
appLoggerSeeMore.innerHTML = '<a href="#" onclick="return appLoggerSeeMoreToggle(this)">more</a>';
appLoggerMinMax.classList.add('show-hide');
appLoggerMinMax.classList.add('unselectable');
appLoggerMinMax.innerHTML = '<a href="#" onclick="return appLoggerMinMaxToggle(this)">hide</a>';
appLogger.append(appLoggerSeeMore);
appLogger.append(appLoggerMinMax);
document.body.append(appLogger);

const loggerApi = {
  addLog: async (log) => {
      appLogger.innerHTML = `<p>${appLogger.childNodes.length - 2 + 1}. ${log}</p>` + appLogger.innerHTML;
  }
};

export default loggerApi;
