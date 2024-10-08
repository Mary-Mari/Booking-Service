import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface House {
  _id?: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
}

interface HouseFormProps {
  house?: House;
  onSubmit: () => void;
}

const HouseForm: React.FC<HouseFormProps> = ({ house, onSubmit }) => {
  const history = useHistory();
  const [formData, setFormData] = useState<House>({
    title: "",
    description: "",
    price: 0,
    capacity: 0,
    amenities: [],
  });

  useEffect(() => {
    if (house) {
      setFormData({
        ...house,
      });
    }
  }, [house]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (house) {
        await axios.put(`/houses/${house._id}`, formData);
      } else {
        const response = await axios.post("/houses", formData);
        if (response.status === 201) {
          // Получаем id созданного дома из ответа сервера
          const newHouseId = response.data._id;
          // Переходим на страницу с созданным домом
          history.push(`/houses/${newHouseId}`);
        }
      }
      onSubmit();
    } catch (error) {
      console.error("Ошибка при сохранении данных", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Вместимость:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Удобства (через запятую):</label>
        <input
          type="text"
          name="amenities"
          value={formData.amenities.join(", ")}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{house ? "Обновить" : "Создать"}</button>
    </form>
  );
};

export default HouseForm;
