# Drake vs. Kendrick, Clipped

An interactive deep dive into how short-form video (TikTok, Reels, Shorts and livestream clips) covered, judged and spread the 2024 Drake–Kendrick Lamar feud.

Georgey Kurien · INDS-1135 TikTok & Popular Culture · Fanshawe College · November 2026

## Views
- **Story**: argument, interactive timeline, analysis ("the four jobs of a clip"), feedback loop, conclusion
- **Song timeline**: every diss track in release order, a part-by-part breakdown in my own words, and the backstory each part points to (lyrics are not reproduced; each song links to Genius)
- **Legal timeline**: when the fight left the music and moved into real life and the courts
- **Creator watch**: creator videos from each phase of the beef, each set followed by my summary
- **References** (`references.html`): every source in APA 7, with links to each place it is cited

## Editing
All text lives in `assets/data.js`:
- `CREATOR_PHASES` holds the videos and my summaries. To add a TikTok, add
  `{platform:"tiktok", id:"VIDEO_ID", url:"FULL_LINK", title:"…", by:"@handle", date:"Mon YYYY", type:"TikTok", why:"…"}`
  to a phase's `videos` list.
- `REFS` holds the references. APA letters (2024a, 2024b) are added automatically.

`assets/usage.js` (the "used in" links on the References page) is generated from the rendered site.
