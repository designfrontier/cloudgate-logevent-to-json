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

  test('correctly Formats a cloud watch logevent with arns in side it', async () => {
    const str =
      "2019-12-20T20:26:13.639Z\t920c5243-d48f-4caa-99ca-73fa92cbf02b\tINFO\t{ requestId: '7f84bafb-ce92-4c33-8587-3a81316336e9',\r  level: 'error',\r  message:\r   'User: arn:aws:sts::127178877223:assumed-role/proxmonger-test-us-east-2-role/proxmonger-v-1-test-oauth2Authorize is not authorized to perform: secretsmanager:GetSecretValue on resource: arn:aws:secretsmanager:us-east-2:127178877223:secret:proxmonger-edge-G2y8xi' }\n";

    expect(formatEvent(str)).toMatchObject({
      amznRequestID: '920c5243-d48f-4caa-99ca-73fa92cbf02b',
      level: 'error',
      message:
        'User: arn:aws:sts::127178877223:assumed-role/proxmonger-test-us-east-2-role/proxmonger-v-1-test-oauth2Authorize is not authorized to perform: secretsmanager:GetSecretValue on resource: arn:aws:secretsmanager:us-east-2:127178877223:secret:proxmonger-edge-G2y8xi',
      requestId: '7f84bafb-ce92-4c33-8587-3a81316336e9',
      timestamp: '2019-12-20T20:26:13.639Z'
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
