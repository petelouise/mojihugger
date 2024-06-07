import { Plugin } from "obsidian";

function addCss(): void {
	console.log("adding css");
	const style = document.createElement("style");
	style.textContent = `
	.emoji {
		font-size: 2.5em;
	}`;
	document.head.appendChild(style);
	// this.styleElement = style;
}

export default class Mojihugger extends Plugin {
	styleElement: HTMLStyleElement;

	onload(): void {
		console.log("~~~~~mojihugger onload~~~~~");
		console.log("~~~~~mojihugger has arrived~~~~~");
		// Inject custom CSS for hanging indent
		addCss();
		console.log("registering markdown post processor");
		this.registerMarkdownPostProcessor((element, context) => {
			console.log("element:", element);
			const emojiRegex = /([\u{1F600}-\u{1F64F}])/gu;
			const matches = element.innerHTML.match(emojiRegex);
			console.log("Matches found:", matches);
			const modifiedInnerHTML = element.innerHTML.replace(
				emojiRegex,
				'<span class="emoji">$1</span>'
			);
			console.log("Modified element.innerHTML:", modifiedInnerHTML);
			element.innerHTML = modifiedInnerHTML;
		});
		console.log("~~~~~mojihugger onload complete~~~~~");
	}

	onunload(): void {
		console.log("~~~~~mojihugger onunload~~~~~");
	}
}
