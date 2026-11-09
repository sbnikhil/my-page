import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from '../../src/lib/frontmatter.mjs';

interface Step {
  uses?: string;
  run?: string;
  with?: Record<string, unknown>;
}

interface Job {
  permissions?: Record<string, string> | string;
  env?: Record<string, string>;
  steps?: Step[];
}

interface Workflow {
  permissions?: Record<string, string> | string;
  env?: Record<string, string>;
  jobs: Record<string, Job>;
}

const directory = join(process.cwd(), '.github/workflows');
const workflows = readdirSync(directory)
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => {
    const yaml = readFileSync(join(directory, name), 'utf8');
    // Reuse the YAML parser already used for post frontmatter.
    const workflow = parseFrontmatter(`---\n${yaml}\n---`).data as Workflow;
    return { name, workflow };
  });

const stepsOf = (workflow: Workflow) =>
  Object.values(workflow.jobs).flatMap((job) => job.steps ?? []);

describe.each(workflows)('$name credential boundaries', ({ workflow }) => {
  it('pins every external action to a full commit SHA', () => {
    for (const { uses } of stepsOf(workflow)) {
      if (uses) expect(uses).toMatch(/^[\w./-]+@[a-f0-9]{40}$/);
    }
  });

  it('removes checkout authentication before repository code executes', () => {
    for (const step of stepsOf(workflow)) {
      if (step.uses?.startsWith('actions/checkout@')) {
        expect(step.with?.['persist-credentials']).toBe(false);
      }
    }
  });

  // Vercel builds and deploys the site from its own Git integration, so no
  // workflow job needs write access or a token.
  it('grants no write permission and exposes no token to any job', () => {
    expect(workflow.permissions).toEqual({ contents: 'read' });
    for (const job of Object.values(workflow.jobs)) {
      const permissions = job.permissions ?? workflow.permissions;
      expect(typeof permissions).toBe('object');
      expect(Object.values(permissions ?? {})).not.toContain('write');
      expect(JSON.stringify([workflow.env, job.env, job.steps])).not.toMatch(
        /\$\{\{\s*(?:secrets[.\[]|github\.token)/,
      );
    }
  });

  it('leaves deployment to Vercel', () => {
    for (const { uses } of stepsOf(workflow)) {
      expect(uses ?? '').not.toMatch(
        /^actions\/(?:configure-pages|upload-pages-artifact|deploy-pages)@/,
      );
    }
  });
});
