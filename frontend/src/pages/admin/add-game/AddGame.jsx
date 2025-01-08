import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { BasicInfo } from './components/BasicInfo';
import { SystemRequirements } from './components/SystemRequirements';
import { MediaUpload } from './components/MediaUpload';
import { useGameForm } from './hooks/useGameForm';

const steps = [
  'Основная информация',
  'Системные требования',
  'Медиа'
];

const AddGame = () => {
  const {
    formData,
    loading,
    activeStep,
    images,
    handleChange,
    handleSystemRequirementsChange,
    handleImageUpload,
    handleImageRemove,
    handleNext,
    handleBack,
    validateStep,
    handleSubmit
  } = useGameForm();

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInfo
            formData={formData}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <SystemRequirements
            formData={formData}
            onChange={handleSystemRequirementsChange}
          />
        );
      case 2:
        return (
          <MediaUpload
            images={images}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Добавить новую игру
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Назад
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmit('draft')}
                  disabled={loading || !validateStep(activeStep)}
                >
                  {loading ? <CircularProgress size={24} /> : 'Сохранить черновик'}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit('published')}
                  disabled={loading || !validateStep(activeStep)}
                >
                  {loading ? <CircularProgress size={24} /> : 'Опубликовать'}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!validateStep(activeStep)}
              >
                Далее
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddGame;
