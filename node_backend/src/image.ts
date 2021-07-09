import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User.entity';
import { Image } from '../database/entities/Image.entity';

const router = express.Router({
  strict: true,
});

router.post(
  '/save_image',
  async (req: Request, res: Response): Promise<Response> => {
    const nric: string = req.body.nric;
    const an_base64: string = req.body.an_base64;
    const left_foot_base64: string = req.body.left_foot_base64;
    const right_foot_base64: string = req.body.right_foot_base64;

    if (!nric) return res.status(400).json({ message: 'No NRIC found' });
    if (!an_base64 || !left_foot_base64 || !right_foot_base64)
      return res.status(400).json({ message: 'Missing images' });

    try {
      const userRepository = getRepository(User);
      const imageRepository = getRepository(Image);
      const user = await userRepository.findOne({ nric });
      if (user) {
        // Create new AN Data
        const an_image = new Image();
        an_image.name = 'an';
        an_image.base64 = an_base64;
        await imageRepository.save(an_image);

        // Create new Left Foot Data
        const left_foot_image = new Image();
        left_foot_image.name = 'left_foot';
        left_foot_image.base64 = left_foot_base64;
        await imageRepository.save(left_foot_image);

        // Create new Right Foot Data
        const right_foot_image = new Image();
        right_foot_image.name = 'right_foot';
        right_foot_image.base64 = right_foot_base64;
        await imageRepository.save(right_foot_image);

        user.image = [an_image, left_foot_image, right_foot_image];
        await userRepository.save(user);

        return res.json({ data: 'ok' });
      }
      return res.status(404).json({ message: 'No such user' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
