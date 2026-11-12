// spec: specs/US-01.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';
import { choosePhoto, chooseCategory, openCreateModal } from './admin-team';

test.describe('AC-19 Publish button', () => {
  test('TD-142 Publish becomes enabled when every field is valid', async ({ page }) => {
    // 1. Preconditions: The «Додати в команду» modal is open. The category «Керівництво» exists. Test data: Name «Анна Коваленко». Category «Керівництво». Description «Опис текст» (10 characters). Photo portrait.jpeg, 320×400 px, 500 Kb. Type «Анна Коваленко» into the textbox «Ім'я та Прізвище».
    await openCreateModal(page);
    await page.getByLabel("Ім'я та Прізвище").fill('Анна Коваленко');

    // 2. Leave «Ім'я та Прізвище».
    await page.keyboard.press('Tab');

    // 3. Choose «Керівництво» from the «Категорія» list opened by «Оберіть категорію».
    await chooseCategory(page, 'Керівництво');

    // 4. Type «Опис текст» into the textbox «Опис».
    await page.getByLabel('Опис').fill('Опис текст');

    // 5. Leave «Опис».
    await page.keyboard.press('Tab');

    // 6. Choose portrait.jpeg for «Фото» through the button «Перетягніть файл сюди або натисніть для завантаження».
    await choosePhoto(page, 'portrait.jpeg');

    // expect: «Опублікувати» is enabled.
    await expect(page.getByRole('button', { name: 'Опублікувати' })).toBeEnabled();
  });
});
