import { Button } from "@mui/base";
import Image from "next/image";
import { Dispatch, PropsWithChildren } from "react";
import { Action, State, Team } from "./page";
import { useDrag, useDrop } from 'react-dnd'

function Row(props: PropsWithChildren) {
  const { children } = props;
  return <>{children}</>;
}

interface RowFieldProps {
  team: "blue" | "red";
  role: "top" | "jungle" | "mid" | "bot" | "support" | "fill";
  className: string;
  text: string;
  textClassName: string;
  onClick: () => void;
  dispatch: Dispatch<Action>;
}

function RowField({team, role, className, text, textClassName, onClick, dispatch}: RowFieldProps) {
  const [{isOver, item}, drop] = useDrop(() => ({
    accept: ItemTypes.TEXT,
    drop: (item, monitor) => dispatch({ type: "DROP", playerDropped: item.text, droppedTeam: item.team, droppedRole: item.role, playerReplaced: text, replacedTeam: team, replacedRole: role }),
    collect: monitor => ({
      isOver: !!monitor.isOver({shallow: true}),
      item: monitor.getItem(),
    }),
  }), [text])

  if (isOver) {
    console.log('is hovering over droppable: text=', text, 'result=', item);
  }

  return <div ref={drop} className={className} onClick={onClick}>
    {isOver && (
      <div
        style={{
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: 'yellow',
      }}
    >
      <Text text={text} team={team} role={role} className={textClassName}></Text>
    </div>
    )}
    {!isOver && <Text text={text} team={team} role={role} className={textClassName}></Text>}
  </div>
}

const ItemTypes = {
  TEXT: 'text'
}

interface TextProps {
  text: string;
  team: "blue" | "red";
  role: "top" | "jungle" | "mid" | "bot" | "support" | "fill";
  className: string;
}

function Text({text, team, role, className}: TextProps) {
  const [{isDragging, didDrop, dropResult}, drag] = useDrag(() => ({
    type: ItemTypes.TEXT,
    item: {text, team, role},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
      dropResult: monitor.getDropResult(),
    }),
  }), [text])

  //text = didDrop ? dropResult.text : text;

  if (didDrop) {
    console.log('from draggable: text=', text, 'result=', dropResult.text);
  }

  if (isDragging) {
    console.log('dragging: text=', text);
  }

  return <span className={className}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
  >
    {text}
  </span>
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

  const handleDropFactory = (
      playerDropped: string,
      droppedTeam: "blue" | "red",
      droppedRole: "top" | "jungle" | "mid" | "bot" | "support" | "fill",
      playerReplaced: string,
      replacedTeam: "blue" | "red",
      replacedRole: "top" | "jungle" | "mid" | "bot" | "support" | "fill",
    ) => {
      return () => {
        dispatch({ type: "DROP", playerDropped, droppedTeam, droppedRole, playerReplaced, replacedTeam, replacedRole });
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
        <RowField
          team="blue"
          role="top"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.top && "cursor-pointer"}`}
          text={state.blue.top}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "top")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="top"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.top && "cursor-pointer"}`}
          text={state.red.top}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "top")}
          dispatch={dispatch}
        >
        </RowField>
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
        <RowField
          team="blue"
          role="jungle"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.jungle && "cursor-pointer"}`}
          text={state.blue.jungle}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "jungle")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="jungle"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.jungle && "cursor-pointer"}`}
          text={state.red.jungle}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "jungle")}
          dispatch={dispatch}
        >
        </RowField>
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
        <RowField
          team="blue"
          role="mid"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.mid && "cursor-pointer"}`}
          text={state.blue.mid}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "mid")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="mid"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.mid && "cursor-pointer"}`}
          text={state.red.mid}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "mid")}
          dispatch={dispatch}
        >
        </RowField>
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
        <RowField
          team="blue"
          role="bot"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.bot && "cursor-pointer"}`}
          text={state.blue.bot}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "bot")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="bot"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.bot && "cursor-pointer"}`}
          text={state.red.bot}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "bot")}
          dispatch={dispatch}
        >
        </RowField>
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
        <RowField
          team="blue"
          role="support"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.support && "cursor-pointer"}`}
          text={state.blue.support}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "support")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="support"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.support && "cursor-pointer"}`}
          text={state.red.support}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "support")}
          dispatch={dispatch}
        >
        </RowField>
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
        <RowField
          team="blue"
          role="fill"
          className={`flex flex-row items-center bg-gray-500/50 ${state.blue.fill && "cursor-pointer"}`}
          text={state.blue.fill}
          textClassName="p-1 text-blue-500 text-xl"
          onClick={handleFillFactory("blue", "fill")}
          dispatch={dispatch}
        >
        </RowField>
        <RowField
          team="red"
          role="fill"
          className={`flex flex-row items-center bg-gray-500/50 ${state.red.fill && "cursor-pointer"}`}
          text={state.red.fill}
          textClassName="p-1 text-red-500 text-xl"
          onClick={handleFillFactory("red", "fill")}
          dispatch={dispatch}
        >
        </RowField>
        <Button className="p-1 bg-red-500 rounded" onClick={handleClear}>
          Clear
        </Button>
      </Row>
    </div>
  );
}
