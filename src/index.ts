import { parseNumber } from './app/parser';
import { formatNumber } from './app/formatter';

(async () => {
  const input = process.env.INPUT_TOFORMAT || '1234.567';

  const parsedInput = parseNumber(input);
  const formatted = formatNumber(parsedInput);
  console.log('The money amount is %s', formatted);
})();
