import { useState, useMemo } from "react";
import { useQuery } from '@apollo/client/react';
import { GET_ALL_JOBS } from '@/graphql/teacherOperations';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import VacancyCard from "@/components/public/VacancyCard";

export default function JobSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);

    const { loading, error, data } = useQuery(GET_ALL_JOBS, {
        variables: {
            filter: {
                search: searchQuery
            }
        }
    });

    if (loading) return <div className="p-6">Загрузка вакансий...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

    const allJobs = data?.jobs || [];
    const visibleJobs = allJobs.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Поиск вакансий</h1>
                <p className="text-slate-500">Найдите подходящую работу среди открытых вакансий.</p>
            </div>

            <div className="flex gap-2 p-2 bg-white rounded-xl border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="Должность, школа или район..."
                        className="pl-10 h-10 border-none shadow-none focus-visible:ring-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Найти
                </Button>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">
                    {searchQuery ? `Найдено: ${allJobs.length}` : "Все вакансии"}
                </h2>

                {visibleJobs.length > 0 ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleJobs.map(job => (
                                <VacancyCard key={job.id} job={job} />
                            ))}
                        </div>

                        {visibleCount < allJobs.length && (
                            <div className="flex justify-center">
                                <Button onClick={handleLoadMore} variant="outline">
                                    Показать еще
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                        <p className="text-slate-500">Ничего не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
}
