import express from "express";
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { authenticateToken } from '../middleware/authenticate-token.js';
import { generateAccessToken } from '../util/generate-token.js';
import { registerUser, getUsers, getUser } from "../models/user-model.js";

const router = express.Router();

router.get('/users', (req, res) => {
  res.json({
    users: getUsers()
  })
});

router.post('/register', (req, res) => {
  const user = !_.isEmpty(req.body.user) ? req.body.user : null;
  if(_.isEmpty(user) || _.isEmpty(user.password) || _.isEmpty(user.confirmpassword) || _.isEmpty(user.username)) {
    res.status(400)
    .json({
      messages: "Incorrect user information provided"
    })
    return;
  }

  if(user.password !== user.confirmpassword) {
    res.status(400)
    .json({
      messages: "Incorrect user information provided"
    })
    return;
  }

  delete user.confirmpassword;
  
  const response = registerUser(user);
  if (response.err) {
    res.json({
      message: response.err
    })
  } else {
    const token = generateAccessToken({ user: {
        username: user.username,
        role: user.role
      }
    });
    res
      .status(200)
      .json({
        messages: response.messages,
        token: token
      });
  }
});

router.post('/login', (req, res) => {
  if(_.isEmpty(req.body.user)) {
    res.status(400)
    .json({
      messages: "Bad request"
    })
  }
  const user = getUser(req.body.user);
  if(user == undefined) {
    res.status(401).json({
      messages: "Incorrect login information 😰"
    })
    return;
  };
  bcrypt.compare(req.body.user.password, user.password, (err, result) => {
    if (result) {
      const token = generateAccessToken({user: {
        username: user.username,
        role: user.role
      }});
  res
    .status(200)
    .json({ message: "Logged in successfully 😊 👌",
            token: token
          });
    }
    else {
      // access denied
      res.status(401).json({
        messages: "Incorrect login information 😰"
      })
    }
  });
});

router.get("/logout", authenticateToken, (req, res) => {
  return res
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;