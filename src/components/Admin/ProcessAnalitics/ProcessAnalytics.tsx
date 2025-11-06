import './ProcessAnalytics.css'
import type { DailyEventStats } from './types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {getProcessStatistics} from "../services/orderService.tsx";
import {useState} from "react";
import DateRangeFilter from "../../UI/DateRange";


interface ProcessAnalyticsProps {

}

function ProcessAnalytics({}: ProcessAnalyticsProps) {
    const [data, setData] = useState<DailyEventStats[]>([])

    const loadData = async (from: Date, to: Date) => {
        try {
            const statistics = await getProcessStatistics(from, to)
            setData(statistics)
        } catch (error) {
            console.error('Ошибка загрузки статистики:', error)
        }
    }


    const initial = {
        'failed': 0,
        'restored': 0,
        'success': 0,
        'started': 0,
        'sum': 0,
    }

    const sumByResult = data.reduce(
        (acc, value: DailyEventStats) => {
            acc['failed'] += value.failed
            acc['success'] += value.success
            acc['restored'] += value.restored
            acc['started'] += value.started
            acc['sum'] = acc['sum'] + value.restored + value.failed + value.success + value.started

            return acc
        },
        initial
    )

    return (
        <div className="analytics-container">
            <DateRangeFilter
                onApply={loadData}
            />
            <h2 className="analytics-header">Статистика событий за неделю</h2>
            <div className="analytics-stats">
                <div className="analytics-stat-card analytics-stat-card--total">
                    <div className="analytics-stat-card__label">Всего событий</div>
                    <div className="analytics-stat-card__value">{sumByResult.sum}</div>
                </div>

                <div className="analytics-stat-card analytics-stat-card--success">
                    <div className="analytics-stat-card__label">Успешных</div>
                    <div className="analytics-stat-card__value">{sumByResult.success}</div>
                    <div className="analytics-stat-card__percent">{getPercent(sumByResult.success, sumByResult.sum)}%</div>
                </div>

                <div className="analytics-stat-card analytics-stat-card--restored">
                    <div className="analytics-stat-card__label">Восстановлено</div>
                    <div className="analytics-stat-card__value">{sumByResult.restored}</div>
                    <div className="analytics-stat-card__percent">{getPercent(sumByResult.restored, sumByResult.sum)}%</div>
                </div>

                <div className="analytics-stat-card analytics-stat-card--failed">
                    <div className="analytics-stat-card__label">Ошибок</div>
                    <div className="analytics-stat-card__value">{sumByResult.failed}</div>
                    <div className="analytics-stat-card__percent">{getPercent(sumByResult.failed, sumByResult.sum)}%</div>
                </div>

                <div className="analytics-stat-card analytics-stat-card--started">
                    <div className="analytics-stat-card__label">Запущенных</div>
                    <div className="analytics-stat-card__value">{sumByResult.started}</div>
                    <div className="analytics-stat-card__percent">{getPercent(sumByResult.started, sumByResult.sum)}%</div>
                </div>

            </div>
            <div className="analytics-chart">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            stroke="#4a5568"
                            style={{ fontSize: '14px' }}
                        />
                        <YAxis
                            stroke="#4a5568"
                            style={{ fontSize: '14px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#ffffff',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '14px' }}
                        />

                        <Line
                            type="monotone"
                            dataKey="success"
                            stroke="#4caf50"
                            strokeWidth={2}
                            name="Успешные"
                            dot={{ fill: '#4caf50', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="failed"
                            stroke="#e53e3e"
                            strokeWidth={2}
                            name="Ошибки"
                            dot={{ fill: '#e53e3e', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="restored"
                            stroke="#f6ad55"
                            strokeWidth={2}
                            name="Восстановлено"
                            dot={{ fill: '#f6ad55', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="started"
                            stroke="#00d1f5"
                            strokeWidth={2}
                            name="Только начаты"
                            dot={{ fill: '#00d1f5', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

function getPercent(part: numeric, total: numeric): numeric {
    return Math.round(part / total * 100 * 100) / 100;
}

export default ProcessAnalytics