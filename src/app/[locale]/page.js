
import ProtectedRouteGuard from "../../components/redirect/Redirect";
import ProductSection from "../../components/productSection/ProductSection";
import Hero from "./_component/Hero";
export default function Home() {

  return (
    <main>
      <ProtectedRouteGuard />
      <Hero />
      <ProductSection />
    </main>
  );
}
