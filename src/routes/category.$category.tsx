import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "@/pages/CategoryPage";

export const Route = createFileRoute("/category/$category")({
  component: () => {
    const { category } = Route.useParams();
    return <CategoryPage category={category} />;
  },
});
