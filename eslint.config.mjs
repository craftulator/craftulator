import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['coverage', 'dist', 'node_modules'],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        document: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              importNames: [
                'FormattedDate',
                'FormattedDateTimeRange',
                'FormattedDisplayName',
                'FormattedList',
                'FormattedMessage',
                'FormattedNumber',
                'FormattedPlural',
                'FormattedRelativeTime',
                'FormattedTime',
              ],
              message: 'Use useIntl() and local defineMessages() descriptors instead of React Intl UI components.',
              name: 'react-intl',
            },
          ],
        },
      ],
    },
  },
);
