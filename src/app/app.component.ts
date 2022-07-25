import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prop-mng';
  addPropertyModal: boolean = false;
  deletePropertyModal: boolean = false;
  currProperties: any = [];
  currPage: number = 1;

  properties = [{id: 1, name: 'name1', value: 'value1', desc: 'desc1', size: 'size1'},
                {id: 2, name: 'name2', value: 'value2', desc: 'desc2', size: 'size2'},
                {id: 3, name: 'name3', value: 'value3', desc: 'desc3', size: 'size3'},
                {id: 4, name: 'name4', value: 'value4', desc: 'desc4', size: 'size4'},
                {id: 5, name: 'name5', value: 'value5', desc: 'desc5', size: 'size5'},
                {id: 6, name: 'name6', value: 'value6', desc: 'desc6', size: 'size6'},
                {id: 7, name: 'name7', value: 'value7', desc: 'desc7', size: 'size7'},
                {id: 8, name: 'name8', value: 'value8', desc: 'desc8', size: 'size8'},
                {id: 9, name: 'name9', value: 'value9', desc: 'desc9', size: 'size9'},
                {id: 10, name: 'name10', value: 'value10', desc: 'desc10', size: 'size10'},
                {id: 11, name: 'name11', value: 'value11', desc: 'desc11', size: 'size11'},
                {id: 12, name: 'name12', value: 'value12', desc: 'desc12', size: 'size12'},
                {id: 13, name: 'name13', value: 'value13', desc: 'desc13', size: 'size13'},
                {id: 14, name: 'name14', value: 'value14', desc: 'desc14', size: 'size14'},
                {id: 15, name: 'name15', value: 'value15', desc: 'desc15', size: 'size15'},];

  totalPages = Math.ceil(this.properties.length/10) //this.properties.length%10==0? this.properties.length/10 : (this.properties.length/10)+1;
  addPropertyForm = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
    desc: new FormControl(''),
    size: new FormControl('')
  });

  deletePropertyFrom = new FormGroup({
    id: new FormControl('')
  });

  pageNumberForm = new FormGroup({
    page: new FormControl('')
  });

  constructor() {
    this.currProperties = this.properties.slice(0, 10);

  }

  addPropertytoList(){
    let propObj = {
      id: this.properties.length + 1,
      name: this.addPropertyForm.value.name,
      value: this.addPropertyForm.value.value,
      desc: this.addPropertyForm.value.desc,
      size: this.addPropertyForm.value.size
    }

    this.properties.push(propObj);
    this.gotoPage(this.currPage);
    this.addPropertyModal = false;
    this.addPropertyForm.reset();
    this.totalPages = Math.ceil(this.properties.length/10);
    
  }

  deleteProperty(id: number = this.deletePropertyFrom.value.id) {
    this.properties = this.properties.filter(property => property.id !== id);
    this.deletePropertyModal = false;
    this.totalPages = Math.ceil(this.properties.length/10)
    if(this.currPage > this.totalPages) {
      this.currPage = this.totalPages;
    }
    this.deletePropertyFrom.reset();
    this.gotoPage(this.currPage);
  }

  openModel(modal: string) {
    if(modal === 'addProperty') {
      this.addPropertyModal = true;
    } else if(modal === 'deleteProperty') {
      this.deletePropertyModal = true;
    }
  }

  gotoPage(page: number = this.pageNumberForm.value.page) {
    if(page>0 && page<=this.totalPages) {
    this.currProperties = this.properties.slice((page * 10)-10, (page * 10)-1);
    this.currPage = page;
  }
  if(this.properties.length==0){
    this.currProperties = [];
  }
  }

  closeModal(){
    this.addPropertyModal = false;
    this.deletePropertyModal = false;
    this.addPropertyForm.reset();
    this.deletePropertyFrom.reset();
  }
}
