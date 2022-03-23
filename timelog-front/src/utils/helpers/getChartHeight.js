function getChartHeight(mob, tab, desk) {
    const mobile = window.matchMedia('(max-width: 600px)');
    const tablet = window.matchMedia('(min-width: 601px) and (max-width: 991px');
    const desktop = window.matchMedia('(min-width: 992px)');
  
    if (mobile.matches) {
      return mob;
    }
  
    if (tablet.matches) {
      return tab;
    }
  
    if (desktop.matches) {
      return desk;
    }
  }
  
  export default getChartHeight;