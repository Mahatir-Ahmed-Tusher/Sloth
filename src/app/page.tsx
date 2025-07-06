import Hero from "./components/hero";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
    </div>
  );
}