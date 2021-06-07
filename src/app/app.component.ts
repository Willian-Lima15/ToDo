import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/Models/Models.ToDo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//Corpo da minha form
export class AppComponent {
  public mode = 'list';
  public todo: Todo[] = [];
  public title: string = ('Minhas Tarefas');
  public form: FormGroup;

  //Construtor inicia junto com á aplicação
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    /*this.todo.push(new Todo(1, 'Passear com o cachorro', false));
    this.todo.push(new Todo(2, 'Corta cabelo', false));
    this.todo.push(new Todo(3, 'Malhar muito', true));*/
    this.load();
  }

  //Adiciona uma nova tarefa
  add() {
    const title = this.form.controls['title'].value;
    const id = this.todo.length + 1;
    this.todo.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  //Limpa o input texto ao SALVAR um tarefa.
  clear() {
    this.form.reset();
  }

  //Remove as tarefas ao clicar em Remover
  remove(ToDo: Todo) {
    const index = this.todo.indexOf(ToDo);
    if (index !== -1) {
      this.todo.splice(index, 1);
      this.save();//Salva os statos no localStorage
    }
  }

  //botão concluir
  markAsDone(ToDo: Todo) {
    ToDo.done = true;// Concluido = true
    this.save();//Salva os statos no localStorage
  }

  //Ao clicar no botão aparece botão refazer
  markAsuDoin(ToDo: Todo) {
    ToDo.done = false;// retorna a tarefa de true para false
    this.save();//Salva os statos no localStorage
  }

  // Salva as tarefas no localStorage
  save() {
    const dados = JSON.stringify(this.todo);
    localStorage.setItem('todo', dados);
    this.mode = 'list';
  }

  //Carrega os dados do localStorage e exibi na pagina
  load() {
    const dados = localStorage.getItem('todo');
    if (dados) {
      this.todo = JSON.parse(dados);
    } else {
      this.todo = []
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  alterarTexto() {
    this.title = 'Outro titulo';
  }
}
