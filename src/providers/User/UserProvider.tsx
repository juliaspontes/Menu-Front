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
import { UserService } from "../../services/User/UserService";

interface ContextProps {
  items: any[];
  isLoading: boolean;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  params: any;
  setParams: Dispatch<SetStateAction<any>>;
  pages: any;
  handleList: () => void;
  handleSave: (payload: any) => Promise<any>;
  handleDelete: (id: number) => Promise<boolean>;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<any>({});
  const [params, setParams] = useState<any>();

  const service = new UserService();

  const handleList = async () => {
    try {
      setIsLoading(true);
      const [_Response, _Error] = await service.list(params);
      setIsLoading(false);

      if (_Error) {
        setError(_Error);
        setPages({});
        setItems([]);
        return;
      }

      setItems(_Response.data);
      setPages(_Response.pages);
      setError("");
      return;
    } catch (e: any) {
      setIsLoading(false);
      setError(e?.response?.data?.message ?? "Houve um erro ao listar.");
      setItems([]);
      setPages({});
      return;
    }
  };

  const handleSave = async (payload: any) => {
    try {
      setIsLoading(true);
      const [_Response, _Error] = await service.save(payload);
      setIsLoading(false);

      if (_Error) {
        setIsLoading(false);
        setError(_Error);
        return false;
      }

      setError("");
      return true;
    } catch (e: any) {
      setIsLoading(false);
      setError(e?.response?.data?.message ?? "Houve um erro ao salvar.");
      return false;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const [_Response, _Error] = await service.delete(id);
      setIsLoading(false);

      if (_Error) {
        setError(_Response?.message || _Error);
        return false;
      }

      setError("");
      return true;
    } catch (e: any) {
      setIsLoading(false);
      setError(e?.response?.data?.message ?? "Houve um erro ao deletar.");
      return false;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({
          items,
          isLoading,
          error,
          setError,
          params,
          setParams,
          pages,
          handleList,
          handleSave,
          handleDelete,
        }),
        [
          items,
          isLoading,
          error,
          setError,
          params,
          setParams,
          pages,
          handleList,
          handleSave,
          handleDelete,
        ]
      )}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
