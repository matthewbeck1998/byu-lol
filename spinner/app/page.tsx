import localFont from "next/font/local";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";

const beaufort = localFont({ src: "../public/beaufort.ttf" });

export default function Home() {
  return (
    <div
      className={`flex-1 flex flex-col bg-cover text-white ${beaufort.className}`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/rift-background.png)`,
        backgroundSize: "cover"
      }}
    >
      <Header />
      <div className="grid grid-cols-[1fr_320px] gap-8 p-4">
        <Main />
        <Sidebar />
      </div>
    </div>
  );
}
