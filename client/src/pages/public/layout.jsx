import { Outlet } from "react-router";
import PublicHeader from "../../components/public/PublicHeader";

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <PublicHeader />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-auto">
                <p>&copy; {new Date().getFullYear()} Учитель тут. Республика Саха (Якутия).</p>
            </footer>
        </div>
    );
};

export default PublicLayout;
