import * as yup from "yup";

export const schema = yup.object().shape({
  number: yup.string().required(`Número é obrigatório`),
  companyid: yup.string().required(`Código da Empresa é obrigatório`),
  qrcode: yup.string().required(`QrCode é obrigatório`),
  hasStatus: yup.string().required(`Status é obrigatório`),
});
