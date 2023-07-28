import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[resizeColumn]'
})
export class ResizeColumnDirective implements OnInit {

  @Input('resizeColumn') isResizable!: boolean;
  @Input() index!: number;
  private startPos!: number;
  private startWidth!: number;
  private isPressed!: boolean;
  private column: HTMLElement;
  private table!: HTMLElement;

  constructor(
    private el:ElementRef,
    private renderer: Renderer2,
  ) {
    this.column = this.el.nativeElement;
  }

  ngOnInit(): void {
    if(this.isResizable) {
      const row = this.renderer.parentNode(this.column);
      const thead = this.renderer.parentNode(row);
      this.table = this.renderer.parentNode(thead);
      const resizer = this.renderer.createElement('span');
      this.renderer.addClass(resizer, 'resize-holder');
      this.renderer.appendChild(this.column, resizer);

      this.renderer.listen(resizer, "mousedown", this.onMouseDown);
      this.renderer.listen(this.table, "mousemove", this.onMouseMove);
      this.renderer.listen("document", "mouseup", this.onMouseUp);
    }
  }

  onMouseDown = (event: MouseEvent) => {
    this.isPressed = true;
    this.startPos = event.pageX;
    this.startWidth = this.column.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    const offset = 35;
    if (this.isPressed && event.buttons) {
      this.renderer.addClass(this.table, "resizing");

      // Calculate width of column
      let width =
        this.startWidth + (event.pageX - this.startPos - offset);

      const tableCells = Array.from(this.table.querySelectorAll("mat-row")).map(
        (row: any) => row.querySelectorAll("mat-cell").item(this.index)
      );

      // Set table header width
      this.renderer.setStyle(this.column, "width", `${width}px`);

      console.log(width)
      console.log(this.column)

      // Set table cells width
      for (const cell of tableCells) {
        this.renderer.setStyle(cell, "width", `${width}px`);
      }
    }
  };

  onMouseUp = (event: MouseEvent) => {
    if (this.isPressed) {
      this.isPressed = false;
      this.renderer.removeClass(this.table, "resizing");
    }
  };

}
