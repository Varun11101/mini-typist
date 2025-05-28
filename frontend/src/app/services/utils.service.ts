import { Injectable } from '@angular/core';
import { COMMON_ENGLISH_WORDS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatTimeFromSeconds(totalSeconds: number) {
    if(!totalSeconds) return '00:00'
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  formatTimeFromMilliseconds(totalMilliseconds: number) {
    if (!totalMilliseconds) return '00:00';
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const fractionalPart = Math.floor((totalMilliseconds % 1000) / 100) + 1;
    return `${totalSeconds.toString().padStart(2, '0')}:${fractionalPart.toString().padStart(2, '0')}`;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWordsFromLength(wordLength: number) {
    let words: string[] = [], allWords: string[] = COMMON_ENGLISH_WORDS;
    while(wordLength--) {
      const wordIndex: number = this.getRandomNumber(0, allWords.length - 1);
      words.push(allWords[wordIndex])
    }
    return words;
  }


}
