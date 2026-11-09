# my-page

Personal portfolio of Bhaskar Nikhil Sunkara. A static Next.js site deployed on Vercel.

## Run it locally

```bash
nvm use        # Node version from .nvmrc
npm ci
npm run dev    # http://localhost:3000
```

## Checks

```bash
npm run format && npm run lint && npm run type-check && npm test
npm run og:check && npm run build && npm run verify-export && npm run measure-export
```

`AGENTS.md` documents the conventions behind these checks, and `docs/portfolio-brief.md` holds the design brief.

## Deployment

Vercel builds every branch into a preview URL and deploys `main` to production. GitHub Actions runs the checks above on every push and pull request; it never deploys.

## Credits

Built on [mldangelo/personal-site](https://github.com/mldangelo/personal-site) by Michael D'Angelo (MIT), with the dock component from [dillionverma/portfolio](https://github.com/dillionverma/portfolio) (MIT). Both licenses are kept in `LICENSE`.
