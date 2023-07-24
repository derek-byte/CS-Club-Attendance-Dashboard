import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET || "";

export default async function userAPI(req, res) {
  try {
    const { cookies } = req;
    const jwt = cookies.siteJWT;

    const user = await verify(jwt, secret)
  
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}