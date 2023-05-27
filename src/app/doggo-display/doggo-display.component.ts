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
    description:'The Golden Retriever is a Scottish breed of retriever dog of medium size. It is characterised by a gentle and affectionate nature and a striking golden coat. It is commonly kept as a pet and is among the most frequently registered breeds in several Western countries.', 
    image: 'https://www.petlovers.com.ng/wp-content/uploads/2017/01/golden-retriever-price-in-nigeria-buy-a-dog.jpg'
    },
    {
    id: '2', 
    name: 'Labrador retriever', 
    description:'The Labrador Retriever or simply Labrador, is a British breed of retriever gun dog. It was developed in the United Kingdom from fishing dogs imported from the colony of Newfoundland, and was named after the Labrador region of that colony.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/1280px-Labrador_on_Quantock_%282175262184%29.jpg'
    },
    {
    id: '3', 
    name: 'French bulldog', 
    description:'The French Bulldog, French: Bouledogue Français, is a French breed of companion dog or toy dog. It appeared in Paris in the mid-nineteenth century, apparently the result of cross-breeding of Toy Bulldogs imported from England and local Parisian ratters.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/2008-07-28_Dog_at_Frolick_Field.jpg'
    },
    {
    id: '4', 
    name: 'Beagle', 
    description:'The beagle is a breed of small scent hound, similar in appearance to the much larger foxhound. The beagle was developed primarily for hunting hare, known as beagling.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Beagle_600.jpg'
    },
    {
    id: '5', 
    name: 'German shepherd', 
    description:'The German Shepherd is a German breed of working dog of medium to large size. The breed was developed by Max von Stephanitz using various traditional German herding dogs from 1899. It was originally bred as a herding dog, for herding sheep. ', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg'
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