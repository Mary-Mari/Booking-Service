import React, { useState, useEffect, useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Typography } from '@mui/material';
import { ru } from 'date-fns/locale';

interface CalendarComponentProps {
  unavailableDates: Date[];
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ unavailableDates, onDateSelect }) => {
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const disableUnavailableDates = useCallback((date: Date) => {
    return unavailableDates.some(
      (unavailableDate) => new Date(unavailableDate).toDateString() === date.toDateString()
    );
  }, [unavailableDates]);

  const handleDateChange = (newValue: Date | null) => {
    const { start, end } = selectedRange;

    if (!start || (start && end)) {
      setSelectedRange({ start: newValue, end: null });
    } else if (newValue && newValue < start) {
      setSelectedRange({ start: newValue, end: null });
    } else {
      setSelectedRange({ ...selectedRange, end: newValue });
    }
  };

  useEffect(() => {
    const { start, end } = selectedRange;
    if (start && end) {
      onDateSelect(start, end);
    }
  }, [selectedRange, onDateSelect]); // Только при изменении selectedRange или onDateSelect

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru as any}>
      <DateCalendar
        value={selectedRange.start}
        shouldDisableDate={disableUnavailableDates}
        onChange={handleDateChange}
      />
      <Typography variant="caption">Указана минимальная цена номера за 1 сутки.</Typography>
    </LocalizationProvider>
  );
};

export default CalendarComponent;
