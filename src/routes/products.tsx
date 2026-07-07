import { createFileRoute } from "@tanstack/react-router";
import AllProductsPage from "@/pages/AllProductsPage";

export const Route = createFileRoute("/products")({
  component: AllProductsPage,
});
