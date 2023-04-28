import { Component } from '@angular/core';
import { TodoService } from './services/todo-list.service';

interface TodoItem {
  description: string;
  dueDate: string;
  priority: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoItems: TodoItem[] = [];
  filteredItems: TodoItem[] = [];
  filterDescription = '';
  filterPriority = '';

  constructor(private todoService: TodoService){}

  ngOnInit() {
    this.getTodoItems();
  }

  // Other approach here can be used a mock data server, but as the take home was not saying that was possible to get from this mock data service such as JSONPlaceholder
  getTodoItems(){
    this.todoService.getTodoItems().subscribe({
      next: (items) => {
        this.todoItems = items;
        this.filteredItems = [...this.todoItems];
      },
      error: (error) => {
        // here can be used as well to show on the table this message
        console.error('Failed to fetch the data. Please check the connection!', error);
      }
    });
  }

  // they are separated in case we need to create a special rule for the description or priority
  applyDescriptionFilter() {
    this.filteredItems = this.todoItems.filter(item =>
      item.description.toLowerCase().includes(this.filterDescription.toLowerCase()) &&
      this.filterPriority === ''
    );
  }

  applyPriorityFilter(){
    this.filteredItems = this.todoItems.filter(item =>
      item.priority.toLowerCase().includes(this.filterPriority.toLowerCase()) &&
      this.filterDescription === ''
    );
  }

}
