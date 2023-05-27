import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

interface Dog {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-doggo-display',
  templateUrl: './doggo-display.component.html',
  styleUrls: ['./doggo-display.component.css']
})

// As a user, I want to display information about selected dog breed so that I can learn more about it.
// It is done when:

//    - I can select Dog breed from a list
//    - Selected dog breed is displayed on screen


export class DoggoDisplayComponent {

protected dogs: Dog[]=[
    {
    id: '1', 
    name: 'Golden retriever', 
    description:'lorem ipsum', 
    image: 'https://www.petspyjamas.com/uploads/2015/08/shutterstock_150238433.jpg'
    },
    {
    id: '2', 
    name: 'Labrador retriever', 
    description:'lorem ipsum', 
    image: 'https://www.petspyjamas.com/uploads/2015/08/shutterstock_150238433.jpg'
    },
    {
    id: '3', 
    name: 'French bulldog', 
    description:'lorem ipsum', 
    image: 'https://www.petspyjamas.com/uploads/2015/08/shutterstock_150238433.jpg'
    },
    {
    id: '4', 
    name: 'Beagle', 
    description:'lorem ipsum', 
    image: 'https://www.petspyjamas.com/uploads/2015/08/shutterstock_150238433.jpg'
    },
    {
    id: '5', 
    name: 'German shepherd dog', 
    description:'lorem ipsum', 
    image: 'https://www.petspyjamas.com/uploads/2015/08/shutterstock_150238433.jpg'
    }  
    
  ];

public dogCtrl: FormControl=new FormControl();
public dogFilterCtrl: FormControl=new FormControl();
public filteredDogs: ReplaySubject<any> = new ReplaySubject(1);


  
}
