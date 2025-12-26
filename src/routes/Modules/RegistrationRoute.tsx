import { FC } from "react";
import { Outlet } from "react-router-dom";
import { CategoryProvider } from "../../providers/Category/CategoryProvider";
import { PaperProvider } from "../../providers/Paper/PaperProvider";
import { ProductProvider } from "../../providers/Product/ProductProvider";
import { TableProvider } from "../../providers/Table/TableProvider";
import { UserProvider } from "../../providers/User/UserProvider";

interface Props {
  element?: any;
  path?: string;
}

export const RegistrationRoute: FC<Props> = () => {
  return (
    <ProductProvider>
    <CategoryProvider>
    <TableProvider>
    <PaperProvider>
    <UserProvider>
      <Outlet />
    </UserProvider>
    </PaperProvider>
    </TableProvider>
    </CategoryProvider>
    </ProductProvider>
  );
};
