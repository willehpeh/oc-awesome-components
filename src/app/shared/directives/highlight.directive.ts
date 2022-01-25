import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

  @Input() color = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    if (this.el.nativeElement.innerText.includes('You')) {
      this.setBackgroundColor(this.color);
    }
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') mouseEnter() {
    this.setBackgroundColor('lightgreen');
  }

  @HostListener('mouseleave') mouseLeave() {
    this.setBackgroundColor(this.color);
  }
}
