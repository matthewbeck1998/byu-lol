"use client";

import localFont from "next/font/local";
import { useReducer } from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
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

export type Action =
  | AddAction
  | DeleteAction
  | SpinAction
  | PickAction
  | SwapAction
  | DropAction
  | ClearAction
  | FillAction;

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
  droppedRole: "top" | "jungle" | "mid" | "bot" | "support" | "fill";
  playerReplaced: string;
  replacedTeam: "blue" | "red";
  replacedRole: "top" | "jungle" | "mid" | "bot" | "support" | "fill";
}

type ClearAction = {
  type: "CLEAR";
};

type FillAction = {
  type: "FILL";
  team: "blue" | "red";
  role: keyof Team;
};

const initialState: State = {
  blue: { top: "", jungle: "", mid: "", bot: "", support: "", fill: "" },
  red: { top: "", jungle: "", mid: "", bot: "", support: "", fill: "" },
  chosen: "",
  players: [],
};

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
      else if (action.droppedTeam != action.replacedTeam) {
        console.log('dropped! ', action);
        return {
          ...state,
          [action.droppedTeam]: { ...state[action.droppedTeam], [action.droppedRole]: action.playerReplaced },
          [action.replacedTeam]: { ...state[action.replacedTeam], [action.replacedRole]: action.playerDropped },
        };
      }

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

    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      className={`flex-1 flex flex-col bg-cover text-white ${beaufort.className}`}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/rift-background.png)`,
        backgroundSize: "cover",
      }}
    >
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-[3fr_1fr] gap-8 p-4">
          <Main state={state} dispatch={dispatch} />
          <Sidebar state={state} dispatch={dispatch} />
        </div>
      </DndProvider>
    </div>
  );
}
