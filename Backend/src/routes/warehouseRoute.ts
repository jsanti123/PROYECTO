import { Router } from "express";
import { WarehouseController } from "../controllers/warehouseController";
import { validationsCreateWarehouse } from "../utils/validators/warehouseValidator";
import { validateResult } from "../utils/share/validationUtil";

const routerWarehouse = Router();

routerWarehouse.post("/create", validationsCreateWarehouse, validateResult, WarehouseController.createWarehouse);

export default routerWarehouse;

