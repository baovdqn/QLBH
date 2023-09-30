import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  listCategory: string[] = [
    'Cây cảnh phong thuỷ',
    'Cây cảnh văn phòng',
    'Cây cảnh để bàn',
    'Lan hồ điệp',
    'Cây ban công',
    'Sen đá',
    'Cây chậu treo'
  ];
  constructor() {}

  ngOnInit() {}
}
