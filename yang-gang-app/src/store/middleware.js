const middleware = store => next => action => {
  const currState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  const dispatch = store.dispatch;
}
export default middleware;
