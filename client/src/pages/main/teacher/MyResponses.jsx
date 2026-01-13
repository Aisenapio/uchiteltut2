import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TEACHER_APPLICATIONS, WITHDRAW_JOB_RESPONSE } from '@/graphql/teacherOperations';

const statusMap = {
    invited: { label: "Приглашение", variant: "default", color: "bg-green-500 hover:bg-green-600" },
    pending: { label: "На рассмотрении", variant: "secondary", color: "bg-yellow-500 hover:bg-yellow-600" },
    rejected: { label: "Отказ", variant: "destructive", color: "" }
};

export default function MyResponses() {
    const { loading, error, data, refetch } = useQuery(GET_TEACHER_APPLICATIONS);
    const [withdrawApplication] = useMutation(WITHDRAW_JOB_RESPONSE);

    if (loading) return <div className="p-6">Загрузка откликов...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

    const responses = data?.teacherApplications || [];

    const handleWithdraw = async (applicationId) => {
        if (!confirm('Вы уверены, что хотите отменить отклик?')) return;
        try {
            await withdrawApplication({ variables: { applicationId } });
            refetch();
        } catch (err) {
            console.error('Failed to withdraw application:', err);
            alert('Не удалось отменить отклик: ' + err.message);
        }
    };

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
                    {responses.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                            <p className="text-slate-500">Вы еще не откликались на вакансии. Найдите подходящую вакансию и отправьте отклик.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Вакансия</TableHead>
                                    <TableHead>Школа</TableHead>
                                    <TableHead>Дата отклика</TableHead>
                                    <TableHead>Статус</TableHead>
                                    <TableHead>Действия</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {responses.map((response) => (
                                    <TableRow key={response.id}>
                                        <TableCell className="font-medium">{response.job?.position || "Вакансия удалена"}</TableCell>
                                        <TableCell>{response.job?.school?.name || "Неизвестно"}</TableCell>
                                        <TableCell>{response.job?.openDate || "Не указано"}</TableCell>
                                        <TableCell>
                                            {(() => {
                                                const statusInfo = statusMap[response.status] || statusMap.pending;
                                                return (
                                                    <Badge
                                                        variant={statusInfo.variant}
                                                        className={statusInfo.color}
                                                    >
                                                        {statusInfo.label}
                                                    </Badge>
                                                );
                                            })()}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleWithdraw(response.id)}
                                                disabled={response.status !== 'pending'}
                                            >
                                                Отменить отклик
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
