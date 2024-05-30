import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
