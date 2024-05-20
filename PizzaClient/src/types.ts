export interface Pizza {
  id: number;
  name: string;
  description: string;
}

export interface PizzaItemProps {
  name: string;
  data: Pizza[];
  onCreate: (item: Pizza) => void;
  onUpdate: (item: Pizza) => void;
  onDelete: (id: number) => void;
  error: string;
}
