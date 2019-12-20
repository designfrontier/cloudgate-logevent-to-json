// @flow

const FIELDS = ['level', 'amznRequestID', 'timestamp'];

export const formatEvent = (evnt: string) => {
  const arr = evnt.split(/\t/);
  const str = arr.pop();
  const data = str
    .replace(/[\][']/g, '"')
    .replace(/\r/g, '')
    .replace(/[{}]/g, '')
    .split(',');

  const json = arr.reduce((a, i, idx, arr) => {
    a[FIELDS[arr.length - 1 - idx]] = i.trim();

    return a;
  }, {});

  return data.reduce((a, i) => {
    const kv = i.split(':');

    a[kv.shift().trim()] = kv
      .join(':')
      .replace(/"/g, '')
      .trim();

    return a;
  }, json);
};
