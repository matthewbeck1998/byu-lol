import { Button } from "@mui/base";
import Image from "next/image";
import { PropsWithChildren } from "react";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default function Main() {
  return (
    <div className="flex-1 grid grid-cols-[80px_1fr_1fr_80px] auto-rows-[32px] gap-4">
      <Row>
        <div className="flex items-center justify-center">
          <span className="p-1 text-3xl">Role</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-3xl">Blue Team</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-3xl">Red Team</span>
        </div>
        <Button className="p-1 bg-blue-500 rounded">Copy</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image src="/top-logo.png" height={40} width={40} alt="Top Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Top</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Top</span>
        </div>
        <Button className="p-1 bg-white text-blue-500 rounded">Swap</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image src="/jg-logo.png" height={40} width={40} alt="Jungle Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Jg</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Jg</span>
        </div>
        <Button className="p-1 bg-white text-blue-500 rounded">Swap</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image src="/mid-logo.png" height={40} width={40} alt="Mid Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Mid</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Mid</span>
        </div>
        <Button className="p-1 bg-white text-blue-500 rounded">Swap</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image src="/bot-logo.png" height={40} width={40} alt="Bot Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Bot</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Bot</span>
        </div>
        <Button className="p-1 bg-white text-blue-500 rounded">Swap</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image
            src="/sup-logo.png"
            height={40}
            width={40}
            alt="Support Logo"
          />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Sup</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Sup</span>
        </div>
        <Button className="p-1 bg-white text-blue-500 rounded">Swap</Button>
      </Row>
      <Row>
        <Button className="flex items-center justify-center p-1">
          <Image src="/fill-logo.png" height={40} width={40} alt="Fill Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500 text-xl">Blue Fill</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500 text-xl">Red Fill</span>
        </div>
        <Button className="p-1 bg-red-500 rounded">Clear</Button>
      </Row>
    </div>
  );
}
