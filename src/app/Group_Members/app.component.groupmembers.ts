
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../Pages/app.component.header';
import {FooterComponent} from '../Pages/app.component.footer';


@Component({
  imports: [CommonModule, HeaderComponent, FooterComponent],
  selector: 'app-groupmembers',
  standalone: true,
  styleUrl: './app.component.groupmembers.css',
  templateUrl: './app.component.groupmembers.html'
})
export class GroupMembersComponent implements OnInit {




    ngOnInit(): void {

    }

}
