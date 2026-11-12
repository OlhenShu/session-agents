import path from 'path';
import { expect, Page } from '@playwright/test';
import { adminCredentials } from '../api/team-api';

/** Absolute path of a file in tests/fixtures. */
export function fixture(fileName: string): string {
  return path.resolve(__dirname, '../fixtures', fileName);
}

export const createModalForm = (page: Page) => page.getByTestId('test-form');

export const photoDropZone = (page: Page) =>
  page.getByRole('button', { name: 'Перетягніть файл сюди або натисніть для завантаження' });

export const photoPreview = (page: Page) => page.getByTestId('preview-image');

/** «ТАК» and «НІ» in the application are rendered as «Так» and «Ні». An exact name keeps «ні» inside other labels from matching. */
export const yesButton = (page: Page) => page.getByRole('button', { name: /^так$/i });
export const noButton = (page: Page) => page.getByRole('button', { name: /^ні$/i });

export async function loginAsAdmin(page: Page): Promise<void> {
  const { email, password } = adminCredentials();
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Електронна пошта' }).fill(email);
  await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  await page.getByRole('button', { name: 'Увійти' }).click();
  await expect(page).toHaveURL(/\/admin-panel/);
}

/** Logs in and opens the admin Team view («Команда»). */
export async function openAdminTeam(page: Page): Promise<void> {
  await loginAsAdmin(page);
  await page.getByRole('link', { name: 'Команда' }).click();
  await expect(page.getByRole('button', { name: 'Додати в команду' })).toBeVisible();
}

/** Opens the «Додати в команду» modal from the admin Team view. */
export async function openModalFromTeamView(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Додати в команду' }).first().click();
  await expect(createModalForm(page)).toBeVisible();
}

/** Logs in, opens the admin Team view and opens the «Додати в команду» modal. */
export async function openCreateModal(page: Page): Promise<void> {
  await openAdminTeam(page);
  await openModalFromTeamView(page);
}

export async function chooseCategory(page: Page, category: string): Promise<void> {
  await page.getByRole('button', { name: 'Оберіть категорію' }).click();
  await page.getByRole('option', { name: category }).click();
}

/**
 * Chooses a photo through the file dialog. The application opens the cropper for 320x400 images,
 * so the cropper is confirmed with «Так» when it appears and the photo is shown in the media icon.
 */
export async function choosePhoto(page: Page, fixtureName: string): Promise<void> {
  const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), photoDropZone(page).click()]);
  await fileChooser.setFiles(fixture(fixtureName));
  await confirmCropperIfShown(page);
}

export async function confirmCropperIfShown(page: Page): Promise<void> {
  await expect(photoPreview(page).or(yesButton(page))).toBeVisible();
  if (await yesButton(page).isVisible()) {
    await yesButton(page).click();
  }
  await expect(photoPreview(page)).toBeVisible();
}

/** Fills the modal fields. Description is filled because the application requires it before «Зберегти як чернетку» is enabled. */
export async function fillProfile(
  page: Page,
  profile: { name: string; category: string; description?: string },
): Promise<void> {
  await chooseCategory(page, profile.category);
  await page.getByLabel("Ім'я та Прізвище").fill(profile.name);
  await page.keyboard.press('Tab');
  if (profile.description !== undefined) {
    await page.getByLabel('Опис').fill(profile.description);
    await page.keyboard.press('Tab');
  }
}

/**
 * Publishes a profile through the create modal (POST /api/TeamMembers needs an imageId and POST /api/Image
 * returns no id, so a published profile with a photo can only be created through the UI).
 */
export async function publishProfileThroughUi(
  page: Page,
  profile: { name: string; category: string; description: string },
): Promise<void> {
  await openModalFromTeamView(page);
  await fillProfile(page, profile);
  await choosePhoto(page, 'portrait.jpeg');
  await page.getByRole('button', { name: 'Опублікувати' }).click();
  await yesButton(page).click();
  await expect(createModalForm(page)).toBeHidden();
  // Let the «Не забудь встановити порядок відображення» reminder close before the next action.
  await expect(page.getByText('Не забудь встановити порядок відображення')).toBeHidden();
}
