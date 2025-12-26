import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { yesOrNo } from "../../../models/OptionsValues";
import { useExample } from "../../../providers/ExampleProvider";
import ModalDefault from "../../ModalDefault/ModalDefault";
import "./ModalCategoryInsert.css";
import { schema } from "./Validate";

interface ModalCategoryInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalCategoryInsert: FC<ModalCategoryInsertProps> = ({
  show,
  onClose,
  itemEdit,
}) => {
  const { handleList, handleSave, isLoading } = useExample();
  const [, setIsActive] = useState<boolean>(false);

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

    const selectedIsActive = (val: any) => {
    setValue("hasActive", val.value);

    if (val.value === "S") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onSubmit = async (data: any) => {
    const ret = await handleSave(data);

    if (ret) {
      toast.success("ModalCategoryInsert salvo com sucesso!");
      handleList();
      handleClose();
    }
  };

  return (
    <ModalDefault
      title={itemEdit ? "Editar Categoria" : "Adicionar Categoria"}
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div className="ModalCategoryInsert" data-testid="ModalCategoryInsert">
        <Row>
<Col md={12}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Nome *</label>
              <input
                type="text"
                className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                {...register("name")}
              />
              {errors?.name && (
                <div className="invalid-feedback">{errors?.name?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Descrição *</label>
              <textarea
                rows={3}
                className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                {...register("description")}
              ></textarea>
              {errors?.description && (
                <div className="invalid-feedback">
                  {errors?.description?.message}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Ordem *</label>
              <input
                type="number"
                className={`form-control  ${errors?.ordem ? "is-invalid" : ""}`}
                {...register("ordem")}
              />
              {errors?.name && (
                <div className="invalid-feedback">{errors?.ordem?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Ativo *</label>
              <ReactSelect
                isSearchable
                placeholder="Selecione"
                className={`form-control p-0`}
                noOptionsMessage={() => "Não há registros"}
                options={yesOrNo}
                {...register("hasActive", { required: true })}
                onChange={(val: any) => {
                  selectedIsActive(val);
                }}
              />
              {errors?.hasActive && (
                <div className="invalid-feedback">
                  {errors?.hasActive?.message}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalCategoryInsert;
