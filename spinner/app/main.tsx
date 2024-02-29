import { Button } from "@mui/base";
import Image from "next/image";
import { PropsWithChildren } from "react";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default function Main() {
  return (
    <div className="flex-1 grid grid-cols-[80px_1fr_1fr_auto] auto-rows-[50px] text-2xl p-1">
      <Row>
        <Button className="p-1">
          Copy
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Team</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Team</span>
        </div>
        <Button className="p-1">Clear</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image src="/top-logo.png" height={40} width={40} alt="Top Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Top</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Top</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image src="/jg-logo.png" height={40} width={40} alt="Jungle Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Jg</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Jg</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image src="/mid-logo.png" height={40} width={40} alt="Mid Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Mid</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Mid</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image src="/bot-logo.png" height={40} width={40} alt="Bot Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Bot</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Bot</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image
            src="/sup-logo.png"
            height={40}
            width={40}
            alt="Support Logo"
          />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Sup</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Sup</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="flex justify-center p-1">
          <Image src="/fill-logo.png" height={40} width={40} alt="Fill Logo" />
        </Button>
        <div className="flex flex-row items-center">
          <span className="p-1 text-blue-500">Blue Fill</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1 text-red-500">Red Fill</span>
        </div>
      </Row>
    </div>
  );
}
