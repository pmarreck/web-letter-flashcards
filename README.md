# Web Letter Flashcards

Deterministic, single-page flashcard app for helping early readers practice two-letter combinations in a mix of serif and sans-serif typefaces. The interface fills the entire mobile viewport, cycling through a curated list of words while randomizing capitalization and font choice.

- **Tech stack:** vanilla HTML/CSS/JS in `docs/index.html`, tested with Deno (`./test`).
- **Fonts:** Atkinson Hyperlegible, Quicksand, Libre Baskerville, EB Garamond, and Tinos to expose both single- and double-storey “a”/“g” glyphs.
- **Randomization:** Seedable Mulberry32 PRNG keeps unit tests deterministic while allowing timestamp seeding at runtime.
- **Hosting:** GitHub Pages-ready by serving `docs/index.html` as the root.

🚀 **Live demo:** https://pmarreck.github.io/web-letter-flashcards/
