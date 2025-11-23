/**
 * Copyright 2025 andyprodistik
 * @license Apache-2.0, see License.md for full text.
 */
import { HAXCMSLitElementTheme, css, unsafeCSS, html, store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { PolarisFlexTheme } from "@haxtheweb/polaris-theme/lib/polaris-flex-theme.js";
import "@haxtheweb/haxcms-elements/lib/ui-components/blocks/site-children-block.js";

/**
 * `CustomEval2Theme`
 * `CustomEval2Theme based on modern flex design system`
 * `This theme is an example of extending an existing theme component`
 *
 * @microcopy - language worth noting:
 *  - HAXcms - A headless content management system
 *  - HAXCMSTheme - A super class that provides correct baseline wiring to build a new theme
 *
 * @documentation - see HAX docs to learn more about theming
 *  - Custom theme development - https://haxtheweb.org/documentation/developers/haxsite/custom-theme-development
 *  - Theme Blocks - https://haxtheweb.org/documentation/developers/theme-blocks
 *  - DDD - https://haxtheweb.org/documentation/ddd
 *  - Data Store - https://haxtheweb.org/documentation/developers/haxsite/data-store
 * @element custom-eval2-theme
 */
class CustomEval2Theme extends PolarisFlexTheme {
  //styles function
  static get styles() {
    return [
      super.styles,
      css`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');

        :host {
          display: block;
          font-family: "Merriweather", serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
          font-variation-settings: "wdth" 100;
        }
        
        /* Desktop and tablet layout */
        aside {
          float: left;
          width: 240px;
        }
        
        aside section h4 {
          font-size: 36px;
          margin: var(--ddd-spacing-0) var(--ddd-spacing-0) var(--ddd-spacing-6) var(--ddd-spacing-0);
          text-transform: lowercase;
          font-family: "Merriweather", serif;
          font-weight: 300;
        }

        aside section {
          background-color: #faf9bf;
          border-radius: 3px;
          margin-bottom: var(--ddd-spacing-10);
          padding: 0px var(--ddd-spacing-10) var(--ddd-spacing-10) 0px;
        }

        site-children-block {
          --site-children-block-border-bottom: lightblue 2px solid;
          --site-children-block-li-padding: 8px 0;
          --site-children-block-link-hover-color: rgb(0, 95, 169);
          --site-children-block-active-border-left: rgb(0, 95, 169) 3px solid;
          --site-children-block-link-active-color: rgb(0, 30, 68);
          font-family: "Merriweather", serif;
          font-weight: 400;
          font-size: 16px;
        }
        
        /* Mobile responsive layout */
        @media (max-width: 768px) {
          aside {
            float: none;
            width: 100%;
            clear: both;
          }
          
          aside[role="complementary"] {
            display: none; /* Sembunyikan sidebar di layar kecil */
          }
          
          aside section {
            margin-bottom: var(--ddd-spacing-5);
          }
        }
        
        @media (min-width: 769px) {
          aside[role="complementary"] {
            display: block; /* Tampilkan sidebar di layar besar */
          }
        }
      `,
    ];
  }

  /**
   * Overload methods for customization of slots from the base class 
   */
  renderHeaderSlot() {
    return html``
  }

  renderSideBar() {
    return html`
    <aside
          role="complementary"
          aria-label="Primary Sidebar"
          itemtype="http://schema.org/WPSideBar"
          part="page-primary-sidebar"
        >
          <section>
            <site-children-block
              part="page-children-block"
              dynamic-methodology="ancestor"
            ></site-children-block>
          </section>
        </aside>
    
    `
  }

  renderFooterContactInformation() {
    return html``
  }

  renderFooterSecondarySlot() {
    return html``
  }

  renderFooterPrimarySlot() {
    return html``
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "custom-eval2-theme";
  }
 
  constructor() {
    super();
  }
}
customElements.define(CustomEval2Theme.tag, CustomEval2Theme);
export { CustomEval2Theme };
