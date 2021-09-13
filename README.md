## Downloading

`git clone {repository URL}`

## Installing NPM modules

`npm install`

## Add your data

Rename the `.env.example` file to `.env` and add your data

## Running application (port 5000 as default)

`npm run dev`
---

## SOCKET EVENTS

To get the error, listen to the event on the client `error`
---

`send-message`:

parameters:

- room - required
- userId - required
- message - required
- firstName - required
- role - required
- lastName

responses:

- {
  userId: '11111',
  firstName: 'Stephan',
  lastName: 'Nazarenko',
  role: ROLES.ADMIN,
  message: 'Hi :)',
  type: ''
  }

- {
  status: 400,
  error: 'Bad request',
  eventName: 'send-message',
  }

-----------

`kick-user-by-admin`:

parameters:

- room - required
- userId - required
- message - required
- firstName - required
- role - required
- lastName

responses:

- {
  userId: '11111',
  firstName: 'Stephan',
  lastName: 'Nazarenko',
  role: ROLES.ADMIN,
  message: 'Hi :)',
  type: ''
  }

- {
  status: 400,
  error: 'Bad request',
  eventName: 'kick-user-by-admin',
  }

- {
  status: 404,
  error: 'Not found',
  eventName: 'kick-user-by-admin',
  }

