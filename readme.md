# cloudwatch logevent to object

This is a really simple library that takes in either the logevent `message` or
the `extractedFields.event` fields and returns a JS object for your use.

## Usage

The main file exports a single named function: `formatEvent` that takes in the
message string and it returns a JS object that contains the log fields for you
to do with as you will.

```js
import { formatEvent } from 'cloudwatch-to-object';

const logObj = formatEvent(event.message);
```

or

```js
import { formatEvent } from 'cloudwatch-to-object';

const logObj = formatEvent(event.extractedFields.event);
```

The first will return something that looks roughly like:

```
{
  amznRequestID: '7e1c979b-b52f-4a59-bd8e-3aead96e557b',
  ipAddress: '216.51.95.36',
  level: 'info',
  message: 'Start request',
  path: '/session',
  requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
  method: 'POST',
  timestamp: '2019-12-17T23:42:11.540Z'
}
```

The actual content will vary a bit depending what is in the JSON payload inside
the string it is parsing.

For the second (extractedFields parsing) you would get:

```
{
  ipAddress: '216.51.95.36',
  level: 'info',
  message: 'Start request',
  path: '/session',
  requestId: 'a35ffcc2-2939-4d95-a3fd-351a620121a4',
  method: 'POST'
}
```

A couple fewer fields, but still pretty useful.
