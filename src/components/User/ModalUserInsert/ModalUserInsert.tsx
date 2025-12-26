import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useExample } from "../../../providers/ExampleProvider";
import ModalDefault from "../../ModalDefault/ModalDefault";
import "./ModalUserInsert.css";
import { schema } from "./Validate";

interface ModalUserInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalUserInsert: FC<ModalUserInsertProps> = ({
  show,
  onClose,
  itemEdit,
}) => {
  const { handleList, handleSave, isLoading } = useExample();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  /* Apenas para rodar o projeto em front, 
  depois necessário alterar e puxar a lista de cargo cadastrada. */
  const cargos = [
  { id: 1, nome: "Gerente" },
  { id: 2, nome: "Supervisor" },
  { id: 3, nome: "Vendedor" },
];

  useEffect(() => {
    if (show && itemEdit) {
      setValue("name", itemEdit?.name);
    }
  }, [show, itemEdit]);

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const onSubmit = async (data: any) => {
    const ret = await handleSave(data);

    if (ret) {
      toast.success("ModalUserInsert salvo com sucesso!");
      handleList();
      handleClose();
    }
  };

  return (
    <ModalDefault
      title={
        itemEdit
          ? "Editar Usuário"
          : "Adicionar Usuário"
      }
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="ModalUserInsert"
        data-testid="ModalUserInsert"
      >
        <Row>
          <Col md={6}>
            <FormGroup className="mb-3">
              <label className="form-control-label mv-2">Nome *</label>
              <input
                type="text"
                className={`form-control  ${errors?.name ? "is-invalid" : ""}`}
                {...register("name")}
              />
              {errors?.name && (
                <div className="invalid-feedback">{errors?.name?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="mb-3">
              <label className="form-control-label mv-2">E-mail *</label>
              <input
                type="email"
                className={`form-control  ${errors?.email ? "is-invalid" : ""}`}
                {...register("email")}
              />
              {errors?.name && (
                <div className="invalid-feedback">{errors?.email?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup className="mb-3">
            <label className="form-control-label mv-2">Cargo *</label>

            <select
              className={`form-control ${errors?.cargo ? "is-invalid" : ""}`}
              {...register("cargo")}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione o cargo
              </option>

             {cargos?.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              ))}
            </select>

            {errors?.cargo && (
              <div className="invalid-feedback">
                {errors?.cargo?.message}
              </div>
            )}
          </FormGroup>
        </Col>
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalUserInsert;
