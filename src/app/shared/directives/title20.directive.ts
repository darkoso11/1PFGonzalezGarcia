import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitle20]',
})
export class Title20Directive implements OnInit {
  constructor(private _element: ElementRef) {}

  ngOnInit(): void {
    this._element.nativeElement.style.fontSize = '20px';
  }
}
