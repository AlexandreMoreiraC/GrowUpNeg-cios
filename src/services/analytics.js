import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-7H4XMYCQ2E");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};
