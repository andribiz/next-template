declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";
    DATABASE_URL: string;
    NEXT_PUBLIC_APP_URL: string;
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
  }
}
