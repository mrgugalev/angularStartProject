export class LeavePlanModel {
  public humanList: Human[] = [];
}

export class Human {
  public name: string;
  public surname: string;
  public masVacation: Date[] = []; /////////было dateMas
  public masDayOff: Date[] = [];
  
  constructor(name, surname, masVacation, masDayOff) {
    this.name = name;
    this.surname = surname;
    this.masVacation = masVacation;
    this.masDayOff = masDayOff;
  }
}

interface AfterViewInit {
  ngAfterViewInit(): void;
}