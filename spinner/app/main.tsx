import { Button } from "@mui/base";
import Image from "next/image";
import { Dispatch, PropsWithChildren } from "react";
import { Action, State, Team } from "./page";

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

type MainProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export default function Main({ state, dispatch }: MainProps) {
  const handleCopy = () => {
    const text = [
      `Top: ${state.blue.top} - ${state.red.top}`,
      `Jungle: ${state.blue.jungle} - ${state.red.jungle}`,
      `Mid: ${state.blue.mid} - ${state.red.mid}`,
      `Bot: ${state.blue.bot} - ${state.red.bot}`,
      `Support: ${state.blue.support} - ${state.red.support}`,
    ].join("\n");

    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleRoleFactory = (role: keyof Team) => {
    return () => {
      dispatch({ type: "PICK", role });
    };
  };

  const handleSwapFactory = (role: keyof Team) => {
    return () => {
      dispatch({ type: "SWAP", role });
    };
  };

  const handleFillFactory = (team: "blue" | "red", role: keyof Team) => {
    return () => {
      dispatch({ type: "FILL", team, role });
    };
  };

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
        <Button className="p-1 bg-blue-500 rounded" onClick={handleCopy}>
          Copy
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("top")}
        >
          <Image src="/top-logo.png" height={40} width={40} alt="Top Logo" />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${
            state.blue.top && "hover:cursor-pointer"
          }`}
          onClick={handleFillFactory("blue", "top")}
        >
          <span className="p-1 text-blue-500 text-xl">{state.blue.top}</span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.top && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "top")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.top}</span>
        </div>
        <Button
          className="p-1 bg-white text-blue-500 rounded"
          onClick={handleSwapFactory("top")}
        >
          Swap
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("jungle")}
        >
          <Image src="/jg-logo.png" height={40} width={40} alt="Jungle Logo" />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.jungle && "cursor-pointer"}`}
          onClick={handleFillFactory("blue", "jungle")}
        >
          <span className="p-1 text-blue-500 text-xl">{state.blue.jungle}</span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.jungle && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "jungle")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.jungle}</span>
        </div>
        <Button
          className="p-1 bg-white text-blue-500 rounded"
          onClick={handleSwapFactory("jungle")}
        >
          Swap
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("mid")}
        >
          <Image src="/mid-logo.png" height={40} width={40} alt="Mid Logo" />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.mid && "cursor-pointer"}`}
          onClick={handleFillFactory("blue", "mid")}
        >
          <span className="p-1 text-blue-500 text-xl">{state.blue.mid}</span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.mid && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "mid")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.mid}</span>
        </div>
        <Button
          className="p-1 bg-white text-blue-500 rounded"
          onClick={handleSwapFactory("mid")}
        >
          Swap
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("bot")}
        >
          <Image src="/bot-logo.png" height={40} width={40} alt="Bot Logo" />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.bot && "cursor-pointer"}`}
          onClick={handleFillFactory("blue", "bot")}
        >
          <span className="p-1 text-blue-500 text-xl">{state.blue.bot}</span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.bot && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "bot")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.bot}</span>
        </div>
        <Button
          className="p-1 bg-white text-blue-500 rounded"
          onClick={handleSwapFactory("bot")}
        >
          Swap
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("support")}
        >
          <Image
            src="/sup-logo.png"
            height={40}
            width={40}
            alt="Support Logo"
          />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.support && "cursor-pointer"}`}
          onClick={handleFillFactory("blue", "support")}
        >
          <span className="p-1 text-blue-500 text-xl">
            {state.blue.support}
          </span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.support && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "support")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.support}</span>
        </div>
        <Button
          className="p-1 bg-white text-blue-500 rounded"
          onClick={handleSwapFactory("support")}
        >
          Swap
        </Button>
      </Row>
      <Row>
        <Button
          className="flex items-center justify-center p-1"
          onClick={handleRoleFactory("fill")}
        >
          <Image src="/fill-logo.png" height={40} width={40} alt="Fill Logo" />
        </Button>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.fill && "cursor-pointer"}`}
          onClick={handleFillFactory("blue", "fill")}
        >
          <span className="p-1 text-blue-500 text-xl">{state.blue.fill}</span>
        </div>
        <div
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.fill && "cursor-pointer"}`}
          onClick={handleFillFactory("red", "fill")}
        >
          <span className="p-1 text-red-500 text-xl">{state.red.fill}</span>
        </div>
        <Button className="p-1 bg-red-500 rounded" onClick={handleClear}>
          Clear
        </Button>
      </Row>
    </div>
  );
}
