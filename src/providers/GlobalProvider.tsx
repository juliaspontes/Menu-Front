import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

interface ContextProps {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({} as ContextProps);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  return (
    <GlobalContext.Provider
      value={useMemo(
        () => ({
          isOpenMenu,
          setIsOpenMenu,
        }),
        [isOpenMenu, setIsOpenMenu]
      )}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
