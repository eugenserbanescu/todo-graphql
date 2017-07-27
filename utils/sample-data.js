module.exports = {
  users: {
    '739955945098.7233': {
      id: '739955945098.7233',
      name: 'Me',
      todoIds: ['254518566664.23285','1031377979903.1761']
    },
    '739955945098.7234': {
      id: '739955945098.7234',
      name: 'Other user',
      todoIds: ['942435525086.876']
    }
  },
  usersList: ['739955945098.7233','739955945098.7234'],
  todos: {
    '254518566664.23285': {
      id: '254518566664.23285',
      title: 'Add todos to schema',
      description: 'Todos need to be added to the schema so we can query them later',
      status: true,
      userId: '739955945098.7233'
    },
    '1031377979903.1761': {
      id: '1031377979903.1761',
      title: 'Add todos to sample data',
      description: 'We need some sample todos just to see how the thing behaves',
      status: true,
      userId: '739955945098.7233'
    },
    '942435525086.876': {
      id: '942435525086.876',
      title: 'More stuff needs to be done',
      description: 'Moar stuffs',
      status: false,
      userId: '739955945098.7234'
    }
  },
  todosList: ['254518566664.23285','1031377979903.1761','942435525086.876']
}
