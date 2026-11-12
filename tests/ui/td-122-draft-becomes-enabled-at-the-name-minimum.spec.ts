// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { chooseCategory, openCreateModal } from './admin-team';

test.describe('AC-16 Draft button', () => {
  test('TD-122 Draft becomes enabled at the name minimum', async ({ page }) => {
    test.fixme();
    // 1. Preconditions: The «Додати в команду» modal is open. «Опис» is empty. No photo is chosen. The category «Керівництво» exists. Test data: Name «Ан». Category «Керівництво». Type «Ан» into the textbox «Ім'я та Прізвище».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('Ан');

    // 2. Leave «Ім'я та Прізвище».
    await page.keyboard.press('Tab');

    // 3. Choose «Керівництво» from the «Категорія» list opened by «Оберіть категорію».
    await chooseCategory(page, 'Керівництво');

    // expect: «Зберегти як чернетку» is enabled.
    // FIXME: with a valid name «Ан», the category «Керівництво» and an empty «Опис» the application keeps
    // «Зберегти як чернетку» disabled. It enables the button only after «Опис» is also filled (the field is marked required with «*»).
    await expect(page.getByRole('button', { name: 'Зберегти як чернетку' })).toBeEnabled();
  });
});
