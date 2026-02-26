import * as yup from "yup";

export const transactionSchema = yup.object({
  description: yup.string().required("Descrição é obrigatória"),
  value: yup
    .number()
    .min(0.01, "Valor deve ser no mínimo R$ 0,01")
    .required("Valor é obrigatório"),
  typeId: yup
    .number()
    .min(1, "Selecione um tipo de transação")
    .required("Tipo de transação é obrigatório"),
  categoryId: yup
    .number()
    .min(1, "Selecione uma categoria")
    .required("Categoria é obrigatória"),
});
