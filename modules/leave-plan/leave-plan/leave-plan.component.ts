import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { LeavePlanModel, Human } from '../models/human.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.css'],

})

export class LeavePlanComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  emptyMas: Date[] = [];

  userForm: FormGroup;
  userTypes: string[];

  searchText: string = '';
  previous: string;

  public leavePlanModel: LeavePlanModel;
  public nameLeave: string = '';
  public surnameLeave: string = '';
  public dateMasLeave: any;
  public dateSpendLeave: any;
  public typeOfLeave = true;

  p: Number = 1;
  count: Number = 5;

  constructor(private fb: FormBuilder) {
    this.leavePlanModel = new LeavePlanModel();
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.userTypes = ['пользователь'];
    // this.initForm();
    // this.addForms();

    for (let i = 1; i <= this.humanList.length; i++) {
      this.leavePlanModel.humanList.push(new Human(this.nameLeave, this.surnameLeave, this.dateMasLeave, this.dateSpendLeave));
    }

    this.mdbTable.setDataSource(this.humanList);
    this.humanList = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.humanList = this.mdbTable.getDataSource();
    } else if (this.searchText) {
      this.humanList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


  initForm() {
    this.userForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/[A-z]/),
        Validators.minLength[2]]
      ],
      surname: ['', [
        Validators.required,
        Validators.pattern(/[A-z]/),
        Validators.minLength[2]]
      ]
    });
  }
  get name() {
    return this.userForm.get('name');
  }
  get surname() {
    return this.userForm.get('surname');
  }

  public get humanList() {
    return this.leavePlanModel.humanList;
  }
  
  public set humanList(list: any) {
    this.leavePlanModel.humanList = list;
  }

  public addForms() {
    if(this.typeOfLeave){
      if ((this.getMasDate(this.dateMasLeave).length)<=10){
        this.addDayOff();
      } else {
        alert('10 dayOff, choose less');
      }
    } else {
      if ((this.getMasDates(this.dateMasLeave).length)<=22){
        this.addVacation();
      } else {
        alert('22 days vacation, choose less');
      }
    }
  }

  public countOfVacation(list: Human[]): number { ///////// Возвращает количество дней Vacation
    let c = 0;
    for (let i = 0; i < list.length; i++) {
      c+=list[i].masVacation.length;
    }
    return c;
  }

  public countOfDayOff(list: Human[]): number { ///////// Возвращает количество дней Vacation
    let c = 0;
    for (let i = 0; i < list.length; i++) {
      c+=list[i].masDayOff.length;
    }
    return c;
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public addVacation() {
    let option = { format: 'dd/MM/yyyy' };
    if (this.nameLeave != "" && this.surnameLeave != "" && this.dateMasLeave != "") {
        let h, tempVar, tempTemp: Human;
        h = new Human(this.nameLeave, this.surnameLeave, this.getMasDates(this.dateMasLeave), this.emptyMas);
        let index: number;
        let isNew: boolean = false;
        for (let i = 0; i < this.humanList.length; i++) {
          tempVar = this.humanList[i];
          tempTemp = new Human('','',[],[]);
          if ((tempVar.name === h.name) && (tempVar.surname === h.surname)) {     ////////// проверка на имя и фамилию, заходит , если имя и фамилия не изменились
            index = i;
            isNew = true;
            let mas: Date[] = [];
            for (let k = 0; k < h.masVacation.length; k++) {
              let count = 0;
              tempTemp.masVacation = this.sum2arrays(tempVar.masVacation, tempVar.masDayOff);
              for (let j = 0; j < tempTemp.masVacation.length; j++) {
                if ((h.masVacation[k].toLocaleDateString("browser-locale", option) !== tempTemp.masVacation[j].toLocaleDateString("browser-locale"))) {
                  count++;
                }
              }
              if (count === tempTemp.masVacation.length) {
                mas.push(h.masVacation[k]);
              }
            }
            h.masDayOff = tempVar.masDayOff;
            h.masVacation = this.sum2arrays(tempVar.masVacation, mas);
            for (let u = h.masVacation.length - 1; u > 0; u--) {
              for (let m = 0; m < u; m++) {
                if (h.masVacation[m] > h.masVacation[m + 1]) {
                  let tmp = h.masVacation[m];
                  h.masVacation[m] = h.masVacation[m + 1];
                  h.masVacation[m + 1] = tmp;
                }
              }
            }
            break;
          }
        }
        if (isNew) {                      ///////////повторка
          if(h.masVacation.length<=22){
            this.leavePlanModel.humanList.splice(index, 1);
            this.leavePlanModel.humanList.push(h);
          }
          else{
            alert('22 days vacation, choose less');
          }
        } else{
          this.leavePlanModel.humanList.push(h);
        }
    } else {
      alert('Enter data, please');
    }
  }

  public countOfDays(myStr: any): number { ///////// Возвращает количество дней Vacation
    var day = 0;
    let option = { format: 'dd/MM/yyyy' };
    var date1 = myStr[0].toLocaleDateString("browser-locale", option).split('/');
    var date2 = myStr[1].toLocaleDateString("browser-locale", option).split('/');
    let newDate1 = new Date(parseInt(date1[2]) - 1, parseInt(date1[0]), parseInt(date1[1]));
    let newDate2 = new Date(parseInt(date2[2]) - 1, parseInt(date2[0]), parseInt(date2[1]));
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBeetwen = newDate2.getTime() - newDate1.getTime();
    day += (millisBeetwen / millisecondsPerDay);
    day += 1;
    return day;
  }

  public getMasDates(myStr: any[]): Date[] {///////// Возвращает массив дат от Vacation
    var day = 0;
    let newDate1, newDate2;
    let option = { format: 'dd/MM/yyyy' };
    var date1 = myStr[0].toLocaleDateString("browser-locale", option).split('/');
    var date2 = myStr[1].toLocaleDateString("browser-locale", option).split('/');
    newDate1 = new Date(parseInt(date1[2]), parseInt(date1[0]) - 1, parseInt(date1[1]));
    newDate2 = new Date(parseInt(date2[2]), parseInt(date2[0]) - 1, parseInt(date2[1]));
    var getDaysArray = function (start, end) {
      for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
      return arr;
    }
    return getDaysArray(newDate1, newDate2);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public addDayOff() {
    let option = { format: 'dd/MM/yyyy' };
    if (this.nameLeave != "" && this.surnameLeave != "" && this.dateMasLeave != "") {
      let h, tempVar, tempTemp: Human;
        h = new Human(this.nameLeave, this.surnameLeave, this.emptyMas, this.getMasDate(this.dateMasLeave));
        let index: number;
        let isNew: boolean = false;
        for (let i = 0; i < this.humanList.length; i++) {
          tempVar = this.humanList[i];
          tempTemp = new Human('', '', [], []);
          if ((tempVar.name === h.name) && (tempVar.surname === h.surname)) {
            index = i;
            isNew = true;
            let mas: Date[] = [];
            for (let k = 0; k < h.masDayOff.length; k++) {
              let count = 0;
              tempTemp.masDayOff = this.sum2arrays(tempVar.masDayOff, tempVar.masVacation);
              for (let j = 0; j < tempTemp.masDayOff.length; j++) {
                if (h.masDayOff[k].toLocaleDateString("browser-locale", option) !== tempTemp.masDayOff[j].toLocaleDateString("browser-locale")) {
                  count++;
                }
              }
              if (count === tempTemp.masDayOff.length) {
                mas.push(h.masDayOff[k]);
              }
            }
            h.masVacation = tempVar.masVacation;
            h.masDayOff = this.sum2arrays(tempVar.masDayOff, mas);
            for (let u = h.masDayOff.length - 1; u > 0; u--) {
              for (let m = 0; m < u; m++) {
                if (h.masDayOff[m] > h.masDayOff[m + 1]) {
                  let tmp = h.masDayOff[m];
                  h.masDayOff[m] = h.masDayOff[m + 1];
                  h.masDayOff[m + 1] = tmp;
                }
              }
            }
            break;
          }
        }
        if (isNew) {                      ///////////повторка
          if(h.masDayOff.length<=10){
            this.leavePlanModel.humanList.splice(index, 1);
            this.leavePlanModel.humanList.push(h);
          }
          else{
            alert('10 dayOff, choose less');
          }
        } else{
          this.leavePlanModel.humanList.push(h);
        }
    } else {
      alert('Enter data, please');
    }
  }

  public getMasDate(myStr: any): Date[] {         //////////возвращает массив даты DayOff
    let option = { format: 'dd/MM/yyyy' };
    let date = myStr.toLocaleDateString("browser-locale", option).split('/');
    let newDate: Date[] = [];
    newDate.push(new Date(parseInt(date[2]), parseInt(date[0]) - 1, parseInt(date[1])));
    return newDate;
  }
  
  public sum2arrays(mas1:Date[] ,mas2:Date[] ):Date[]{
    let res:Date[] = [];
    for (let i = 0; i < mas1.length; i++) {
      res.push(mas1[i]);
    }
    for (let i = 0; i < mas2.length; i++) {
      res.push(mas2[i]);
    }
    return res;

  }

  public viewCorrectFormat(masTempDate: Date[]): string {      //функция преобразует дату в html
    let strDateLeave = '';
    let option = { format: 'dd/MM/yyyy' };
    for (let i = 0; i < masTempDate.length; i++) {
      let one: any = masTempDate[i];
      strDateLeave += (one.toLocaleDateString("browser-locale", option) + '\t');
    }
    return strDateLeave;
  }

  public buttonRemoveValueTable(indexI) {
    for (let i = this.humanList.length - 1; i >= 0; i--) {
      if (i == indexI) {
        this.humanList.splice(i, 1);
      }
    }
  }

}