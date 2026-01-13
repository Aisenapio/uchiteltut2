import { useState, useMemo } from "react";
import { jobs, supportOptions } from "../../data/mock";
import VacancyCard from "../../components/public/VacancyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(25);

    // Advanced Filters State
    const [filters, setFilters] = useState({
        subject: "",
        city: "",
        hours: "",
        salary: "",
        support: ""
    });
    const [showFilters, setShowFilters] = useState(false);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // 1. Main Search Query (matches text in multiple fields)
            if (searchQuery.trim()) {
                const lowerQuery = searchQuery.toLowerCase();
                const matchesMain =
                    job.position.toLowerCase().includes(lowerQuery) ||
                    job.school.toLowerCase().includes(lowerQuery) ||
                    job.region.toLowerCase().includes(lowerQuery);
                if (!matchesMain) return false;
            }

            // 2. Subject Filter
            if (filters.subject && !job.position.toLowerCase().includes(filters.subject.toLowerCase())) {
                return false;
            }

            // 3. City/Region Filter
            if (filters.city && job.region !== filters.city) {
                return false;
            }

            // 4. Hours Filter (Parse "18 часов" -> 18)
            if (filters.hours) {
                const jobHours = parseInt(job.hours.replace(/\D/g, '')) || 0;
                if (jobHours < parseInt(filters.hours)) return false;
            }

            // 5. Salary Filter (Parse "от 35000 ₽" -> 35000)
            if (filters.salary) {
                const jobSalary = parseInt(job.salary.replace(/\D/g, '')) || 0;
                if (jobSalary < parseInt(filters.salary)) return false;
            }

            // 6. Support Filter
            if (filters.support && !job.support.toLowerCase().includes(filters.support.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [searchQuery, filters]);

    const visibleJobs = filteredJobs.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 25);
    };

    const clearFilters = () => {
        setFilters({
            subject: "",
            city: "",
            hours: "",
            salary: "",
            support: ""
        });
        setSearchQuery("");
    };

    const uniqueCities = Array.from(new Set(jobs.map(j => j.region))).sort();

    return (
        <div className="space-y-8">
            <div className="relative text-white rounded-3xl p-8 sm:p-12 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
                <div className="absolute inset-0 bg-slate-900/80 z-0"></div>
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl p-24 rounded-full -top-1/2 -right-1/2 blur-[100px] pointer-events-none z-0"></div>
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                        Найдите работу мечты в школе
                    </h1>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        Лучшие вакансии для учителей, воспитателей и педагогов по всей Республике Саха (Якутия).
                    </p>

                    <div className="flex flex-col gap-4">
                        {/* Main Search Bar */}
                        <div className="flex gap-2 p-2 bg-white rounded-xl shadow-lg">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    placeholder="Должность, школа или район..."
                                    className="pl-10 h-12 bg-transparent border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="h-12 px-4 md:px-6 bg-slate-100 hover:bg-slate-200 text-slate-900"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="mr-2 h-4 w-4" /> Фильтры
                            </Button>
                        </div>

                        {/* Collapsible Filters */}
                        {showFilters && (
                            <div className="p-4 bg-white rounded-xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in zoom-in-95 duration-200">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 ml-1">Предмет</label>
                                    <Input
                                        placeholder="Например, Математика"
                                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                                        value={filters.subject}
                                        onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 ml-1">Район / Город</label>
                                    <Select value={filters.city} onValueChange={(v) => setFilters({ ...filters, city: v === "all" ? "" : v })}>
                                        <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900">
                                            <SelectValue placeholder="Все районы" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Все районы</SelectItem>
                                            {uniqueCities.map(city => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 ml-1">Нагрузка (часов от)</label>
                                    <Input
                                        type="number"
                                        placeholder="18"
                                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                                        value={filters.hours}
                                        onChange={(e) => setFilters({ ...filters, hours: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 ml-1">Зарплата (от ₽)</label>
                                    <Input
                                        type="number"
                                        placeholder="35000"
                                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                                        value={filters.salary}
                                        onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 ml-1">Меры поддержки</label>
                                    <Select value={filters.support} onValueChange={(v) => setFilters({ ...filters, support: v === "all" ? "" : v })}>
                                        <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900">
                                            <SelectValue placeholder="Любые меры" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Любые меры</SelectItem>
                                            {supportOptions.map(option => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        variant="ghost"
                                        className="w-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        onClick={clearFilters}
                                    >
                                        <X className="mr-2 h-4 w-4" /> Сбросить все
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    {filteredJobs.length > 0 ? `Результаты поиска: ${filteredJobs.length}` : "Вакансии не найдены"}
                </h2>

                {visibleJobs.length > 0 ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleJobs.map(job => (
                                <VacancyCard key={job.id} job={job} />
                            ))}
                        </div>

                        {visibleCount < filteredJobs.length && (
                            <div className="flex justify-center">
                                <Button onClick={handleLoadMore} variant="outline" size="lg" className="min-w-[200px]">
                                    Показать еще
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <p className="text-slate-500 text-lg mb-4">По вашему запросу ничего не найдено 😔</p>
                        <Button variant="outline" onClick={clearFilters} className="text-primary hover:text-primary/90">
                            Сбросить все фильтры
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
