import "./styles.scss";
import MaterialDialog from "../MaterialDialog";
import MaterialSwitch from "../MaterialSwitch";
import { FormData } from "../../models/FormData";
import { phoneFormatter } from "../../utils/regex";
import { defaultFormData } from "../../utils/default";
import { getBackgroundClass, getFormValidation } from "../../utils/config";

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { send } from "emailjs-com";

const SERVICE_ID = "service_nf2utp5";
const TEMPLATE_ID = "template_gzpr1nh";
const USER_ID = "4vQlS68QfGz2QL2PO";

const App = () => {
  const [nightModeOn, setNightModeOn] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const changeMode = () => setNightModeOn(!nightModeOn);
  const resetFormData = () => setFormData(defaultFormData);

  const handleOpenDialog = () => {
    setOpenSuccessDialog(true);
  };

  const handleSendEmail = () => {
    handleOpenDialog();

    const newFormData: any = formData;

    send(SERVICE_ID, TEMPLATE_ID, newFormData, USER_ID).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const handleCloseDialog = () => {
    setOpenSuccessDialog(false);
    resetFormData();
  };

  const handleChangeForm = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const switchProps = {
    label: "",
    onChange: changeMode,
    checked: nightModeOn,
    defaultChecked: true,
  };

  const materialDialogProps = {
    open: openSuccessDialog,
    handleClose: handleCloseDialog,
  };

  const backgroundClass = getBackgroundClass(nightModeOn);
  const { formValidation, isFormValidated } = getFormValidation(formData);

  return (
    <div className={backgroundClass}>
      <MaterialDialog {...materialDialogProps} />
      <div className="basic-form-container">
        <MaterialSwitch {...switchProps} />
        <h1 className="basic-form-title">Overmind</h1>
        <div className="basic-form basic-form-gradient">
          <TextField
            id="name"
            fullWidth
            variant="standard"
            label="Nome Completo"
            value={formData?.name}
            className="basic-form-field"
            error={formValidation?.name?.error}
            helperText={formValidation?.name?.helperText}
            onChange={(e) => handleChangeForm("name", e?.target?.value)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="standard"
            value={formData?.email}
            className="basic-form-field"
            error={formValidation?.email?.error}
            helperText={formValidation?.email?.helperText}
            onChange={(e) => handleChangeForm("email", e?.target?.value)}
          />
          <TextField
            fullWidth
            id="phone"
            label="Telefone"
            variant="standard"
            className="basic-form-field"
            value={phoneFormatter(formData?.phone)}
            error={formValidation?.phone?.error}
            helperText={formValidation?.phone?.helperText}
            onChange={(e) => handleChangeForm("phone", e?.target?.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Senha"
            type="password"
            variant="standard"
            value={formData?.password}
            error={formValidation?.password?.error}
            helperText={formValidation?.password?.helperText}
            onChange={(e) => handleChangeForm("password", e?.target?.value)}
          />
          <div className="basic-form-footer">
            <Button
              variant="outlined"
              disabled={!isFormValidated}
              onClick={() => handleSendEmail()}
            >
              Enviar
            </Button>
            <Button variant="outlined" onClick={() => resetFormData()}>
              Limpar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
