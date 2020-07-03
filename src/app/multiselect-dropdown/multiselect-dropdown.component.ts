import { Component, Input, forwardRef, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true

    }
  ]
})
export class MultiselectDropdownComponent implements ControlValueAccessor {

  @ViewChild('multiSelectDropdownOptions') multiSelectDropdownOptions: ElementRef;
  @ViewChild('multiSelectDropdown') multiSelectDropdown: ElementRef;

  constructor(private renderer: Renderer2) {
    // Close the dropdown options on click detect outside
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.multiSelectDropdownOptions &&
        this.multiSelectDropdown &&
        !this.multiSelectDropdownOptions.nativeElement.contains(e.target) &&
        !this.multiSelectDropdown.nativeElement.contains(e.target)) {
        this.expanded = false;
      }
    });

  }

  @Input() data: any;  // List of items
  @Input() settings: any; //dropdown setting
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAll: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeSelectAll: EventEmitter<any> = new EventEmitter<any>();


  expanded = false; //To hide & show the list  

  options = []; //To store the options

  selectedOptions = []; //Selected options

  //Default setting
  optionSettings = {
    placeholder: "",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    isShowSearch: true
  };

  //*******ControlValueAccessor interface start***********
  onChange: (value) => void;

  writeValue(value: any): void {
    this.selectedOptions = value ? value : [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched() { }
  //******ControlValueAccessor interface Ends*************

  ngOnChanges(change) {
    try {
      if (change.data) {
        this.options = this.data;
      }
      if (change.settings) {
        this.optionSettings = Object.assign(this.optionSettings, this.settings);
      }
    } catch (err) {
      console.log("ngOnChanges", err.stack);
    }
  }

  // Hide and shows the options
  showList() {
    this.expanded = !this.expanded;
  }

  //To add or remove the option on change event
  onItemChange(event) {
    try {
      if (event.target.checked) {
        this.selectedOptions.push(event.target.value);
        this.onSelect.emit(event.target.value); //invoke event onSelect
      } else {
        const index = this.selectedOptions.indexOf(event.target.value);
        if (index > -1) {
          this.selectedOptions.splice(index, 1);
        }
        this.onDeSelect.emit(event.target.value); //invoke event onDeSelect
      }
      this.onChange(this.selectedOptions); //invoke ControlValueAccessor form change
    } catch (err) {
      console.log("onItemChange", err.stack);
    }
  }

  //Removes single items from the selected options
  removeSingleItem(event, item) {
    try {
      event.stopPropagation(); // Stop executing parent click
      this.expanded = false;
      const index = this.selectedOptions.indexOf(item);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      }
      this.onChange(this.selectedOptions); //invoke ControlValueAccessor form change
    } catch (err) {
      console.log("removeSingleItem", err.stack);
    }
  }

  //Removes all selected ooptions
  removeAllItem(event) {
    try {
      event.stopPropagation(); //Stop executing parent click
      this.selectedOptions = [];
      this.onChange(this.selectedOptions); //invoke ControlValueAccessor form change 
      this.onDeSelectAll.emit(this.selectedOptions);
    } catch (err) {
      console.log("removeAllItem", err.stack);
    }
  }

  //Checks if the option is selected
  isSelected(item) {
    try {
      return this.selectedOptions.indexOf(item) >= 0;
    } catch (err) {
      console.log("isSelected", err.stack);
    }
  }

  //Selects all the options
  onSelectAllOptions() {
    try {
      this.selectedOptions = this.options.slice();
      this.onChange(this.selectedOptions); //invoke ControlValueAccessor form change
      this.onSelectAll.emit(this.selectedOptions); //invoke event onSelectAll
    } catch (err) {
      console.log("onSelectAllOptions", err.stack);
    }
  }

  //Search the options on basis of input text
  onSearch(text) {
    try {
      if (text) {
        this.options = this.data.filter(x =>
          x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );
      } else {
        this.options = this.data;
      }
    }
    catch (err) {
      console.log("onSearch", err.stack);
    }
  }
}
