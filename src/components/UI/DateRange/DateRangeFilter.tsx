import {useState} from "react";
import DatePicker from "react-datepicker";

interface DateRangeFilterProps {
    onApply: (from: Date, to: Date) => void,
    label?: string;
}

function DateRangeFilter({ onApply, label = "📅 Период:" }: DateRangeFilterProps) {
    const [dateFrom, setDateFrom] = useState<Date | null>(null)
    const [dateTo, setDateTo] = useState<Date | null>(null)

    const handleApply = () => {
        if (dateFrom && dateTo) {
            onApply(dateFrom, dateTo)
        }
    }

    const setQuickFilter = (days: number) => {
        const to = new Date()
        const from = new Date()
        from.setDate(from.getDate() - days)

        setDateFrom(from)
        setDateTo(to)
    }

    return <div className="date-filter">
        <span className="date-filter__label">{label}:</span>

        <div className="date-filter__quick-buttons">
            <button
                className="date-filter__quick-button"
                onClick={() => setQuickFilter(1)}
            >
                День
            </button>
            <button
                className="date-filter__quick-button"
                onClick={() => setQuickFilter(7)}
            >
                Неделя
            </button>
            <button
                className="date-filter__quick-button"
                onClick={() => setQuickFilter(30)}
            >
                Месяц
            </button>
        </div>

        <DatePicker
            selectsRange={true}
            startDate={dateFrom}
            endDate={dateTo}
            onChange={(dates) => {
                const [start, end] = dates;
                setDateFrom(start);
                setDateTo(end);
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Выберите даты от и до"
            isClearable={true}
        />
        <button
            className="date-filter__button"
            onClick={handleApply}
            disabled={!dateFrom || !dateTo}
        >
            Применить
        </button>
    </div>
}

export default DateRangeFilter