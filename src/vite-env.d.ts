interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEV_TUNNEL_URL: string;
  readonly VITE_MODE: string;
  readonly VITE_CLOUDINARY_PRESET: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
