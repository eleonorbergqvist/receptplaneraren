const defaultConfig: any = {
  API_URL: "http://localhost:8000/api/",
  IMAGE_PREFIX: "http://localhost:8000/storage/",
  FALLBACK_IMAGE: "https://bulma.io/images/placeholders/128x128.png",
}

export const getEnv = (name: string) => {
  return (window as any)[name] || defaultConfig[name];
}
