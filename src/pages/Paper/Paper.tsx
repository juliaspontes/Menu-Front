import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { FC, JSX, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Pagebase from "../../components/Pagebase/Pagebase";
import ModalPaperInsert from "../../components/Paper/ModalPaperInsert/ModalPaperInsert";
import SkeletonTable from "../../components/SkeletonTable/SkeletonTable";
import MasterPage from "../../pages/MasterPage/MasterPage";
import { usePaper } from "../../providers/Paper/PaperProvider";

interface PaperProps {}

const Paper: FC<PaperProps> = () => {
  const [showModalInsert, setShowModalInsert] = useState<boolean>(false);
  const [showSidebarFilter, setShowSidebarFilter] = useState<boolean>(false);
  const [itemEdit, setItemEdit] = useState<any>();

  //const { handlePaginate } = usePaginate();
  const {
    pages,
    params,
    setParams,
    isLoading,
    error,
    items,
    handleList,
    handleDelete,
  } = usePaper();

  useEffect(() => {
    handleList();
  }, [params]);

  useEffect(() => {
    if (!showModalInsert) {
      setItemEdit(undefined);
    }
  }, [showModalInsert]);

  const handleEditPaper = (item: any) => {
    setItemEdit(item);
    setShowModalInsert(true);
  };

  const handleDeletePaper = (item: any) => {
    Swal.fire({
      title: "<strong>Atenção?</strong>",
      html: `<span>Deseja excluir o ${item?.name}?</span>`,
      icon: "question",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
    }).then(async (x) => {
      if (x.isConfirmed) {
        const ret = await handleDelete(item.id ?? 0).then();
        if (ret) {
          toast.success("Paper deletado com sucesso!");
          handleList();
        } else {
          await Swal.fire(
            "Ops!",
            `Não foi possível deletar o Paper.<br>${error}`,
            "error"
          );
        }
      }
    });
  };

  const renderContent = (): JSX.Element => {
    return (
      <>
        {!isLoading ? (
          <div className="table-responsive">
            <table className="table table-striped h-75 overflow-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items?.length > 0 ? (
                  items?.map((item: any) => (
                    <tr key={item.id}>
                      <td scope="row">{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.name}</td>
                      <td>{item.name}</td>
                      <td>{moment(item?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>
                        <Dropdown>
                          <DropdownToggle
                            className="icon-button"
                            color=""
                            role="button"
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow">
                            <DropdownItem
                              onClick={() => handleEditPaper(item)}
                            >
                              <FontAwesomeIcon icon={faEdit} className="me-2" />
                              Editar
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDeletePaper(item)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="me-2"
                              />
                              Remover
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Nenhum dado disponível no momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <SkeletonTable />
        )}

        {/* {items?.length > 0 && (
          <div>
            <nav aria-label="...">
              <AppPagination
                pages={pages}
                handlePaginate={handlePaginate}
                params={params}
                setParams={setParams}
              />
            </nav>
          </div>
        )} */}
      </>
    );
  };

  return (
    <MasterPage>
      <div className="Paper" data-testid="Paper">
        <Pagebase
          title="Cargos"
          descriptionPage="Gerenciar todos os cargos do cardápio."
          children={renderContent()}
          showButtonAdd={true}
          showButtonFilter={true}
          handleInsert={() => setShowModalInsert(true)}
          handleFilter={() =>
            !!showSidebarFilter
              ? setShowSidebarFilter(false)
              : setShowSidebarFilter(true)
          }
        />
      </div>

      <ModalPaperInsert
        show={showModalInsert}
        onClose={() => setShowModalInsert(false)}
        itemEdit={itemEdit}
      />
    </MasterPage>
  );
};
export default Paper;
