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
import { SidebarService } from "../services/SidebarService";

interface ContextProps {
  isLoading: boolean;
  menu: any[];
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleList: () => void;
}

export const SidebarContext = createContext<ContextProps>({} as ContextProps);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<any[]>([]);

  const service = new SidebarService();

  const handleList = async () => {
    try {
      setIsLoading(true);
      const [_Response, _Error] = await service.list();
      setIsLoading(false);

      if (_Error) {
        setError(_Error);
        setMenu([]);
        return;
      }

      setMenu(_Response.data);
      setError("");
      return;
    } catch (e: any) {
      setIsLoading(false);
      setError(e?.response?.data?.message ?? "Houve um erro ao listar.");
      setMenu([]);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  useEffect(() => {
    handleList();
  }, []);

  return (
    <SidebarContext.Provider
      value={useMemo(
        () => ({
          isLoading,
          error,
          menu,
          handleList,
          setError,
        }),
        [isLoading, error, menu, handleList, setError]
      )}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
