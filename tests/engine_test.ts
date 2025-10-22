import {
	assertEquals,
} from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { loadAppModule } from "./support/module_loader.ts";

Deno.test("engine emits next card via callback", async () => {
	const { createFlashcardEngine, FONT_LIST } = await loadAppModule();
	type CardRecord = {
		text: string;
		fontFamily: string;
		word: string;
		isCapitalized: boolean;
	};
	const seen: CardRecord[] = [];

	const engine = createFlashcardEngine({
		words: ["ba", "be", "bi"],
		fonts: FONT_LIST,
		seed: 1234,
		onCard: (card: CardRecord) => seen.push(card),
	});

	const emitted = engine.next();

	assertEquals(seen.length, 1);
	assertEquals(seen[0], emitted);
	assertEquals(emitted.text, "Ba");
	assertEquals(emitted.fontFamily, "Tinos");
});
