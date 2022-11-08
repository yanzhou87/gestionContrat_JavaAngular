import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nomCourant : string = ""
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
    console.log("menu : "+this.nomCourant)
  }

  deconnecter(){
    this.userService.setLogin(false)
  }
}
