module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'commit-match-team-pattern': [2, 'always'],
    'type-empty': [0, 'never'],
    'subject-empty': [0, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\[EDIT-.*\]|\[\?\]) (.*): (.*)/,
      headerCorrespondence: ['ticket', 'type', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'commit-match-team-pattern': (parsed) => {
          const { ticket, type, subject } = parsed;
          console.log(ticket, type, subject);

          if (ticket === null && type === null && subject === null) {
            return [
              false,
              "commit must be in format '[EDIT-xxx] type: subject' or '[?] type: subject'",
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
};
