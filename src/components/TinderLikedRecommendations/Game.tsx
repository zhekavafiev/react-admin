import { useState } from "react";
import { fetchSessionStart, fetchLike, fetchDislike } from "./swipeService";
import type { ProductResponse } from "./types";

function Game() {
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    const handleStart = async () => {
        const data = await fetchSessionStart();
        setProduct(data.product);
        setSessionId(data.sessionId)
    };

    const handleLike = async () => {
        const data = await fetchLike(sessionId, product.id);
        setProduct(data.product);
        setSessionId(data.sessionId)
    };

    const handleDislike = async () => {
        const data = await fetchDislike(sessionId, product.id);
        setProduct(data.product);
        setSessionId(data.sessionId)
    };

    if (!product) {
        return <button onClick={handleStart}>Начать</button>;
    }

    return (
        <div>
            <ProductCard product={product} />
            <button onClick={handleLike}>❤️</button>
            <button onClick={handleDislike}>👎</button>
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