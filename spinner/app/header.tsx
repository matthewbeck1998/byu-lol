import { Button } from "@mui/base";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row border-b-2 p-2">
      <Button>
        <Image
          src="/lol-logo.svg"
          height={72}
          width={72}
          alt="League of Legends Logo"
        />
      </Button>
      <div className="flex flex-1 p-1 items-center">
        <span className="text-4xl">BYU LoL Spinner</span>
      </div>
      <div className="flex flex-row-reverse flex-1 p-1 items-center">
        <Button href="https://github.com/matthewbeck1998/byu-lol">
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
