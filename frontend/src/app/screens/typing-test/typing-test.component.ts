import { Component } from '@angular/core';
import { DEFAULT_WORD_LENGTH, WORD_LENGTH_OPTIONS } from '../../constants';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TypingBoxComponent } from '../../components/typing-box/typing-box.component';
import { cloneDate } from 'ng-zorro-antd/core/time';
import { UtilsService } from '../../services/utils.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-typing-test',
  standalone: true,
  imports: [NgFor, NgIf, TypingBoxComponent, FormsModule, NgClass],
  templateUrl: './typing-test.component.html',
  styleUrl: './typing-test.component.css'
})
export class TypingTestComponent {
  readonly wordLengthOptions: number[] = WORD_LENGTH_OPTIONS;
  resultData: any = {
    raw: 'XX',
    wpm: 'XX',
    acc: 'XX'
  }
  currentText: string[] = [];
  
  currentWordLength: number = DEFAULT_WORD_LENGTH;

  constructor(
    private utils: UtilsService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.refreshCurrentText();
  }

  refreshCurrentText() {
    this.currentText = this.utils.getWordsFromLength(this.currentWordLength);
  }

  wordLengthClicked(wordLength: number) {
    this.currentWordLength = wordLength;
    this.refreshCurrentText();
  }

  isActiveWordLength(currentLength: number) {
    return currentLength === this.currentWordLength;
  }

  getResultNumber(resultType: string) {
    switch(resultType) {
      case 'raw': 
        return this.resultData?.raw ?? 'XX';
      case 'wpm':
        return this.resultData?.wpm ?? 'XX';
      case 'acc':
        return this.resultData?.acc ?? 'XX';
      default:
        return 'XX'
    }
  }

  handleResultData(event: any) {
    this.resultData = {...event};
  }

  displayResults() {
    return `WPM: ${this.getResultNumber('wpm')} / ACC: ${this.getResultNumber('acc')}`
  }

  restartClicked() {
    this.refreshCurrentText();
  }

  hasTestEnded() {
    return this.projectService.getTestEndedStatus();
  }

}
