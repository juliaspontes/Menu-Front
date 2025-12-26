import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { yesOrNo } from "../../../models/OptionsValues";
import ModalDefault from "../../ModalDefault/ModalDefault";
import "./ModalTableInsert.css";
import { schema } from "./Validate";

interface ModalTableInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalTableInsert: FC<ModalTableInsertProps> = ({
  show,
  onClose,
  itemEdit,
}) => {
  const [, setIsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setValue("number", itemEdit?.name);
    }
  }, [show, itemEdit]);

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const onSubmit = async (data: any) => {
    // const ret = await handleSave(data);
    // if (ret) {
    //   toast.success("ModalProductInsert salvo com sucesso!");
    //   handleList();
    //   handleClose();
    // }
  };

  const selectedStatus = (val: any) => {
    setValue("hasStatus", val.value);

    if (val.value === "S") {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  return (
    <ModalDefault
      title={
        itemEdit
          ? "Editar Mesa"
          : "Adicionar Mesa"
      }
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div className="ModalTableInsert" data-testid="ModalTableInsert">
        <Row>
          <Col md={3}>
            <FormGroup className="mb-3">
              <label className="form-control-label mv-2">Número *</label>
              <input
                type="number"
                className={`form-control  ${errors?.number ? "is-invalid" : ""}`}
                {...register("number")}
              />
              {errors?.number && (
                <div className="invalid-feedback">{errors?.number?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-3">
              <label className="form-control-label mv-2">Código da Empresa *</label>
              <input
                type="number"
                className={`form-control  ${errors?.companyid ? "is-invalid" : ""}`}
                {...register("companyid")}
              />
              {errors?.number && (
                <div className="invalid-feedback">{errors?.companyid?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="mb-3">
              <label className="form-control-label mv-2">QrCode *</label>
              <input
                type="text"
                className={`form-control  ${errors?.qrcode ? "is-invalid" : ""}`}
                {...register("qrcode")}
              />
              {errors?.number && (
                <div className="invalid-feedback">{errors?.qrcode?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Disponível *</label>
              <ReactSelect
                isSearchable
                placeholder="Selecione"
                className={`form-control p-0`}
                noOptionsMessage={() => "Não há registros"}
                options={yesOrNo}
                {...register("hasStatus", { required: true })}
                onChange={(val: any) => {
                  selectedStatus(val);
                }}
              />
              {errors?.hasStatus && (
                <div className="invalid-feedback">
                  {errors?.hasStatus?.message}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalTableInsert;
