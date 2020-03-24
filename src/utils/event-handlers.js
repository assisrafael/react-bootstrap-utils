export function safeClick(callback, callbackArgs) {
  return (e) => {
    stopPropagation(e);
    e.preventDefault();

    callback(callbackArgs);
  };
}

export function awaitForAsyncTask(task, callback) {
  return () => {
    const res = task();

    if (!res || !res.then) {
      callback();

      return;
    }

    res.then(callback);
  };
}

export function stopPropagation(e) {
  e.stopPropagation();
}
