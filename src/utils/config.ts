import { FormData } from "../models/FormData";
import { isPasswordValidated } from "./regex";

const defaultValidation = {
  helperText: "",
  error: false,
};

export const getCommonFieldValidation = (field: string) => {
  const errorConfig = {
    helperText: "Insira um valor válido.",
    error: true,
  };

  if (field?.length === 0) return errorConfig;

  return defaultValidation;
};

export const getPasswordFieldValidation = (password: string) => {
  const errorConfig = {
    helperText:
      "A senha deve conter no mínimo 8 digitos, pelo menos 1 letra e 1 numero",
    error: true,
  };

  const validPassword = isPasswordValidated(password);

  if (!validPassword) return errorConfig;

  return defaultValidation;
};

export const getFormValidation = (formData: FormData) => {
  const formValidation = {
    name: getCommonFieldValidation(formData?.name),
    email: getCommonFieldValidation(formData?.email),
    phone: getCommonFieldValidation(formData?.phone),
    password: getPasswordFieldValidation(formData?.password),
  };

  const isFormValidated =
    !formValidation?.name?.error &&
    !formValidation?.email?.error &&
    !formValidation?.phone?.error &&
    !formValidation?.password?.error;

  return { formValidation, isFormValidated };
};

export const getBackgroundClass = (nightModeOn: boolean) => {
  let backgroundClass = "night-background";

  if (!nightModeOn) backgroundClass = "day-background";

  return backgroundClass;
};
