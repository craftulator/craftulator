- Context: The repository needs a reusable TypeScript npm library boilerplate that is friendly to LLM-agent maintenance.
- Decision: Use npm, tsup, strict TypeScript, Vitest, ESLint, Prettier, publint, dual ESM/CommonJS output, exact
  dependency versions, and GitHub Actions publishing through npm Trusted Publishing.
- Consequences: The package is immediately buildable and publish-ready after npm trusted publisher setup, while future
  agents have explicit branch, commit, documentation, log, and decision rules.
- Status: accepted
