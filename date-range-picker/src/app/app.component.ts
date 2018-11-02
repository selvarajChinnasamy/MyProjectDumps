import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  months = [
    {
      abbreviation: 'Jan',
      name: 'January',
      days: 31
    },
    {
      abbreviation: 'Feb',
      name: 'February',
      days: 28
    },
    {
      abbreviation: 'Mar',
      name: 'March',
      days: 31
    },
    {
      abbreviation: 'Apr',
      name: 'April',
      days: 30
    },
    {
      abbreviation: 'May',
      name: 'May',
      days: 31
    },
    {
      abbreviation: 'Jun',
      name: 'June',
      days: 30
    },
    {
      abbreviation: 'Jul',
      name: 'July',
      days: 31
    },
    {
      abbreviation: 'Aug',
      name: 'August',
      days: 31
    },
    {
      abbreviation: 'Sep',
      name: 'September',
      days: 30
    },
    {
      abbreviation: 'Oct',
      name: 'October',
      days: 31
    },
    {
      abbreviation: 'Nov',
      name: 'November',
      days: 30
    },
    {
      abbreviation: 'Dec',
      name: 'December',
      days: 31
    }
  ];
  currentDate: Date;
  currentMonth: any;
  current: number;
  day: number;
  firstDay;
  firstdayDay;
  year;
  firstVal: number;
  secondVal: number;
  isFirstValSelected: boolean;
  monthArray: Array<Object> = [];
  constructor() { }
  ngOnInit() {
    this.isFirstValSelected = false;
    this.currentDate = new Date();
    this.current = this.currentDate.getMonth();
    this.currentMonth = this.months[this.current];
    this.day = this.currentDate.getDay();
    this.year = this.currentDate.getFullYear();
    this.firstDay = new Date(this.year, this.current, 1);
    this.firstdayDay = this.firstDay.getDay();
    this.createDaysArray(this.firstdayDay, this.currentMonth);
  }
  createDaysArray(firstdayDay, currentDay) {
    this.monthArray = [];
    let i: number;
    for (i = 0; i < firstdayDay; i++) {
      this.monthArray.push({ date: 0 });
    }
    for (i = 1; i <= currentDay.days; i++) {
      this.monthArray.push({ date: i, selected: false, intermediateSelected: false, month: this.current, year: this.year });
    }
  }
  nextMonth() {
    this.current ++;
    this.currentMonth = this.months[this.current % 12];
    this.firstDay = new Date(this.year, this.current, 1);
    this.year = this.firstDay.getFullYear();
    this.firstdayDay = this.firstDay.getDay();
    this.createDaysArray(this.firstdayDay, this.currentMonth);
    if (this.current >= 12) {
      this.current = 0;
    }
    this.monthArray.forEach(day => {
      if (!!this.secondVal && ((this.secondVal['month'] > day['month']) || (this.secondVal['year'] > day['year']))) {
        day['intermediateSelected'] = true;
      } else if (this.secondVal['month'] === day['month']) {
        if (this.secondVal['date'] === day['date']) {
          day['selected'] = true;
        } else if (this.secondVal['date'] > day['date']) {
          day['intermediateSelected'] = true;
        }
      }
    });
  }
  preMonth() {
    this.current --;
    this.firstDay = new Date(this.year, this.current, 1);
    if (this.current < 0) {
      this.current = 11;
    }
    this.currentMonth = this.months[this.current];
    this.year = this.firstDay.getFullYear();
    this.firstdayDay = this.firstDay.getDay();
    this.createDaysArray(this.firstdayDay, this.currentMonth);
    this.monthArray.forEach(day => {
      if (!!this.firstVal && ((this.firstVal['month'] < day['month']) || (this.firstVal['year'] < day['year']))) {
        day['intermediateSelected'] = true;
      } else if (this.firstVal['month'] === day['month']) {
        if (this.firstVal['date'] === day['date']) {
          day['selected'] = true;
        } else if (this.firstVal['date'] < day['date']) {
          day['intermediateSelected'] = true;
        }
      }
    });
  }
  selectDay(node) {
    this.isFirstValSelected = !this.isFirstValSelected;
    if (this.isFirstValSelected) {
      this.firstVal = node;
      this.monthArray.forEach(day => {
        day['intermediateSelected'] = false;
        day['selected'] = false;
      });

      this.secondVal = 0;
    } else {
      this.secondVal = node;
    }
    node.selected = true;
  }
  mouseover(node) {
    if (this.isFirstValSelected && this.firstVal['date'] < node['date']) {
      this.selectDate('intermediateSelected', node);
      return;
    }
  }
  selectDate(selectType, node) {
    this.monthArray.forEach(day => {
      if ((this.firstVal['month'] < node['month'] || this.firstVal['year'] < node['year']) && (day['date'] < node['date'])) {
        day[selectType] = true;
      } else if ((day['date'] > this.firstVal['date']) && (day['date'] < node['date'])) {
        day[selectType] = true;
      } else {
        day[selectType] = false;
      }
    });
  }
}
