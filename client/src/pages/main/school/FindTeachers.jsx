import { useState, useEffect } from "react";
import { useLazyQuery } from '@apollo/client/react';
import { FIND_TEACHERS } from '@/graphql/schoolOperations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GraduationCap, MapPin, Briefcase, Search, FileText, Download } from "lucide-react";

const FindTeachers = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [filters, setFilters] = useState({ subject: "", experience: "" });
    const [searchFilters, setSearchFilters] = useState({ role: "teacher", subject: "", experience: "" });
    const [visibleCount, setVisibleCount] = useState(25);

    const [executeSearch, { loading, error, data }] = useLazyQuery(FIND_TEACHERS);

    // Initial load on component mount
    useEffect(() => {
        executeSearch({ variables: { filter: searchFilters } });
    }, [executeSearch]); // Only run once on mount

    if (loading) return <div className="p-6">Загрузка учителей...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

    const allTeachers = data?.users || [];
    const visibleTeachers = allTeachers.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 25);
    };

    const handleSearch = () => {
        setSearchFilters({ role: "teacher", subject: filters.subject, experience: filters.experience });
        setVisibleCount(25); // Reset pagination on new search
        executeSearch({ variables: { filter: { role: "teacher", subject: filters.subject, experience: filters.experience } } });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Поиск учителей</h1>
                <p className="text-slate-500">Найдите подходящих кандидатов для вашей школы</p>
            </div>

            <div className="flex gap-4 mb-8 bg-white p-4 rounded-xl border">
                <div className="flex-1">
                    <Input
                        placeholder="Предмет (например, Математика)"
                        value={filters.subject}
                        onChange={e => setFilters({ ...filters, subject: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="bg-slate-50"
                    />
                </div>
                <Button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    <Search className="mr-2 h-4 w-4" /> {loading ? "Поиск..." : "Найти"}
                </Button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleTeachers.map(teacher => (
                        <Card key={teacher.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg text-blue-900">{teacher.firstName} {teacher.lastName}</CardTitle>
                                        {teacher.subjects && teacher.subjects.trim() && (
                                            <CardDescription className="font-medium text-slate-700">{teacher.subjects}</CardDescription>
                                        )}
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Briefcase className="h-4 w-4" />
                                    <span>Опыт: {teacher.experience || 0} лет</span>
                                </div>
                                {teacher.education && teacher.education.length > 0 && teacher.education[0]?.institution && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <GraduationCap className="h-4 w-4" />
                                        <span className="line-clamp-1">{teacher.education[0].institution}</span>
                                    </div>
                                )}
                                {teacher.region && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{teacher.region}</span>
                                    </div>
                                )}
                                {teacher.about && (
                                    <div className="pt-2">
                                        <p className="text-slate-500 italic line-clamp-2">"{teacher.about}"</p>
                                    </div>
                                )}
                                <Button className="w-full mt-2" variant="outline">
                                    Подробнее
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {visibleCount < allTeachers.length && (
                    <div className="flex justify-center pt-4">
                        <Button onClick={handleLoadMore} variant="outline" size="lg" className="min-w-[200px]">
                            Показать еще
                        </Button>
                    </div>
                )}
            </div>

            <Dialog open={!!selectedTeacher} onOpenChange={(open) => !open && setSelectedTeacher(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedTeacher?.name}</DialogTitle>
                        {selectedTeacher?.subjects && selectedTeacher.subjects.trim() && (
                            <DialogDescription className="text-lg text-primary font-medium">
                                {selectedTeacher.subjects}
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    {selectedTeacher && (
                        <div className="space-y-6 mt-4">
                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <h3 className="font-semibold mb-2">Контакты</h3>
                                    <p className="text-sm">Email: {selectedTeacher.email}</p>
                                    {selectedTeacher.phone && (
                                        <p className="text-sm">Телефон: {selectedTeacher.phone}</p>
                                    )}
                                    {selectedTeacher.region && (
                                        <p className="text-sm">Регион: {selectedTeacher.region}</p>
                                    )}
                                </div>
                                {selectedTeacher.about && (
                                    <div>
                                        <h3 className="font-semibold mb-2">О себе</h3>
                                        <p className="text-sm text-slate-600">{selectedTeacher.about}</p>
                                    </div>
                                )}
                            </div>

                            {/* Resume Download */}
                            {selectedTeacher.resumeFile && (
                                <div className="flex items-center justify-between p-4 border border-primary/20 bg-primary/5 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="font-medium text-sm">Прикрепленное резюме</p>
                                            <p className="text-xs text-slate-500">{selectedTeacher.resumeFile}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="h-4 w-4" /> Скачать PDF
                                    </Button>
                                </div>
                            )}

                            {/* Experience */}
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 font-semibold text-lg">
                                    <Briefcase className="h-5 w-5 text-slate-500" />
                                    Опыт работы
                                </h3>
                                <div className="pl-2 border-l-2 border-slate-200 space-y-4">
                                    <div className="relative pl-4">
                                        <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-200 border-2 border-white"></div>
                                        <p className="font-medium text-slate-900">Общий стаж: {selectedTeacher.experience || 0} лет</p>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 font-semibold text-lg">
                                    <GraduationCap className="h-5 w-5 text-slate-500" />
                                    Образование
                                </h3>
                                <div className="pl-2 border-l-2 border-slate-200 space-y-4">
                                    {selectedTeacher.education?.map(edu => (
                                        <div key={edu.id} className="relative pl-4">
                                            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-200 border-2 border-white"></div>
                                            <p className="font-medium text-slate-900">{edu.institution}</p>
                                            <p className="text-sm text-slate-600">{edu.faculty}, {edu.level}</p>
                                            <p className="text-xs text-slate-400">Год выпуска: {edu.year}</p>
                                        </div>
                                    ))}
                                    {(!selectedTeacher.education || selectedTeacher.education.length === 0) && (
                                        <p className="text-sm text-slate-500 pl-4">Нет записей об образовании.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

export default FindTeachers;
