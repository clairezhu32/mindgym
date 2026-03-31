"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Category, GeneratedScript, PersonalizationAnswers, SessionPhase, SessionState } from "@/types";
import { v4 as uuidv4 } from "uuid";

type Action =
  | { type: "SET_CATEGORY"; payload: Category }
  | { type: "SET_ANSWERS"; payload: PersonalizationAnswers }
  | { type: "SET_PRE_MOOD"; payload: number }
  | { type: "SET_POST_MOOD"; payload: number }
  | { type: "SET_PHASE"; payload: SessionPhase }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "SET_SCRIPT"; payload: GeneratedScript }
  | { type: "START_SESSION" }
  | { type: "RESET" };

const initialState: SessionState = {
  category: null,
  answers: null,
  preMood: null,
  postMood: null,
  phase: "calm",
  isPlaying: false,
  audioProgress: 0,
  sessionId: null,
  generatedScript: null,
};

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_ANSWERS":
      return { ...state, answers: action.payload };
    case "SET_PRE_MOOD":
      return { ...state, preMood: action.payload };
    case "SET_POST_MOOD":
      return { ...state, postMood: action.payload };
    case "SET_PHASE":
      return { ...state, phase: action.payload };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_PROGRESS":
      return { ...state, audioProgress: action.payload };
    case "SET_SCRIPT":
      return { ...state, generatedScript: action.payload };
    case "START_SESSION":
      return { ...state, sessionId: uuidv4(), phase: "calm", audioProgress: 0 };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

interface SessionContextValue {
  state: SessionState;
  dispatch: React.Dispatch<Action>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
