import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-super-admin-panel',
  templateUrl: './super-admin-panel.component.html',
  styleUrls: ['./super-admin-panel.component.css']
})
export class SuperAdminPanelComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
