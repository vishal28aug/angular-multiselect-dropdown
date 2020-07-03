import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    constructor(public fb:FormBuilder){  }
  
    form = this.fb.group({
      options:[['India']]
    })
  
    data = [
      "India",
      "Singapore",
      "Australia",
      "Canada",
      "South Korea",
      "Brazil",
    ];
  
    settings = {
      placeholder: 'Country',
      selectAllText: 'Select All Options',
      unSelectAllText: 'UnSelect All Options',
      isShowSearch: true
    };

    onItemSelect(item: any) {
      console.log('onItemSelect',item)
    }
    onSelectAll(items: any) {
      console.log('onSelectAll',items)
    }
    
    OnItemDeSelect(items:any){
    console.log('OnItemDeSelect',items)
    }
    
    onDeSelectAll(event){
      console.log('onDeSelectAll',event);
    }
  
  }
