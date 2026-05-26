(() => {
  const keys = Object.keys(localStorage).filter(key => key.startsWith("apexStrategy"));
  keys.forEach(key => localStorage.removeItem(key));

  // Backward-compatible explicit cleanup for older saves/scripts.
  localStorage.removeItem("apexStrategyTeam");
  localStorage.removeItem("apexStrategyCareer");
  localStorage.removeItem("apexStrategyProfile");

  // Reset to the initial view and force a fresh boot.
  if (location.hash) {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
  location.reload();
})();
