import { Button } from "@mui/base";
import { PropsWithChildren } from "react";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

export default function Main() {
  return (
    <div className="flex-1 grid grid-cols-[auto_1fr_1fr_auto] auto-rows-[50px]">
      <Row>
        <Button className="p-1">Copy</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red</span>
        </div>
        <Button className="p-1">Clear</Button>
      </Row>
      <Row>
        <Button className="p-1">Top</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Top</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Top</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="p-1">Jg</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Jg</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Jg</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="p-1">Mid</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Mid</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Mid</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="p-1">Bot</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Bot</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Bot</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="p-1">Sup</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Sup</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Sup</span>
        </div>
        <Button>Swap</Button>
      </Row>
      <Row>
        <Button className="p-1">Fill</Button>
        <div className="flex flex-row items-center">
          <span className="p-1">Blue Fill</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="p-1">Red Fill</span>
        </div>
      </Row>
    </div>
  );
}
