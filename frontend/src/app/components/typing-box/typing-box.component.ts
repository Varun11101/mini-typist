import { Component, computed, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { InputBoxComponent } from '../input-box/input-box.component';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { CHARS_PER_WORD, WORD_STATUSES } from '../../constants';
import { UtilsService } from '../../services/utils.service';
import { ParsedEvent } from '@angular/compiler';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-typing-box',
  standalone: true,
  imports: [InputBoxComponent, NgFor, NgIf, FormsModule, NgStyle, NgClass],
  templateUrl: './typing-box.component.html',
  styleUrl: './typing-box.component.css'
})

export class TypingBoxComponent {

  readonly wordStatus: any = WORD_STATUSES;
  @Input() currentText: string[] = []
  timer: any = null;
  timeElapsed: number = 0;
  currentTextStatus: any = [];
  currentInput: string = ''; //current input string
  
  resultData: any = {
    raw: 0,
    wpm: 0,
    acc: 0
  }

  testEnded: boolean = false;

  @Output() resultDataEmitter: any = new EventEmitter<any>();
  @Output() restartEvent: any = new EventEmitter<void>();

  constructor(
    private utils: UtilsService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.buildCurrentTextDependencies();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentText']) {
      this.buildCurrentTextDependencies();
      this.restartClicked(true);
    }
  }

  startTimer() {
    const startTime = Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      this.timeElapsed = currentTime - startTime;
      this.computeResultData();
    }, 1); 
  }

  stopTimer() {
    if(this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getTimeElapsed() {
    return this.utils.formatTimeFromMilliseconds(this.timeElapsed);
  }

  getTotalCharsTyped() {
    // return 10;
    let activeIndex: number = this.getCurrentActiveWordIndex();
    let totalChars: number = 0;
    this.currentText.forEach((word: string, index: number) => {
      if(index < activeIndex) {
        totalChars += (word.length);
      }
    })
    return totalChars;
  }

  getTotalCorrectCharsTyped() {
    let activeIndex = this.getCurrentActiveWordIndex();
    let correctCharsCount: number = 0;
    this.currentText.forEach((word: string, index: number) => {
      if(index < activeIndex && this.currentTextStatus[index] === this.wordStatus.PASSED) {
          correctCharsCount += (word.length);
      }
    })
    return correctCharsCount;
  }

  getTotalWrongCharsTyped() {
    let activeIndex = this.getCurrentActiveWordIndex();
    let wrongCharsCount: number = 0;
    this.currentText.forEach((word: string, index: number) => {
      if(index < activeIndex && this.currentTextStatus[index] === this.wordStatus.FAILED) {
          wrongCharsCount += (word.length);
      }
    })
    return wrongCharsCount;
  }


  computeResultData() {
    //calculate raw / gross wpm
    const totalCharsTyped: number = this.getTotalCharsTyped();
    const computedRaw  = 
      (totalCharsTyped / CHARS_PER_WORD) / (Math.max(0.1, this.timeElapsed / 1000) / 60)
      this.resultData.raw = Math.ceil(computedRaw)

      //calculate accuracy
      const totalCorrectCharsTyped: number = this.getTotalCorrectCharsTyped();
      const computedAccuracy: number = parseFloat(((totalCorrectCharsTyped / totalCharsTyped) * 100).toFixed(2));
      console.log("computed accuracy: ", computedAccuracy)
      this.resultData.acc = !isNaN(computedAccuracy) ? computedAccuracy : 0;
      console.log("result data is: ", this.resultData)

      //calculate net wpm
    const totalWrongCharsTyped = this.getTotalWrongCharsTyped();
    const computedWPM =  ((totalCharsTyped - totalWrongCharsTyped) / CHARS_PER_WORD) / (Math.max(0.1, this.timeElapsed / 1000) / 60)
    this.resultData.wpm  = Math.ceil(computedWPM);

    this.resultDataEmitter.emit(this.resultData);
  }

  getCurrentActiveWordIndex() {
    let activeIndex: number = this.currentText.length;
    this.currentTextStatus.forEach((wordStatus: string, index: number) => {
      if(wordStatus === this.wordStatus.ACTIVE) activeIndex = index;
    })
    return activeIndex;
  }

  hasSuccessfullyTypedLastWord(currentIndex: number, totalLength: number, currentWord: string) {
    return (currentIndex === totalLength - 1 && currentWord === this.currentText[currentIndex]);
  }

  currentInputChange(newInput: string) {
    if(this.timer === null && newInput) {
      this.startTimer();
    }
    const newInputLength: number = newInput.length;
    if(!newInput.trim().length) {
      this.currentInput = '';
      return;
    }

    //Note: Be careful here, in case current active word index is equal to length of the text array
    const currentActiveWordIndex: number = this.getCurrentActiveWordIndex();
    if(newInput[newInputLength - 1] === ' ') {
      const typedWord: string = newInput.slice(0, -1);
      if(typedWord === this.currentText?.[currentActiveWordIndex]) {
        this.currentTextStatus[currentActiveWordIndex] = this.wordStatus.PASSED;
      } else {
        this.currentTextStatus[currentActiveWordIndex] = this.wordStatus.FAILED;
      }
      this.currentInput = '';
      
      //update active index
      if(currentActiveWordIndex + 1 < this.currentText.length) {
        this.currentTextStatus[currentActiveWordIndex + 1] = this.wordStatus.ACTIVE;
      }

      //end test if user has completed all the words -> for the case where user has typed the last word incorrectly
      if(currentActiveWordIndex === this.currentText.length - 1) {
        this.endTest();
      }
    }

    //handle case for success of last word
    if(this.hasSuccessfullyTypedLastWord(currentActiveWordIndex, this.currentText.length, newInput)) {
      this.currentTextStatus[currentActiveWordIndex] = this.wordStatus.PASSED;
      this.currentInput = '';
      this.endTest(); 
    }
    
    this.computeResultData();    
  }

  resetCurrentTextStatus() {
    this.currentTextStatus = this.currentText.map((eachText: string) => this.wordStatus.PENDING);
    if(this.currentTextStatus) {
      this.currentTextStatus[0] = this.wordStatus.ACTIVE;
    }
  }

  buildCurrentTextDependencies() {
    this.resetCurrentTextStatus();
  }

  resetResultData() {
    this.resultData = {
      raw: 0,
      wpm: 0,
      acc: 0
    } 
  }

  restartClicked(fromChanges?: boolean) {
    this.stopTimer();
    this.resetResultData();
    this.resetCurrentTextStatus();
    this.resultDataEmitter.emit(this.resultData);
    this.currentInput = '';
    this.timeElapsed = 0;
    this.projectService.setTestEndedStatus(false);
    this.testEnded = false;
    if(!fromChanges) this.restartEvent.emit();
  }

  endTest() {
    this.testEnded = true;
    this.projectService.setTestEndedStatus(true);
    this.stopTimer();
  }

  getPlaceholder() {
    if(this.testEnded) {
      return 'Click restart for a new test.'
    } else {
      return 'Type the highlighted word.';
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.restartClicked();
    }
  }

}
