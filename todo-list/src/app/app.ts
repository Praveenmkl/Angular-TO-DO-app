import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  newTask = '';
  currentFilter: FilterType = 'all';

  tasks = signal<Task[]>([
   
  ]);

  get totalTasks(): number {
    return this.tasks().length;
  }

  get activeTasks(): number {
    return this.tasks().filter(task => !task.completed).length;
  }

  get completedTasks(): number {
    return this.tasks().filter(task => task.completed).length;
  }

  get filteredTasks(): Task[] {
    if (this.currentFilter === 'active') {
      return this.tasks().filter(task => !task.completed);
    }
    if (this.currentFilter === 'completed') {
      return this.tasks().filter(task => task.completed);
    }
    return this.tasks();
  }

  addTask(): void {
    const title = this.newTask.trim();
    if (!title) {
      return;
    }

    this.tasks.update(tasks => [
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);
    this.newTask = '';
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  clearCompleted(): void {
    this.tasks.update(tasks => tasks.filter(task => !task.completed));
  }
}
