import { ModuleConfig } from './types.d';

import * as ExportSupplySharing from './ExportSupplySharing/config';
import * as ExportSupplyPurchase from './ExportSupplyPurchase/config';
import * as ExportSupplyLogistics from './ExportSupplyLogistics/config';
import * as ExportOrderReport from './ExportOrderReport/config';
import * as ImportSupplySharing from './ImportSupplySharing/config';
import * as ImportSupplyPurchase from './ImportSupplyPurchase/config';
import * as ImportSupplyLogistics from './ImportSupplyLogistics/config';

export default register(
  ExportSupplySharing,
  ExportSupplyPurchase,
  ExportSupplyLogistics,
  ExportOrderReport,
  ImportSupplySharing,
  ImportSupplyPurchase,
  ImportSupplyLogistics,
);

function register(...modules: ModuleConfig[]) {
  return {
    routes: modules.map((module) => [
      {
        ...module.routes.doing,
        props: (route: any) => ({
          id: +route.query.id,
        }),
      },
      {
        ...module.routes.detail,
        props: (route: any) => ({
          id: +route.query.id,
        }),
      },
    ]).flat(),
    TYPE_ROUTE_MAP: modules.reduce((map, module) => {
      map[module.PROJECT_TYPE] = {
        doing: module.routes.doing.name,
        detail: module.routes.detail.name,
      };
      return map;
    }, {} as Record<number, { doing: string; detail: string }>),
    NAME_ENTRANCE_MAP: modules.reduce((map, module) => {
      map[module.KEY] = {
        preCheck: module.preCheck,
        route: { name: module.routes.doing.name },
      };
      return map;
    }, {} as Record<string, { preCheck: Function; route: { name: string } }>),
  };
}
