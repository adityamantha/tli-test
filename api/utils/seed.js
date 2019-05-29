'use strict';

const { model: User } = require('../routes/users/userModel');
const { model: Post } = require('../routes/posts/postModel');

exports.truncate = async () => {
  await User.deleteMany();
  await Post.deleteMany();
};

exports.seed = async () => {
  try {
    const userData = [
      {
        firstName: 'Aditya',
        lastName: 'Mantha',
        username: 'adityamantha',
        gender: 'male',
        email: 'test@test.com',
        password: 'testing',
        dateOfBirth: '11-23-1991',
        firstSignIn: false,
      },
    ];
    const userPromises = userData.map(async (data) => {
      try {
        const user = new User(data);
        return await user.save();
      } catch (e) {
        throw e;
      }
    });
    await Promise.all(userPromises);

    const postData = [
      {
        title: 'This is the first of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the second of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the third of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the fourth of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the fifth of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the sixth of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
      {
        title: 'This is the seventh of many',
        description: 'This is the body of the post, this will be displayed below, not in bold but yeah it\'s good.',
        author: [],
      },
    ];
    const postPromises = postData.map(async (data) => {
      try {
        const post = new Post(data);
        return await post.save();
      } catch (e) {
        throw e;
      }
    });
    await Promise.all(postPromises);

    console.log('Seeding completed.');
  } catch (e) {
    console.error('Seeding failed...');
    throw e; // This `throw` will be caught in the server.js file
  }
};