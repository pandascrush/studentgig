import { createContext, useContext } from "react";

export const contextProvider =  createContext()
export const ContextUser = () => useContext(contextProvider)