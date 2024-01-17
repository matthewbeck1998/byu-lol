import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="flex flex-col bg-blue-800 text-white p-1">
      <Header />
      <div className="flex flex-row">
        <Main />
        <Sidebar />
      </div>
    </div>
  );
}
