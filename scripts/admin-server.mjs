#!/usr/bin/env node
// Local-only content admin for src/data/learning-content.json.
// No framework, no new dependencies — plain Node http + HTML forms.
// Run with: npm run admin   ->  http://localhost:4848
//
// This never commits or pushes anything. Review the diff in
// src/data/learning-content.json yourself, then git add/commit/push
// whenever you're ready to publish.

import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PORT = process.env.ADMIN_PORT ? Number(process.env.ADMIN_PORT) : 4848;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'learning-content.json');

async function loadData() {
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function saveData(data) {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return Object.fromEntries(new URLSearchParams(raw));
}

const PAGE_STYLE = `
  :root { color-scheme: dark; }
  body { font-family: -apple-system, Inter, sans-serif; background: #0b0d13; color: #f0f2f6; max-width: 880px; margin: 0 auto; padding: 32px 20px 80px; line-height: 1.5; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 16px; margin: 40px 0 12px; color: #66e8ff; border-bottom: 1px solid #232a3a; padding-bottom: 8px; }
  .hint { color: #8b95a8; font-size: 13px; margin-bottom: 20px; }
  .card { background: #131722; border: 1px solid #232a3a; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .card b { display: block; }
  .card span { color: #8b95a8; font-size: 13px; }
  .card a { color: #66e8ff; word-break: break-all; }
  form.inline { display: inline; }
  .empty { color: #8b95a8; font-size: 13px; font-style: italic; margin-bottom: 10px; }
  fieldset { border: 1px solid #232a3a; border-radius: 8px; padding: 16px; margin-top: 14px; }
  legend { color: #8b95a8; font-size: 12px; padding: 0 6px; }
  label { display: block; font-size: 12px; color: #8b95a8; margin: 10px 0 4px; }
  input[type=text], input[type=url], select { width: 100%; box-sizing: border-box; background: #0b0d13; border: 1px solid #232a3a; color: #f0f2f6; border-radius: 6px; padding: 8px 10px; font-size: 14px; }
  button { cursor: pointer; border: none; border-radius: 6px; padding: 8px 14px; font-size: 13px; font-weight: 600; }
  button.save { background: linear-gradient(135deg, #66e8ff, #58dfa7); color: #071018; margin-top: 14px; }
  button.delete { background: #2a1418; color: #ff8a9a; border: 1px solid #4a2028; flex: none; }
  .flash { background: #16281f; border: 1px solid #2f5c44; color: #7de3ab; padding: 10px 14px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
`;

function layout(body, flash) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Learning content admin</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>${PAGE_STYLE}</style></head><body>
    <h1>Learning content admin</h1>
    <p class="hint">Local-only — edits write straight to <code>src/data/learning-content.json</code>. Nothing is committed or pushed automatically; review the diff and <code>git add/commit/push</code> yourself when ready.</p>
    ${flash ? `<div class="flash">${esc(flash)}</div>` : ''}
    ${body}
  </body></html>`;
}

function render(data, flash) {
  const { thisWeek, bookshelf, papershelf, resources } = data;

  const thisWeekSection = `
    <h2>This week</h2>
    <form method="POST" action="/update-thisweek">
      <label>Focus</label>
      <input type="text" name="focus" value="${esc(thisWeek.focus)}" required>
      <label>Book title (leave blank for "Updating soon")</label>
      <input type="text" name="bookTitle" value="${esc(thisWeek.book?.title)}">
      <label>Book author</label>
      <input type="text" name="bookAuthor" value="${esc(thisWeek.book?.author)}">
      <label>Book link</label>
      <input type="url" name="bookLink" value="${esc(thisWeek.book?.link)}">
      <label>Paper title (leave blank for "Updating soon")</label>
      <input type="text" name="paperTitle" value="${esc(thisWeek.paper?.title)}">
      <label>Paper link</label>
      <input type="url" name="paperLink" value="${esc(thisWeek.paper?.link)}">
      <button class="save" type="submit">Save this week</button>
    </form>`;

  const bookshelfSection = `
    <h2>Bookshelf (${bookshelf.length})</h2>
    ${bookshelf.length === 0 ? '<p class="empty">No books yet.</p>' : bookshelf.map((b, i) => `
      <div class="card"><div><b>${esc(b.title)}</b><span>${esc(b.author)} — <a href="${esc(b.link)}" target="_blank">${esc(b.link)}</a></span></div>
        <form class="inline" method="POST" action="/delete-book"><input type="hidden" name="index" value="${i}"><button class="delete" type="submit">Delete</button></form>
      </div>`).join('')}
    <fieldset><legend>Add a book</legend>
      <form method="POST" action="/add-book">
        <label>Title</label><input type="text" name="title" required>
        <label>Author</label><input type="text" name="author" required>
        <label>Link</label><input type="url" name="link" required>
        <button class="save" type="submit">Add book</button>
      </form>
    </fieldset>`;

  const papershelfSection = `
    <h2>Papershelf (${papershelf.length})</h2>
    ${papershelf.length === 0 ? '<p class="empty">No papers yet.</p>' : papershelf.map((p, i) => `
      <div class="card"><div><b>${esc(p.title)}</b><span>${esc(p.authors)} — <a href="${esc(p.link)}" target="_blank">${esc(p.link)}</a></span></div>
        <form class="inline" method="POST" action="/delete-paper"><input type="hidden" name="index" value="${i}"><button class="delete" type="submit">Delete</button></form>
      </div>`).join('')}
    <fieldset><legend>Add a paper</legend>
      <form method="POST" action="/add-paper">
        <label>Title</label><input type="text" name="title" required>
        <label>Authors</label><input type="text" name="authors" required>
        <label>Link</label><input type="url" name="link" required>
        <button class="save" type="submit">Add paper</button>
      </form>
    </fieldset>`;

  const resourcesSection = `
    <h2>Recommended learning / videos (${resources.length})</h2>
    ${resources.length === 0 ? '<p class="empty">No resources yet.</p>' : resources.map((r, i) => `
      <div class="card"><div><b>[${esc(r.kind)}] ${esc(r.title)}</b><span>${esc(r.creator)}${r.link ? ` — <a href="${esc(r.link)}" target="_blank">${esc(r.link)}</a>` : ' — no link yet'}</span></div>
        <form class="inline" method="POST" action="/delete-resource"><input type="hidden" name="index" value="${i}"><button class="delete" type="submit">Delete</button></form>
      </div>`).join('')}
    <fieldset><legend>Add a resource</legend>
      <form method="POST" action="/add-resource">
        <label>Kind</label>
        <select name="kind">
          <option value="udemy">Udemy</option>
          <option value="youtube">YouTube</option>
          <option value="playlist">Playlist</option>
        </select>
        <label>Title</label><input type="text" name="title" required>
        <label>Creator</label><input type="text" name="creator" required>
        <label>Link (optional — leave blank for "Coming soon")</label><input type="url" name="link">
        <button class="save" type="submit">Add resource</button>
      </form>
    </fieldset>`;

  return layout(thisWeekSection + bookshelfSection + papershelfSection + resourcesSection, flash);
}

function redirect(res, flash) {
  res.writeHead(302, { Location: flash ? `/?flash=${encodeURIComponent(flash)}` : '/' });
  res.end();
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/') {
      const data = await loadData();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(render(data, url.searchParams.get('flash')));
      return;
    }

    if (req.method === 'POST') {
      const data = await loadData();
      const form = await readBody(req);

      if (url.pathname === '/update-thisweek') {
        data.thisWeek = {
          focus: form.focus || '',
          book: form.bookTitle ? { title: form.bookTitle, author: form.bookAuthor || '', link: form.bookLink || '' } : null,
          paper: form.paperTitle ? { title: form.paperTitle, link: form.paperLink || '' } : null,
        };
        await saveData(data);
        return redirect(res, 'Saved this week.');
      }

      if (url.pathname === '/add-book') {
        data.bookshelf.push({ title: form.title, author: form.author, link: form.link });
        await saveData(data);
        return redirect(res, `Added "${form.title}" to the bookshelf.`);
      }
      if (url.pathname === '/delete-book') {
        data.bookshelf.splice(Number(form.index), 1);
        await saveData(data);
        return redirect(res, 'Removed book.');
      }

      if (url.pathname === '/add-paper') {
        data.papershelf.push({ title: form.title, authors: form.authors, link: form.link });
        await saveData(data);
        return redirect(res, `Added "${form.title}" to the papershelf.`);
      }
      if (url.pathname === '/delete-paper') {
        data.papershelf.splice(Number(form.index), 1);
        await saveData(data);
        return redirect(res, 'Removed paper.');
      }

      if (url.pathname === '/add-resource') {
        data.resources.push({ kind: form.kind, title: form.title, creator: form.creator, link: form.link || null });
        await saveData(data);
        return redirect(res, `Added "${form.title}".`);
      }
      if (url.pathname === '/delete-resource') {
        data.resources.splice(Number(form.index), 1);
        await saveData(data);
        return redirect(res, 'Removed resource.');
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Admin server error: ${err instanceof Error ? err.message : String(err)}`);
  }
});

server.listen(PORT, () => {
  console.log(`Learning content admin running at http://localhost:${PORT}`);
  console.log(`Editing: ${DATA_PATH}`);
});
