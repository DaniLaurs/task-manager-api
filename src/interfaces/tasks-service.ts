export interface UpdateTaskProps {
  id: string;
  title?: string;
  description?: string;
  images?: string[];
}

export interface CreateTaskProps {
  title: string;
  description: string;
  images: string[];
}

export interface changeTasksCompletionProps {
  id: string;
}
