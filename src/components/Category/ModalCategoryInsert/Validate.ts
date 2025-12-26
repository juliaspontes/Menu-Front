import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(`Nome é obrigatório`),
  description: yup.string().required(`Descrição é obrigatório`),
  ordem: yup.string().required(`Ordem é obrigatório`),
  hasActive: yup.string().required(`Ativo ou não é obrigatório`),
});
