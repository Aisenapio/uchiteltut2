import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_JOB_APPLICATIONS, UPDATE_APPLICATION_STATUS, ADD_APPLICATION_MESSAGE } from "@/graphql/schoolOperations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const JobApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingMessage, setEditingMessage] = useState(null);
  const [messageText, setMessageText] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_JOB_APPLICATIONS, {
    variables: { jobId: id }
  });

  const [updateApplicationStatus] = useMutation(UPDATE_APPLICATION_STATUS, {
    onCompleted: () => {
      toast.success("Статус отклика обновлен");
      refetch();
    },
    onError: (error) => {
      toast.error(`Ошибка обновления статуса: ${error.message}`);
    }
  });

  const [addApplicationMessage] = useMutation(ADD_APPLICATION_MESSAGE, {
    onCompleted: () => {
      toast.success("Сообщение добавлено");
      setEditingMessage(null);
      setMessageText("");
      refetch();
    },
    onError: (error) => {
      toast.error(`Ошибка добавления сообщения: ${error.message}`);
    }
  });

  const handleStatusChange = async (applicationId, newStatus) => {
    await updateApplicationStatus({
      variables: { applicationId, status: newStatus }
    });
  };

  const handleSendMessage = async (applicationId) => {
    if (!messageText.trim()) {
      toast.error("Введите текст сообщения");
      return;
    }

    await addApplicationMessage({
      variables: { applicationId, message: messageText }
    });
  };

  if (loading) return <div className="p-6">Загрузка откликов...</div>;
  if (error) return <div className="p-6">Ошибка: {error.message}</div>;

  const applications = data?.jobApplications || [];
  const job = applications[0]?.job;

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" /> На рассмотрении</Badge>;
      case "invited":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Приглашен</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Отклонен</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/dashboard/school")}
            variant="ghost"
            size="sm"
            className="pl-0 hover:bg-transparent text-primary hover:text-primary/80 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к вакансиям
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Отклики на вакансию</h1>
            <p className="text-slate-500">
              {job ? `${job.position} (${job.school?.name})` : "Загрузка..."}
            </p>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Откликов пока нет</h3>
          <p className="text-slate-500 mb-4">На эту вакансию еще никто не откликнулся.</p>
          <Button onClick={() => navigate("/dashboard/school")} variant="outline">
            Вернуться к вакансиям
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Учитель</TableHead>
                <TableHead>Контактная информация</TableHead>
                <TableHead>Дата отклика</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">
                          {application.teacher?.firstName} {application.teacher?.lastName}
                        </p>
                        <p className="text-sm text-slate-500">{application.teacher?.email}</p>
                      </div>
                      {application.teacher && (
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            <span className="font-medium">Образование:</span>{" "}
                            {application.teacher.education?.length > 0 ?
                              application.teacher.education.map(edu =>
                                edu.institution || edu.faculty || edu.level
                              ).filter(Boolean).join(", ") : "Не указано"}
                          </p>
                          <p>
                            <span className="font-medium">Опыт:</span>{" "}
                            {application.teacher.experience ?
                              `${application.teacher.experience} лет` : "Не указано"}
                          </p>
                          <p>
                            <span className="font-medium">Предметы:</span>{" "}
                            {application.teacher.subjects || "Не указаны"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <a
                          href={`mailto:${application.teacher?.email}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {application.teacher?.email}
                        </a>
                      </div>
                      {application.teacher?.teacherDetails?.resume && (
                        <div className="pt-2">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={application.teacher.teacherDetails.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              📄 Смотреть резюме
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(application.appliedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getStatusBadge(application.status)}
                      {application.message && (
                        <div className="pt-2">
                          <p className="text-xs text-slate-500 mb-1">Сообщение от школы:</p>
                          <p className="text-sm bg-slate-50 p-2 rounded">{application.message}</p>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {application.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleStatusChange(application.id, "invited")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Пригласить
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(application.id, "rejected")}
                            >
                              Отклонить
                            </Button>
                          </>
                        )}
                        {application.status === "invited" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(application.id, "rejected")}
                          >
                            Отклонить
                          </Button>
                        )}
                        {application.status === "rejected" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleStatusChange(application.id, "invited")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Пригласить
                          </Button>
                        )}
                      </div>

                      <div className="pt-2">
                        {editingMessage === application.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              placeholder="Введите сообщение для учителя..."
                              rows={3}
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSendMessage(application.id)}
                              >
                                Отправить
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingMessage(null);
                                  setMessageText("");
                                }}
                              >
                                Отмена
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingMessage(application.id);
                              setMessageText(application.message || "");
                            }}
                            className="w-full"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {application.message ? "Изменить сообщение" : "Добавить сообщение"}
                          </Button>
                        )}
                      </div>
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

export default JobApplications;