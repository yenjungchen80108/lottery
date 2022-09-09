import { ObjectId } from 'mongodb';
// import { dbProjectionUsers } from './user';

export async function findFakeUserById(db, id) {
  // console.log('db-id', id);
  const fakeUsers = await db
    .collection('fakeUsers')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
    ])
    .toArray();
  if (!fakeUsers[0]) return null;
  return fakeUsers[0];
}

export async function findFakeUsers(db, before, by, limit = 5) {
  return db
    .collection('fakeUsers')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
    ])
    .toArray();
}

export async function insertFakeUser(db, { name, phone, email, age, img }) {
  const fakeUser = {
    name, phone, email, age, img,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('fakeUsers').insertOne(fakeUser);
  fakeUser._id = insertedId;
  return fakeUser;
}

export async function updateFakeUserById(db, id, { name, phone, email, age, img }) {
  const fakeUser = {
    name, phone, email, age, img,
    createdAt: new Date(),
  };
  
  return db
    .collection('fakeUsers')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fakeUser },
    )
    .then((value) => console.log('Value: ' + value))
    .catch((err) => {
      console.log('Error: ' + err);
    });
}

export async function deleteFakeUserById(db, id) {
  return db
    .collection('fakeUsers')
    .deleteOne(
      { _id: new ObjectId(id) },
    )
    .then((value) => console.log('Value: ' + value))
    .catch((err) => {
      console.log('Error: ' + err);
    });
}