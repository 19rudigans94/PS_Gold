import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

export const MediaUpload = ({ images, onUpload, onRemove }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    onUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    onUpload(files);
  };

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: '2px dashed #ccc',
          borderRadius: 2,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('image-upload').click()}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'action.active', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Перетащите изображения сюда
        </Typography>
        <Typography color="textSecondary">
          или нажмите для выбора файлов
        </Typography>
      </Paper>

      {images.length > 0 && (
        <ImageList cols={3} gap={16}>
          {images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={`Game screenshot ${index + 1}`}
                loading="lazy"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    onClick={() => onRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};
