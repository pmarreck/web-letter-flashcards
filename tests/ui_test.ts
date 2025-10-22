import {
	assertEquals,
	assertStringIncludes,
} from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { loadAppModule } from "./support/module_loader.ts";

Deno.test("html contains flashcard container", async () => {
	const html = await Deno.readTextFile("./flashcards.html");
	assertStringIncludes(html, 'id="card"');
});

Deno.test("docs index mirrors flashcard container", async () => {
	const html = await Deno.readTextFile("./docs/index.html");
	assertStringIncludes(html, 'id="card"');
});

Deno.test("renderCard updates element text and font family", async () => {
	const { renderCard } = await loadAppModule();
	type FakeElement = {
		textContent: string | null;
		style: { fontFamily: string };
	};
	const element: FakeElement = { textContent: "", style: { fontFamily: "" } };

	renderCard(element as unknown as FakeElement, {
		text: "Ba",
		word: "ba",
		fontFamily: "EB Garamond",
		isCapitalized: true,
	});

	assertEquals(element.textContent, "Ba");
	assertEquals(element.style.fontFamily, "EB Garamond");
});

Deno.test("attachFlashcardApp renders first card and advances on click", async () => {
	const { attachFlashcardApp } = await loadAppModule();

	type Listener = (event?: { preventDefault?: () => void }) => void;
	const listeners: Record<string, Listener> = {};

	type FakeElement = {
		textContent: string | null;
		style: { fontFamily: string };
	};
	const cardElement: FakeElement = {
		textContent: "",
		style: { fontFamily: "" },
	};

	type FakeDocument = {
		getElementById(id: string): unknown;
		addEventListener(type: string, handler: Listener): void;
	};

	const documentStub: FakeDocument = {
		getElementById(id: string) {
			return id === "card" ? (cardElement as unknown) : null;
		},
		addEventListener(type: string, handler: Listener) {
			listeners[type] = handler;
		},
	};

	attachFlashcardApp({
		document: documentStub as unknown as FakeDocument,
		words: ["ba", "be", "bi"],
		seed: 1234,
	});

	assertEquals(cardElement.textContent, "Ba");
	assertEquals(cardElement.style.fontFamily, "Tinos");

	const clickHandler = listeners.click;
	if (!clickHandler) {
		throw new Error("click listener not registered");
	}

	clickHandler();

	assertEquals(cardElement.textContent, "bi");
	assertEquals(cardElement.style.fontFamily, "Atkinson Hyperlegible");
});

Deno.test("bootstrapFlashcards attaches using document defaults", async () => {
	const { bootstrapFlashcards } = await loadAppModule();

	type Listener = (event?: { preventDefault?: () => void }) => void;
	const listeners: Record<string, Listener> = {};

	type FakeElement = {
		textContent: string | null;
		style: { fontFamily: string };
	};
	const cardElement: FakeElement = {
		textContent: "",
		style: { fontFamily: "" },
	};

	type FakeDocument = {
		getElementById(id: string): unknown;
		addEventListener(type: string, handler: Listener): void;
	};

	const documentStub: FakeDocument = {
		getElementById(id: string) {
			return id === "card" ? (cardElement as unknown) : null;
		},
		addEventListener(type: string, handler: Listener) {
			listeners[type] = handler;
		},
	};

	bootstrapFlashcards(documentStub as unknown as FakeDocument);

	assertEquals(cardElement.textContent !== "", true);
});

Deno.test("html uses enlarged card typography", async () => {
	const html = await Deno.readTextFile("./flashcards.html");
	assertStringIncludes(html, "font-size: clamp(12rem, 36vw, 24rem);");
});
