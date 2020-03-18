export function safeClick(callback, callbackArgs) {
  return (e) => {
    e.stopPropagation();
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
