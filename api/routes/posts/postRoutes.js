'use strict';

const express = require('express');
const router = express.Router();

const requiresAuth = require('../../middleware/auth');
const { logRequest } = require('../../utils');

const postService = require('./postService');

// GET /posts/
router.route('/')
  .get(
    requiresAuth,
    async (req, res, next) => {
      try {
        const posts = await postService.listPosts();
        res.json({ data: posts });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  )
// POST /posts/ (create new post)
  .post(
    requiresAuth,
    async (req, res, next) => {
      const { body } = req;
      try {
        const post = await postService.createPost(body);
        res.status(201).json({ data: [post] });
        logRequest(req, res);
      } catch (e) {
        next(e);
      }
    }
  );

exports.router = router;