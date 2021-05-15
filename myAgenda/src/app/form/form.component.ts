import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from "./../contact";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  //Array de los colores
  colors = [
    { id: 1, value: 'red' },
    { id: 2, value: 'blue' },
    { id: 3, value: 'yellow' },
    { id: 4, value: 'green' },
    { id: 5, value: 'purple' },
    { id: 6, value: 'black' },
    { id: 7, value: 'white' },
    { id: 8, value: 'pink' }
  ];

  //Array de los gender
  genders = [
    { id: 1, value: 'Woman' },
    { id: 2, value: 'Man' },
    { id: 3, value: 'Other' },
    { id: 4, value: 'Not specified' }
  ];

  //Array que contiene todos los contactos
  contactList: Array<Contact> = []

  //Estructura del nuevo contacto
  contact: any = {
    name: "",
    surname: "",
    age: null,
    id: "",
    birthday: new Date(),
    color: "",
    gender: ""
  }

  //Variables para diferenciar nuevo contacto y editar contacto
  action: String = "new"; //Podrá ser nuevo o editar
  contactIndex: any = 0; //Número del contacto que se edita

  //Añadimos / Editamos contacto
  addContact(): void {
    //Validamos la fecha
    let birthdayDate = new Date(this.contact.birthday);
    let day = birthdayDate.getDay();
    let month = birthdayDate.getMonth();
    let year = birthdayDate.getFullYear();

    this.contact.birthday = `${day}/${month}/${year}`

    if (this.action == "new") { //Si es un nuevo contacto...
      if (parseInt(this.contact.age) > 0 && parseInt(this.contact.age) <= 125) {
        this.contactList.push(this.contact); //Añádelo a la lista de contactos

        this.contact = { //Limpia los imputs
          name: "",
          surname: "",
          age: null,
          id: "",
          birthday: "",
          color: "",
          gender: ""
        }
      } else {
        alert("The age must be a number between 1 and 125");
      }

    } else { //Si es editamos contacto...
      this.contactList[this.contactIndex] = this.contact; //Actualízalo
      this.action = "new";

      this.contact = { //Limpia los imputs
        name: "",
        surname: "",
        age: null,
        id: "",
        birthday: "",
        color: "",
        gender: ""
      }
    }
  }

  //Eliminar contacto
  delete(deleteIndex: number): void {
    this.contactList.splice(deleteIndex, 1);
  }

  //Editar contacto
  edit(editIndex: number): void {
    this.contact = this.contactList[editIndex];
    this.action = "edit";
    this.contactIndex = editIndex;
  }

}