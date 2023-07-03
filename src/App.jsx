import { CategoriesProvider } from "./context/CategoriesProvider";
import { DrinksProvider } from "./context/DrinksProvider";
import MainLayout from "./layout";
import AppRoutes from "./routes";

export default function App() {
  return (
    <CategoriesProvider>
      <DrinksProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </DrinksProvider>
    </CategoriesProvider>
  );
}
