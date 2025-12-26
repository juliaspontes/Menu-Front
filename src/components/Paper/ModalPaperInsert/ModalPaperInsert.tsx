import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useExample } from "../../../providers/ExampleProvider";
import ModalDefault from "../../ModalDefault/ModalDefault";
import "./ModalPaperInsert.css";
import { schema } from "./Validate";

interface ModalPaperInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalPaperInsert: FC<ModalPaperInsertProps> = ({
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
      toast.success("ModalPaperInsert salvo com sucesso!");
      handleList();
      handleClose();
    }
  };

  return (
    <ModalDefault
      title={
        itemEdit
          ? "Editar Cargo"
          : "Adicionar Cargo"
      }
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="ModalPaperInsert"
        data-testid="ModalPaperInsert"
      >
        <Row>
          <Col md={12}>
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
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalPaperInsert;
