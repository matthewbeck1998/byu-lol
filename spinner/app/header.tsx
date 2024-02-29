import { Button } from "@mui/base";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row p-1">
      <Button className="p-1">
        <Image
          src="/lol-logo.svg"
          height={80}
          width={80}
          alt="League of Legends Logo"
        />
      </Button>
      <div className="flex flex-1 p-1 items-center">
        <span className="text-5xl">BYU LoL Spinner</span>
      </div>
      <div className="flex flex-row-reverse flex-1 p-1 items-center">
        <Button
          className="p-1"
          href="https://github.com/matthewbeck1998/byu-lol"
        >
          <Image
            src="/github-logo.svg"
            height={40}
            width={40}
            alt="GitHub Logo"
          />
        </Button>
      </div>
    </div>
  );
}
