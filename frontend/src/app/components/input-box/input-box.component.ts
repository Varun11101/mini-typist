import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [FormsModule, NgStyle, NgClass],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {

  @Input() inputValue: string = '';
  @Input() shouldDisable: boolean = false;
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder: string = 'Type the highlighted word';

  onInputChange(event: any) {
    this.inputValueChange.emit(event);
  }
}
