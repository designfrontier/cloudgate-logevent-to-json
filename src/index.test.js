// @flow
import { formatEvent } from './index';

describe('#formatEvent', () => {
  test('correctly Formats a cloud watch logevent', async () => {
    const str =
      "2019-12-17T23:42:11.540Z\t7e1c979b-b52f-4a59-bd8e-3aead96e557b\tINFO\t{ requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',\r  path: '/session',\r  method: 'POST',\r  ipAddress: '216.51.95.36',\r  level: 'info',\r  message: 'Start request' }\n";

    expect(formatEvent(str)).toMatchObject({
      amznRequestID: '7e1c979b-b52f-4a59-bd8e-3aead96e557b',
      ipAddress: '216.51.95.36',
      level: 'info',
      message: 'Start request',
      path: '/session',
      requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
      method: 'POST',
      timestamp: '2019-12-17T23:42:11.540Z'
    });
  });

  test('correctly Formats a cloud watch logevent extracted field', async () => {
    const str =
      "INFO\t{ requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',\r  path: '/session',\r  method: 'POST',\r  ipAddress: '216.51.95.36',\r  level: 'info',\r  message: 'Start request' }\n";

    expect(formatEvent(str)).toMatchObject({
      ipAddress: '216.51.95.36',
      level: 'info',
      message: 'Start request',
      path: '/session',
      requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
      method: 'POST'
    });
  });

  test('correctly Formats a cloud watch logevent extracted field without a level param in the json', async () => {
    const str =
      "INFO\t{ requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',\r  path: '/session',\r  method: 'POST',\r  ipAddress: '216.51.95.36',\r  message: 'Start request' }\n";

    expect(formatEvent(str)).toMatchObject({
      ipAddress: '216.51.95.36',
      level: 'INFO',
      message: 'Start request',
      path: '/session',
      requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
      method: 'POST'
    });
  });

  test('correctly Formats a cloud watch logevent if no level in json', async () => {
    const str =
      "2019-12-17T23:42:11.540Z\t7e1c979b-b52f-4a59-bd8e-3aead96e557b\tINFO\t{ requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',\r  path: '/session',\r  method: 'POST',\r  ipAddress: '216.51.95.36',\r  message: 'Start request' }\n";

    expect(formatEvent(str)).toMatchObject({
      amznRequestID: '7e1c979b-b52f-4a59-bd8e-3aead96e557b',
      ipAddress: '216.51.95.36',
      level: 'INFO',
      message: 'Start request',
      path: '/session',
      requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
      method: 'POST',
      timestamp: '2019-12-17T23:42:11.540Z'
    });
  });
});
