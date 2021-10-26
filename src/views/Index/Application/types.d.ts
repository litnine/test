export interface ModuleConfig {
  KEY: string;
  PROJECT_TYPE: number;
  preCheck: Function;
  routes: {
    doing: RouteConfig;
    detail: RouteConfig;
  };
}
