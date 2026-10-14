import {
  After,
  Before,
  Given,
  Then,
  When,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { expect, Page, Browser, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

setDefaultTimeout(30_000);

let browser: Browser | undefined;
let page: Page;
let loginPage: LoginPage;

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

After(async function () {
  if (browser) {
    await browser.close();
    browser = undefined;
  }
});

Given("que estoy en la página de inicio de sesión", async function () {
  await loginPage.navigate();
});

When(
  "ingreso el correo {string} y la contraseña {string}",
  async function (email: string, password: string) {
    await loginPage.completeEmail(email);
    await loginPage.completePassword(password);
  },
);

When("presiono el botón ingresar", async function () {
  await loginPage.clickLogin();
});

When(
  "intento iniciar sesión {int} veces con el correo {string} y la contraseña {string}",
  async function (attempts: number, email: string, password: string) {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      await loginPage.completeEmail(email);
      await loginPage.completePassword(password);
      await loginPage.clickLogin();
    }
  },
);

Then(
  "debería ver el mensaje {string}",
  async function (expectedMessage: string) {
    await expect(await loginPage.getAlertOrResponse()).toBe(expectedMessage);

    if (expectedMessage.startsWith("Acceso autorizado.")) {
      await expect(page).toHaveURL(/\/bienvenida\.html$/);
    }
  },
);

Then(
  "debería ver la advertencia de bloqueo {string}",
  async function (expectedWarning: string) {
    await expect(await loginPage.getLockoutWarning()).toBe(expectedWarning);
  },
);
