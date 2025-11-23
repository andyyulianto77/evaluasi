import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.4/+esm';
import { store } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

class FormConnected extends LitElement {
  static properties = {
    // Site / halaman
    siteTitle: { type: String },
    pageHeading: { type: String },
    pageIntro: { type: String },
    // Data pengguna
    userName: { type: String },
    userEmail: { type: String },
    // Konfigurasi kuis sederhana
    quizTitle: { type: String },
    quizQuestionsText: { type: String }, // JSON string pertanyaan kuis
  };

  constructor() {
    super();
    const manifest = store?.manifest || {};
    const userData = store?.userData || {};
    const quizData = store?.quizData || {};

    this.siteTitle = manifest.title || "Default Site Title";

    // Heading & paragraf intro opsional (disimpan di quizData jika ada)
    this.pageHeading = quizData.title || this.siteTitle || "";
    this.pageIntro = quizData.description || "";

    this.userName = userData.name || "";
    this.userEmail = userData.email || "";

    // Kuis: judul + daftar pertanyaan (JSON)
    this.quizTitle = quizData.title || this.pageHeading || "";
    if (Array.isArray(quizData.questions)) {
      this.quizQuestionsText = JSON.stringify(quizData.questions, null, 2);
    } else if (typeof quizData.questions === "string") {
      this.quizQuestionsText = quizData.questions;
    } else {
      this.quizQuestionsText = "";
    }
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: var(--ddd-font-primary, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
      padding: var(--ddd-spacing-4, 16px);
      background: var(--form-background, var(--ddd-theme-default-limestoneLight, #f9f9f9));
      border: 1px solid var(--ddd-theme-default-limestone, #ddd);
      border-radius: var(--form-border-radius, var(--ddd-radius-md, 8px));
      max-width: 520px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-4, 16px);
    }

    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      border-top: 1px solid var(--ddd-theme-default-limestone, #e5e7eb);
      padding-top: var(--ddd-spacing-3, 12px);
    }

    fieldset:first-of-type {
      border-top: none;
      padding-top: 0;
    }

    legend {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--ddd-theme-default-link, #374151);
      padding: 0;
      margin-bottom: var(--ddd-spacing-2, 8px);
    }

    label {
      display: block;
      margin-bottom: 4px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--ddd-theme-default-carbon, #111827);
    }

    input,
    textarea {
      width: 100%;
      font: inherit;
      padding: var(--ddd-spacing-2, 8px);
      border-radius: var(--ddd-radius-sm, 4px);
      border: 1px solid var(--ddd-theme-default-limestoneDark, #d1d5db);
      box-sizing: border-box;
      background-color: #fff;
    }

    textarea {
      min-height: 72px;
      resize: vertical;
      line-height: 1.4;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--ddd-theme-default-link, #2563eb);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    small {
      display: block;
      font-size: 0.75rem;
      color: var(--ddd-theme-default-slateDark, #6b7280);
      margin-top: 2px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--ddd-spacing-2, 8px);
    }

    button[type="submit"] {
      padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
      background: var(--form-primary-color, var(--ddd-theme-default-link, #2563eb));
      color: #fff;
      border: none;
      border-radius: var(--ddd-radius-md, 8px);
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
    }

    button[type="submit"]:hover {
      background: var(--ddd-theme-default-linkHover, #1d4ed8);
    }
  `;

  _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const userName = form.querySelector("#user-name")?.value?.trim() || "";
    const userEmail = form.querySelector("#user-email")?.value?.trim() || "";
    const pageHeading = form.querySelector("#page-heading")?.value?.trim() || "";
    const pageIntro = form.querySelector("#page-intro")?.value?.trim() || "";
    const quizTitle = form.querySelector("#quiz-title")?.value?.trim() || "";
    const quizQuestionsText = form.querySelector("#quiz-questions")?.value || "";

    // Update store.userData
    store.userData = {
      ...(store.userData || {}),
      name: userName,
      email: userEmail,
    };

    // Update quizData (judul, deskripsi, dan daftar soal JSON string)
    const currentQuiz = store.quizData || {};
    store.quizData = {
      ...currentQuiz,
      title: quizTitle || pageHeading || currentQuiz.title || "",
      description: pageIntro,
      questions: quizQuestionsText || currentQuiz.questions || "",
    };

    this.siteTitle = store.manifest?.title || this.siteTitle;
    this.pageHeading = pageHeading || store.quizData.title || this.pageHeading;
    this.pageIntro = pageIntro;
    this.userName = userName;
    this.userEmail = userEmail;
    this.quizTitle = store.quizData.title;
    this.quizQuestionsText = store.quizData.questions;

    const detail = {
      user: { ...store.userData },
      quizData: { ...store.quizData },
      page: {
        heading: this.pageHeading,
        intro: this.pageIntro,
      },
    };

    // Event agar halaman lain bisa bereaksi (lihat QUIZ_FORM_GUIDE.md)
    this.dispatchEvent(
      new CustomEvent("form-data-updated", {
        detail,
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent("form-submitted", {
        detail,
        bubbles: true,
        composed: true,
      })
    );

    console.log("Updated user data:", store.userData);
    console.log("Updated quiz data:", store.quizData);
    alert("Data form & kuis berhasil diperbarui!");
  }

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <fieldset>
          <legend>Informasi Halaman</legend>
          <label for="site-title">Site Title</label>
          <input
            id="site-title"
            type="text"
            .value=${this.siteTitle || ""}
            disabled
          />
          <label for="page-heading">Heading / Judul Halaman</label>
          <input
            id="page-heading"
            type="text"
            .value=${this.pageHeading || ""}
            placeholder="Misal: Kuis Pengetahuan Umum"
          />
          <label for="page-intro">Paragraf Pembuka</label>
          <textarea
            id="page-intro"
            placeholder="Tulis paragraf pengantar atau deskripsi halaman di sini"
          >${this.pageIntro || ""}</textarea>
          <small>Heading & paragraf ini bisa dipakai untuk mengisi teks judul / deskripsi
            pada template halaman kuis.</small>
        </fieldset>

        <fieldset>
          <legend>Data Pengguna</legend>
          <label for="user-name">Nama</label>
          <input id="user-name" type="text" .value=${this.userName || ""} />

          <label for="user-email">Email</label>
          <input id="user-email" type="email" .value=${this.userEmail || ""} />
        </fieldset>

        <fieldset>
          <legend>Konfigurasi Kuis</legend>
          <label for="quiz-title">Judul Kuis</label>
          <input
            id="quiz-title"
            type="text"
            .value=${this.quizTitle || ""}
            placeholder="Misal: Kuis Sejarah Indonesia"
          />

          <label for="quiz-questions">Daftar Soal (JSON)</label>
          <textarea
            id="quiz-questions"
            placeholder='[
  {"question": "2+2?", "answer": "4"}
]'
          >${this.quizQuestionsText || ""}</textarea>
          <small>
            Isi dengan array JSON pertanyaan, misalnya:
            [{"question":"2+2?","answer":"4"}].
            Komponen <code>confetti-quiz</code> akan membaca nilai ini lewat
            <code>store.quizData.questions</code> jika Anda menghubungkannya.
          </small>
        </fieldset>

        <div class="actions">
          <button type="submit">Simpan Pengaturan</button>
        </div>
      </form>
    `;
  }
}

customElements.define('form-connected', FormConnected);
