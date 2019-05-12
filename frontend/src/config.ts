const defaultConfig: any = {
  API_URL: "http://localhost:3000/api/",
  IMAGE_PREFIX: "http://localhost:3000/storage/",
  FALLBACK_IMAGE: "https://bulma.io/images/placeholders/128x128.png",
  OCR_SCANNER_URL: "http://localhost:5000/"
}

export const getEnv = (name: string) => {
  return (window as any).config[name] || defaultConfig[name];
}
