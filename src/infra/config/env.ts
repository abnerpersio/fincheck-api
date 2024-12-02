const environmentVariables = {
  PASSWORD_SALT: '',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 8000,
};

type Variables = typeof environmentVariables;

export class Env {
  static get<K extends keyof Variables>(key: K): Variables[K] {
    return environmentVariables[key];
  }
}
