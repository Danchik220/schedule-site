export interface ScheduleItem {
  id: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  title: string;
  description?: string;
  subtasks?: string[];
  image: string;
}

export const schedule: ScheduleItem[] = [
  {
    id: '1',
    startTime: '05:00',
    endTime: '05:15',
    title: 'Подъём, умывание',
    description: 'Пробуждение и утренние водные процедуры.',
    subtasks: ['Встать с постели', 'Умыться холодной водой', 'Выпить стакан воды'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: '2',
    startTime: '05:15',
    endTime: '05:35',
    title: 'Лёгкая зарядка / растяжка',
    description: 'Активация тела и мышц перед началом дня.',
    subtasks: ['Суставная гимнастика', 'Растяжка спины', 'Приседания'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    startTime: '05:35',
    endTime: '05:45',
    title: 'Завтрак (10 минут)',
    description: 'Быстрый и питательный прием пищи.',
    subtasks: ['Приготовить завтрак', 'Поесть без гаджетов', 'Витамины'],
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    startTime: '05:45',
    endTime: '06:30',
    title: 'Саморазвитие / повтор материала',
    description: 'Самое продуктивное время для обучения.',
    subtasks: ['Повторить конспекты', 'Чтение книги', 'Изучение английского'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop'
  },
  {
    id: '5',
    startTime: '06:30',
    endTime: '07:30',
    title: 'Сборы, спокойные дела',
    description: 'Подготовка к выходу из дома без спешки.',
    subtasks: ['Собрать рюкзак', 'Выбрать одежду', 'Проверить расписание'],
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '6',
    startTime: '07:30',
    endTime: '08:10',
    title: 'Свободное время',
    description: 'Время для себя перед выходом.',
    subtasks: ['Послушать музыку', 'Листать ленту', 'Хобби'],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '7',
    startTime: '08:10',
    endTime: '08:30',
    title: 'Дорога в школу (20 минут)',
    description: 'Путь до учебного заведения.',
    subtasks: ['Дойти до остановки', 'Послушать подкаст', 'Дышать свежим воздухом'],
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '8',
    startTime: '08:30',
    endTime: '16:00',
    title: 'Школа',
    description: 'Учебный процесс и общение.',
    subtasks: ['Уроки', 'Перемены', 'Обед в столовой', 'Общение с друзьями'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '9',
    startTime: '16:00',
    endTime: '17:30',
    title: 'Сон (1 час 30 минут)',
    description: 'Дневной сон для восстановления сил.',
    subtasks: ['Проветрить комнату', 'Поставить будильник', 'Полный релакс'],
    image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '10',
    startTime: '17:30',
    endTime: '18:00',
    title: 'Физическая активность (30 минут)',
    description: 'Взбодриться после сна.',
    subtasks: ['Турник / Брусья', 'Легкая пробежка', 'Скакалка'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '11',
    startTime: '18:00',
    endTime: '18:20',
    title: 'Отдых',
    description: 'Короткая пауза перед работой.',
    subtasks: ['Выпить чаю', 'Фруктовый перекус', 'Музыка'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '12',
    startTime: '18:20',
    endTime: '20:20',
    title: 'Домашние задания + дизайн (2 часа)',
    description: 'Основной блок работы над задачами.',
    subtasks: ['Сделать уроки', 'Практика в Figma', 'Изучение туториалов'],
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '13',
    startTime: '20:20',
    endTime: '20:40',
    title: 'Ужин (20 минут)',
    description: 'Вечерний прием пищи.',
    subtasks: ['Ужин', 'Общение с семьей'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: '14',
    startTime: '20:40',
    endTime: '21:10',
    title: 'Спокойный вечер / расслабление',
    description: 'Замедление перед сном.',
    subtasks: ['Чтение', 'Ванна / Душ', 'Медитация'],
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop'
  },
  {
    id: '15',
    startTime: '21:10',
    endTime: '21:30',
    title: 'Подготовка ко сну',
    description: 'Финальные приготовления.',
    subtasks: ['Расстелить постель', 'Почистить зубы', 'План на завтра'],
    image: 'https://images.unsplash.com/photo-1522771753035-4a50c95b9389?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '16',
    startTime: '21:30',
    endTime: '05:00',
    title: 'Сон',
    description: 'Здоровый сон для полного восстановления.',
    subtasks: ['Глубокий сон'],
    image: 'https://images.unsplash.com/photo-1541781777693-3f9e71502421?q=80&w=2069&auto=format&fit=crop'
  }
];
