import homeIcon from "../assets/img/icons/homeIcon.svg";
import costsIcon from "../assets/img/icons/costsIcon.svg";
import analyticsIcon from "../assets/img/icons/analyticsIcon.svg";
import settingsIcon from "../assets/img/icons/settingsIcon.svg";
import { AnalyticsPage, CostsPage, MainPage, SettingsPage } from "../pages";

const routes = [
  { linkName: "Главная", to: "/main", icon: homeIcon, component: MainPage },
  { linkName: "Расходы", to: "/costs", icon: costsIcon, component: CostsPage },
  {
    linkName: "Аналитика",
    to: "/analytics",
    icon: analyticsIcon,
    component: AnalyticsPage,
  },
  {
    linkName: "Настройки",
    to: "/settings",
    icon: settingsIcon,
    component: SettingsPage,
  },
];

export default routes;
