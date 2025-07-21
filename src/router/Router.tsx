import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from "./routes.ts";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                { MapRoutes() }
            </Routes>
        </BrowserRouter>
    )
}

function MapRoutes() {
    return routes.map(route => <Route key={route.path} path={route.path} element={< route.component />} />)
}

export default Router
