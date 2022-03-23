class Chart {
  static getTimePerAuthor(logs) {
    let globalData = [];
    let authors = [];
    let projects = [];

    logs.forEach((log) => {
      if (!authors.includes(log.author)) {
        authors.push(log.author);
      }
      if (!projects.includes(log.project)) {
        projects.push(log.project);
      }
    });

    authors.forEach((author) => {
      let data = [];
      projects.forEach((project) => {
        const totalTimePerProject = logs
          .filter((log) => {
            return log.author === author && log.project === project;
          })
          .reduce((acc, curr) => {
            return acc + curr.time;
          }, 0);
        data.push(totalTimePerProject);
      });
      globalData.push({ name: author, data });
    });

    return { globalData, projects };
  }

  static getTimePerProject(logs) {
    let projects = [];

    logs.forEach((log) => {
      if (!projects.includes(log.project)) {
        projects.push(log.project);
      }
    });

    let globalData = [];

    projects.forEach((project) => {
      let totalTime = 0;
      logs.forEach((log) => {
        if (log.project === project) {
          totalTime += log.time;
        }
      });
      globalData.push(totalTime);
    });

    return { globalData, projects };
  }

  static getUserTime(logs) {
    let hours = [];
    let projects = [];
    logs.forEach((log) => {
      if (!projects.includes(log.project)) {
        projects.push(log.project);
      }
    });

    projects.forEach((project) => {
      let time = 0;
      logs.forEach((log) => {
        if (log.project === project) {
          time += log.time;
        }
      });
      hours.push(time);
    });

    return { hours, projects };
  }
}

export default Chart;
