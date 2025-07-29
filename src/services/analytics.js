import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-6KC1X3MSBCx");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};
