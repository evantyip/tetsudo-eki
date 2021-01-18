import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import {
  validateRequest,
  BadRequestError,
  requireAuth,
  currentUser,
} from '@tetsudoeki/common';
import { Password } from '../utility/password';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/updatepassword',
  currentUser,
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('oldPassword')
      .trim()
      .notEmpty()
      .withMessage('You must supply old password'),
    body('newPassword')
      .trim()
      .notEmpty()
      .withMessage('You must supply new password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    if (
      existingUser.id !== req.currentUser!.id ||
      existingUser.email !== req.currentUser!.email
    ) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      oldPassword
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // updating password
    existingUser.password = newPassword;
    await existingUser.save();

    // Generate JWT
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(existingUser);
  }
);

export { router as updatePwRouter };
