export function handleClick(action, close) {
  return () => {
    const res = action();

    if (!res || !res.then) {
      close();
      return;
    }

    res.then(() => close());
  };
}
