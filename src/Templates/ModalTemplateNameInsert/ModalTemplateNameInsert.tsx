import { FC, useEffect } from "react";
import "./ModalTemplateNameInsert.css";
import ModalDefault from "../../components/ModalDefault/ModalDefault";
import { toast } from "react-toastify";
import { schema } from "./Validate";
import { useExample } from "../../providers/ExampleProvider";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ModalTemplateNameInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalTemplateNameInsert: FC<ModalTemplateNameInsertProps> = ({
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
      toast.success("ModalTemplateNameInsert salvo com sucesso!");
      handleList();
      handleClose();
    }
  };

  return (
    <ModalDefault
      title={
        itemEdit
          ? "Editar ModalTemplateNameInsert"
          : "Adicionar ModalTemplateNameInsert"
      }
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="ModalTemplateNameInsert"
        data-testid="ModalTemplateNameInsert"
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
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalTemplateNameInsert;
