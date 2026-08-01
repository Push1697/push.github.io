# Learning content admin

A local-only tool to add/remove Bookshelf, Papershelf, "this week", and
recommended-learning entries without editing code.

## Why local-only

This site is a static export (`output: 'export'` in `next.config.ts`, deployed
to GitHub Pages) — there's no server at runtime on the live domain, so a
live "add content" form on the deployed site isn't possible. This tool runs
on your own machine instead, the same way `publish-garden` already works for
the Quartz learning garden.

## Usage

```bash
npm run admin
```

Opens on **http://localhost:4848**. Add or delete books, papers, and
resources, or update "this week"'s focus/reading/paper — every save writes
straight to `src/data/learning-content.json` on disk. No rebuild needed to
see the change take effect next time you run `npm run dev`.

**Nothing is committed or pushed automatically.** Once you're happy with a
batch of changes:

```bash
git diff src/data/learning-content.json   # review what changed
git add src/data/learning-content.json
git commit -m "Add <whatever> to the learning library"
git push
```

Then deploy as usual (rebuild / your existing GitHub Pages workflow) to
publish the change on the main domain.

## Where the content shows up

| Section | Page |
|---|---|
| This week (focus/reading/paper) | `/learning` |
| Bookshelf | `/learning/bookshelf` |
| Papershelf | `/learning/papershelf` |
| Recommended learning / videos | `/learning/videos` |

The homepage's Learning section (`#learning`) only shows a short teaser and
links out to `/learning` for the full library.
