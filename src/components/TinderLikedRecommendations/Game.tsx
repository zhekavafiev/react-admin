import { useState } from "react";
import { fetchSessionStart, fetchLike, fetchDislike } from "./swipeService";
import type { SessionData, Product } from "./types";

function Game() {
    const [session, setSession] = useState<SessionData | null>(null);

    const handleStart = async () => {
        const data = await fetchSessionStart();
        setSession(data);
    };

    const handleLike = async () => {
        const data = await fetchLike(session.sessionId, session.product.id);
        setSession(data);
    };

    const handleDislike = async () => {
        const data = await fetchDislike(session.sessionId, session.product.id);
        setSession(data);
    };

    if (!session) {
        return <button onClick={handleStart}>Начать</button>;
    }

    return (
        <div>
            <ProductCard product={session.product} />
            <button onClick={handleLike}>❤️</button>
            <button onClick={handleDislike}>👎</button>
            <p>{session.progress.current} / {session.progress.total}</p>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div>
            <img src={product.imageUrl} alt={product.name} width="300" />
            <h3>{product.name}</h3>
            <p>{product.price} ₽</p>
        </div>
    );
}

export default Game;