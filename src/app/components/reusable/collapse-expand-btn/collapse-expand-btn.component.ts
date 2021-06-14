import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-collapse-expand-btn',
  templateUrl: './collapse-expand-btn.component.html',
  styleUrls: ['./collapse-expand-btn.component.scss']
})
export class CollapseExpandBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(".expand-all").hide();
    $(".btn-collapse").click(function(){    
      if ($(this).data("closedAll")) {
          $(".collapse").collapse("show");
          $(".expand-all").hide();
          $(".collapse-all").show();
      }
      else {
          $(".collapse").collapse("hide");       
          $(".expand-all").show();
          $(".collapse-all").hide();
      }    
      // save last state
      $(this).data("closedAll",!$(this).data("closedAll")); 
  });
  
  // init with all closed
  $(".btn-collapse").data("closedAll",false);
    }
  

}
