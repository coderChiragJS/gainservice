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
  {
    title: 'Projects',
    icon: { name: 'layout' },
    link: { href: '#' },
  },
  {
    title: 'Teams',
    icon: { name: 'people' },
    link: { href: '#' },
  },
  {
    title: 'Settings',
    icon: { name: 'settings' },
    link: { href: '#' },
  },
  {
    title: 'Help',
    icon: { name: 'question-mark-circle' },
    link: { href: '#' },
  },
  {
    title: 'Shuffle',
    icon: { name: 'shuffle' },
    link: { href: '#' },
  },
  {
    title: 'Logout',
    icon: { name: 'power' },
    link: { href: '#' },
  },
];

export default items;
