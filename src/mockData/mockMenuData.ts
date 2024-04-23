export interface MenuItem {
    label: string;
    path: string;
  }
  
  export interface MenuCategory {
    name: string;
    items: MenuItem[];
  }
  
  export const menuData: MenuCategory[] = [
    {
      name: "Списки", items: [
        {
          label: 'Выборы',
          path: '/elections',
        },
        {
          label: 'Оргкомитет',
          path: '',
        },
        {
          label: 'Территориальные группы',
          path: '/territorialgroups',
        },
        {
          label: 'Избирательные округа',
          path: '/electoraldistricts',
        },
      ]
    },
    {
      name: "Участники", items: [
        {
          label: 'Участники',
          path: '',
        },
        {
          label: 'Заявления',
          path: '',
        },
        {
          label: 'Списки кандидатов',
          path: '',
        },
        {
          label: 'Бюллетени',
          path: '',
        },
      ]
    },
    {
      name: "Документы", items: [
        {
          label: 'Публичные документы',
          path: '',
        }
      ]
    },
    {
      name: "Отчеты", items: [
        {
          label: 'Отчёт по региональному оргкомитету',
          path: '',
        },
        {
          label: 'Статистика дебатов',
          path: '',
        },
        {
          label: 'Статистика зарегистрировавшихся',
          path: '',
        },
      ]
    },
  ];
  