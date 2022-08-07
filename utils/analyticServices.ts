import { ANALYTICS_HOST_URL } from "./constants";

export function getTokensDataByVol24H() {
  return fetch(`${ANALYTICS_HOST_URL}/tokens-volume/past-24H`).then((res) => res.json()).then((data) => data)
}