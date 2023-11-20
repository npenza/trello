import Board from "./components/Board";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto">
        <Board />
      </div>
    </main>
  );
}
