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

export default class ExamplePlugin extends Plugin {
	async onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			const lines = element.findAll(".cm-line");
			const emojiRegex = /([\u{1F600}-\u{1F64F}])/gu;
			console.log("element:", element);
			for (const line of lines) {
				console.log("line:", line);
				const matches = line.innerHTML.match(emojiRegex);
				console.log("Matches found:", matches);
				const modifiedInnerHTML = element.innerHTML.replace(
					emojiRegex,
					'<span class="emoji">$1</span>'
				);
				console.log("Modified element.innerHTML:", modifiedInnerHTML);
				element.innerHTML = modifiedInnerHTML;
			}
		});
	}
}
