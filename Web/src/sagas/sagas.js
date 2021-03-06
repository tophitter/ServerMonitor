import { all, fork } from "redux-saga/effects";
import * as watch from "./watcher";

const sagas = [
  fork(watch.watchGetHardware),
  fork(watch.watchGetIis),
  fork(watch.watchSetIis),
  fork(watch.watchRecycleIis),
  fork(watch.watchDiskUsage),
  fork(watch.watchTasks),
  fork(watch.watchSessions),
  fork(watch.watchOracle),
  fork(watch.watchRunTask),
  fork(watch.watchSetOracle),
  fork(watch.watchKillUser),
  fork(watch.watchGetSettings),
  fork(watch.watchSetCleanerSettings),
  fork(watch.watchGetHeartbeat)
];

export default function*() {
  yield all(sagas);
}
