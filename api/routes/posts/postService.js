'use strict';

const { model: Posts } = require('./postModel');

exports.listPosts = async () => {
  try {
    return await Posts.find({});
  } catch (e) {
    throw e;
  }
};

exports.createPost = async (postData) => {
  try {
    const post = new Post(postData);
    return await post.save();
  } catch (e) {
    throw e;
  }
};
