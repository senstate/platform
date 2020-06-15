import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  constructor() {
  }

  // Save Setting by Name
  public saveSetting(name: string, value: any) {
    const json = JSON.stringify(value);

    localStorage.setItem(name, json);
  }

  // Load Setting by Name
  public loadSetting(name: string, defaultValue: any) {
    const storedValue = localStorage.getItem(name);

    if (storedValue != null) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  }
}
