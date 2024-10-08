import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

interface AddGlampingFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  token: string | null;
}

const AddGlampingForm: React.FC<AddGlampingFormProps> = ({ onSubmit, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [amenities, setAmenities] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.error("Файл изображения не выбран");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('capacity', String(capacity));
    formData.append('amenities', amenities);
    formData.append('price', String(price));

    try {
      await onSubmit(formData);
      resetForm();
    } catch (err) {
      console.error('Ошибка при добавлении глэмпинга:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCapacity(0);
    setPrice(0);
    setAmenities('');
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        style={{
          backgroundColor: '#e6dfd6',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Добавить новый глэмпинг
        </Typography>
        <TextField
          label="Название"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Описание"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Цена"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Вместимость"
          variant="outlined"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Удобства"
          variant="outlined"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <input
          type="file"
          name="filename"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={{ marginBottom: '10px' }}
        />
        <Box textAlign="center">
          <Button
            sx={{ backgroundColor: '#333333', color: '#FFFFFF' }}
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Добавление...' : 'Добавить глэмпинг'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddGlampingForm;
