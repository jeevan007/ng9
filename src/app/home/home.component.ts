import { Component, OnInit } from '@angular/core';
import {trigger, keyframes, style, query, stagger, animate,transition} from '@angular/animations'
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals',[
      transition("* => *",[
        query(":enter", style({opacity: 0}), {optional:true}),
        query(":enter", stagger('300ms',[
            animate(".6s ease-in", keyframes([
              style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1}),
            ]))]),{optional:true}),
        query(":leave", stagger('300ms',[
              animate(".6s ease-in", keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 0, transform: 'translateY(-75px)', offset: 1}),
            ]))]),{optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = "Add an Item";
  goalText: string = "";
  goals = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.goal.subscribe(res=>this.goals=res);
    this.itemCount = this.goals.length;
  }

  addItem(){
    this.goals.push(this.goalText);
    this.dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
    this.goalText = '';
  }

  removeItem(i){
    this.goals.splice(i, 1);
    this.dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

}
