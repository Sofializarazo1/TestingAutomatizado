import { Page } from "@playwright/test";

export class LoginPage {
  private readonly url =
    "http://www.cs.uns.edu.ar/~mll/temp/testing/hogwarts/login.html";

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async completeEmail(email: string): Promise<void> {
    await this.page.locator("#email").fill(email);
  }

  async completePassword(password: string): Promise<void> {
    await this.page.locator("#password").fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByRole("button", { name: "Ingresar" }).click();
  }

  async getAlertOrResponse(): Promise<string> {
    const message = this.page.locator(
      "#error-message, #success-message, [role='alert']",
    );

    if (await message.count()) {
      return (await message.first().innerText()).trim();
    }

    if (new URL(this.page.url()).pathname.endsWith("/bienvenida.html")) {
      return "Acceso autorizado. Redirección a la página principal.";
    }

    return "";
  }

  async getLockoutWarning(): Promise<string> {
    const warning = this.page.getByText(
      "Atención, su cuenta está a punto de ser bloqueada.",
      { exact: true },
    );

    return (await warning.count()) ? (await warning.first().innerText()).trim() : "";
  }
}
