
export default class Alert {
  constructor(alertDataSource) {
    this.alertDataSource = "../json/alert.json";
    this.alertsData = [];
  }

  async init() {
    await this.loadAlerts();
    this.renderAlerts();
  }

  async loadAlerts() {
    try {
      const response = await fetch(this.alertDataSource);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.alertsData = await response.json();
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  }

  renderAlerts() {
    if (!this.alertsData || this.alertsData.length === 0) {
      return; // No alerts to render
    }

    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    this.alertsData.forEach((alert) => {
      const alertParagraph = document.createElement("p");
      alertParagraph.textContent = alert.message;
      alertParagraph.style.backgroundColor = alert.background;
      alertParagraph.style.color = alert.color;

      alertList.appendChild(alertParagraph);
    });

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertList);
    }
  }
}
