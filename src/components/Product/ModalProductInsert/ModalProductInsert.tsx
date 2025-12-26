import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { yesOrNo } from "../../../models/OptionsValues";
import FormatMoney from "../../../utils/FormatMoney";
import ModalDefault from "../../ModalDefault/ModalDefault";
import "./ModalProductInsert.css";
import { schema } from "./Validate";

interface ModalProductInsertProps {
  show: boolean;
  onClose: any;
  itemEdit?: any;
}

const ModalProductInsert: FC<ModalProductInsertProps> = ({
  show,
  onClose,
  itemEdit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState<any>("");
  const [pricePromotionalValue, setPricePromotionalValue] = useState<any>("");
  const [isPromotionalPrice, setIsPromotionalPrice] = useState<boolean>(false);
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

  const onSubmit = async (data: any) => {
    // const ret = await handleSave(data);
    // if (ret) {
    //   toast.success("ModalProductInsert salvo com sucesso!");
    //   handleList();
    //   handleClose();
    // }
  };

  const handlePriceValue = (e: any) => {
    const inputValue: string = e.target.value.replace(/\D/g, "");
    const numericValue: number = parseFloat(inputValue) / 100;
    setPriceValue(numericValue);
    setValue("price", numericValue);
  };

  const handlePricePromotionalValue = (e: any) => {
    const inputValue: string = e.target.value.replace(/\D/g, "");
    const numericValue: number = parseFloat(inputValue) / 100;
    setPriceValue(numericValue);
    setValue("promotionalPrice", numericValue);
  };

  const selectedIsPromotional = (val: any) => {
    setValue("hasPromotionalPrice", val.value);

    if (val.value === "S") {
      setIsPromotionalPrice(true);
    } else {
      setIsPromotionalPrice(false);
    }
  };

    const selectedIsActive = (val: any) => {
    setValue("hasActive", val.value);

    if (val.value === "S") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <ModalDefault
      title={itemEdit ? "Editar Produto" : "Adicionar Produto"}
      show={show}
      onClose={handleClose}
      sizeModal={"lg"}
      showFooter={true}
      textButtonAdd={isLoading ? "Salvando..." : "Salvar"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div className="ModalProductInsert" data-testid="ModalProductInsert">
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
              <label className="form-control-label mb-2">Preço *</label>
              <input
                type="text"
                className={`form-control ${errors?.price ? "is-invalid" : ""}`}
                value={FormatMoney(priceValue || "")}
                onChange={(e) => handlePriceValue(e)}
              />
              {errors?.price && (
                <div className="invalid-feedback">{errors?.price?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Imagem *</label>
              <input
                type="text"
                className={`form-control ${errors?.image ? "is-invalid" : ""}`}
                {...register("image")}
              />
              {errors?.image && (
                <div className="invalid-feedback">{errors?.image?.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">Categoria *</label>
              <input
                type="text"
                className={`form-control ${
                  errors?.categoryId ? "is-invalid" : ""
                }`}
                {...register("categoryId")}
              />
              {errors?.categoryId && (
                <div className="invalid-feedback">
                  {errors?.categoryId?.message}
                </div>
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
          <Col md={4}>
            <FormGroup className="mb-3">
              <label className="form-control-label mb-2">
                Possui preço promocional?
              </label>
              <ReactSelect
                isSearchable
                placeholder="Selecione"
                className={`form-control p-0`}
                noOptionsMessage={() => "Não há registros"}
                options={yesOrNo}
                {...register("hasPromotionalPrice", { required: true })}
                onChange={(val: any) => {
                  selectedIsPromotional(val);
                }}
              />
              {errors?.hasPromotionalPrice && (
                <div className="invalid-feedback">
                  {errors?.hasPromotionalPrice?.message}
                </div>
              )}
            </FormGroup>
          </Col>
          {isPromotionalPrice && (
            <Col md={4}>
              <FormGroup className="mb-3">
                <label className="form-control-label mb-2">
                  Preço Promocional *
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors?.promotionalPrice ? "is-invalid" : ""
                  }`}
                  value={FormatMoney(priceValue || "")}
                  onChange={(e) => handlePricePromotionalValue(e)}
                />
                {errors?.promotionalPrice && (
                  <div className="invalid-feedback">
                    {errors?.promotionalPrice?.message}
                  </div>
                )}
              </FormGroup>
            </Col>
          )}
        </Row>
      </div>
    </ModalDefault>
  );
};

export default ModalProductInsert;
