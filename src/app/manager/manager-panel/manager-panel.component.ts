import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any; // Declare $ for using jQuery

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    // jQuery code for toggling sidebar
    $(this.elRef.nativeElement).find('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
