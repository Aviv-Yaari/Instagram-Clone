import { ObjectID } from 'bson';
const { ObjectId } = require('mongodb');
const dbService = require('../../services/db.service');

export interface User {
  _id: ObjectID | string;
  username: string;
  password: string;
  img: string;
}

module.exports = {
  query,
  getById,
  getByUsername,
  update,
  add,
};

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  try {
    const collection = await dbService.getCollection('user');
    var users = await collection.find(criteria).toArray();
    users = users.map(({ _id, username, img }: User) => ({ _id, username, img }));
    return users;
  } catch (err) {
    console.error('cannot find users', err);
    throw err;
  }
}

async function getById(userId: string) {
  try {
    const collection = await dbService.getCollection('user');
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;
    return user;
  } catch (err) {
    console.error(`while finding user ${userId}`, err);
    throw err;
  }
}
async function getByUsername(username: string) {
  try {
    const collection = await dbService.getCollection('user');
    const user = await collection.findOne({ username });
    return user;
  } catch (err) {
    console.error(`while finding user ${username}`, err);
    throw err;
  }
}

async function update(user: User) {
  try {
    const collection = await dbService.getCollection('user');
    await collection.updateOne({ _id: ObjectId(user._id) }, { $set: user });
    return user;
  } catch (err) {
    console.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}

async function add(user: User) {
  try {
    const collection = await dbService.getCollection('user');
    await collection.insertOne(user);
    const { username, img } = user;
    return { username, img };
  } catch (err) {
    console.error('cannot insert user', err);
    throw err;
  }
}

function _buildCriteria(filterBy: { [key: string]: any }) {
  const criteria: { [key: string]: any } = {};
  if (filterBy.name) {
    const txtCriteria = { $regex: filterBy.name, $options: 'i' };
    criteria.username = txtCriteria;
  }
  return criteria;
}
