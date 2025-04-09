-- CreateTable
CREATE TABLE "StockByWarehouse" (
    "product_id" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockByWarehouse_pkey" PRIMARY KEY ("product_id","warehouse_id")
);

-- AddForeignKey
ALTER TABLE "StockByWarehouse" ADD CONSTRAINT "StockByWarehouse_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockByWarehouse" ADD CONSTRAINT "StockByWarehouse_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
