## Downloading

`git clone {repository URL}`

## Installing NPM modules

`npm install`

## Add your data

Rename the `.env.example` file to `.env` and add your data

## Running application (port 5000 as default)

## `npm run dev`

## SOCKET EVENTS

`login`:

parameters:

- room - required
- user:{
  userId, - required
  firstName, - required
  lastName,
  job,
  role, - required
  }

responses:

- {
  eventName: 'login',
  code: 201,
  error: '',
  data:{
  user:{
  firstName: "Ivan"
  job: "programmer"
  lastName: "Ivanov"
  role: "user"
  room: "roomFc67H77BmTNCmzaiAAAL"
  userId: "Fc67H77BmTNCmzaiAAAL"
  }
  }
  }

- {
  eventName: 'login',
  code: 400,
  error: 'Bad request. Required data: firstName, role, room, userId',
  data: {}
  }

---

`get-all-users-in-room`:

parameters:

- room - required

response:

- {
  eventName: 'get-all-users-in-room',
  code: 200,
  error: '',
  data:{
  users:[
  {
  firstName: "Ivan"
  job: "programmer"
  lastName: "Ivanov"
  role: "user"
  room: "roomFc67H77BmTNCmzaiAAAL"
  userId: "Fc67H77BmTNCmzaiAAAL"
  }
  ]
  }
  }

- errors: 400

---

`get-all-chat`:

parameters:

- room - required

response:

- {
  eventName: 'get-all-chat',
  code: 200,
  error: '',
  data:{
  messages:[
  {
  firstName: "Jen"
  lastName: ""
  message: "Hi"
  role: "user"
  type: "chat"
  userId: "ZwtP67cXLT-iYoXAAAAD"
  },
  {
  firstName: "Evgenia"
  lastName: ""
  message: "Hi"
  role: "user"
  type: "chat"
  userId: "Mmh8D2v3vRkXGmtAAAAD"
  }
  ]
  }
  }

- errors: 400

---

`send-message`:

parameters:

- room - required
- message: {
  userId,- required
  newMessage,- required
  firstName,- required
  lastName,
  role,- required
  };

response:

- {
  eventName:'send-message',
  code: 201,
  error: '',
  data:{
  user:{
  firstName: "Evgenia"
  lastName: ""
  message: "Hi"
  role: "user"
  type: "chat"
  userId: "Mmh8D2v3vRkXGmtAAAAD"
  }
  }
  }

- errors: 400

---

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
