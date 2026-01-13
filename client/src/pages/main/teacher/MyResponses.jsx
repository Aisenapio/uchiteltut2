import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@apollo/client/react';
import { GET_JOB_RESPONSES } from '@/graphql/teacherOperations';

const statusMap = {
    invited: { label: "Приглашение", variant: "default", color: "bg-green-500 hover:bg-green-600" },
    pending: { label: "На рассмотрении", variant: "secondary", color: "bg-yellow-500 hover:bg-yellow-600" },
    rejected: { label: "Отказ", variant: "destructive", color: "" }
};

export default function MyResponses() {
    const { loading, error, data } = useQuery(GET_JOB_RESPONSES);

    if (loading) return <div className="p-6">Загрузка откликов...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

    const responses = data?.jobResponses || [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Мои отклики</h1>
                <p className="text-slate-500">История ваших взаимодействий с работодателями.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Список откликов</CardTitle>
                    <CardDescription>Вы откликнулись на {responses.length} вакансий</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Вакансия</TableHead>
                                <TableHead>Школа</TableHead>
                                <TableHead>Дата отклика</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {responses.map((response) => (
                                <TableRow key={response.id}>
                                    <TableCell className="font-medium">{response.job?.position || "Вакансия удалена"}</TableCell>
                                    <TableCell>{response.job?.school || "Неизвестно"}</TableCell>
                                    <TableCell>{response.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={statusMap[response.status].variant}
                                            className={statusMap[response.status].color}
                                        >
                                            {statusMap[response.status].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            Подробнее
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
