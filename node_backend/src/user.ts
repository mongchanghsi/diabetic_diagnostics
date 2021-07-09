import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User.entity';

const router = express.Router({
  strict: true,
});

router.post(
  '/login',
  async (req: Request, res: Response): Promise<Response> => {
    const nric: string = req.body.nric;

    if (!nric) return res.status(400).json({ message: 'No NRIC found' });

    try {
      const userRepository = getRepository(User);
      let user = await userRepository.findOne({ nric });
      if (!user) {
        // If user does not exist, create a new user row
        const userData = new User();
        userData.nric = nric;
        userData.height = 0;
        userData.weight = 0;
        userData.lastCheckUp = new Date();
        userData.status = false;

        // Assume to pull DoB from EMR/SingPass using NRIC
        // FIX: Octal literals are not available when targeting ECMAScript 5 and higher. Use the syntax '0o1'.
        userData.dateOfBirth = new Date(1995, 0o1, 0o1);

        await userRepository.save(userData);

        user = userData;
      }
      return res.json({ data: user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

router.put(
  '/update_details',
  async (req: Request, res: Response): Promise<Response> => {
    const nric: string = req.body.nric;
    const height: number = req.body.height;
    const weight: number = req.body.weight;

    if (!nric) return res.status(400).json({ message: 'No NRIC found' });
    if (!height || !weight)
      return res.status(400).json({ message: 'Missing Information' });

    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ nric });
      if (!user) return res.status(404).json({ message: 'No such user found' });

      user.height = height;
      user.weight = weight;

      await userRepository.save(user);

      return res.json({ data: user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

router.put(
  '/update_status',
  async (req: Request, res: Response): Promise<Response> => {
    const nric: string = req.body.nric;
    const status: string = req.body.status;

    if (!nric) return res.status(400).json({ message: 'No NRIC found' });
    if (!status) return res.status(400).json({ message: 'No status found' });

    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ nric });
      if (!user) return res.status(404).json({ message: 'No such user found' });

      user.status = status === 'positive' ? true : false;

      await userRepository.save(user);

      return res.json({ data: user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
