import ky from "ky";

const makeOptions = data => {
  return {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };
};
async function get(url) {
  const response = await ky.get(url);
  return handleResponse(response);
}

async function put(url, data) {
  const response = await ky.put(url, makeOptions(data));
  return handleResponse(response);
}

async function post(url, data) {
  const response = await ky.post(url, makeOptions(data));
  return handleResponse(response);
}

async function handleResponse(response) {
  const responseData = await response.json();
  responseData.status = response.status;
  return responseData;
}

let appUri = "http://localhost/ServerMonitor/";
if (process.env.NODE_ENV === "production") {
  let href = document.location.href;
  const hashLocation = href.indexOf("#");
  if (hashLocation !== -1) {
    href = href.substring(0, href.indexOf("#"));
  }
  appUri = href;
}

const apiUri = `${appUri}Monitor/`;
const oracleUri = `${appUri}OracleInstance`;
const sessionsUri = `${appUri}Sessions`;
const diskUri = `${apiUri}GetDiskUsage`;
const setOracleUri = `${appUri}OracleInstanceReservation`;
const tasksUri = `${appUri}Tasks/`;
const settingsUri = `${appUri}Settings/`;

export function getIisApp(url) {
  return get(`${url}Iis`);
}
export function setIisApp(props) {
  return post(`${props.url}Iis`, props.appList);
}

export function recycleApp(props) {
  return post(`${props.url}Iis?name=${props.name}`);
}

export function getHardware(url) {
  return get(`${url}Hardware`);
}

export function getIisApps(prefix) {
  const url = prefix ? prefix : appUri;
  return get(`${url}Iis/`);
}

export function getDisk() {
  return get(diskUri);
}

export function getOracleInstancies() {
  return get(oracleUri);
}

export function setOracle(data) {
  return put(setOracleUri, data);
}

export function getUserSessions() {
  return get(`${sessionsUri}`);
}

export function killUser(data) {
  return delete `${sessionsUri}/${data}`;
}

export function getTasks() {
  return get(tasksUri);
}

export function runTask(name) {
  return post(`${tasksUri}/${name}`);
}

export function getSettings(force) {
  const forceParam = !!force ? "?force=true" : "";
  return get(settingsUri + forceParam);
}

export function setSettings(settings) {
  return put(settingsUri, settings);
}

export function checkLink(data, url) {
  return post(`${url}Links`, data);
}

export function getServerLinks(url) {
  return get(`${url}Settings`);
}
export function getHeartbeat(url) {
  return Axios.get(`${url}heartbeat`);
}
