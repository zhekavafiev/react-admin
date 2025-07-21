// new-admin/src/components/HelloWorld/HelloWorld.tsx
import {useState} from 'react'
import './HelloWorld.css'
import Counter from '../UI/Counter/Counter.tsx'

// TypeScript интерфейс для пропсов компонента
interface HelloWorldProps {
    title?: string;
    subtitle?: string;
}

function HelloWorld({
    title = "React Admin Panel",
    subtitle = "Roadmap: 69 часов до джуна"
}: HelloWorldProps) {
    const [count, setCount] = useState(0)

    return (
        <div className="hello-world">
            {/* Заголовок админки */}
            <header className="hello-world__header">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </header>

            {/* Основной контент */}
            <main className="hello-world__content">
                <div className="hello-world__card">
                    <h2>Hello World!</h2>
                    <p>Добро пожаловать в админку интернет-магазина</p>

                    {/* Интерактивный счетчик для демонстрации React состояния */}
                    <Counter
                        step={1}
                        text={"Тут прибавляем"}
                        command={'Нажмите чтобы сбросить'}
                    />

                    <Counter
                        step={-1}
                        text={"Тут вычитаем"}
                        command={'Нажмите чтобы сбросить'}
                    />

                    {/* Информация о технологиях */}
                    <div className="hello-world__tech">
                        <h3>Технологический стек:</h3>
                        <div className="hello-world__tech-list">
                            <span className="hello-world__tech-item">⚛️ React 19</span>
                            <span className="hello-world__tech-item">📦 TypeScript</span>
                            <span className="hello-world__tech-item">⚡ Vite</span>
                            <span className="hello-world__tech-item">🐳 Docker</span>
                            <span className="hello-world__tech-item">📦 PNPM</span>
                        </div>
                    </div>

                    {/* Статус системы */}
                    <div className="hello-world__status">
                        <div className="hello-world__status-item hello-world__status-item--ok">
                            ✅ React Dev Server: Запущен
                        </div>
                        <div className="hello-world__status-item hello-world__status-item--ok">
                            ✅ Hot Module Replacement: Активен
                        </div>
                        <div className="hello-world__status-item hello-world__status-item--ok">
                            ✅ TypeScript: Работает
                        </div>
                        <div className="hello-world__status-item hello-world__status-item--pending">
                            ⏳ Laravel API: Ожидает подключения
                        </div>
                    </div>
                </div>
            </main>

            {/* Футер */}
            <footer className="hello-world__footer">
                <p>Этап 1/5: Настройка проекта завершена 🎉</p>
            </footer>
        </div>
    )
}

export default HelloWorld
