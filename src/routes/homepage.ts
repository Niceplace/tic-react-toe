import { Response, Request } from 'express';
import { join } from 'path';

const homepageRoute = (req: Request, res: Response) => {
  // Load template
  // Respond with it bruh
  return res.status(200).sendFile(join(__dirname, '../views/index.html'));
};

export { homepageRoute };
