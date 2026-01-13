const positions = [
  "Учитель математики", "Учитель русского языка", "Учитель физики",
  "Учитель информатики", "Учитель химии", "Учитель биологии",
  "Учитель истории", "Учитель английского языка", "Учитель начальных классов",
  "Учитель физкультуры", "Педагог-организатор", "Психолог"
];

const cities = ["Якутск", "Нерюнгри", "Мирный", "Вилюйск", "Алдан", "Ленск", "Покровск", "Олекминск"];

const schoolsList = [
  "МБОУ СОШ №2", "МБОУ Гимназия №1", "МБОУ Лицей №2",
  "МАОУ СОШ №17", "МБОУ СОШ №21", "МБОУ СОШ №33", "Якутский городской лицей",
  "Саха политехнический лицей", "МБОУ СОШ №5"
];

const names = [
  "Иванов Иван Иванович", "Петров Петр Петрович", "Сидоров Алексей Владимирович",
  "Смирнова Анна Сергеевна", "Кузнецова Мария Дмитриевна", "Попов Дмитрий Александрович",
  "Васильева Елена Николаевна", "Соколов Андрей Игоревич", "Михайлова Татьяна Павловна",
  "Новиков Сергей Викторович"
];

const subjects = [
  "Математика", "Русский язык", "Физика", "Химия", "Биология",
  "История", "Английский язык", "Информатика", "География", "Литература"
];

const educations = [
  "СВФУ, ИМИ", "СВФУ, ФЛФ", "СВФУ, ИЕН", "МГУ", "РГПУ им. Герцена",
  "НГПУ", "ТОГУ", "ТГУ"
];

const generateJobs = (count) => {
  const jobs = [];
  for (let i = 1; i <= count; i++) {
    const position = positions[Math.floor(Math.random() * positions.length)];
    const school = schoolsList[Math.floor(Math.random() * schoolsList.length)];
    const region = cities[Math.floor(Math.random() * cities.length)];
    const salaryBase = 35000 + Math.floor(Math.random() * 10) * 5000;

    jobs.push({
      id: String(i),
      position: position,
      school: school,
      region: region,
      salary: `от ${salaryBase} ₽`,
      hours: `${18 + Math.floor(Math.random() * 18)} часов`,
      housing: Math.random() > 0.5 ? "Предоставляется" : "Нет",
      benefits: Math.random() > 0.5 ? "Оплата проезда, Северные надбавки" : "Соцпакет",
      studentEmployment: Math.random() > 0.7,
      openDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      duties: `Преподавание предмета "${position.replace("Учитель ", "")}" для 5-11 классов.`,
      support: Math.random() > 0.5 ? "Компенсация аренды жилья" : "Подъемные молодым специалистам",
      contacts: `+7 (999) 000-00-${String(i).padStart(2, '0')}`,
      email: `school${Math.floor(Math.random() * 100)}@yakutsk.ru`
    });
  }
  return jobs;
};

const generateTeachers = (count) => {
  const teachers = [];
  for (let i = 1; i <= count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const educationStr = educations[Math.floor(Math.random() * educations.length)];

    teachers.push({
      id: String(i),
      name: `${name} ${i}`,
      subject: subject,
      experienceYears: Math.floor(Math.random() * 30),
      // Structured Data for Labor Book View
      education: [
        {
          id: 1,
          year: String(2010 + Math.floor(Math.random() * 10)),
          institution: educationStr,
          level: Math.random() > 0.5 ? "Магистр" : "Бакалавр",
          faculty: "Педагогический"
        }
      ],
      experience: [
        {
          id: 1,
          start: String(2018 + Math.floor(Math.random() * 3)),
          end: "2024",
          place: schoolsList[Math.floor(Math.random() * schoolsList.length)],
          position: `Учитель ${subject.toLowerCase()}`
        },
        {
          id: 2,
          start: "2015",
          end: "2018",
          place: schoolsList[Math.floor(Math.random() * schoolsList.length)],
          position: "Педагог-стажер"
        }
      ],
      resumeFile: Math.random() > 0.3 ? `rezume_${name.split(' ')[0]}.pdf` : null,
      about: "Опытный, ответственный педагог. Готов к переезду.",
      region: cities[Math.floor(Math.random() * cities.length)],
      email: `teacher${i}@example.com`,
      phone: `+7 (999) 000-00-${String(i).padStart(2, '0')}`
    });
  }
  return teachers;
};

export const jobs = generateJobs(50);
export const teachers = generateTeachers(50);

export const supportOptions = [
  "Предоставление жилья",
  "Компенсация аренды жилья",
  "Подъемные молодым специалистам",
  "Оплата проезда к месту отпуска",
  "Северные надбавки",
  "Земский учитель",
  "Оплата коммунальных услуг"
];
