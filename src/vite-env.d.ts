interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEV_TUNNEL_URL: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
