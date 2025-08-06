
export async function getMessages(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`No se pudo cargar el archivo de idioma: ${locale}`, error);
    return null;
  }
}
