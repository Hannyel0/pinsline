import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <SearchBar />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-4xl mt-8">Hello World</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </main>
    </div>
  );
}
