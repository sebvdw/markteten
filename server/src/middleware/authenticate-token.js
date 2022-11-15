import jwt from 'jsonwebtoken';

//Take into account if someone tries to delete someone elses post.

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.sendStatus(403);
  }
  try {
    if (token == null) return res.sendStatus(401)
    const data  = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = data.user
    next()
  } catch {
    return res.sendStatus(403);
  }
}