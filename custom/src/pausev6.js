import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit@3.1.4/+esm";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class EnhancedPauseComponent extends DDDSuper(LitElement) {
  static get properties() {
    return {
      visibleContent: { type: Number },
      showButtons: { type: Boolean },
      showAllOption: { type: Boolean },
      labels: { type: Array },
    };
  }

  constructor() {
    super();
    this.visibleContent = 1;
    this.showButtons = true;
    this.showAllOption = false;
    this.labels = ["Content 1", "Content 2", "Content 3", "Content 4", "Content 5", "Content 6","Content 7","Content 8","Content 9","Content 10","Content 11","Content 12"];
    this._dddTokens = {};
    // console.log('EnhancedPauseComponent constructed');
  }

  connectedCallback() {
    super.connectedCallback();
    // console.log('EnhancedPauseComponent connected');
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this._readDDDCustomProperties();
  }

  /**
   * Baca semua CSS custom properties yang diawali --ddd-
   * dari tema aktif HAXcms / DDD (misalnya PolarisFlexTheme).
   */
  _readDDDCustomProperties() {
    if (!globalThis.document || !globalThis.getComputedStyle) {
      return;
    }
    const root = globalThis.document.documentElement;
    const computed = getComputedStyle(root);
    const tokens = {};

    for (let i = 0; i < computed.length; i += 1) {
      const name = computed[i];
      if (name && name.startsWith("--ddd-")) {
        tokens[name] = computed.getPropertyValue(name).trim();
      }
    }

    this._dddTokens = tokens;
    console.debug(
      "[enhanced-pause-component] DDD CSS custom properties dari tema aktif:",
      tokens,
    );
  }

  static get styles() {
    return css`

      .content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      }
      .content.visible {
        max-height: 100%;
      }
      .button-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: var(--ddd-spacing-4, 20px);
        gap: var(--ddd-spacing-2, 8px);
      }
      button {
        padding: var(--ddd-spacing-2, 10px) var(--ddd-spacing-4, 20px);
        background-color: var(
          --pause-button-bg,
          var(--ddd-theme-default-link, #f52675)
        );
        color: var(--pause-button-color, #ffffff);
        border: none;
        border-radius: var(--ddd-radius-md, 4px);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      button:hover {
        background-color: var(
          --pause-button-bg-hover,
          var(--ddd-theme-default-linkHover, #2d3748)
        );
      }
      button:hidden {
        display: none;
      }

           /* 2. Ink Drop Button */
           button {
            background: var(
          --pause-button-bg,
          var(--ddd-theme-default-link, #ffffff)
        );
            color: #333;
            position: relative;
            overflow: hidden;
            padding: var(--ddd-spacing-4, 10px) var(--ddd-spacing-6, 20px);
        /* background-color: var(
          --pause-button-bg,
          var(--ddd-theme-default-link, #f52675)
        ); */
        color: var(--pause-button-color, #ffffff);
        border: none;
        border-radius: var(--ddd-radius-md, 4px);
        cursor: pointer;
        transition: all 0.3s ease;
        }

        button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: var(--ddd-theme-default-globalNeon);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }

        button:hover::before {
            width: 300px;
            height: 300px;
        }

        button:hover {
            color: white;
        }

        button span {
            position: relative;
            z-index: 1;
        }

      .arrow-down {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid var(--pause-arrow-color, var(--ddd-theme-default-link, #85adf1));
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      .arrow-down:hover {
        transform: translateY(2px);
      }
    `;
  }

  render() {
    console.log('Rendering EnhancedPauseComponent');
    return html`
      <div class="wrapper">
        ${this.renderContent()}
        ${this.showButtons ? this.renderButtons() : ''}
      </div>
    `;
  }

  renderContent() {
    return this.labels.map(
      (label, index) => html`
        <div class="content ${this.visibleContent > index ? "visible" : ""}">
          <slot name="content-${index + 1}">Default content for ${label}</slot>
        </div>
      `
    );
  }

  renderButtons() {
    return html`
      <div class="button-container">
        <button @click=${() => this.handlePause()}>Lanjut ... </button>
        <button
          ?hidden=${!this.showAllOption}
          @click=${() => this.showAll()}
        >
          Tampilkan Semua
        </button>
      </div>
    `;
  }

  handlePause = () => {
    // console.log('handlePause called');
    if (this.visibleContent < this.labels.length) {
      this.visibleContent++;
      this.launchConfetti();
    } else {
      this.visibleContent = this.labels.length;
      this.showButtons = false;
    }
    this.showAllOption = this.visibleContent < this.labels.length;
    this.requestUpdate();
  }

  showAll = () => {
    // console.log('showAll called');
    this.visibleContent = this.labels.length;
    this.showButtons = false;
    this.launchConfetti();
    this.requestUpdate();
  }

  /**
   * Trigger confetti effect menggunakan KuisConfeti atau canvas-confetti
   */
  launchConfetti() {
    // Coba gunakan KuisConfeti overlay jika ada
    const overlay = document.getElementById('confetti') || document.querySelector('kuis-confeti');
    if (overlay && typeof overlay.fire === 'function') {
      overlay.fire({ duration: 1500, particleCount: 120 });
      return;
    }

    // Fallback ke canvas-confetti jika tersedia
    if (window.confetti) {
      const cs = getComputedStyle(document.documentElement);
      const colors = [
        cs.getPropertyValue('--ddd-theme-default-skyBlue')?.trim() || '#3da9fc',
        cs.getPropertyValue('--ddd-theme-default-accent')?.trim() || '#ef4565',
        cs.getPropertyValue('--ddd-theme-default-link')?.trim() || '#6246ea',
        cs.getPropertyValue('--ddd-theme-default-lime')?.trim() || '#84cc16',
        cs.getPropertyValue('--ddd-theme-default-warning')?.trim() || '#f59e0b',
      ];

      window.confetti({
        particleCount: 100,
        spread: 90,
        angle: 90,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.5 },
        colors: colors
      });
    }
  }
}

customElements.define('enhanced-pause-component', EnhancedPauseComponent);