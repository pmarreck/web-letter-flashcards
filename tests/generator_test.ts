import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { loadAppModule } from "./support/module_loader.ts";

Deno.test("generator produces deterministic card for seed", async () => {
	const { createCardGenerator, FONT_LIST } = await loadAppModule();

	const generator = createCardGenerator({
		words: ["ba", "be", "bi"],
		fonts: FONT_LIST,
		seed: 1234,
	});

	const card = generator.nextCard();

	assertEquals(card.word, "ba");
	assertEquals(card.text, "Ba");
	assertEquals(card.fontFamily, "Tinos");
	assertEquals(card.isCapitalized, true);
});

Deno.test("generator uses default word list when none provided", async () => {
	const { createCardGenerator, WORD_LIST, FONT_LIST } = await loadAppModule();

	assert(Array.isArray(WORD_LIST));
	assert(WORD_LIST.length > 0);

	const generator = createCardGenerator({
		fonts: FONT_LIST,
		seed: 5,
	});

	const card = generator.nextCard();

	assert(WORD_LIST.includes(card.word));
});

Deno.test("generator uses default fonts when none provided", async () => {
	const { createCardGenerator, FONT_LIST } = await loadAppModule();

	assert(Array.isArray(FONT_LIST));
	assertEquals(FONT_LIST.length, 5);
	assertEquals(FONT_LIST, [
		"Atkinson Hyperlegible",
		"Quicksand",
		"Libre Baskerville",
		"EB Garamond",
		"Tinos",
	]);

	const generator = createCardGenerator({
		seed: 11,
	});

	const card = generator.nextCard();

	assert(FONT_LIST.includes(card.fontFamily));
});
