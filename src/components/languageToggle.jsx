import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/material";

function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ButtonGroup
      variant="outlined"
      size="small"
      sx={{
        '& .MuiButton-root': {
          color: '#fff',
          border:'1px solid #fff',
          transition: 'background 0.2s, border-color 0.2s',
          backgroundColor: '#012d5880',
          
        },
        '& .MuiButton-root.Mui-selected, & .MuiButton-root.MuiButton-contained': {
          backgroundColor: 'rgba(1, 45, 88, 1)',
          color: '#fff',
          borderColor: '#fff',
        },
        '& .MuiButton-root:focus, & .MuiButton-root:active, & .MuiButton-root:hover': {
          borderColor: '#fff',
          color: '#fff',
        },
        '& .MuiButton-root.MuiButton-contained:focus, & .MuiButton-root.MuiButton-contained:active, & .MuiButton-root.MuiButton-contained:hover': {
          backgroundColor: '#012d58ff',
          border:'3px solid #fff',
          color: '#fff',
        },
        "margin-top":"1rem"
      }}
    >
      <Button
        onClick={() => handleLanguageChange('mr')}
        variant={i18n.language === 'mr' ? 'contained' : 'outlined'}
      >
        मराठी
      </Button>
      <Button
        onClick={() => handleLanguageChange('en')}
        variant={i18n.language === 'en' ? 'contained' : 'outlined'}
      >
        English
      </Button>
    </ButtonGroup>
  );
}
export default LanguageToggle;