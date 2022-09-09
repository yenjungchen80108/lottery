import { nanoid } from 'nanoid';

export const ValidateProps = {
  fakeUser: {
    _id: {
      type: 'string',
      default: () => nanoid(),
    },
    name: { type: 'string', minLength: 1, maxLength: 10 },
    phone: { type: 'string', minLength: 1, maxLength: 10 },
    email: { type: 'string', minLength: 1, maxLength: 50 },
    age: { type: 'string', minLength: 1, maxLength: 3 },
    img: { type: 'string', minLength: 1 },
  }
};
