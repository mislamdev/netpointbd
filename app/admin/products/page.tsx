import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { Product } from "@/lib/types";
import ProductsEditor from "./ProductsEditor";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await adminOrRedirect();
  const products = await readJSON<Product[]>("products");
  return (
    <div className="admin-card">
      <h2>Products</h2>
      <ProductsEditor initial={products} />
    </div>
  );
}
