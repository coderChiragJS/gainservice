import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Work order',
    icon: { name: 'edit-2' },
    link: { href: '/Workorder' },
  },
  {
    title: 'calender',
    icon: { name: 'calendar' },
    link: { href: '/Calendar' },
  },

];

export default items;
