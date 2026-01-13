import { useQuery, useMutation } from '@apollo/client/react';
import { GET_MY_VACANCIES, DELETE_VACANCY } from '@/graphql/schoolOperations';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MyVacancies = () => {
    const navigate = useNavigate();
    const { loading, error, data, refetch } = useQuery(GET_MY_VACANCIES);
    const [deleteVacancy] = useMutation(DELETE_VACANCY);

    const handleDelete = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту вакансию?")) {
            try {
                await deleteVacancy({
                    variables: { id }
                });
                toast.success("Вакансия успешно удалена");
                refetch(); // Refresh the list after deletion
            } catch (err) {
                console.error('Error deleting vacancy:', err);
                toast.error(`Ошибка при удалении вакансии: ${err.message}`);
            }
        }
    };

    if (loading) return <div className="p-6">Загрузка вакансий...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

    const myJobs = data?.myJobs || [];

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

            {myJobs.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                    <p className="text-slate-500">У вас пока нет открытых вакансий. Добавьте первую вакансию.</p>
                </div>
            ) : (
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
                                            {job.status}
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
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="hover:text-red-600"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MyVacancies;
