export interface Menu {
  id: number;
  name: string;
  path: string;
  hidden: boolean;
  icon: string;
  title: string;
  sort: number;
  parentId: number;
}
