import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(`Nome é obrigatório`),
  email: yup.string().required(`E-mail é obrigatório`),
  cargo: yup.string().required(`Cargo é obrigatório`),
});
