function getHoursByProject(logs) {
  const hoursByProject = {};
  logs.forEach((log) => {
    if (hoursByProject[log.project]) {
      hoursByProject[log.project] += log.time;
    } else {
      hoursByProject[log.project] = log.time;
    }
  });
  return hoursByProject;
}

function getGlobalData(logs) {
  const globalData = {};

  logs.forEach((log) => {
    if (globalData[log.project]) {
      if (globalData[log.project][log.author]) {
        globalData[log.project][log.author] += log.time;
      } else {
        globalData[log.project][log.author] = log.time;
      }
    } else {
      globalData[log.project] = {};
      globalData[log.project][log.author] = log.time;
    }
  });
  return globalData;
}

export { getHoursByProject, getGlobalData };
