export function safeClick(callback, callbackArgs) {
  return (e) => {
    e.stopPropagation();
    e.preventDefault();

    callback(callbackArgs);
  };
}
