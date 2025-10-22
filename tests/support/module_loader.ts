export async function loadAppModule() {
	const htmlSource = await Deno.readTextFile("./flashcards.html");
	const scriptMatch = htmlSource.match(
		/<script\s+type="module"[^>]*>([\s\S]*?)<\/script>/i,
	);
	if (!scriptMatch) {
		throw new Error("App module script not found in flashcards.html");
	}
	const scriptContent = scriptMatch[1];
	const moduleUrl = `data:text/javascript,${encodeURIComponent(scriptContent)}`;
	return await import(moduleUrl);
}
