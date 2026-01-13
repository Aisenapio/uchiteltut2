import { jobs } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MyVacancies = () => {
    // Filter jobs for the "logged in" school (mocked as "МБОУ СОШ №2" for demo)
    const myJobs = jobs.filter(j => j.school === "МБОУ СОШ №2" || true); // Showing all for demo purposes if needed, or filter stricter

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Мои вакансии</h1>
                    <p className="text-slate-500">Управление открытыми вакансиями школы</p>
                </div>
                <Link to="/dashboard/school/vacancies/new">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="mr-2 h-4 w-4" /> Добавить вакансию
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Должность</TableHead>
                            <TableHead>Зарплата</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.position}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Активна
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(job.openDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/dashboard/school/vacancies/${job.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="hover:text-red-600">
                                            <Trash2 className="h-4 w-4 text-slate-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyVacancies;
