import prisma from '../db';
import { comparePassword, createJwt, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      userName: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJwt(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.username,
    },
  });

  const valid = await comparePassword(req.body.password, user.password);
  if (!user) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  if (!valid) {
    res.status(401);
    res.json({ message: 'Unauthorized' });
    return;
  }

  const token = createJwt(user);
  res.json({ token });
};
