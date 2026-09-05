#!/usr/bin/env python3
"""Regenerate a post's HTML body from its Markdown source, in place.

    python3 tools/build-post.py post.local.md whack-a-mole/index.html

Only the region between the <!-- BODY:START --> and <!-- BODY:END --> markers
is replaced, so the surrounding page -- <head>, nav, section rail, byline, the
PDF button, footer -- stays hand-editable and is never clobbered.

This is not a general Markdown implementation. It handles exactly what these
posts use, and a few conventions worth knowing:

  * Prose is written one sentence per line for readable diffs; consecutive
    lines become a single <p>. Footnote bodies work the same way -- a note is
    one paragraph however many lines it spans.
  * <a id="..."></a> on the line above a heading or image moves onto that
    element as an id attribute.
  * A numbered list may follow straight on from the sentence introducing it,
    with no blank line between.
  * " --- " (and legacy " -- ") becomes an em dash; assets/ paths become img/.
  * Footnotes must be numbered 1..N in document order -- the no-JS fallback
    list at the end of the page is built in that order and the script refuses
    to run if they don't match.
"""
import io, re, sys

if len(sys.argv) != 3:
    sys.exit(__doc__)
SRC, OUT = sys.argv[1], sys.argv[2]
START, END = "<!-- BODY:START -->", "<!-- BODY:END -->"

src = io.open(SRC, encoding="utf-8").read().split("\n")

try:
    cut = src.index("## Footnotes")
except ValueError:
    sys.exit("%s: no '## Footnotes' heading" % SRC)
body_lines = src[7:cut - 2]          # skip the title/byline block, drop trailing '---'
note_lines = src[cut + 1:]

# --- inline formatting ------------------------------------------------------
def inline(t):
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    def link(m):
        text, url = m.group(1), m.group(2)
        ext = ' target="_blank" rel="noopener"' if url.startswith("http") else ""
        return '<a href="%s"%s>%s</a>' % (url, ext, text)
    t = re.sub(r"\[([^\]\[]+)\]\(([^)]+)\)", link, t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)   # first: may wrap *em*
    t = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", t)
    t = re.sub(r"\[\^(\d+)\]",
               r'<sup class="fn-ref"><a href="#fn-\1" id="fnref-\1">\1</a></sup>', t)
    t = t.replace(" --- ", "—").replace(" -- ", "—")   # author's em dash
    return t

# --- footnote bodies --------------------------------------------------------
notes, order, cur = {}, [], None
for ln in note_lines:
    m = re.match(r"^\[\^(\d+)\]:\s*(.*)$", ln)
    if m:
        cur = m.group(1); order.append(cur); notes[cur] = [m.group(2)]
    elif cur and ln.strip():
        notes[cur].append(ln.strip())
    elif not ln.strip():
        cur = None
if [int(n) for n in order] != list(range(1, len(order) + 1)):
    sys.exit("footnote numbering is not 1..N in order: %s" % order)

# --- block parsing ----------------------------------------------------------
blocks, buf = [], []
for ln in body_lines:
    if ln.strip():
        buf.append(ln)
    elif buf:
        blocks.append(buf); buf = []
if buf:
    blocks.append(buf)

# The source puts <a id="..."></a> on the line directly above its heading or
# figure, and runs numbered lists straight on from the sentence introducing
# them -- both without a blank line. Split those apart into their own blocks.
split = []
for b in blocks:
    while b and re.match(r'^<a id="[^"]+"></a>$', b[0]):
        split.append([b[0]]); b = b[1:]
    if not b:
        continue
    if not re.match(r"^\d+\. ", b[0]):
        for j, l in enumerate(b):
            if re.match(r"^\d+\. ", l):
                split.append(b[:j]); b = b[j:]
                break
    split.append(b)
blocks = split

out, pending_id, i = [], None, 0
IND = " " * 6
while i < len(blocks):
    b = blocks[i]; first = b[0]
    if len(b) == 1 and first.startswith("<a id="):
        pending_id = re.match(r'<a id="([^"]+)"></a>', first).group(1)
        i += 1; continue
    idattr = ' id="%s"' % pending_id if pending_id else ""

    if first.startswith("!["):
        m = re.match(r"^!\[(.*)\]\((.+)\)$", first)
        alt, srcpath = m.group(1), m.group(2).replace("assets/", "img/")
        alt = re.sub(r"[*_]", "", alt).replace('"', "&quot;")
        cap = ""
        if i + 1 < len(blocks) and blocks[i + 1][0].startswith("**Figure"):
            cap = inline(" ".join(blocks[i + 1])); i += 1
        out.append('%s<figure%s>' % (IND, idattr))
        out.append('%s  <img src="%s" alt="%s" loading="lazy">' % (IND, srcpath, alt))
        if cap:
            out.append("%s  <figcaption>%s</figcaption>" % (IND, cap))
        out.append("%s</figure>" % IND)
    elif first.startswith("## "):
        out.append("%s<h2%s>%s</h2>" % (IND, idattr, inline(first[3:])))
    elif first.startswith("### "):
        out.append("%s<h3%s>%s</h3>" % (IND, idattr, inline(first[4:])))
    elif first.startswith("> "):
        out.append("%s<blockquote%s>%s</blockquote>"
                   % (IND, idattr, inline(" ".join(l[2:] for l in b))))
    elif re.match(r"^\d+\. ", first):
        out.append("%s<ol%s>" % (IND, idattr))
        for l in b:
            out.append("%s  <li>%s</li>" % (IND, inline(re.sub(r"^\d+\. ", "", l))))
        out.append("%s</ol>" % IND)
    else:
        out.append("%s<p%s>%s</p>" % (IND, idattr, inline(" ".join(b))))
    pending_id = None
    i += 1

# --- fallback endnote list --------------------------------------------------
fb = ['      <section class="footnotes-fallback">', "        <h2>Notes</h2>", "        <ol>"]
for n in order:
    # Notes are written one sentence per line for readable diffs, same as the
    # body prose; each note is a single paragraph, so join rather than split.
    fb.append('          <li id="fn-%s">%s</li>' % (n, inline(" ".join(notes[n]))))
fb += ["        </ol>", "      </section>"]


page = io.open(OUT, encoding="utf-8").read()
if START not in page or END not in page:
    sys.exit("%s: missing %s / %s markers" % (OUT, START, END))
pre, rest = page.split(START, 1)
_, post = rest.split(END, 1)
new = pre + START + "\n" + "\n".join(out) + "\n\n" + "\n".join(fb) + "\n      " + END + post
io.open(OUT, "w", encoding="utf-8").write(new)
print("%s -> %s   (%d blocks, %d footnotes)" % (SRC, OUT, len(blocks), len(order)))
