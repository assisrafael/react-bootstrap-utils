import { setValueByPath, getValueByPath, splitPath, deepClone } from '../src/utils/getters-setters';

test('splitPath should split path strings into hierarchical components', () => {
  expect(splitPath('a.b.0.c')).toStrictEqual([
    { path: 'a' },
    { path: 'b', couldBeAnArray: true },
    { path: '0' },
    { path: 'c' },
  ]);
  expect(splitPath('a.b[0].c.d')).toStrictEqual([
    { path: 'a' },
    { path: 'b', couldBeAnArray: true },
    { path: '0' },
    { path: 'c' },
    { path: 'd' },
  ]);
  expect(splitPath('a[0].b[2].c[3].d')).toStrictEqual([
    { path: 'a', couldBeAnArray: true },
    { path: '0' },
    { path: 'b', couldBeAnArray: true },
    { path: '2' },
    { path: 'c', couldBeAnArray: true },
    { path: '3' },
    { path: 'd' },
  ]);
});

test('setValueByPath should set values inside complex objects', () => {
  expect(setValueByPath({}, 'a', 4)).toStrictEqual({ a: 4 });
  expect(setValueByPath({}, 'a.b', 5)).toStrictEqual({ a: { b: 5 } });
  expect(setValueByPath({}, 'a[0]', 6)).toStrictEqual({ a: [6] });
  expect(setValueByPath({ a: {} }, 'a[0]', 6)).toStrictEqual({ a: { '0': 6 } });
  expect(setValueByPath({}, 'a[0].b', 6)).toStrictEqual({ a: [{ b: 6 }] });
  expect(setValueByPath({}, '[1]', 'abc')).toStrictEqual({ '1': 'abc' });
  // eslint-disable-next-line no-sparse-arrays
  expect(setValueByPath(null, '[1]', 'abc')).toStrictEqual([, 'abc']);
});

test('getValueByPath should get path value of complex objects', () => {
  expect(getValueByPath({}, 'a')).toBe(undefined);
  expect(getValueByPath({}, '[0]')).toBe(undefined);
  expect(getValueByPath([1, 'h'], '[1]')).toBe('h');
  expect(getValueByPath([{ a: 'h' }], '[0].a')).toBe('h');
  expect(getValueByPath([{ a: null }], '[0].a.c')).toBe(undefined);
  expect(getValueByPath({}, 'a.b')).toBe(undefined);
  expect(getValueByPath({ a: [6] }, 'a[0]')).toBe(6);
  expect(getValueByPath({ a: { '0': 6 } }, 'a[0]')).toBe(6);
  expect(getValueByPath({ a: [2, { b: [3, 4, 5, { c: { d: 'efg' } }] }] }, 'a[1].b.3.c')).toStrictEqual({ d: 'efg' });
});

test('deepClone should not result in a shallow copy', () => {
  const source = {
    a: 'hello',
    c: 'test',
    po: 33,
    arr: [1, 2, 3, 4],
    anotherObj: {
      a: 33,
      str: 'whazzup',
    },
  };
  const dest = deepClone(source);

  expect(dest).toStrictEqual(source);
  source.anotherObj.a = 200;
  expect(source.anotherObj.a).toBe(200);
  expect(dest.anotherObj.a).toBe(33);
  source.arr.push(5);
  expect(source.arr[4]).toBe(5);
  expect(dest.arr[4]).toBe(undefined);
});
