import parser from './app/parser';
import formatter from './app/formatter';

(async () => {
  const input = process.env.INPUT_TOFORMAT || '1234.567';

  const parsedInput = parseToNumber(input);
  const formatted = formatNumber(parsedInput);
  console.log('The money amount is %s', formatted);
})();
