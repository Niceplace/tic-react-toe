import { Response, Request } from 'express';
import { parseNumber } from '../app/parser';
import { formatNumber } from '../app/formatter';

const formatRoute = (req: Request, res: Response) => {
  let response: string;
  let status = 200;
  if (req.params.input) {
    try {
      const parsedInput = parseNumber(req.params.input);
      response = formatNumber(parsedInput);
    } catch (error) {
      response = error.message;
      status = 400;
    }
  } else {
    response =
      'Something very wrong happened, please restart the application !';
    status = 500;
  }
  return res.status(status).send(response);
};

export { formatRoute };
