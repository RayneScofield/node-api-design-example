import jwt from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = ({ id, userName }) => {
  return jwt.sign({ id: id, username: userName }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  const token = bearer.split(' ')[1];
  if (!token) {
    console.log('here');
    res.status(401);
    res.send('Not authorized');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
