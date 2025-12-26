import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup.number().notRequired(),
  name: yup.string().required(`Nome é obrigatório`).min(3).max(100),
  description: yup.string().required(`Descrição é obrigatório`).min(3).max(150),
  price: yup.number().required(`Preço é obrigatório`),
  hasPromotionalPrice: yup.string().required(`Possui preço promocional é obrigatório`),
  hasActive: yup.string().required(`Ativo ou não é obrigatório`),
  promotionalPrice: yup.number().notRequired(),  
  image: yup.string().required(`Imagem é obrigatória`),
  active: yup.boolean().required(),
  categoryId: yup.number().required(`Categoria é obrigatório`)
});
