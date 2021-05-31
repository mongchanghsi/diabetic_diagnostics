import express, { Request, Response } from 'express';

const router = express.Router({
  strict: true,
});

router.post(
  '/login',
  async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.body.id;
    // Check if id exist in DB,
    // if exist, pull the data out of the db
    // else, add a new entry
    return res.json('');
  }
);

router.put(
  '/update',
  async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.body.id;
    const height: string = req.body.height;
    const weight: string = req.body.weight;
    // Look for the row with the id
    // Update that row with the new height and weight values
    return res.json('');
  }
);

export default router;
