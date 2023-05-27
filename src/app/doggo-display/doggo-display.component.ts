import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// Interface representing the properties of a dog breed
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
export class DoggoDisplayComponent {
  // Array of dog breeds
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

  // FormControl for the dog breed selection
  public dogCtrl: FormControl = new FormControl();

  // FormControl for filtering the dog breeds
  public dogFilterCtrl: FormControl = new FormControl();

  // ReplaySubject for holding the filtered dog breeds
  public filteredDogs: ReplaySubject<any> = new ReplaySubject(1);

  // ViewChild decorator to get a reference to the MatSelect component in the template
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  // Subject for tracking component destruction
  protected _onDestroy = new Subject();

  // Angular lifecycle hook - called after the component is initialized
  ngOnInit() {
    // Set the default value for the dog breed selection
    this.dogCtrl.setValue(this.dogs[1]);

    // Initialize the filteredDogs ReplaySubject with a copy of the dog breeds array
    this.filteredDogs.next(this.dogs.slice());

    // Subscribe to changes in the dogFilterCtrl value
    this.dogFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        // Call the filterDogs method whenever the filter value changes
        this.filterDogs();
      });
  }

  // Hook - called after the component's view has been initialized
  ngAfterViewInit() {
    // Set the initial value for the MatSelect component
    this.setInitialValue();
  }

  // Hook - called when the component is being destroyed
  ngOnDestroy() {
    // Complete the _onDestroy Subject
    this._onDestroy.next(1);
    this._onDestroy.complete();
  }

  // Set the compareWith function for the MatSelect component
  protected setInitialValue() {
    this.filteredDogs
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // Compare dog objects based on their id property
        this.singleSelect.compareWith = (a: Dog, b: Dog) => a && b && a.id === b.id;
      });
  }

  // Filter the dog breeds based on the filter value
  protected filterDogs() {
    if (!this.dogs) {
      return;
    }

    let search = this.dogFilterCtrl.value;

    if (!search) {
      // If no filter value, emit a copy of the original dog breeds array
      this.filteredDogs.next(this.dogs.slice());
      return;
    } else {
      // Convert the filter value to lowercase for case-insensitive matching
      search = search.toLowerCase();
    }

    // Filter the dog breeds based on the filter value
    this.filteredDogs.next(
      this.dogs.filter(dog => dog.name.toLowerCase().indexOf(search) > -1)
    );
  }
}