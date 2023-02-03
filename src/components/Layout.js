import { NavigationBar } from "./NavigationBar";

export function Layout({ children }) {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
}