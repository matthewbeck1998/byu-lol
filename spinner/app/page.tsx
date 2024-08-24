"use client";

import localFont from "next/font/local";
import { useReducer } from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import Customs from "./customs";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const beaufort = localFont({ src: "../public/beaufort.ttf" });

export type Team = {
  top: string;
  jungle: string;
  mid: string;
  bot: string;
  support: string;
  fill: string;
};

export type State = {
  blue: Team;
  red: Team;
  players: string[];
  chosen: string;
};

export type MenuState = {
  selected: string;
  title: string;
}

export type Action =
  | AddAction
  | DeleteAction
  | SpinAction
  | PickAction
  | SwapAction
  | DropAction
  | ClearAction
  | FillAction
  | TrashAction;

export type MenuAction =
  | SpinnerAction
  | RankedAction;

type AddAction = {
  type: "ADD";
  player: string;
};

type DeleteAction = {
  type: "DELETE";
  index: number;
};

type SpinAction = {
  type: "SPIN";
};

type PickAction = {
  type: "PICK";
  role: keyof Team;
};

type SwapAction = {
  type: "SWAP";
  role: keyof Team;
};

type DropAction = {
  type: "DROP";
  playerDropped: string;
  droppedTeam: "blue" | "red";
  droppedRole: keyof Team;
  playerReplaced: string;
  replacedTeam: "blue" | "red";
  replacedRole: keyof Team;
};

type ClearAction = {
  type: "CLEAR";
};

type FillAction = {
  type: "FILL";
  team: "blue" | "red";
  role: keyof Team;
};

type TrashAction = {
  type: "TRASH";
  team: "blue" | "red" | null;
  role: keyof Team | null;
};

type SpinnerAction = {
  type: "SPINNER";
}

type RankedAction = {
  type: "RANKED";
}

const initialState: State = {
  blue: { top: "", jungle: "", mid: "", bot: "", support: "", fill: "" },
  red: { top: "", jungle: "", mid: "", bot: "", support: "", fill: "" },
  chosen: "",
  players: [],
};

const initialMenuState: MenuState = {
  selected: "SPINNER",
  title: "BYU LoL Spinner",
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD":
      if (state.players.includes(action.player)) return state;

      return { ...state, players: [...state.players, action.player] };

    case "DELETE":
      return {
        ...state,
        players: [
          ...state.players.slice(0, action.index),
          ...state.players.slice(action.index + 1),
        ],
      };

    case "SPIN":
      if (state.players.length == 0) return state;

      const index = (state.players.length * Math.random()) | 0;
      const chosen = state.players[index];

      return {
        ...state,
        chosen,
        players: [
          ...state.players.slice(0, index),
          ...state.players.slice(index + 1),
        ],
      };

    case "PICK":
      if (state.blue[action.role] == "")
        return {
          ...state,
          chosen: "",
          blue: { ...state.blue, [action.role]: state.chosen },
        };
      else if (state.red[action.role] == "")
        return {
          ...state,
          chosen: "",
          red: { ...state.red, [action.role]: state.chosen },
        };

    case "SWAP":
      return {
        ...state,
        blue: { ...state.blue, [action.role]: state.red[action.role] },
        red: { ...state.red, [action.role]: state.blue[action.role] },
      };

    case "DROP":
      if (action.droppedTeam == action.replacedTeam)
        return {
          ...state,
          [action.droppedTeam]: { ...state[action.droppedTeam], [action.droppedRole]: action.playerReplaced, [action.replacedRole]: action.playerDropped },
        };
      else if (action.droppedTeam != action.replacedTeam)
        return {
          ...state,
          [action.droppedTeam]: { ...state[action.droppedTeam], [action.droppedRole]: action.playerReplaced },
          [action.replacedTeam]: { ...state[action.replacedTeam], [action.replacedRole]: action.playerDropped },
        };

    case "CLEAR":
      return {
        ...state,
        blue: { ...initialState.blue },
        red: { ...initialState.red },
      };

    case "FILL":
      if (state[action.team][action.role] == "" || state.chosen != "") return state;

      return {
        ...state,
        chosen: state[action.team][action.role],
        [action.team]: { ...state[action.team], [action.role]: "" },
      };

      case "TRASH":
        if (action.team === null && action.role === null)
          return {
            ...state,
            chosen: "",
          };
        else if (action.team !== null && action.role !== null)
          return {
            ...state,
            [action.team]: { ...state[action.team], [action.role]: "" },
          };

    default:
      return state;
  }
};

const menuReducer = (state: MenuState, action: MenuAction) => {
  switch (action.type) {
    case "SPINNER":
      return {
        selected: "SPINNER",
        title: "BYU LoL Spinner",
      };

    case "RANKED":
      return {
        selected: "RANKED",
        title: "Ranked Customs W/L",
      };

    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [menuState, menuDispatch] = useReducer(menuReducer, initialMenuState);

  return (
    <div
      className={`flex-1 flex flex-col bg-cover text-white ${beaufort.className}`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/rift-background.png)`,
        backgroundSize: "cover",
      }}
    >
      <Header state={menuState} dispatch={menuDispatch} />
      {menuState.selected == "SPINNER" && 
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-[3fr_1fr] gap-8 p-4">
          <Main state={state} dispatch={dispatch} />
          <Sidebar state={state} dispatch={dispatch} />
        </div>
      </DndProvider>
      }
      {menuState.selected == "RANKED" &&
      <div className="p-4">
        <Customs state={state} dispatch={dispatch} />
      </div>
      }
    </div>
  );
}
