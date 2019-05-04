const defaultConfig: any = {
  API_URL: "http://localhost:8000/api/",
}

export const getEnv = (name: string) => {
  return (window as any)[name] || defaultConfig[name];
}
