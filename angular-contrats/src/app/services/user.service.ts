import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  private usersUrl: string;
  constructor(private http:HttpClient) {
    this.usersUrl = 'http://localhost:8080/users'
  }
}
