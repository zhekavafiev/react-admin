import {useState} from "react";

export function useSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggle = () => setIsCollapsed(! isCollapsed)

    return {
        isCollapsed,
        toggle
    }
}
