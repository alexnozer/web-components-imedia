import hljs from './highlight.min.js';

export class CodeBlock extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.innerHTML = `
			<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/stackoverflow-light.min.css">
			<style>
				:host {
					display: block;
					font-size: 16px;
					line-height: 1.5;
				}

				pre {
					margin: 0;
					font-family: inherit;
				}

				code {
					font-family: inherit;
					overflow: hidden;
					white-space: pre-wrap;
				}
			</style>
			${this._getHighlightedCode()}
		`;
	}

	_getHighlightedCode() {
		const code = this._cleanIndentation(this.innerHTML).trim();
		this.innerHTML = '';

		const codeNode = document.createElement('code');
		codeNode.classList.add(`language-${this.getAttribute('language')}`);
		codeNode.innerHTML = code;
		hljs.highlightBlock(codeNode);
		
		return `<pre>${codeNode.outerHTML}</pre>`;
	}

	_cleanIndentation(str) {
    const pattern = str.match(/\s*\n[\t\s]*/);
    return str.replace(new RegExp(pattern, 'g'), '\n');
  }
}

customElements.define('code-block', CodeBlock);