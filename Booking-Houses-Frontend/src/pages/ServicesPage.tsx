import React, { useState } from "react";
import { Container, Typography, Box, Collapse, TextField } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const servicesData = [
  {
    title: "Банный комплекс",
    description: `КУПЕЛЬ НА ДРОВАХ\n\nСтоимость одной растопки (температура держится 3-4 часа)\n\n5000 руб. - с мая по октябрь\n\n6000 руб. - с ноября по апрель\n\nНаслаждаться лесом сидя в тёплой купели, зимой и летом - что может быть прекраснее?\n\nБез ограничения по времени.\n\nНеобходимо бронировать заранее, так как на топку и замену воды требуется около 5 часов.\n\nМаксимальная вместимость - 4-6 человек.\n\nТопим для одних гостей в день.`,
  },
  {
    title: "Фурако-купель в глэмпе на двоих",
    description: `Размещение — 2-4 взрослых\n\nКупель располагается на открытой террасе глэмпа на двоих с панорамным видом на озеро. Контраст температур расслабит тело, укрепит иммунную и нервную систему.\n\nСтоимость — 5000 руб./3 часа\n\nБронирование не позднее, чем за 1 сутки до желаемой даты.`,
  },
  {
    title: "Лесная релакс-зона с фурако-купелью",
    description: "Описание для лесной релакс-зоны с фурако-купелью.",
  },
  {
    title: "Детский досуг",
    description: `Мы уделяем большое внимание отдыху самых маленьких Гостей и предоставляем несколько вариантов досуга: \n\nдля прогулок на свежем воздухе — фрисби, бадминтон, игровая площадка и прокат детского багги, для домашних вечеров — увлекательные настольные игры.`,
  },
];

const StyledContainer = styled(Container)({
  marginTop: "20px",
  marginBottom: "20px",
});

const ServiceTitle = styled(Typography)({
  cursor: "pointer",
  color: "#333333",
  "&:hover": {
    color: "#555555",
  },
  display: "flex",
  alignItems: "center",
  padding: "10px 0",
  transition: "color 0.3s ease",
});

const ServiceDescription = styled(Typography)({
  backgroundColor: "#f5f5f5",
  padding: "10px",
  borderRadius: "4px",
  whiteSpace: "pre-line",
});

const SearchField = styled(TextField)({
  marginBottom: "20px",
});

const ServiceBox = styled(Box)({
  marginBottom: "10px",
  borderBottom: "1px solid #ddd",
  paddingBottom: "10px",
});

const ServicesPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredServices = servicesData.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StyledContainer maxWidth="md">
      <SearchField
        label="Поиск"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredServices.map((service, index) => (
        <ServiceBox key={index}>
          <ServiceTitle variant="h6" onClick={() => handleToggle(index)}>
            {expandedIndex === index ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowForwardIosIcon />
            )}
            {service.title}
          </ServiceTitle>
          <Collapse in={expandedIndex === index}>
            <ServiceDescription variant="body1">
              {service.description}
            </ServiceDescription>
          </Collapse>
        </ServiceBox>
      ))}
    </StyledContainer>
  );
};

export default ServicesPage;
