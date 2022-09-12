import { ValidateProps } from '../../../api-lib/constants';
import { findFakeUsers, insertFakeUser, updateFakeUserById,  deleteFakeUserById } from '../../../api-lib/db';
import { auths, database, validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const fakeUsers = await findFakeUsers(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(5, 10) : undefined
  );

  res.json({ fakeUsers });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.fakeUser.name,
      phone: ValidateProps.fakeUser.phone,
      email: ValidateProps.fakeUser.email,
      age: ValidateProps.fakeUser.age,
      img: ValidateProps.fakeUser.img,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    const fakeUser = await insertFakeUser(req.db, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      age: req.body.age,
      img: req.body.img,
    });
    return res.json({ fakeUser });
  }
);

handler.patch(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      _id: ValidateProps.fakeUser._id,
      name: ValidateProps.fakeUser.name,
      phone: ValidateProps.fakeUser.phone,
      email: ValidateProps.fakeUser.email,
      age: ValidateProps.fakeUser.age,
      img: ValidateProps.fakeUser.img,
    }
  }),
  async (req, res) => {
    const { _id, name, phone, email, age, img } = req.body;
    const fakeUsers = await updateFakeUserById(req.db, _id, {  name, phone, email, age, img });

    res.json({ fakeUsers });
  }
);

handler.delete(
  ...auths,
  async (req, res) => {
    const { _id } = req.body;
    const fakeUsers = await deleteFakeUserById(req.db, _id);

    res.json({ fakeUsers });
  }
);

export default handler;
